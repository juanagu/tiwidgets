// 
//  widget.js
//  webview charger
//  
//  Created by Juan Ignacio Agú on 2015-05-04.
//  Copyright 2015 Clarika. All rights reserved.
// 


/* Params*/
var args = arguments[0] || {};

/**
 * apply widget properties
 * @param {Object} properties
 */
var applyProperties = function(properties) {
	if (properties) {

		if (_.has(properties, 'loader')) {
			_.extend($.loader, properties.loader);
		}

		if (_.has(properties, 'webview')) {
			_.extend($.webview, properties.webview);
		}

		_.extend($.widget, _.omit(properties, 'loader', 'webview'));
	}
};

/**
 * apply widget listeners
 */
var applyListeners = function() {

	$.webview.addEventListener('load', onLoad);
	$.webview.addEventListener('beforeload', onBeforeReload);
	$.webview.addEventListener('error', onError);

};

/**
 * Fired before the web view starts loading its content.
 */
var onBeforeReload = function(e) {
	$.loader.show();
	$.webview.hide();
	$.trigger('beforeload', e);
};

/**
 * Fired when the web view content is loaded.
 */
var onLoad = function(e) {
	$.loader.hide();
	$.webview.show();
	$.trigger('load', e);
};

/**
 * Fired when the web view cannot load the content.
 */
var onError = function(e) {
	$.loader.hide();
	$.webview.hide();
	$.trigger('error', e);
};
/**
 * Sets the value of the url property.
 * @param String url
 */
var setUrl = function(url) {
	$.webview.url = url;
};

//initialize widget
(function() {
	applyProperties(args);
	applyListeners();
	//gc
	args = null;
})();

//public
exports.applyProperties = applyProperties;
exports.setUrl = setUrl; 