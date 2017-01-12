/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    'zh/core'
], function (zh) {
    var stringUtils = {
        isEqualsIgnoreCase: function (str1, str2) {
            return (str1 === null && str2 === null) || (zh.isUndefined(str1) && stringUtils.isUndefined(str2)) || str1.toUpperCase() === str2.toUpperCase();
        }
    };
    zh.stringUtils = stringUtils;
    return stringUtils;
});