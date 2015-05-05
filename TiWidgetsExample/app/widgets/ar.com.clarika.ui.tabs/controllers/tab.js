//
//  tab.js
//  Tab
//
//  Created by Juan Ignacio Agú on 2015-04-28.
//  Copyright 2015 Clarika. All rights reserved.
// 	OLD CODE
//

var Tab = {
	TAG : 'ar.com.clarika.ui.tabs.tab',
	args : arguments[0] || {},
	active : false,
	index : null,
	initialize : function() {

		//tss
		_.extend($.title, Tab.args.title);
		if (Tab.args.indicatorColor) {
			$.indicator.backgroundColor = Tab.args.indicatorColor;
		}
		_.extend($.tab, _.omit(Tab.args, 'title', 'indicatorColor', 'index', 'active'));

		Tab.active = (Tab.args.active);
		Tab.setIndicator(Tab.active);

		Tab.index = Tab.args.index;
		Tab.args = null;
		Tab.listeners();
	},
	/**
	 * configure listeners
	 */
	listeners : function() {
		$.tab.addEventListener('click', Tab.onClick);
		$.tab.addEventListener('changeactive', Tab.changeActiveTab);
	},
	/**
	 * set title tab
	 * @param String title
	 */
	setTitle : function(title) {
		$.title.text = title.toUpperCase();
	},
	setIcon : function(icon) {
		//TODO implement
	},
	/**
	 * set visibility to indicator
	 * @param boolean visible
	 */
	setIndicator : function(visible) {
		$.indicator.visible = visible;
	},
	/**
	 * click event
	 */
	onClick : function() {
		if (!Tab.active) {
			Tab.active = true;
			$.trigger('tabclick', {
				index : Tab.index
			});
			Tab.setIndicator(true);
		}
	},
	/**
	 * event change active tab
	 */
	changeActiveTab : function(e) {
		Tab.active = e.value;
		Tab.setIndicator(Tab.active);
	}
};
//public
$.setIndicator = Tab.setIndicator;
$.setTitle = Tab.setTitle;
//init
Tab.initialize();
