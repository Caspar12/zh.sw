/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/tipUtils
 * @description globel tips popup tool
 */
define([
    'jquery',
    'jquery/plugins/bootstrap-growl/BootstrapGrowl',
], function ($) {
    var tipUtils = {
        success: function (message) {
            this.show(message, "success");
        },
        info: function (message) {
            this.show(message, "info");
        },
        warning: function (message) {
            this.show(message, "warning");
        },
        danger: function (message) {
            this.show(message, "danger");
        },
        show: function (message, type) {
            $.notify({
                // options
                //icon: 'glyphicon glyphicon-warning-sign',
                //title: 'Bootstrap notify',
                message: message,
                //url: 'https://github.com/mouse0270/bootstrap-notify',
                //target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: type,
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "center"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: type === 'danger' ? 6000 : 3000,
                timer: 1000,
                mouse_over: 'pause',

            });
        },
    };


    return tipUtils;

});