/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/view/Main
 */
define([
    'zh/widget/view/View',
    'dijit/Dialog',
    'zh/widget/layout/MainBorderContainer',
    'zh/widget/Tree',
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    'zh/widget/menu/MenuItem',
    'admin/widget/dialog/ModifyPasswordFormDialog',
    'admin/widget/module/account/dialog/EditPersonalInfoDialog',
    'dojo/_base/lang',
    'admin/util/context',
    "dojo/_base/declare",
    'admin/api/applicationHttpService',
    'admin/view-partial/main/common/BaseTitlePaneView',
    'zh/widget/layout/AccordionContainer',
    'zh/widget/util/treeUtils',
    'admin/util/viewRouter',
    'zh/app/ViewParamsRouter',
    "zh/util/log",
    'zh/app/util/hashUtils',
    'zh/util/stringUtils',
    'zh/core',
    'admin/util/loginStateUtils',
    'admin/util/pageTransitionsUtils',
    'admin/widget/dialog/ConfirmDialog',
    'admin/appConfig',
    'admin/util/tipUtils',
    'admin/api/accountHttpService',
    'admin/api/identityHttpService',
    'admin/util/dialogUtils',
    'zh/widget/util/Clipboard',
    'zh/app/exceptions/ValidationException',
    'admin/util/bizTipUtils',
    'admin/util/request',
    'admin/view-partial/main/widget/dialog/LockDeskLoginConfirmDialog',
    'dojo/_base/array',
], function (PageView, Dialog, MainBorderContainer, Tree, Memory, ObjectStoreModel, MenuItem, ModifyPasswordFormDialog, EditPersonalInfoDialog, lang, context, declare, applicationHttpService, BaseTitlePaneView, AccordionContainer, treeUtils,
             viewRouter, ViewParamsRouter, log, hashUtils, stringUtils, zh, loginStateUtils, pageTransitionsUtils, ConfirmDialog, appConfig,
             tipUtils, accountHttpService, identityHttpService, dialogUtils, Clipboard, ValidationException, bizTipUtils,
             request,
             LockDeskLoginConfirmDialog,
             array) {
    return declare(PageView, {
        isAutoFillToParentNode: true,
        routeParamFieldName: 'pane',
        baseRoutePath: '/main',
        getDefaultPanel: function () {
            return new BaseTitlePaneView({
                title: '首页',
                content: '欢迎'
            })
        },
        postCreate: function () {
            this.inherited(arguments);
            var me = this;
            me.lockDeskLoginConfirmDialog = new LockDeskLoginConfirmDialog({
                account: loginStateUtils.getAccount().account,
                setCurrentAccount: function (res) {
                    loginStateUtils.setAccount(res);
                },
                getCurrentRoute: function () {
                    return viewRouter.getCurrentRoute().routePath;
                },
                onUnlock: function () {

                }
            });

        },
        startup: function () {
            this.inherited(arguments);
            var me = this;
            me._createBorderContainer();
            me._createViewParamsRouter();

        },
        treeOnClick: function (item, node, event) {
            var me = this;
            event.preventDefault();
            me.viewPartialRouter.go(item.url);
        },
        _createViewParamsRouter: function () {
            var me = this;
            me.viewPartialRouter = new ViewParamsRouter({
                targetNode: me.container.get('main'),
                // view 根路径
                viewBaseUrl: 'admin/view-partial/main',
                // 默认 view module 路径
                defaultViewModulePath: false,
                /**
                 * 进行路由的参数名称,必填
                 */
                routeParamFieldName: me.routeParamFieldName,
                /**
                 * 根路由路径,必填
                 */
                baseRoutePath: me.baseRoutePath,
                onAddToTargetNode: function (route) {
                    me.setMainByPane(route.view, route);
                },
                onLoadViewJsError: function (route, error) {
                    pageTransitionsUtils.hide();
                    log.error('main.viewPartialRouter 无法加载view,' + route.viewModulePath);
                    tipUtils.warning('无法加载当前模块');
                },
                startViewLoadingAnimate: function (route) {
                    var me = this;
                    pageTransitionsUtils.show(function () {

                    });
                },
                startViewLoadingEndAnimate: function (route) {
                    var me = this;
                    pageTransitionsUtils.hide(function () {
                        me.onViewLoadingEndAnimateEndCallback(route);
                    });
                }
            });
            me.viewPartialRouter.startup();

            var paramObj = hashUtils.getParams() || {};

            if (zh.isEmptyObject(paramObj[me.routeParamFieldName]) === false) {
                me.viewPartialRouter.onRouteStringChange();
            }
        },
        _createBorderContainer: function () {
            var container = this.container = new MainBorderContainer();
            container.placeAt(this);
            container.startup();
            container.resize();
            this._createLeftMenuTree();
            this.setMainByPane(this.getDefaultPanel());
            var account = loginStateUtils.getAccount();
            container.set('subTitle', lang.getObject('name', false, account) || '');
            container.set('title', context.app.name);
            container.addTooltipDialogMenuItem(new MenuItem({
                label: '邀请链接',
                onClick: function () {
                    var account = loginStateUtils.getAccount();
                    var url = window.location.origin + window.location.pathname + '#/register&inviterId=' + account.id;
                    var html = lang.replace(
                        [
                            '<a href="{url}" target="_blank">{url}</a>',
                            '<br />',
                            '<br />',
                            '<button style="display: none;" data-clipboard-text="{url}" type="button" class="btn btn-default copy-register-by-inviterid-ok">复制</button>'
                        ].join(''),
                        {
                            url: url
                        }
                    );

                    var clipboard = null;
                    var dialog = dialogUtils.alert({
                        message: html,
                        title: '邀请链接',
                        callback: function () {
                            clipboard && clipboard.destroy();
                        },
                    });
                    dialog.init(function () {
                        var btnCopyNode = document.getElementsByClassName('copy-register-by-inviterid-ok')[0];
                        clipboard = new Clipboard(btnCopyNode);
                        clipboard.on("ready", function (e) {
                            btnCopyNode.style.display = '';
                        });
                        clipboard.on('error', function (error) {
                            console.warn(error);
                        });
                    });

                }
            }));
            container.addTooltipDialogMenuItem(new MenuItem({
                label: '个人信息',
                onClick: function () {
                    accountHttpService.getAccount()
                        .success(function (res) {
                            container.editPersonalInfoDialog = new EditPersonalInfoDialog({
                                data: res,
                                onSuccess: function (newName) {
                                    var cacheAccount = loginStateUtils.getAccount();
                                    res.token = cacheAccount.token;
                                    loginStateUtils.setAccount(res);
                                    container.set('subTitle', newName || '');
                                    tipUtils.info('保存成功');
                                    container.editPersonalInfoDialog.destroy();
                                }
                            });
                            container.editPersonalInfoDialog.show();
                        });
                }
            }));
            container.addTooltipDialogMenuItem(new MenuItem({
                label: '修改密码',
                onClick: function () {
                    var modifyPasswordFormDialog = new ModifyPasswordFormDialog();
                    modifyPasswordFormDialog.show();
                }
            }));

            container.addTooltipDialogMenuItem(new MenuItem({
                label: '退出',
                onClick: function () {
                    loginStateUtils.logout();
                    identityHttpService.logout();
                    viewRouter.go(appConfig.loginPath);
                }
            }));
        },
        _createLeftMenuTree: function () {
            var me = this;
            applicationHttpService.getMenus().success(function (res) {
                var accordionContainer = treeUtils.convertTreeDataToAccordionContainer({
                    data: res,
                    rootId: null,

                    parentIdFieldName: 'parentId',
                    idFieldName: 'id',
                    orderByFieldName: 'sort',
                    textFieldName: 'name',
                    treeRowClass: 'pointer',
                    treeOnClick: function (item, node, event) {
                        me.treeOnClick.apply(me, arguments);
                    },
                    treeOpt: {
                        isShowLeafIcon: false,
                    }
                });
                me.container.left.accordionContainer = accordionContainer;
                me.container.left.addChild(accordionContainer);
                accordionContainer.resize();
                accordionContainer.selectChild(null);
            });
        },
        setMainByPane: function (pane, route) {
            var me = this;
            var list = me.container.main.getChildren();
            for (var i in list) {
                var item = list[i];
                item.destroy();
                delete item;
            }
            me.container.main.addChild(pane);
            if (route && !me.isFirstLoad) {
                me.isFirstLoad = true;
                var accordionContainer = me.container.left.accordionContainer;
                array.forEach(accordionContainer.getChildren(), function (pane) {
                    var tree = pane.getChildren()[0];
                    array.forEach(tree.model.store.data, function (data) {
                        var routePane = route.params;
                        var dataRouteParam = hashUtils.getParams('&pane=' + data.url);
                        var isSelect = true;
                        for (var routePanePro in routePane) {
                            var routePaneProValue = routePane[routePanePro];
                            var dataRouteParamProValue = dataRouteParam[routePanePro];
                            if (!(dataRouteParamProValue && routePaneProValue && routePaneProValue === dataRouteParamProValue)) {
                                isSelect = false;
                                break;
                            }
                        }
                        if (isSelect) {
                            accordionContainer.selectChild(pane);
                            var node = tree.getNodesByItem(data.id)
                            tree.dndController.setSelection(node);
                        }
                    });
                });
            }
            pane.resize();
        },
        destroy: function () {
            var me = this;
            me.container.destroy();
            me.viewPartialRouter.destroy();
            me.lockDeskLoginConfirmDialog && me.lockDeskLoginConfirmDialog.destroy();
            delete me.lockDeskLoginConfirmDialog;
            delete me.container;
            delete me.viewPartialRouter;
            this.inherited(arguments);
        }
    });
});