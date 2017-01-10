/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/pageTransitionsUtil
 */
define([
    'zh/widget/pagetransitions/svgloader/SvgLoader',
], function (SvgLoader) {
    var svgLoader = new SvgLoader();
    return {
        _pageTran: svgLoader,
        show: function () {
            this._pageTran.show();
        },
        hide: function () {
            this._pageTran.hide();
        }
    }
});