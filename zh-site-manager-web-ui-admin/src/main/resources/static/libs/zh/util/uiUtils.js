/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/util/uiUtils
 */
define([
    'zh/core',
    'dojo/dom-geometry',
    'dojo/window',
    'dojo/_base/lang',
    "dojo/dom-style",
], function (zh, domGeometry, winUtils, lang, domStyle) {
    var uiUtils = {
        /**
         * fill childDom dom size to parent dom size
         * @param childDom 容器子对象的dom
         * @param parentDom 容器对象的dom
         * @param {array | object}diffDom 可选 容器子对象的相差对象的dom,
         * @param {number}diffHeight 可选 容器子对象的相差的高度,
         * @param {boolean} isCalcByContentSize 以content box 或 margin box 计算
         * @param isAutoHeight 自动适应父容器对象高度
         * @param isAutoWidth 自动适应父容器对象宽度
         * @param isAutoDifDomHeight 自动适应父容器对象高度,并与diffDom对象高度相差
         * @param isAutoDifDomWidth 自动适应父容器对象宽度,并与diffDom对象宽度相差
         */

        fill: function (options) {
            var opt = lang.mixin({
                childDom: null,
                parentDom: null,
                diffDom: null,
                diffHeight: 0,
                isParentCalcByContentBox: false,
                isChildCalcByContentBox: false,
                isDiffDomCalcByContentBox: false,
                isSetChildCalcByContentBox: false,
                isAutoHeight: true,
                isAutoWidth: true,
                isAutoDifDomHeight: true,
                isAutoDifDomWidth: true
            }, options);

            function getGetBoxMethod(isContentBox) {
                return isContentBox ? domGeometry.getContentBox : domGeometry.getMarginBox;
            }

            function getSetBoxMethod(isContentBox) {
                return isContentBox ? domGeometry.setContentSize : domGeometry.setMarginBox;
            }

            var parentGetBoxMethod = getGetBoxMethod(opt.isParentCalcByContentBox);
            var diffDomGetBoxMethod = getGetBoxMethod(opt.isDiffDomCalcByContentBox);
            var childGetBoxMethod = getGetBoxMethod(opt.isChildCalcByContentBox);
            var childSetBoxMethod = getSetBoxMethod(opt.isSetChildCalcByContentBox);
            opt.diffDoms = zh.toArray(opt.diffDom);
            var parentBox = opt.parentDom === document.body ? parentGetBoxMethod(document.body) : parentGetBoxMethod(opt.parentDom);
            var childBox = childGetBoxMethod(opt.childDom);
            if (opt.isAutoHeight) {
                childBox.h = parentBox.h;
            }
            if (opt.isAutoWidth) {
                childBox.w = parentBox.w;
            }
            for (var i in opt.diffDoms) {
                var diffDom = opt.diffDoms[i];
                var diffDomBox = diffDomGetBoxMethod(diffDom);
                if (opt.isAutoDifDomHeight) {
                    childBox.h = childBox.h - diffDomBox.h;
                }
                if (opt.isAutoDifDomWidth) {
                    childBox.w = childBox.w - diffDomBox.w;
                }
            }
            if (opt.isAutoHeight === false) {
                delete childBox.h;
            }
            if (opt.isAutoWidth === false) {
                delete  childBox.w;
            }
            delete childBox.l;
            delete childBox.t;
            if (opt.diffHeight && !isNaN(opt.diffHeight) && opt.diffHeight > 0 && childBox.h && (childBox.h - opt.diffHeight)) {
                childBox.h = childBox.h - opt.diffHeight;
            }
            childSetBoxMethod(opt.childDom, childBox);
            return {
                width: childBox.w,
                height: childBox.h
            };
        },
        autoHeightDiffs: function (options) {
            options = lang.mixin({
                targetDom: {},
                totalHeight: 0,
                diffDoms: []
            }, options);
            var targetDom = options.target;
            var totalHeight = parseInt(options.totalHeight);
            var diffDoms = options.diffDoms;
            var restHeight = totalHeight;
            for (var i in diffDoms) {
                var diffDom = diffDoms[i];
                var diffDomBox = domGeometry.getMarginBox(diffDom);
                restHeight = restHeight - diffDomBox.h;
            }
            if (restHeight <= 0) {
                restHeight = 200;
            }
            domStyle.set(targetDom, {
                height: restHeight + 'px'
            });
        }
    };
    zh.uiUtils = uiUtils;
    return uiUtils;
});
