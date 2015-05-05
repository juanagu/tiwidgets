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
    this.__controllerPath = "page_2";
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
    var __defers = {};
    $.__views.page_2 = Ti.UI.createWindow({
        backgroundColor: "white",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        title: "page 2",
        id: "page_2"
    });
    $.__views.page_2 && $.addTopLevelView($.__views.page_2);
    doOpen ? $.__views.page_2.addEventListener("open", doOpen) : __defers["$.__views.page_2!open!doOpen"] = true;
    $.__views.tabs = Alloy.createWidget("ar.com.clarika.ui.tabs", "widget", {
        indicatorColor: "#3F51B5",
        id: "tabs",
        __parentSymbol: $.__views.page_2
    });
    $.__views.tabs.setParent($.__views.page_2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var applyViewProperties = function() {
        $.tabs.setTabs([ {
            title: {
                text: "Tab 1"
            }
        }, {
            title: {
                text: "Tab 2"
            }
        } ]);
        $.tabs.setPages([ {
            name: "tab_1",
            params: {
                someParams: {}
            }
        }, {
            name: "tab_2",
            params: {
                someParams: {}
            }
        } ]);
    };
    var doOpen = function() {
        _.defer(applyViewProperties);
    };
    __defers["$.__views.page_2!open!doOpen"] && $.__views.page_2.addEventListener("open", doOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;