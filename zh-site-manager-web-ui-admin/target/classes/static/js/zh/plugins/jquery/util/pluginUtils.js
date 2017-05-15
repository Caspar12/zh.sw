/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/jquery/util/pluginUtils
 */
define([
    'jquery',
    'zh/core',
    'dojo/_base/lang',
    'zh/util/dojoUtils',
    'dojo/on',
    "dojo/_base/declare",
], function ($, zh, lang, dojoUtils, on, declare) {
    var pluginUtils = {
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
        mapEventWidgetToPlugin: function (option) {
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
                        if (zh.isFunction(value)) {
                            option.to.on(toProName, function () {
                                value(arguments);
                            });
                        }
                        else {
                            lang.setObject(toProName, value, result);
                        }
                    }
                }
            }
            return result;
        }
    };
    return pluginUtils;
});