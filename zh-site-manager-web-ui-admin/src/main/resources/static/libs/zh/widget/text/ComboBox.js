/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/ComboBox
 */
define([
    'zh/widget/text/HiddenTextBox',
    'dijit/form/ComboBox',
    'dojo-ext/dijit/form/_ComboBoxMenu',
    'zh/widget/text/_TextBoxMixin',
    "dojo/_base/declare",
], function (HiddenTextBox, ComboBox, _ComboBoxMenu, _TextBoxMixin, declare) {
    return declare('zh/widget/text/TextBox', [ComboBox, _TextBoxMixin], {
        class: 'adapteTextAutoWidth',
        name: undefined,
        /**
         * {widget | string} 设置Id的Widget对象,或者字符串名称
         */
        nameId: undefined,
        value: undefined,
        store: [],
        searchAttr: "name",
        autoWidth: true,
        forceWidth: false,
        maxHeight: -1,
        labelAttr: 'name',
        idAttr: 'id',
        _isStartup: false,
        postCreate: function () {
            var me = this;
            me.inherited(arguments);

        },

        startup: function () {
            var me = this;
            me.inherited(arguments);
            if (me.name && me.nameId) {
                if (me.nameId.set) {
                    this.idWidget = this.nameId;
                } else {
                    if (!this.idWidget) {
                        this.idWidget = new HiddenTextBox({
                            name: me.nameId
                        });
                    }
                    me.idWidget.placeAt(me.domNode, 'after');
                }
            }
            me._isStartup = true;
        },
        _setValueIdAttr: function (value) {
            if (this.idWidget) {
                var item = this.store.get(value);
                if (item) {
                    this.set('item', item);

                } else {
                    this.set('value', value);
                }
            }
        },
        _getItemAttr: function () {
            if (this.idWidget) {
                return this.store.get(this.get('valueId'));
            }
        },
        _getValueIdAttr: function () {
            if (this.idWidget) {
                return this.idWidget.get('value');
            }
            return '';
        },

        _setValueAttr: function () {
            this.inherited(arguments);
            if (this.idWidget) {
                if (this.item) {
                    this.idWidget.set('value', this.item[this.idAttr]);
                }
                else {
                    this.idWidget.set('value', '');
                }
            }
        },
    });
});