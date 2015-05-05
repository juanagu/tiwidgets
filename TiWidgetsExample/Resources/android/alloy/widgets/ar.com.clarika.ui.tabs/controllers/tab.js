function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ar.com.clarika.ui.tabs/" + s : s.substring(0, index) + "/ar.com.clarika.ui.tabs/" + s.substring(index + 1);
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
    new (require("alloy/widget"))("ar.com.clarika.ui.tabs");
    this.__widgetId = "ar.com.clarika.ui.tabs";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tab";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.tab = Ti.UI.createView({
        height: "48dp",
        width: Ti.UI.SIZE,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontFamily: "Roboto Medium",
            fontSize: "14dp"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundImage: "none",
        color: "#212121",
        id: "title"
    });
    $.__views.tab.add($.__views.title);
    $.__views.indicator = Ti.UI.createView({
        height: "2dp",
        width: Ti.UI.FILL,
        bottom: 0,
        visible: false,
        backgroundColor: "#FFEB3B",
        id: "indicator"
    });
    $.__views.tab.add($.__views.indicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Tab = {
        TAG: "ar.com.clarika.ui.tabs.tab",
        args: arguments[0] || {},
        active: false,
        index: null,
        initialize: function() {
            _.extend($.title, Tab.args.title);
            Tab.args.indicatorColor && ($.indicator.backgroundColor = Tab.args.indicatorColor);
            _.extend($.tab, _.omit(Tab.args, "title", "indicatorColor", "index", "active"));
            Tab.active = Tab.args.active;
            Tab.setIndicator(Tab.active);
            Tab.index = Tab.args.index;
            Tab.args = null;
            Tab.listeners();
        },
        listeners: function() {
            $.tab.addEventListener("click", Tab.onClick);
            $.tab.addEventListener("changeactive", Tab.changeActiveTab);
        },
        setTitle: function(title) {
            $.title.text = title.toUpperCase();
        },
        setIcon: function() {},
        setIndicator: function(visible) {
            $.indicator.visible = visible;
        },
        onClick: function() {
            if (!Tab.active) {
                Tab.active = true;
                $.trigger("tabclick", {
                    index: Tab.index
                });
                Tab.setIndicator(true);
            }
        },
        changeActiveTab: function(e) {
            Tab.active = e.value;
            Tab.setIndicator(Tab.active);
        }
    };
    $.setIndicator = Tab.setIndicator;
    $.setTitle = Tab.setTitle;
    Tab.initialize();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;