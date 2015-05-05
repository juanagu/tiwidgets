//
//  widget.js
//  Texfield with dinamic hintText
//
//  Created by Juan Ignacio Agú on 2015-04-29.
//  Copyright 2015 Clarika. All rights reserved.
//

/* Params */
var args = arguments[0] || {};

/**
 * apply widget properties
 * @param {Object} properties
 */
var applyProperties = function(properties) {
	if (properties) {

		if (_.has(properties, 'hintText')) {
			_.extend($.hintText, properties.hintText);
		}
		if (_.has(properties, 'textField')) {
			_.extend($.textField, properties.textField);
		}

		_.extend($.widget, _.omit(properties, 'hintText', 'textField'));

	}

};

/**
 * apply widget listeners
 */
var applyListeners = function() {
	$.textField.addEventListener('change', onChange);
	$.textField.addEventListener('focus', onFocus);
	$.textField.addEventListener('blur', onBlur);
};

/**
 * Fired when the field value changes.
 * @param {Object} e
 */
var onChange = function(e) {
	$.trigger('textchange', e);
	$.hintText.visible = _.isEmpty(e.value);
};

/**
 * Fired when the field gains focus.
 * @param {Object} e
 */
var onFocus = function(e) {
	$.trigger('textfocus', e);
};

/**
 * Fired when the field loses focus.
 * @param {Object} e
 */
var onBlur = function(e) {
	$.trigger('textblur', e);
};

/**
 * Gets the value of the value property.
 * @return String
 */
var getValue = function() {
	return $.textField.value;
};

/**
 * Sets the value of the value property.
 * @param {Object} value
 */
var setValue = function(value) {
	$.textField.value = value;
	//on android simulate change
	if (OS_ANDROID) {
		onChange({
			value : value
		});
	}
};

//initialize
(function() {
	applyListeners();
	applyProperties(args);
	//gc
	args = null;
})();

//public
exports.setValue = setValue;
exports.getValue = getValue;
exports.applyProperties = applyProperties;

// events
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;

