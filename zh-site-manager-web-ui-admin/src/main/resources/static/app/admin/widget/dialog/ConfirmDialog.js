/**
 * Created by 陈志杭 on 2016/12/27.
 * @description
 * @file admin/widget/dialog/ConfirmDialog
 */
define([
    'zh/widget/dialog/ConfirmDialog',
    'admin/util/request',
    "dojo/_base/declare",
], function (ConfirmDialog, request, declare) {

    return declare(ConfirmDialog, {
        isAjax: true,
        request: request,
        /**
         * 是否在隐藏之后,自动销毁窗体
         */
        isAutoDestroyOnHideAfter: true,
    });
});