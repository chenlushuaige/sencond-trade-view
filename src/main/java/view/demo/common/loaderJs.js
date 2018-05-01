/**
 *加载共有的js/css文件
 *
 * Created by yejunrong on 17/12/20.
 */
(function (global, document) {


    if (!document) {
        document = global.document;
    }
    var __version = '';

    var __ctx = global.__ctx = "/demo/src/main/java/com/ddjf/cl/demo";

    var commonCSS = ["/lib/index.css"];

    var commonJS = [
        "/lib/jquery-3.2.1.min.js",
        "/lib/vue.js",
        "/lib/index.js"
    ];

    var listJs = [];


    var networkJS = [];

    var networkCSS = [];


    /**
     * 导入 js文件。
     */
    for (var i = 0; i < commonJS.length; i++) {
        var str = '<script src="' + __ctx + commonJS[i] + __version + '"></script>';
        document.write(str);
    }

    /**
     * 导入网络端的js文件。
     */
    for (var i = 0; i < networkJS.length; i++) {
        var str = '<script src="' + networkJS[i] + __version + '"></script>';
        document.write(str);
    }


    /**
     * js引入时导入必须的css样式。
     */
    for (var i = 0; i < commonCSS.length; i++) {
        var str = '<link rel="stylesheet" href="' + __ctx + commonCSS[i] + __version + '">';
        document.write(str);
    }


    /**
     * 外部导入css。
     */
    for (var i = 0; i < networkCSS.length; i++) {
        var str = '<link rel="stylesheet" href="' + networkCSS[i] + __version + '">';
        document.write(str);
    }

    function loaderListJs() {
        /**
         * 外部导入css。
         */
        for (var i = 0; i < listJs.length; i++) {
            var str = '<script src="' + __ctx + listJs[i] + __version + '"></script>';
            document.write(str);
        }
    }


    var loaderJs = global.loaderJs = {
        loaderListJs: loaderListJs,
    };


}(window, null));

