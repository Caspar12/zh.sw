/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/button/SubmitButton
 */
define([
    "zh/widget/button/Button",
    "dojo/_base/declare",
    'dojo/json',
], function (Button, declare, json) {
    return declare([Button], {
        label: '提交',
        form: null,
        class: 'alt-primary',
        type: 'submit',
        onClick: function () {
            var me = this;
            var form = me.findParentForm();
            if (form) {
                form.submit();
            }
        }
    });
});