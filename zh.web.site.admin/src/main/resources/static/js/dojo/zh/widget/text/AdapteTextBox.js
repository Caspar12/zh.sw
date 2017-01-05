/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "zh/widget/text/TextBox",
    "dojo/_base/declare",
], function (TextBox,declare) {
    return declare([TextBox], {
        class: 'adapteTextAutoWidth'
    });
});