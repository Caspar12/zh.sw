/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/uiUtils
 */
define([
    'admin/util/pageTransitionsUtils',
    'dmin/module/config',
    'dojo/dojo',
], function (pageTransitionsUtils, config, dojo) {
    var circleLoading = new CircleLoading();
    return {
        pageTransitionsUtils: pageTransitionsUtils,
        _showCount: 0,
        /**
         * show loading animate
         * @param timeout  - set timeout auto hide ,-1 never auto hide
         */
        showLoading: function (options) {
            var me = this;
            if (me._showCount < 0) {
                me._showCount = 0;
            }
            me._showCount++;
            options = dojo.delegate({
                timeout: config.defaultShowLoadingAnimateTimeout
            }, options);
            pageTransitionsUtils.show();
            if (options.timeout !== -1) {
                setTimeout(function () {
                    me.hideLoading();
                }, options.timeout);
            }
        },
        hideLoading: function () {
            this._showCount--;
            if (this._showCount <= 0) {
                this._showCount = 0;
                pageTransitionsUtils.hide();
            }
        }
    }
});