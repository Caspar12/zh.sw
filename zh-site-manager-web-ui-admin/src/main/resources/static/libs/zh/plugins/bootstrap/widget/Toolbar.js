/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/bootstrap/widget/Toolbar
 */
define([
    'zh/widget/Toolbar',
    "dojo/_base/declare",
], function (Toolbar, declare) {
    return declare('zh/plugins/bootstrap/widget/Toolbar', [Toolbar], {
        class: 'single',
    });
});