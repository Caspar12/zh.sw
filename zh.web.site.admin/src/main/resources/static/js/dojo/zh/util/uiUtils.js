/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    'zh/core',
    'dojo/dom-geometry',
    'dojo/window',
], function (zh, domGeometry,winUtils) {
    var uiUtils = {
        /**
         * fill child dom size to parent dom size
         * @param child dom
         * @param parent dom
         */
        fill: function (child, parent) {
            if (parent) {

                var parentBox =  parent === document.body ? winUtils.getBox() :domGeometry.getMarginBox(parent);
                child.style.width = parentBox.w + 'px';
                child.style.height = parentBox.h + 'px';
            }
        }
    };
    zh.uiUtils = uiUtils;
    return uiUtils;
});