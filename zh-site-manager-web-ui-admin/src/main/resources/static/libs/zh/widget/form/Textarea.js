/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/form/Textarea
 */
define([
    'dijit/form/Textarea',
    "dojo/_base/declare",
], function (Textarea, declare) {
    return declare('zh/widget/text/Textarea ', [Textarea], {
        isAutoHeight: true,
        resize: function () {
            if (this.isAutoHeight) {
                this.inherited(arguments);
            }
            else {

            }
        }
    });
});