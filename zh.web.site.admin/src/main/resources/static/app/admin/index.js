/**
 * Created by 陈志杭 on 2016/12/27.
 */
require(["dijit/Tooltip", "dijit/Dialog", 'require', 'dojo/router', "dojo/domReady!"], function (Tooltip, Dialog, router, require) {
    router.register('/login',function () {
        require(['admin/module/login'], function (login) {

        });
    });
    // require(['admin/login'], function (login) {
    //     var dialog = new Dialog({
    //         // Dialog title
    //         title: "New Dialog " + 1,
    //         // Create Dialog content
    //         content: '1'
    //     });
    //     dialog.show();
    // });
});