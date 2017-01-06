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
        'zh/widget/pagetransitions/svgloader/classie',
        'zh/widget/pagetransitions/svgloader/snap.svg-min',
        'dojo/_base/window',
    ],
    function (_WidgetBase, _TemplatedMixin, template, require, declare, classie, Snap, window) {
        function getTemplate() {
            if (this._template) {
                return this._template
            }

            var url = require.toUrl('zh/widget/pagetransitions/svgloader/templates/' + this._templateName)
            this._template = require.getText(url);
            return this._template;
        }

        var showStyleEnum = {
            defalut: {
                options: {
                    speedIn: 500,
                    speedOut: 500,
                    easingOut: mina.linear,
                    easingIn: mina.linear
                },
                _templateName: 'SvgLoader.html',
                _template: template,
                getTemplate: getTemplate
            },
            second: {
                options: {
                    speedIn: 400,
                    speedOut: 400,
                    easingOut: mina.easeinout,
                    easingIn: mina.easeinout
                },
                _templateName: 'second.html',
                _template: null,
                getTemplate: getTemplate
            }

        };
        var SvgLoader = declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            _el: null,
            showStyle: showStyleEnum.defalut,
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
                this.set('context', this.showStyle.getTemplate());
                nextStep(pos);
            }
        });
        SvgLoader.ShowStyleEnum = showStyleEnum;
        return SvgLoader;
    });
