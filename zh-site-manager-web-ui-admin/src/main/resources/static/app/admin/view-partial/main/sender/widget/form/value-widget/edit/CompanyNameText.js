/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file admin/view-partial/main/sender/widget/form/value-widget/edit/CompanyNameText
 */
define([
    'zh/widget/text/ValidationTextBox',
    "dojo/_base/declare"
], function (TextBox, declare) {
    return declare('admin/view-partial/main/sender/widget/form/value-widget/edit/CompanyNameText', [TextBox], {
        label: '发件公司',
        name: 'companyName',
        placeHolder: '发件公司',
        required: false,

    });
});