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
        label: '提交',
        form: null,
        class: 'alt-primary',
        onClick: function () {
            var me = this;
            var form = me.findParentForm();
            if (form) {
                if (form.isValid()) {
                    var r = json.stringify(form.getValues());
                    alert(r);
                }
            }
        }
    });
});