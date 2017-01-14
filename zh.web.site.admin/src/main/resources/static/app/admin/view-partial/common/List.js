/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/view-partial/List
 */
define([
    "zh/widget/form/Form",
    "admin/util/request",
    "dojo/_base/declare",
], function (Form, request, declare) {
    return declare([Form], {
        method: 'post',
        request: request,
        requestOptions: {handleAs: 'json'},
    });
});