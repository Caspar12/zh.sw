/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/form/FormAjax
 */
define([
    "zh/widget/form/Form",
    "admin/util/request",
    "dojo/_base/declare",
], function (Form, request, declare) {
    return declare('zh/widget/form/FormAjax', [Form], {
        isAjax: true,
    });
});