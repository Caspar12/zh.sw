/**
 * Created by 陈志杭 on 2016/12/27.
 */
require(["dijit/Tooltip", "dijit/Dialog", 'dijit/ConfirmDialog', "dijit/form/Button", 'zh/app/ViewRouter', 'dojo/topic', 'require', 'dojo/router', "dojo/domReady!"],
    function (Tooltip, Dialog, ConfirmDialog, Button, ViewRouter, topic, require, router) {
        var viewRouter = new ViewRouter({
            // view 根路径 m,e
            viewBaseUrl: 'admin/view',
            // 加载完成时候 view 视图的处理
            onViewLoad: function (route) {
                alert(route.viewModulePath);
            },
        });
        viewRouter.startup();
        router.startup();
        window.router = router;
        // router.register('login', function () {
        //     require(['admin/widget/loginform/LoginForm'], function (LoginForm) {
        //         var loginForm = new LoginForm();
        //         var dialog = new Dialog({
        //             title: "New Dialog ",
        //             closable: false,
        //             draggable: false,
        //             style: 'widht: 400px;'
        //         });
        //         loginForm.placeAt(dialog);
        //         loginForm.startup();
        //         dialog.show();
        //     });
        //     require(['admin/module/login/login'], function (Login) {
        //         return;
        //         var k = new Login({});
        //         k.placeAt(document.body);
        //         // k.startup();
        //         var i = 0;
        //     });
        // });
        // router.startup();
        // router.go('login');
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