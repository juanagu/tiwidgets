/* Params */
var args = arguments[0] || {};

/**
 *apply controller view properties
 */
var applyViewProperties = function() {
	//configure tabs
	$.tabs.setTabs([{
		title : {
			text : 'Tab 1'
		}
	}, {
		title : {
			text : 'Tab 2'
		}
	}]);

	//configure pages
	$.tabs.setPages([{
		name : 'tab_1',
		params : {
			someParams : {}
		}
	}, {
		name : 'tab_2',
		params : {
			someParams : {}
		}
	}]);

};

/**
 * when windows is opened
 */
var doOpen = function() {
	_.defer(applyViewProperties);
};
