/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
        'zh/widget/pagetransitions/svgloader/SvgLoader',
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/8.html",
        "dojo/_base/declare",
        'zh/widget/pagetransitions/svgloader/libs/classie',
        'zh/widget/pagetransitions/svgloader/libs/snap.svg-min',
        'dojo/_base/window',
    ],
    function (SvgLoader, _TemplatedMixin, template, declare) {
        var SvgLoader = declare([SvgLoader, _TemplatedMixin], {
            templateString: template,
            showStyle: {
                options: {
                    speedIn: 300, speedOut: 600, easingIn: mina.easeinout, easingOut: mina.bounce
                }
            },

        });
        return SvgLoader;
    });
