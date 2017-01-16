/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([], function () {
    return {
        info: function (msg) {
            console.info(msg);
        },
        error: function (msg) {
            console.error(msg);
        },
        debug: function (msg) {
            console.debug(msg);
        },
        warn: function (msg) {
            console.warn(msg);
        },
    };
});