/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/text/CascadeComboBox
 */
define([
    'zh/widget/text/ComboBox',
    'zh/widget/text/_TextBoxMixin',
    'zh/util/dojoUtils',
    'zh/core',
    'zh/util/linq',
    'zh/util/stringUtils',
    'dijit/registry',
    'dojo/on',
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/declare",
], function (ComboBox, _TextBoxMixin, dojoUtils, zh, linq, stringUtils, registry, on, lang, array, declare) {
    return declare('zh/widget/text/CascadeComboBox', [ComboBox, _TextBoxMixin], {
        /**
         * {object|string} 上级ComboBox对象或者对应的Id
         */
        parentComboBox: undefined,
        /**
         * {string} 关联的父属性名称
         */
        parentComboBoxDataAttr: undefined,
        /**
         * {string} 关联的属性名称
         */
        dataAttr: undefined,
        /**
         * {string} 比较关联对象是否相等属性,默认等于dataAttr
         */
        equalDataAttr: undefined,
        postCreate: function () {
            var me = this;
            if (!me.equalDataAttr) me.equalDataAttr = me.dataAttr;
            me.inherited(arguments);
            this.store._srcData = this.store.data;
            if (me.parentComboBox) {
                if (zh.isString(me.parentComboBox)) {
                    var comboBox = registry.byId(me.parentComboBox);
                    if (comboBox == null) {
                        throw new Error('查找parentComboBox【' + me.parentComboBox + '】对象失败');
                    }
                    me.parentComboBox = comboBox;
                }
                me.parentComboBox = dojoUtils.create(me.parentComboBox);
                me._setStoreDataByParentComboBox();
                on(me.parentComboBox, 'Change', function () {
                    me._changeOnParentChange();
                });
            }
        },
        loadAndOpenDropDown: function () {
            this._changeOnParentChange();
            this.inherited(arguments);
        },
        _chanageStoreDataByParentComboBox: function () {
            var me = this;
            var parentItem = me.parentComboBox.get('item');
            var parentValueId = parentItem ? parentItem[me.parentComboBoxDataAttr] : undefined;
            if (!this.store._srcData) return;
            if (!zh.isUndefined(parentValueId) && stringUtils.isBlank(parentValueId)) parentValueId = "''";
            var where = lang.replace('$.{dataAttr}=={parentValueId}', {
                dataAttr: me.dataAttr,
                parentValueId: parentValueId,
            });
            var newData = linq.From(this.store._srcData).Where(where).ToArray();
            newData = linq.From(this.store._srcData).Where(function (item) {
                return item[me.dataAttr] === parentValueId;
            }).ToArray();
            this.store.setData(newData);
        },
        _setStoreDataByParentComboBox: function () {
            var me = this;
            me._chanageStoreDataByParentComboBox();
            var newData = this.store.data;
            var parentItem = me.parentComboBox.get('item');
            if (parentItem) {
                var currentItem = this.get('item');
                if (newData && newData.length > 0) {
                    var currentItemDataAttrValue = currentItem ? currentItem[me.equalDataAttr] : undefined;
                    var where = lang.replace('$.{equalDataAttr}=={currentItemDataAttrValue}', {
                        equalDataAttr: me.equalDataAttr,
                        currentItemDataAttrValue: currentItemDataAttrValue,
                    });
                    if (linq.From(newData).Where(where).Count() === 0) {
                        this.set('value', '');
                    }
                } else {
                    this.set('value', '');
                }
            }
        },
        _changeOnParentChange: function () {
            this._setStoreDataByParentComboBox();
        }
    });
});