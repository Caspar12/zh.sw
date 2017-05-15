/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/widget/layout/main-border-container/DefaultTitlePane
 */
define([
    'zh/widget/layout/TitlePane',
    "dojo/_base/declare"
], function (TitlePane, declare) {
    return declare([TitlePane], {
        /**
         * 内容是否自动显示滚动
         */
        isContentAutoScroll: true,
        /**
         * 填充父容器
         */
        isAutoFillToParentNode: true,
        /**
         * 是否可以收缩
         */
        toggleable: false

    });
});