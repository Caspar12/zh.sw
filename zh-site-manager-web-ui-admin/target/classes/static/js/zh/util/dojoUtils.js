/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description zh/util/dojoUtils
 */
define([
    'dojo/_base/lang',
    "dijit/_WidgetBase",
    'dijit/form/_FormValueWidget',
    'dijit/form/_CheckBoxMixin',
    'zh/core',
], function (lang, _WidgetBase, _FormValueWidget, _CheckBoxMixin, zh) {
    var dojoUtils =
    {
        create: function (opts) {
            if (this.isInstanceFrom(opts, _WidgetBase)) {
                return opts;
            }
            if (opts && !opts.ztype && opts.prototype && opts.prototype.declaredClass) {
                opts.ztype = opts.prototype.declaredClass;
            }
            var constructor = require(opts.ztype);
            var instance = new constructor(opts);
            if (opts.items && zh.isArray(opts.items) && instance.addItems) {
                instance.addItems(opts.items);
            }
            return instance;
        },
        /**
         *
         * @param instance dojo 实例
         * @param fromClass dojo 实例类型
         * @return true or false
         */
        isInstanceFrom: function (instance, fromClass) {
            return instance && instance.isInstanceOf && instance.isInstanceOf(fromClass);
        },
        isInstanceFromValueWidget: function (instance) {
            return dojoUtils.isInstanceFrom(instance, _FormValueWidget) || dojoUtils.isInstanceFrom(instance, _CheckBoxMixin);
        },
        /**
         *
         * @param option
         * {
         *    from:{object} 准备被映射的对象
         *    paths:[
         *      {
         *          from:{string} 被映射对象属性路径
         *          to:{string} 映射对象属性路径,
         *          processingValue:{function}
         *          isContinue:{function} 是否映射该属性自定义函数,参数
         *              {
         *                  fromObj:{object} option.from 准备被映射的对象
         *                  from:{string} 被映射对象属性路径
         *                  to:{string} 映射对象属性路径,
         *              }
         *      }
         *    ]
         * }
         * @return {object} new 映射对象
         */
        mapFromObjectToNew: function (option) {
            option = lang.mixin({
                from: {},
                to: option.to || {},
                paths: []
            }, option);
            return this.mapFromObjectTo(option);
        },
        /**
         *
         * @param option
         * {
         *    from:{object} 准备被映射的对象
         *    paths:[
         *      {
         *          from:{string} 被映射对象属性路径
         *          to:{string} 映射对象属性路径,
         *          processingValue:{function}
         *          isContinue:{function} 是否映射该属性自定义函数,参数
         *              {
         *                  fromObj:{object} option.from 准备被映射的对象
         *                  from:{string} 被映射对象属性路径
         *                  to:{string} 映射对象属性路径,
         *              }
         *      }
         *    ]
         * }
         * @return {object} new 映射对象
         */
        mapFromObjectTo: function (option) {
            option = lang.mixin({
                from: {},
                to: {},
                paths: []
            }, option);
            var result = option.to;
            for (var i in option.paths) {
                var path = option.paths[i];
                var fromProName = path.from;
                var toProName = path.to;
                var isContinue = path.isContinue;
                var processingValue = path.processingValue;
                var fromValue = lang.getObject(fromProName, false, option.from);
                if (zh.isUndefined(fromValue)) continue;

                if (zh.isEmptyObject(isContinue) ||
                    isContinue.apply(option.from, [{
                            fromObj: option.from, from: fromProName, to: toProName
                        }]
                    )
                ) {
                    var value = fromValue;
                    if (zh.isEmptyObject(processingValue) === false) {
                        value = processingValue.apply(option.from, [
                            fromValue, fromProName, toProName, option.from, fromProName
                        ]);
                    }
                    if (zh.isFunction(value)) {
                        var oldValue = value;
                        value = function (oldValue) {
                            return function () {
                                return oldValue.apply(option.from, arguments);
                            }
                        }(oldValue);
                    }
                    if (zh.isUndefined(value) === false) {
                        lang.setObject(toProName, value, result);
                    }
                }
            }
            return result;
        }
    };
    return dojoUtils;
});