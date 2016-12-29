/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "widget/button/Button",
    "dojo/_base/declare",
], function (Button, declare) {
    return declare([Button], {
        label: '取消',
        form: null,
    });
});