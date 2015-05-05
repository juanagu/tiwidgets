function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ar.com.clarika.ui.textfield/" + s : s.substring(0, index) + "/ar.com.clarika.ui.textfield/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    new (require("alloy/widget"))("ar.com.clarika.ui.textfield");
    this.__widgetId = "ar.com.clarika.ui.textfield";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.widget = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.hintText = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#e4e4e4",
        font: {
            fontFamily: "Roboto Regular",
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "hintText"
    });
    $.__views.widget.add($.__views.hintText);
    $.__views.textField = Ti.UI.createTextField({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#787677",
        font: {
            fontFamily: "Roboto Regular",
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "textField"
    });
    $.__views.widget.add($.__views.textField);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var applyProperties = function(properties) {
        if (properties) {
            _.has(properties, "hintText") && _.extend($.hintText, properties.hintText);
            _.has(properties, "textField") && _.extend($.textField, properties.textField);
            _.extend($.widget, _.omit(properties, "hintText", "textField"));
        }
    };
    var applyListeners = function() {
        $.textField.addEventListener("change", onChange);
        $.textField.addEventListener("focus", onFocus);
        $.textField.addEventListener("blur", onBlur);
    };
    var onChange = function(e) {
        $.trigger("textchange", e);
        $.hintText.visible = _.isEmpty(e.value);
    };
    var onFocus = function(e) {
        $.trigger("textfocus", e);
    };
    var onBlur = function(e) {
        $.trigger("textblur", e);
    };
    var getValue = function() {
        return $.textField.value;
    };
    var setValue = function(value) {
        $.textField.value = value;
        onChange({
            value: value
        });
    };
    !function() {
        applyListeners();
        applyProperties(args);
        args = null;
    }();
    exports.setValue = setValue;
    exports.getValue = getValue;
    exports.applyProperties = applyProperties;
    exports.addEventListener = $.on;
    exports.removeEventListener = $.off;
    exports.fireEvent = $.trigger;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;