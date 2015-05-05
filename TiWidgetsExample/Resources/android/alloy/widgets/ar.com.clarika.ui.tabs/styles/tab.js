function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ar.com.clarika.ui.tabs/" + s : s.substring(0, index) + "/ar.com.clarika.ui.tabs/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "white"
    }
}, {
    isClass: true,
    priority: 10000.0002,
    key: "fill",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "fill_size",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "size_fill",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "size",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "tab",
    style: {
        height: "48dp",
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "title",
    style: {
        font: {
            fontFamily: "Roboto Medium",
            fontSize: "14dp"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundImage: "none",
        color: "#212121"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "indicator",
    style: {
        height: "2dp",
        width: Ti.UI.FILL,
        bottom: 0,
        visible: false,
        backgroundColor: "#FFEB3B"
    }
} ];