/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "zh/widget/button/SubmitButton",
    'dojo/json',
    "dojo/_base/declare",

], function (Button, json, declare) {
    return declare([Button], {
        label: '登录',
        form: null,
    });
});