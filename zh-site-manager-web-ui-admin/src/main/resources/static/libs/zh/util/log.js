/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([], function () {
    var appConfig = window.appConfig || {};
    var logConfig = appConfig.logConfig ||
        {
            isInfoEnabled: true,
            isDebugEnabled: true,
            isErrorEnabled: true,
            isWarnEnabled: true,
            isTraceEnabled:true
        };
    return {
        info: function (msg) {
            if (this.config.isInfoEnabled)
                console.info(msg);
        },
        error: function (msg) {
            if (this.config.isErrorEnabled)
                console.error(msg);
        },
        debug: function (msg) {
            if (this.config.isDebugEnabled)
                console.debug(msg);
        },
        warn: function (msg) {
            if (this.config.isWarnEnabled)
                console.warn(msg);
        },
        trace:function (msg) {
            if (this.config.isTraceEnabled)
                console.trace(msg);
        },
        config: logConfig
    };
});