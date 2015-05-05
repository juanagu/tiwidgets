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
    var Widget = new (require("alloy/widget"))("ar.com.clarika.ui.tabs");
    this.__widgetId = "ar.com.clarika.ui.tabs";
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
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.tabs = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "tabs"
    });
    $.__views.widget.add($.__views.tabs);
    var __alloyId0 = [];
    $.__views.scrollable = Ti.UI.createScrollableView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        views: __alloyId0,
        id: "scrollable"
    });
    $.__views.widget.add($.__views.scrollable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var currentTab = 0;
    var DEBUG = Alloy.CFG.DEBUG;
    var mTabs, mPages, indicatorColor;
    var loadingPages = [];
    var views = [];
    var lazyLoad = true;
    var applyProperties = function(properties) {
        if (properties) {
            _.extend($.widget, _.omit(properties, "indicatorColor", "tabs", "scrollable", "lazyLoad"));
            _.has(properties, "indicatorColor") && (indicatorColor = properties.indicatorColor);
            _.has(properties, "tabs") && _.extend($.tabs, properties.tabs);
            _.has(properties, "scrollable") && _.extend($.scrollable, properties.scrollable);
            _.has(properties, "lazyLoad") && (lazyLoad = properties.lazyLoad);
            applyConfigurations();
        }
    };
    var applyListeners = function() {
        $.scrollable.addEventListener("scroll", onScroll);
        $.scrollable.addEventListener("scrollend", onScrollEnd);
    };
    var applyConfigurations = function() {
        if (mTabs && mPages) {
            var tab_width = parseInt(Titanium.Platform.displayCaps.platformWidth / mTabs.length) + "px";
            var index = 0;
            mTabs.forEach(function(tab) {
                addTab(tab, index, tab_width);
                index++;
            });
            mTabs = null;
            index = null;
            if (!lazyLoad) {
                var views = [];
                mPages.forEach(function(page) {
                    views.push(Alloy.createController(page.name, page.params).getView());
                });
                $.scrollable.setViews(views);
                mPages = null;
                views = null;
            }
            setCurrentPage(0);
        }
    };
    var onScroll = function(e) {
        $.trigger("tabscroll", e);
    };
    var onScrollEnd = function(e) {
        $.trigger("tabscrollend", e);
        setCurrentPage(e.currentPage, true);
    };
    var setTabs = function(tabs) {
        if (_.isArray(tabs)) {
            mTabs = tabs;
            applyConfigurations();
        }
    };
    var setPages = function(pages) {
        tiLog("setPages() pages: " + pages);
        if (_.isArray(pages)) {
            mPages = pages;
            lazyLoad && createDefaultViews();
            applyConfigurations();
        }
    };
    var createDefaultViews = function() {
        for (var i = 0, j = mPages.length; j > i; i++) {
            views.push(Titanium.UI.createView({
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL
            }));
            $.scrollable.setViews(views);
        }
    };
    var setCurrentPage = function(index, isScroll) {
        tiLog("setCurrentPage() currentTab: " + currentTab + "index: " + index + " isScroll: " + isScroll);
        currentTab != index && changeActiveTab(false);
        currentTab = index;
        changeActiveTab(true);
        isScroll || $.scrollable.setCurrentPage(index);
        checkIsAddPage();
    };
    var changeActiveTab = function(value) {
        $.tabs.children[currentTab].fireEvent("changeactive", {
            value: value
        });
    };
    var addTab = function(tab, index, tab_width) {
        var tabController = Widget.createController("tab", {
            index: index,
            active: index == currentTab,
            width: tab_width,
            indicatorColor: indicatorColor,
            title: tab.title
        });
        $.tabs.add(tabController.getView());
        tabController.on("tabclick", function(e) {
            tiLog("tabclick " + JSON.stringify(e));
            setCurrentPage(e.index);
        });
        tabController = null;
        tab = null;
    };
    var checkIsAddPage = function() {
        if (lazyLoad && -1 == loadingPages.indexOf(currentTab)) {
            tiLog("checkIsAddPage(), currentTab :" + currentTab);
            var page = mPages[currentTab];
            views[currentTab].add(Alloy.createController(page.name, page.params).getView());
            loadingPages.push(currentTab);
        }
    };
    var tiLog = function(message) {
        DEBUG && Ti.API.info("ar.com.clarika.ui.tabs", message);
    };
    !function() {
        applyListeners();
        applyProperties(args);
        args = null;
    }();
    exports.applyProperties = applyProperties;
    exports.setPages = setPages;
    exports.setTabs = setTabs;
    exports.applyConfigurations = applyConfigurations;
    exports.addEventListener = $.on;
    exports.removeEventListener = $.off;
    exports.fireEvent = $.trigger;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;