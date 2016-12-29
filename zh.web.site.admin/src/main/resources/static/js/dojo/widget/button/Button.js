/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "dijit/form/Button",
    "dijit/form/Form",
    "dojo/_base/declare",
], function (Button, Form, declare) {
    return declare([Button], {
        form: null,
        findParentForm: function () {
            var me = this;
            var parent = me.getParent();
            while (parent != null) {
                if (parent.isInstanceOf(Form)) {
                    return parent;
                }
                parent = parent.getParent();
            }
            return null;
        }
    });
});