/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/widget/form/Form
 */
define([
    "zh/widget/form/FormAjax",
    "admin/util/request",
    "dojo/_base/declare",
], function (FormAjax, request, declare) {
    return declare('admin/widget/form/Form', [FormAjax], {
        request: request,
    });
});