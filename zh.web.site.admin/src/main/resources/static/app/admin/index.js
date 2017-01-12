/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/index.js
 */
require(['admin/util/pageTransitionsUtils',
        'zh/widget/layout/NormalFrameworkContainer'
    ],
    function (pageTransitionsUtils, NormalFrameworkContainer) {
        // var container = new NormalFrameworkContainer();
        // container.placeAt(document.body);
        // container.startup();
        // return;
        // 显示最少默认加载时间
        pageTransitionsUtils.show();
        var startTime = new Date().getTime();
        require(['admin/util/viewRouter'], function (viewRouter) {
            var endTime = new Date().getTime();
            var downloadTime = endTime - startTime;
            var defaultLoadingShowingTimeMilliseconds = 1000;
            if (downloadTime > defaultLoadingShowingTimeMilliseconds) {
                defaultLoadingShowingTimeMilliseconds = 1;
            } else {
                defaultLoadingShowingTimeMilliseconds = defaultLoadingShowingTimeMilliseconds - downloadTime
            }
            setTimeout(function () {
                pageTransitionsUtils.hide();
            }, defaultLoadingShowingTimeMilliseconds);
        });
    }
);
