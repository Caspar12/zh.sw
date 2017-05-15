/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description normal application layout border container
 * @file zh/widget/layout/TabBorderContainer
 */
define([
    'zh/widget/layout/BaseBorderContainer',
    'zh/widget/layout/TabContainer',
    'zh/widget/layout/ContentPane',
    "dojo/_base/declare",
], function (BorderContainer, TabContainer, ContentPane, declare) {
    return declare([BorderContainer], {

        _createMainContainer: function () {
            var tabContainer = new TabContainer({
                region: 'center',
                isLayoutContainer: true,
                tabStrip: true
            });
            var i = 0;
            while (i < 10) {
                var tab1 = new ContentPane({
                    title: "hello world tab" + i,
                    content: "hello world tab" + i
                });
                tabContainer.addChild(tab1);
                i++;
            }
            var mainContainer = tabContainer;
            this.main = mainContainer;
            return mainContainer;
        }
    });
});