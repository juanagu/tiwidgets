function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "page_1";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.page_1 = Ti.UI.createWindow({
        backgroundColor: "white",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        title: "Page 1",
        id: "page_1"
    });
    $.__views.page_1 && $.addTopLevelView($.__views.page_1);
    $.__views.webview = Alloy.createWidget("ar.com.clarika.ui.webview", "widget", {
        webview: {
            url: "http://www.appcelerator.com/"
        },
        id: "webview",
        __parentSymbol: $.__views.page_1
    });
    $.__views.webview.setParent($.__views.page_1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;