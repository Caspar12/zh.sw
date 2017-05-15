/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/widget/SearchContainer
 */
define([
    'zh/plugins/bootstrap/widget/form/search/SearchContainer',
    "dojo/_base/declare",
], function (SearchContainer, declare) {
    return declare('admin/widget/Toolbar', [SearchContainer], {});
});