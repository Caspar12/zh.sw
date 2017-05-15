/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/util/stringUtils
 */
define([
    'zh/core'
], function (zh) {
    var stringUtils = {
        isEqualsIgnoreCase: function (str1, str2) {
            if (zh.isEmptyObject(str1) || zh.isEmptyObject(str2)) return false;

            return str1.toUpperCase() === str2.toUpperCase();
        },
        isEmpty: function (value) {
            return zh.isEmptyObject(value) || value === '';
        },
        isNotEmpty: function (value) {
            return !this.isEmpty(value);
        },
        isBlank: function (value) {
            return this.isEmpty(value) || !value.trim || value.trim() === '';
        },
        isNotBlank: function (value) {
            return !this.isBlank(value);
        },
        replace: function (template, arrayOrObj) {

            var mergeObj = {};
            if (zh.isArray(arrayOrObj)) {
                for (var i in arrayOrObj) {
                    mergeObj[i] = arrayOrObj[i];
                }
            } else {
                mergeObj = arrayOrObj;
            }
            var newTemplate = template;
            for (var proName in mergeObj) {
                var proValue = mergeObj[proName];
                newTemplate = newTemplate.replace('\{' + proName + '\}', proValue);
            }
            return newTemplate;
        },
        startWith: function (str, startWidth) {
            var reg = new RegExp("^" + startWidth);
            return reg.test(str);
        },
        endWith: function (str, endWith) {
            var reg = new RegExp(endWith + "$");
            return reg.test(str);
        },
        concatByChar: function (str1, str2, concatChar) {
            str1 = str1 || '';
            str2 = str2 || '';
            if (str1[str1.length - 1] !== concatChar) {
                str1 = str1 + concatChar;
            }
            if (str2[0] === concatChar) {
                str2 = str2.substr(1);
            }
            return str1 + str2;
        }
    };
    zh.stringUtils = stringUtils;
    return stringUtils;
});