/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/button/SaveButton
 */
define([
    "zh/widget/button/SubmitButton",
    "dojo/_base/declare",
    'dojo/json',
], function (SubmitButton, declare, json) {
    return declare([SubmitButton], {
        label: '保存',
        form: null
    });
});