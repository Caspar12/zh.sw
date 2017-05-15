/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/widget/module/account/dialog/EditPersonalInfoDialog
 */
define([
    'admin/widget/dialog/ConfirmDialog',
    'admin/widget/module/account/form/edit/NameText',
    'admin/api/orderHttpService',
    'admin/api/apiConfig',
    'zh/core',
    'admin/util/request',
    'dojo/_base/array',
    'zh/util/datetimeUtils',
    "dojo/_base/declare",
    'dojo/_base/lang',
    'admin/util/bizTipUtils',
    'dojo/dom-form',
], function (ConfirmDialog, NameText, orderHttpService, apiConfig, zh, request, array, datetimeUtils, declare, lang, domForm) {

    return declare('admin/widget/module/account/dialog/EditPersonalInfoDialog', [ConfirmDialog], {
        action: apiConfig.admin.account.editPersonalInfo,
        request: request,
        title: '个人信息',
        isHorizontalLayout: false,
        data: undefined,
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
        postCreate: function () {
            this.inherited(arguments);
            this.addItem(
                (
                    this.nameText = new NameText({
                        labelStyle: 'width:100px;',
                        style: 'width:200px;'
                    })
                )
            );
        },
        startup: function () {
            this.inherited(arguments);
            if (this.data) {
                this.set('value', this.data);
            }
        },
    });
});