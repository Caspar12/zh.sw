/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description normal application layout border container
 * @file zh/widget/layout/MainBorderContainer
 */
define([
    'zh/widget/layout/BaseBorderContainer',
    'zh/widget/layout/ContentPane',
    "dojo/_base/declare",
], function (BorderContainer,  ContentPane, declare) {
    return declare([BorderContainer], {


        _createMainContainer: function () {
            var mainContainer = new ContentPane({
                region: 'center',

                isLayoutContainer: true,
            });
            this.main = mainContainer;
            return mainContainer;
        }
    });
});