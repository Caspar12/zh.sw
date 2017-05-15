/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file admin/view-partial/main/region/widget/form/text/AreaComboBox
 */
define([
    //'zh/widget/text/ComboBox',
    //'dijit/form/ComboBox',
    'zh/widget/text/CascadeComboBox',
    "dojo/store/Memory",
    'admin/services/data/region/areas',
    'dojo/_base/lang',
    'dojo/string',
    "dojo/_base/declare",
], function (ComboBox, Memory, areas, lang, dojoStringUtils, declare) {

    return declare('admin/view-partial/main/region/widget/form/text/AreaComboBox', [ComboBox], {
        name: "receviceAreaName",
        nameId: 'receviceAreaCode',
        searchAttr: "name",
        labelAttr: 'name',
        idAttr: 'code',
        label: '收货县区',
        placeHolder: '收货县区',
        parentComboBoxDataAttr: 'code',
        dataAttr: 'parentCode',
        //equalDataAttr: 'id',
        postMixInProperties: function () {
            var memory = new Memory({
                data: lang.clone(areas),
                idProperty: 'code',
            });
            this.store = memory;
            this.inherited(arguments);

        }
    });
});