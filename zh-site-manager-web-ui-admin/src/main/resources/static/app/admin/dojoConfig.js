/**
 * Created by 陈志杭 on 2016/12/27.
 * descript: dojo全局配置
 */
var dojoConfig = {
    // The base URL prepended to a module identifier when converting it to a path or URL.
    //baseUrl:'',
    // An array of objects which provide the package name and location:
    packages: [
        {name: 'admin', location: '../../../app/admin'},
        {name: 'zh', location: '../../../libs/zh'},
        {name: 'dojo-ext', location: '../../../libs/dojo-ext'},
        {name: 'jquery', location: '../../../libs/jquery'},
        {name: 'bootstrap', location: '../../../libs/bootstrap'},
        {name: 'moment', location: '../../../libs/moment'},
        {name: 'extjs', location: '../../../libs/extjs'},
    ],
    map: {
        '*':{
            'jquery': 'jquery/jquery',
        }
    },
    // map: Allows you to map paths in module identifiers to different paths:
    // map: {
    //     dijit16: {
    //         dojo: "dojo16"
    //     }
    // },
    // Defines if Dojo core should be loaded asynchronously.
    // Values can be true, false or legacyAsync, which puts the loader permanently in legacy cross-domain mode.
    async: true,
    parseOnLoad: false,
    // deps: An array of resource paths which should load immediately once Dojo has loaded:
    //deps: ["dojo/parser"],
    // callback: The callback to execute once deps have been retrieved:
    // callback: function(parser) {
    //     // Use the resources provided here
    // },
    // waitSeconds: Amount of time to wait before signaling load timeout for a module; defaults to 0 (wait forever):
    waitSeconds: 0,
    // cacheBust: If true, appends the time as a querystring to each module URL to avoid module caching:
    cacheBust: false,
    tlmSiblingOfDojo: true,
    has: {
        "dojo-firebug": true,
        "dojo-debug-messages": true
    },
    isDebug: false
};
 