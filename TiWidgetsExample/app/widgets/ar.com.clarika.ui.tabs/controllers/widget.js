//
//  widget.js
//  Tabs
//
//  Created by Juan Ignacio Agú on 2015-04-28.
//  Copyright 2015 Clarika. All rights reserved.
//

/**
 * arguments
 * @params {parent tss}
 */
var args = arguments[0] || {};
var currentTab = 0;
var DEBUG = (Alloy.CFG.DEBUG);
var mTabs,
    mPages,
    indicatorColor;
var loadingPages = [];
var views = [];

//lazy load page
var lazyLoad = true;

/**
 * apply widget properties
 * @param {} properties
 */
var applyProperties = function(properties) {
	if (properties) {

		_.extend($.widget, _.omit(properties, 'indicatorColor', 'tabs', 'scrollable', 'lazyLoad'));

		if (_.has(properties, 'indicatorColor')) {
			indicatorColor = properties.indicatorColor;
		}

		if (_.has(properties, 'tabs')) {
			_.extend($.tabs, properties.tabs);
		}

		if (_.has(properties, 'scrollable')) {
			_.extend($.scrollable, properties.scrollable);
		}

		if (_.has(properties, 'lazyLoad')) {
			lazyLoad = properties.lazyLoad;
		}

		applyConfigurations();

	}
};

/**
 * apply widget listeners
 */
var applyListeners = function() {
	$.scrollable.addEventListener('scroll', onScroll);
	$.scrollable.addEventListener('scrollend', onScrollEnd);
};

/**
 * apply widget configuration
 */
var applyConfigurations = function() {

	if (mTabs && mPages) {

		//calculate width
		var tab_width = (parseInt(Titanium.Platform.displayCaps.platformWidth / mTabs.length)) + ( OS_IOS ? 'dp' : 'px');

		var index = 0;
		//add tabs
		mTabs.forEach(function(tab) {
			addTab(tab, index, tab_width);
			index++;
		});

		//gc
		mTabs = null;
		index = null;

		if (!lazyLoad) {
			var views = [];
			//add pages
			mPages.forEach(function(page) {
				views.push(Alloy.createController(page.name, page.params).getView());
			});
			$.scrollable.setViews(views);

			//gc
			mPages = null;
			views = null;

		}

		setCurrentPage(0);

	}
};

/**
 * Fired repeatedly as the view is being scrolled.
 * @param {Object} e
 */
var onScroll = function(e) {
	$.trigger('tabscroll', e);
};

/**
 * Fired when the view has stopped moving completely.
 * @param {Object} e
 */
var onScrollEnd = function(e) {
	$.trigger('tabscrollend', e);
	setCurrentPage(e.currentPage, true);

};

/**
 * sets the value of the tabs property
 */
var setTabs = function(tabs) {
	if (_.isArray(tabs)) {
		mTabs = tabs;
		applyConfigurations();
	}
};

/**
 * Sets the value of the pages property.
 * @param Array pages:[
 * 	{name:'nameController', params:{}}
 * ]
 */
var setPages = function(pages) {

	tiLog('setPages() ' + 'pages: ' + pages);

	if (_.isArray(pages)) {
		mPages = pages;

		if (lazyLoad) {
			createDefaultViews();
		}

		applyConfigurations();
	}
};

/**
 * create default views
 */
var createDefaultViews = function() {

	for (var i = 0,
	    j = mPages.length; i < j; i++) {
		views.push(Titanium.UI.createView({
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL
		}));

		$.scrollable.setViews(views);
	};

};
/**
 * Sets the value of the currentPage property.
 */
var setCurrentPage = function(index, /**is scroll or scrollend event*/isScroll) {

	tiLog('setCurrentPage() currentTab: ' + currentTab + 'index: ' + index + ' isScroll: ' + isScroll);

	if (currentTab != index) {
		changeActiveTab(false);
	}
	currentTab = index;
	//active current tab
	changeActiveTab(true);
	if (!isScroll) {
		$.scrollable.setCurrentPage(index);
	}
	checkIsAddPage();
};

/**
 * change active tab
 * @param int index
 */
var changeActiveTab = function(value) {
	$.tabs.children[currentTab].fireEvent('changeactive', {
		value : value
	});
};
/**
 * add tab
 * @param {Object} tab
 * @param int index
 * @param dimension tab_width
 */
var addTab = function(tab, index, tab_width) {

	//create tab controller
	var tabController = Widget.createController('tab', {
		index : index,
		active : index == currentTab,
		width : tab_width,
		indicatorColor : indicatorColor,
		title : tab.title
	});

	//add tab view
	$.tabs.add(tabController.getView());

	//add event
	/**
	 * Fired when the device detects a click against the tab.
	 * @param {Object} e
	 */
	tabController.on('tabclick', function(e) {

		tiLog('tabclick ' + JSON.stringify(e));
		setCurrentPage(e.index);

	});

	//gc
	tabController = null;
	tab = null;

};

/**
 * check if need add page to scrollable
 */
var checkIsAddPage = function() {
	if (lazyLoad && loadingPages.indexOf(currentTab) == -1) {
		tiLog('checkIsAddPage(), currentTab :' + currentTab);
		//get page
		var page = mPages[currentTab];
		//add view to scrollable
		views[currentTab].add(Alloy.createController(page.name, page.params).getView());
		//add index to loading pages
		loadingPages.push(currentTab);
	}
};

/**
 * show log
 * @param String message
 */
var tiLog = function(message) {
	if (DEBUG) {
		Ti.API.info('ar.com.clarika.ui.tabs', message);
	}
};
//initialize widget
(function() {
	applyListeners();
	applyProperties(args);
	//gc
	args = null;
})();

//public methods
exports.applyProperties = applyProperties;
exports.setPages = setPages;
exports.setTabs = setTabs;
exports.applyConfigurations = applyConfigurations;

// events
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;

