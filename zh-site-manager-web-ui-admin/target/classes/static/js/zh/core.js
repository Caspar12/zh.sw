/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/core
 */
define([], function () {
    var zh = {
        isUndefined: function (value) {
            return typeof(value) === 'undefined';
        },
        isEmptyObject: function (value) {
            return this.isUndefined(value) || value === null;
        },
        isNotEmptyObject: function (value) {
            return !this.isEmptyObject(value);
        },
        isString: function (value) {
            return (typeof value == "string" || value instanceof String);
        },
        createUUID: function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";

            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },
        emptyUUID: function () {
            return '00000000-0000-0000-0000-000000000000';
        },
        isObject: function (it) {
            return !zh.isEmptyObject(it) && ( typeof it === "object");
        },
        isFunction: function (it) {
            return typeof  it === 'function';
        },
        isArray: function (value) {
            return Array.isArray(value);
        },
        isEmptyArray: function (value) {
            return this.isArray(value) && value.length === 0;
        },
        isNotEmptyArray: function (value) {
            return this.isArray(value) && value.length > 0;
        },
        toArray: function (value) {
            var arr = [];
            if (zh.isEmptyObject(value)) return arr;
            if (zh.isArray(value)) {
                return value;
            }
            else {
                arr.push(value);
                return arr;
            }
        },
        /**
         * 生成闭包函数
         * @param fnArray {funcation array}函数数组
         * @param args {arguments} 与arguments对象合并的参数
         */
        closure: function (fnArray, args) {
            return function () {
                fnArray = zh.toArray(fnArray);
                args = zh.toArray(args);
                args = args.concat(arguments);
                for (var i in fnArray) {
                    var fn = fnArray[i];
                    fn && fn.apply(this, args);
                }
            };
        },
        thread: {
            sleep: function (milliseconds) {
                var start = new Date().getTime();
                while (true) {
                    var end = new Date().getTime();
                    if ((end - start) > milliseconds) {
                        break;
                    }
                }
            }
        }
    };
    return zh;
});