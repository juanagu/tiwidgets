function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ar.com.clarika.ui.webview/" + s : s.substring(0, index) + "/ar.com.clarika.ui.webview/" + s.substring(index + 1);
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
    new (require("alloy/widget"))("ar.com.clarika.ui.webview");
    this.__widgetId = "ar.com.clarika.ui.webview";
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
        backgroundColor: "white",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.webview = Ti.UI.createWebView({
        height: Ti.UI.FILL,
        widht: Ti.UI.FILL,
        visible: false,
        enableZoomControls: false,
        id: "webview"
    });
    $.__views.widget.add($.__views.webview);
    $.__views.loader = Ti.UI.createActivityIndicator({
        style: Titanium.UI.ActivityIndicatorStyle.BIG_DARK,
        id: "loader"
    });
    $.__views.widget.add($.__views.loader);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var applyProperties = function(properties) {
        if (properties) {
            _.has(properties, "loader") && _.extend($.loader, properties.loader);
            _.has(properties, "webview") && _.extend($.webview, properties.webview);
            _.extend($.widget, _.omit(properties, "loader", "webview"));
        }
    };
    var applyListeners = function() {
        $.webview.addEventListener("load", onLoad);
        $.webview.addEventListener("beforeload", onBeforeReload);
        $.webview.addEventListener("error", onError);
    };
    var onBeforeReload = function(e) {
        $.loader.show();
        $.webview.hide();
        $.trigger("beforeload", e);
    };
    var onLoad = function(e) {
        $.loader.hide();
        $.webview.show();
        $.trigger("load", e);
    };
    var onError = function(e) {
        $.loader.hide();
        $.webview.hide();
        $.trigger("error", e);
    };
    var setUrl = function(url) {
        $.webview.url = url;
    };
    !function() {
        applyProperties(args);
        applyListeners();
        args = null;
    }();
    exports.applyProperties = applyProperties;
    exports.setUrl = setUrl;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;