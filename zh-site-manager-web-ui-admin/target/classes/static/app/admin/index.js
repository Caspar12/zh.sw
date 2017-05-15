/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/index.js
 */
// require.on('error', function () {
//     console.trace(arguments);
// });
require([
        //'admin/util/pageTransitionsUtils',
        'dojo/on',
        'extjs/ext-all',
        //'admin/util/tipUtils',
        'zh/app/exceptions/ValidationException',
    ], function (on, ext, ValidationException) {
        on(window, 'error', function (errorEvent) {
            if (errorEvent && errorEvent.error && errorEvent.error.isInstanceOf && errorEvent.error.isInstanceOf(ValidationException) &&
                errorEvent.error.message
            ) {
                event.preventDefault();
                event.stopPropagation();
                tipUtils.warning(errorEvent.error.message);
                return false;
            }
        });

        pageTransitionsUtils.show();
        require(['admin/util/viewRouter'], function () {
            pageTransitionsUtils.hide();
        });
    }
);
