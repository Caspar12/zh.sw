/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "dijit/Toolbar",

    'zh/app/exceptions/ValidationException',
    "dojo/_base/declare",
], function (Toolbar, ValidationException, declare) {
    return declare([Toolbar], {
        checkEmptyData: function (pData) {
            var datas = pData || this.getDatas();
            if (!datas || zh.isEmptyArray(datas)) {
                var ex = new ValidationException({
                    message: '请选择至少一条记录'
                });
                throw ex;
            }
            return datas;
        },
        checkOnlyOneData: function () {
            var datas = this.checkEmptyData();
            if (datas.length != 1) {
                throw new ValidationException({
                    message: '只能选择一条记录'
                });
            }
            return datas[0];
        },
        getOnlyOneData: function () {
            var datas = this.checkOnlyOneData();
            return datas[0];
        },
        checkNotEmptyMutliData: function (pData) {
            var datas = this.checkEmptyData(pData);
            return datas;
        },
        checkNotEmptyMutliDataReturnIds: function (pData) {
            var datas = this.checkEmptyData(pData);
            var ids = array.map(datas, function (data) {
                return data.id;
            });
            return ids;
        },
        /**
         * 抽象方法，需要调用方实现
         * @return {Array}
         */
        getDatas: function () {
            log.warn('请实现getDatas');
        },
    });
});