/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/bootstrap/widget/form/search/SearchContainer
 */
define([
    'zh/widget/_base/_WidgetBase',
    'zh/plugins/bootstrap/widget/form/FormInline',
    'zh/plugins/bootstrap/widget/layout/FormInlineFormGroup',
    'zh/core',
    'zh/widget/_base/_Container',
    'zh/widget/button/ResetButton',
    'zh/widget/button/SubmitButton',
    'zh/widget/button/Button',
    'dojo/_base/lang',
    'dojo/on',
    'zh/widget/layout/TitlePane',
    "dojo/_base/array",
    'zh/util/dojoUtils',
    "dojo/_base/declare"
], function (_WidgetBase, Form, FormInlineFormGroup, zh, _Container, ResetButton, SubmitButton, Button,
             lang, on, TitlePane, array, dojoUtils, declare) {
    return declare('zh/plugins/bootstrap/widget/form/search/SearchContainer', [_WidgetBase, _Container], {
        class: 'titleSearchContainer',
        /**
         * 更多 特性是否开启
         */
        isMoreFeatureEnabled: false,
        onSubmit: function () {
            return false;
        },
        searchButtonClass: 'searchSubmitButton',
        searchSubmitButtonClass: 'alt-primary',
        getData: function () {
            var form = this.form;
            var params = form.get('value');
            params = lang.mixin(this.extraParam, params);
            return params;
        },
        /**
         * {object} 扩展参数
         */
        extraParam: undefined,
        inputStyle: undefined,
        labelStyle: undefined,
        filters: [],
        postCreate: function () {
            var me = this;
            this.inherited(arguments);
            this.form = new Form({
                onSubmit: function () {
                    return false;
                }
            });
            var newFilters = [];
            array.forEach(me.filters, function (filter) {
                if (!filter.style) {
                    filter.style = {width: '200px'};
                }
                if (!filter.labelStyle) {
                    filter.labelStyle = {width: '100px'};
                }
                var newFilter = dojoUtils.create(filter);

                newFilters.push(newFilter);
                me.addItem(newFilter);
            });
            this.filters = newFilters;
            array.forEach(this.filters, function (filter) {
                if (me._isMoreFilter(filter)) {
                    var parent = filter.getParent();
                    parent.hide();
                }
            });
            var btnSubmit = new SubmitButton({
                class: me.searchButtonClass + ' ' + me.searchSubmitButtonClass,
                label: '搜索',
                onClick: function () {
                    on.emit(me, 'Submit', me.getData());
                }
            });
            var btnReset = new ResetButton({
                class: me.searchButtonClass
            });
            var moreButton = this.moreButton = new Button({
                label: '更多',
                closedLabel: '更多',
                openedLabel: '收起',
                class: me.searchButtonClass,
                isOpen: false,
                postMiXinProperties: function () {
                    this.closedLabel = this.label;
                    this.inherited(arguments);
                },
                onClick: function () {
                    var moreButton = this;
                    moreButton.set('label', moreButton.isOpen ? moreButton.closedLabel : moreButton.openedLabel);
                    array.forEach(me.filters, function (filter) {
                        if (me._isMoreFilter(filter)) {
                            if (moreButton.isOpen) {
                                filter.getParent().hide();
                                on.emit(me, 'ShowAfter');
                                on.emit(me, 'HideAfter');
                            } else {
                                filter.getParent().show();
                                on.emit(me, 'ShowAfter');
                                on.emit(me, 'HideAfter');
                            }
                        }
                    });
                    moreButton.isOpen = !moreButton.isOpen;
                }
            });

            this._hideMoreButtonByEmptyFilterOrIsMoreFeatureEnabledFalse();
            var formGroup = new FormInlineFormGroup({});
            formGroup.addItem(btnSubmit);
            formGroup.addItem(moreButton);
            formGroup.addItem(btnReset);

            this.form.addItem(formGroup);
            var titlePane = new TitlePane({
                title: '搜索条件',
            });
            titlePane.on('ShowAfter', function () {
                on.emit(me, 'ShowAfter');
            });
            titlePane.on('HideAfter', function () {
                on.emit(me, 'HideAfter');
            });
            titlePane.addChild(this.form);
            this.addChild(titlePane);


        },
        _hideMoreButtonByEmptyFilterOrIsMoreFeatureEnabledFalse: function () {
            var me = this;
            if (me.isMoreFeatureEnabled) {
                me.moreButton.show();
                var isEmpty = true;
                array.forEach(this.filters, function (filter) {
                    if (me._isMoreFilter(filter)) {
                        isEmpty = false;
                    }
                });
                if (isEmpty === true) this.moreButton.hide();
            } else {
                me.moreButton.hide();
            }
        },
        _isMoreFilter: function (filter) {
            return filter.isMoreFilter && filter.isMoreFilter === true;
        },
        onShowAfter: function () {

        },
        onHideAfter: function () {

        },
        destroy: function () {
            this.inherited(arguments);
        },
        addItem: function (item) {
            this.form.addItem(item);
        }
    });
});