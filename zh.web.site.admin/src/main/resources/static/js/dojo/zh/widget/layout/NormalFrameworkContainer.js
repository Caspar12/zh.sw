/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description normal application layout border container
 * @file zh/widget/layout/NormalFrameworkContainer
 */
define([
    'dijit/layout/BorderContainer',
    'dijit/layout/AccordionContainer',
    'dijit/layout/TabContainer',
    'dojox/layout/ExpandoPane',
    'zh/widget/layout/ContentPane',
    'dijit/TitlePane',
    'zh/widget/layout/NormalFrameworkContainerTop',

    'dojox/mvc/sync',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/window',
    "dojo/_base/declare",
], function (BorderContainer, AccordionContainer, TabContainer, ExpandoPane, ContentPane, TitlePane, NormalFrameworkContainerTop, sync, domGeometry, domStyle, winUtils, declare) {
    return declare([BorderContainer], {
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
            this.addChild(this._createTopContainer());
            this.addChild(this._createBottomContainer());
            this.addChild(this._createLeftContainer());
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
        _createMainContainer: function () {
            var mainContainer = new TabContainer({
                region: 'center',
                tabStrip: true
            });
            var i = 0;
            while (i < 10) {
                var tab1 = new ContentPane({
                    title: "hello world tab" + i,
                    content: "hello world tab" + i
                });
                mainContainer.addChild(tab1);
                i++;
            }
            this.main = mainContainer;
            return mainContainer;
        },
        _createTopContainer: function () {
            var topContainer = new NormalFrameworkContainerTop({});
            this.top = topContainer;
            sync(this, 'title', topContainer, 'title');
            return topContainer;
        },
        _createBottomContainer: function () {
            var bottomContainer = new ContentPane({
                region: "bottom",
                style: "height: 20px",
                gutter: true,
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
                gutter: true,
                minSize: 100,
            });


            this.left = leftContainer;
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
    });
});