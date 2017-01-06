/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./SvgLoader.html",
        'require',
        "dojo/_base/declare",
        'zh/util/dynamicLoader',
        'zh/widget/pagetransitions/svgloader/classie',
        'zh/widget/pagetransitions/svgloader/snap.svg-min',
        'dojo/_base/window',
    ],
    function (_WidgetBase, _TemplatedMixin, template, require, declare, dynamicLoader, classie, Snap, window) {
        var showStyleEnum = {
            defalut: {
                options: {
                    speedIn: 500,
                    speedOut: null,
                    easingOut: null
                }
            }

        };
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            _el: null,
            _options: {
                speedIn: 500,
                easingIn: mina.linear
            },
            showStyle: showStyleEnum.defalut,
            postCreate: function () {
                this.inherited(arguments);
                this._el = this.domNode;
                this._init();
                this.placeAt(window.doc);
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

                if (!this._options.speedOut) {
                    this._options.speedOut = this._options.speedIn;
                }
                if (!this._options.easingOut) {
                    this._options.easingOut = this._options.easingIn;
                }
            },
            show: function () {
                if (this.isAnimating) return false;
                this.isAnimating = true;
                // animate svg
                var self = this,
                    onEndAnimation = function () {
                        classie.addClass(self._el, 'pageload-loading');
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
                });
            },
            _animateSVG: function (dir, callback) {
                var self = this,
                    pos = 0,
                    steps = dir === 'out' ? this.closingSteps : this.openingSteps,
                    stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
                    speed = dir === 'out' ? self._options.speedOut : self._options.speedIn,
                    easing = dir === 'out' ? self._options.easingOut : self._options.easingIn,
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
    });
