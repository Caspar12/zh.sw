/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/view-partial/main/region/widget/form/text/ProvinceComboBox
 */
define([
    'zh/widget/text/ComboBox',
    //'dijit/form/ComboBox',
    "dojo/store/Memory",
    'admin/services/data/region/provinces',
    'dojo/_base/lang',
    'dojo/string',
    "dojo/_base/declare",
], function (ComboBox, Memory, provinces, lang, dojoStringUtils, declare) {

    return declare('admin/view-partial/main/region/widget/form/text/ProvinceComboBox', [ComboBox], {
        name: "receviceProvinceName",
        nameId: 'receviceProvinceCode',
        searchAttr: "name",
        labelAttr: 'name',
        idAttr:'code',
        label: '收货省份',
        placeHolder: '收货省份',

        postMixInProperties: function () {
            var memory = new Memory({
                data: lang.clone(provinces),
                idProperty:'code',
            });
            this.store = memory;
            this.inherited(arguments);

        }
    });
});