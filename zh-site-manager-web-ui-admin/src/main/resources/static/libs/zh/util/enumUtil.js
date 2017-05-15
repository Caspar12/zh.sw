/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/util/enumUtil
 */
define([
    'zh/core',
    'zh/util/stringUtils',
], function (zh, stringUtils) {
    var enumUtil = {
        getEnumByProperty: function (enumClass, proName, value) {
            for (var name in enumClass) {
                var enumValue = enumClass[name];
                if (enumValue[proName] === value) {
                    return enumValue;
                }
            }
            return null;
        }
    };
    return enumUtil;
});