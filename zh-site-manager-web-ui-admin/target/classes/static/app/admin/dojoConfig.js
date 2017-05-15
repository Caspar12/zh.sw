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
        {name: 'zh', location: '../../../js/zh'},
        {name: 'dojo-ext', location: '../../../js/dojo-ext'},
        {name: 'jquery', location: '../../../js/jquery'},
        {name: 'bootstrap', location: '../../../js/bootstrap'},
        {name: 'moment', location: '../../../js/moment'},
    ],
    map: {
        "*": {
            "datatables.net": 'jquery/plugins/datatables/js/jquery.dataTables',
            "moment" :'moment/moment-with-locales',
            './form/_FormMixin': 'dojo-ext/dijit/form/_FormMixin',
            'origin/dijit/form/_FormMixin': 'dijit/form/_FormMixin',
        },
        "dijit/form/_FormMixin": {
            'dijit/form/_FormMixin': 'dojo-ext/dijit/form/_FormMixin',
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
 