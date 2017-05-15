/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @fiel zh/util/coreUtils
 */
define([
    'zh/util/stringUtils',
], function (stringUtils) {
    return {
        /**
         * 从对象中抽取prefix前缀的属性
         * @param obj 对象
         * @param prefix 属性前缀
         */
        extractPropertiesStartWith: function (opt) {
            var obj = opt.obj;
            var prefix = opt.prefix
            var option = {};
            for (var proName in  obj) {
                if (stringUtils.startWith(proName, prefix)) {
                    var pro = obj[proName];
                    var newProName = proName.replace(prefix, '');
                    option[newProName] = pro;
                }
            }
            return option;
        }
    };
});