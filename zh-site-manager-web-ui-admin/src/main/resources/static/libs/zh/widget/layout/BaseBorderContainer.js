/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description normal application layout border container
 * @file zh/widget/layout/BaseBorderContainer
 */
define([
    'dijit/layout/BorderContainer',
    'zh/widget/layout/AccordionContainer',
    'dijit/layout/TabContainer',
    'dojox/layout/ExpandoPane',
    'zh/widget/layout/ContentPane',
    'dijit/TitlePane',
    'zh/widget/layout/BaseBorderContainerTop',
    'dojox/mvc/sync',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/window',
    "dojo/_base/declare",
], function (BorderContainer, AccordionContainer, TabContainer, ExpandoPane, ContentPane, TitlePane, BaseBorderContainerTop, sync, domGeometry, domStyle, winUtils, declare) {
    return declare([BorderContainer], {
        isAutoResize: true,
        /**
         * top container title
         */
        title: '',
        class: 'NormalFrameworkContainer',
        gutters: false,
        liveSplitters: true,
        postCreate: function () {
            this.inherited(arguments);
            this.addChild(this._createMainContainer());
            this._createTopContainer();
            this.addChild(this._createBottomContainer());
            this._createLeftContainer();
            this.addChild(this._createRightContainer());
        },
        startup: function () {
            var me = this;
            this.inherited(arguments);
            this.resize();
        },
        resize: function () {
            //domGeometry.setMarginBox(this.domNode, winUtils.getBox());
            var parentBox = this.domNode.parentNode ? domGeometry.getMarginBox(this.domNode.parentNode) : winUtils.getBox();
            if (parentBox) {
                this.domNode.style.width = parentBox.w + 'px';
                this.domNode.style.height = parentBox.h + 'px';
            }
            this.inherited(arguments);


        },
        showLeft: function () {
            this.left.show();
            this.resize();
        },
        hideLeft: function () {
            this.left.hide();
            this.resize();
        },
        /**
         * 抽象方法,创建主功能区
         * @private
         */
        _createMainContainer: function () {

        },
        _createTopContainer: function () {
            var topContainer = new BaseBorderContainerTop({});
            this.top = topContainer;
            sync(this, 'title', topContainer, 'title');
            sync(this, 'subTitle', topContainer, 'subTitle');

            this.addChild(this.top);
        },
        _createBottomContainer: function () {
            var bottomContainer = new ContentPane({
                region: "bottom",
                style: "height: 20px",


                content: "hello world bottom"
            });
            bottomContainer.hide();
            this.bottom = bottomContainer;

            return bottomContainer;
        },
        _createLeftContainer: function () {
            var leftContainer = new ContentPane({

                region: "left",
                style: "width: 200px",
                splitter: true,
                class: 'NormalFrameworkContainerLeft',

                minSize: 100,
                isLayoutContainer: true
            });
            this.left = leftContainer;
            this.addChild(leftContainer);
            return leftContainer;
        },
        _createRightContainer: function () {
            var rightContainer = new ContentPane({
                region: "right",
                style: "width: 100px",

            });
            rightContainer.hide();
            this.right = rightContainer;
            return rightContainer;
        },
        /**
         *
         * @param menuItem   zh/widget/menu/MenuItem
         */
        addTooltipDialogMenuItem: function (menuItem) {
            this.top.addTooltipDialogMenuItem(menuItem);
        }
    });
});