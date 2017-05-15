/**
 * @author caspar - chengzhihang
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description normal application layout border container
 * @file zh/widget/layout/TabBorderContainer
 */
define([
    'zh/widget/_base/_WidgetBase',
    'dijit/layout/AccordionContainer',
    "dojo/sniff",
    "dojo/dom-geometry",
    "dojo/_base/fx", // fx.Animation
    "dojo/_base/declare",
], function (_WidgetBase, AccordionContainer, has, domGeometry, fx, declare) {
    function size(widget, dim) {
        widget.resize ? widget.resize(dim) : domGeometry.setMarginBox(widget.domNode, dim);
    }

    return declare([AccordionContainer, _WidgetBase], {
        isAutoResize: true,
        isAutoFillToParentNode: true,
        resize: function () {
            var me = this;
            me.autoFillToParentDomNode();
            this.inherited(arguments);
        },
        _transition: function (/*dijit/_WidgetBase?*/ newWidget, /*dijit/_WidgetBase?*/ oldWidget, /*Boolean*/ animate) {
            // Overrides StackContainer._transition() to provide sliding of title bars etc.

            if (has("ie") < 8) {
                // workaround animation bugs by not animating; not worth supporting animation for IE6 & 7
                animate = false;
            }

            if (this._animation) {
                // there's an in-progress animation.  speedily end it so we can do the newly requested one
                this._animation.stop(true);
                delete this._animation;
            }

            var self = this;

            if (newWidget) {
                newWidget._wrapperWidget.set("selected", true);

                var d = this._showChild(newWidget);	// prepare widget to be slid in

                // Size the new widget, in case this is the first time it's being shown,
                // or I have been resized since the last time it was shown.
                // Note that page must be visible for resizing to work.
                if (this.doLayout) {
                    size(newWidget, this._containerContentBox);
                }
            }

            if (oldWidget) {
                oldWidget._wrapperWidget.set("selected", false);
                if (!animate) {
                    this._hideChild(oldWidget);
                }
            }

            if (animate) {
                var newContents = newWidget._wrapperWidget.containerNode,
                    oldContents = oldWidget ? oldWidget._wrapperWidget.containerNode : null;

                // During the animation we will be showing two dijitAccordionChildWrapper nodes at once,
                // which on claro takes up 4px extra space (compared to stable AccordionContainer).
                // Have to compensate for that by immediately shrinking the pane being closed.
                var wrapperContainerNode = newWidget._wrapperWidget.containerNode,
                    wrapperContainerNodeMargin = domGeometry.getMarginExtents(wrapperContainerNode),
                    wrapperContainerNodePadBorder = domGeometry.getPadBorderExtents(wrapperContainerNode),
                    animationHeightOverhead = wrapperContainerNodeMargin.h + wrapperContainerNodePadBorder.h;
                if (oldContents) {
                    oldContents.style.height = (self._verticalSpace - animationHeightOverhead) + "px";
                }

                this._animation = new fx.Animation({
                    node: newContents,
                    duration: this.duration,
                    curve: [1, this._verticalSpace - animationHeightOverhead - 1],
                    onAnimate: function (value) {
                        value = Math.floor(value);	// avoid fractional values
                        newContents.style.height = value + "px";
                        if (oldWidget) {
                            oldContents.style.height = (self._verticalSpace - animationHeightOverhead - value) + "px";
                        }
                    },
                    onEnd: function () {
                        delete self._animation;
                        newContents.style.height = "auto";
                        if (oldWidget) {
                            oldWidget._wrapperWidget.containerNode.style.display = "none";
                            oldContents.style.height = "auto";
                            self._hideChild(oldWidget);
                        }
                    }
                });
                this._animation.onStop = this._animation.onEnd;
                this._animation.play();
            }

            return d;	// If child has an href, promise that fires when the widget has finished loading
        },
    });
});