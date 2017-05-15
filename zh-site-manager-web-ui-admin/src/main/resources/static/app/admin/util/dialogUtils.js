/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/dialogUtils
 * @description globel tips popup tool
 */
define(['jquery', 'zh/plugins/jquery/widget/bootbox/bootbox', 'bootstrap/js/bootstrap'], function ($, bootbox, bootstrap) {
    var dialogUtils = {
        alert: function () {
            var dialog = bootbox.alert.apply(bootbox, arguments);
            $('.modal-backdrop').height($(document.body).height());
            return dialog;
        },
        confirm: function () {
            var dialog = bootbox.confirm.apply(bootbox, arguments);
            $('.modal-backdrop').height($(document.body).height());
            return dialog;
        },
        dialog: function () {
            var dialog = bootbox.dialog.apply(bootbox, arguments);
            dialog.init(function () {
                $('.modal-backdrop').height($(document.body).height());
            });
            return dialog;
        },
        hide: function (dialog) {
            return dialog.modal('hide');
        },
        destroy: function (dialog, destroyOkCallback) {
            dialog.on('hidden.bs.modal', function () {
                dialog.remove();
                delete dialog;
                destroyOkCallback && destroyOkCallback();
            });
            this.hide(dialog);
        }
    };
    return dialogUtils;
});