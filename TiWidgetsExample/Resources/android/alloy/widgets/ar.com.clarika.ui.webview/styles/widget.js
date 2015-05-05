function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ar.com.clarika.ui.webview/" + s : s.substring(0, index) + "/ar.com.clarika.ui.webview/" + s.substring(index + 1);
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
    priority: 100000.0008,
    key: "widget",
    style: {
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "webview",
    style: {
        height: Ti.UI.FILL,
        widht: Ti.UI.FILL,
        visible: false
    }
}, {
    isId: true,
    priority: 100101.0009,
    key: "loader",
    style: {
        style: Titanium.UI.ActivityIndicatorStyle.BIG_DARK
    }
}, {
    isId: true,
    priority: 100101.0012,
    key: "webview",
    style: {
        enableZoomControls: false
    }
} ];