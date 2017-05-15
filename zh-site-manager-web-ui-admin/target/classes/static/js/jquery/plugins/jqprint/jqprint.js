/**
 * @file jquery/plugins/jqprint/jqprint
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})((function ($) {

    function isOpera() {
        var userAgent = navigator.userAgent.toLowerCase();
        return /opera/.test(userAgent);
    }

    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);

        if (opt.operaSupport && isOpera()) {
            var tab = window.open("", "jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else {
            var $iframe = $("<iframe  />");

            if (!opt.debug) {
                $iframe.css({position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px"});
            }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }

        if (opt.importCSS) {
            if ($("link[media=print]").length > 0) {
                $("link[media=print]").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else {
                $("link").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }

        if (opt.printContainer) {
            doc.write($element.outer());
        }
        else {
            $element.each(function () {
                doc.write($(this).html());
            });
        }

        doc.close();

        (opt.operaSupport && isOpera() ? tab : $iframe[0].contentWindow).focus();
        setTimeout(function () {
            (opt.operaSupport && isOpera() ? tab : $iframe[0].contentWindow).print();
            if (tab) {
                tab.close();
            }
            $iframe.remove();
        }, 1000);
    }

    $.fn.jqprint.defaults = {
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: true,
    };

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    $.fn.outer = function () {
        return $($('<div></div>').html(this.clone())).html();
    }

}));