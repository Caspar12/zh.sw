/**
 * Created by 陈志杭 on 2016/12/27.
 * @file admin/util/bizTipUtils
 * @description globel tips popup tool
 */
define(['admin/util/tipUtils', 'zh/util/dojoUtils', 'zh/app/exceptions/ValidationException'], function (tipUtils, dojoUtils, ValidationException) {
    var bizTipUtils = {
        execCatchValidationException: function (exec) {
            try {
                exec();
            }
            catch (ex) {
                if (dojoUtils.isInstanceFrom(ex, ValidationException)) {
                    tipUtils.warning(ex.message);
                } else {
                    throw  ex;
                }
            }
        }
    };


    return bizTipUtils;

});