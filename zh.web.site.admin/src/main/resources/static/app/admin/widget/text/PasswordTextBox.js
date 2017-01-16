/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/widget/text/PasswordTextBox
 */
define([
    'zh/widget/text/PasswordTextBox',
    'dojo/_base/lang',
    "dojo/_base/declare",
], function (TextBox, lang, declare) {
    return declare([TextBox], {
        required: true,
        validator: function (value, constraints) {
            var min = lang.getObject('min', false, constraints) || 6;
            var max = lang.getObject('max', false, constraints) || 36;
            if (this._isEmpty(value)) {
                return false;
            }
            if (value.length < min || value.length > max) {
                return false
            }
            return true;
        }

    });
});