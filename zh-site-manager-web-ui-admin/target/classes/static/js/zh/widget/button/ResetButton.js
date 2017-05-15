/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "zh/widget/button/Button",
    "dojo/_base/declare",
], function (Button, declare) {
    return declare([Button], {
        label: '重置',
        form: null,
        onClick:function () {
            var me = this;
            var form = me.findParentForm();
            if(form){
                form.reset();
            }
        }
    });
});