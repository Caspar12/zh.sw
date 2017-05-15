/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/util/domUtils
 */
define([
    'jquery',
    'zh/core'
], function ($, zh) {
    return {
        outerHTML: function (selector) {
            return $(selector).clone().wrap('<div>').parent().html();
        },
        getLinkNodes: function () {
            return $('link');
        }
    };

});