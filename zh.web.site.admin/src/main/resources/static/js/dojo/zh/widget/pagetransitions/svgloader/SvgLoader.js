/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/SvgLoader.html",
        'require',
        "dojo/_base/declare",
        'zh/widget/pagetransitions/svgloader/libs/classie',
        'zh/widget/pagetransitions/svgloader/libs/snap.svg-min',
        'dojo/_base/window',
    ],
    function (_WidgetBase, _TemplatedMixin, template, require, declare, classie, Snap, window) {
        var SvgLoader = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            showStyle: {
                options: {
                    speedIn: 400,
                    speedOut: 400,
                    easingOut: mina.linear,
                    easingIn: mina.linear
                }
            },
            postCreate: function () {
                this.inherited(arguments);
                this._el = this.domNode;
                this._init();
                this.placeAt(window.doc.body);
            },
            baseClass: 'pageload-overlay',
            _init: function () {
                var s = Snap(this._el.querySelector('svg'));
                this.path = s.select('path');
                this.initialPath = this.path.attr('d');

                var openingStepsStr = this._el.getAttribute('data-opening');
                this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
                this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0;
                if (this.openingStepsTotal === 0) return;

                // if data-closing is not defined then the path will animate to its original shape
                var closingStepsStr = this._el.getAttribute('data-closing') ? this._el.getAttribute('data-closing') : this.initialPath;
                this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
                this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0;

                this.isAnimating = false;


            },
            onEndShow: function () {

            },
            onEndHide: function () {

            },
            show: function () {
                if (this.isAnimating) return false;
                this.isAnimating = true;
                // animate svg
                var self = this,
                    onEndAnimation = function () {
                        classie.addClass(self._el, 'pageload-loading');
                        self.onEndShow && self.onEndShow();
                    };
                this._animateSVG('in', onEndAnimation);
                classie.add(this._el, 'show');
            },
            hide: function () {
                var self = this;
                classie.removeClass(this._el, 'pageload-loading');
                this._animateSVG('out', function () {
                    // reset path
                    self.path.attr('d', self.initialPath);
                    classie.removeClass(self._el, 'show');
                    self.isAnimating = false;
                    self.onEndHide() && self.onEndHide();
                });
            },
            _animateSVG: function (dir, callback) {
                var self = this,
                    pos = 0,
                    steps = dir === 'out' ? this.closingSteps : this.openingSteps,
                    stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
                    speed = dir === 'out' ? self.showStyle.options.speedOut : self.showStyle.options.speedIn,
                    easing = dir === 'out' ? self.showStyle.options.easingOut : self.showStyle.options.easingIn,
                    nextStep = function (pos) {
                        if (pos > stepsTotal - 1) {
                            if (callback && typeof callback == 'function') {
                                callback();
                            }
                            return;
                        }
                        self.path.animate({'path': steps[pos]}, speed, easing, function () {
                            nextStep(pos);
                        });
                        pos++;
                    };

                nextStep(pos);
            }
        });
        return SvgLoader;
    });
