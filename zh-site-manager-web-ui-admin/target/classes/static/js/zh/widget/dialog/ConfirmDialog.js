/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/widget/dialog/ConfirmDialog
 */
define([
    'dojo-ext/dijit/Dialog',
    "dojo-ext/dijit/ConfirmDialog",
    'zh/plugins/bootstrap/widget/layout/FormInline',
    'dojox/layout/TableContainer',
    'zh/core',
    "dojo/request",
    'dojo/_base/lang',
    "dojo/_base/declare",
    'dijit/_Container',
    'zh/util/coreUtils',
    "dojo/on",
    'dojo/dom-class',
], function (ExDialog, ConfirmDialog, FormInline, TableContainer, zh, request, lang, declare, _Container, coreUtils, on, domClass) {
    var containerTablePrefix = 'containerTable_';
    var contructor = declare('zh/widget/dialog/ConfirmDialog', [ConfirmDialog], {
        closable: true,
        draggable: false,
        isAjax: true,
        action: undefined,
        onSuccess: undefined,
        onError: undefined,
        onProcess: undefined,
        isOnShowInvokeReset: true,
        okButtonClass: 'alt-primary',
        isHorizontalLayout: false,
        _container: undefined,
        /**
         * 内含默认排版
         * default,formline
         */
        containerType: 'default',
        containerTablePrefix: containerTablePrefix,
        postMixInProperties: function () {
            this.inherited(arguments);
        },
        postCreate: function () {
            this.inherited(arguments);
            if (this.okButtonClass) domClass.add(this.okButton.domNode, this.okButtonClass);
            if (!this._container) {
                this._createContainer();
            }
            this.meAddChild(this._container);
        },
        _createContainer: function () {
            if (this.containerType === 'formline') {
                this._container = new FormInline({
                    isHorizontalLayout: this.isHorizontalLayout,
                });
            } else {
                var opt = coreUtils.extractPropertiesStartWith({
                    obj:this,
                    prefix: containerTablePrefix
                });
                this._container = new TableContainer(opt);
            }
        },
        meAddChild: function () {
            return _Container.prototype.addChild.apply(this, arguments);
        },
        addChild: function (value) {
            return _Container.prototype.addChild.apply(this, arguments);
        },
        removeChild: function (value) {
            return _Container.prototype.removeChild.apply(this, arguments);
        },
        addItem: function (value) {
            if (this.containerType === 'formline') {
                return this._container.addItem(value);
            } else {
                return this._container.addChild(value);
            }
        },
        _onSuccess: function () {
            this.onSuccess(arguments);
            this.hide();
        },
        execute: function () {
            var me = this;
            if (me.isAjax) {
                me.submitAjax();
            } else {
                if (me.validate()) {
                    if (me.onSuccess) {
                        on.emit(me, 'Success');
                    } else {
                        return me.inherited(arguments);
                    }
                }
            }
        },
        hideCancelButton: function () {
            this.cancelButton.domNode.style.display = 'none';
        },
        showCancelButton: function () {
            this.cancelButton.domNode.style.display = '';
        },
        show: function () {
            this.reset();
            return this.inherited(arguments);
        }
    });

    contructor[containerTablePrefix + 'cols'] = 1;
    contructor[containerTablePrefix + 'labelWidth'] = 150;
    contructor[containerTablePrefix + 'showLabels'] = true;

    return contructor;
});