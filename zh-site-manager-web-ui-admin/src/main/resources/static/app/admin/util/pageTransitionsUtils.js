/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/pageTransitionsUtils
 */
define([
    //'zh/widget/pagetransitions/svgloader/SvgLoader',
    'zh/widget/loading/circle/CircleLoading',
], function (CircleLoading) {
    var circleLoading = new CircleLoading();
    return {
        _pageTran: circleLoading,
        show: function (callback) {
            this._pageTran.show(callback);
        },
        hide: function (callback) {
            this._pageTran.hide(callback);
        }
    }
});