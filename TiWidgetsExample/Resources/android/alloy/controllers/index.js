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
    this.__controllerPath = "index";
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
    var __alloyId1 = [];
    $.__views.page1 = Alloy.createController("page_1", {
        id: "page1"
    });
    $.__views.__alloyId2 = Ti.UI.createTab({
        window: $.__views.page1.getViewEx({
            recurse: true
        }),
        title: "Page 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId2"
    });
    __alloyId1.push($.__views.__alloyId2);
    $.__views.page2 = Alloy.createController("page_2", {
        id: "page2"
    });
    $.__views.__alloyId4 = Ti.UI.createTab({
        window: $.__views.page2.getViewEx({
            recurse: true
        }),
        title: "Page 2",
        icon: "KS_nav_views.png",
        id: "__alloyId4"
    });
    __alloyId1.push($.__views.__alloyId4);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId1,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;