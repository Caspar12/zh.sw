/**
 * Created by 陈志杭 on 2017/3/1
 * description 按hash某个参数进行路由
 * @file zh/app/exceptions/ValidationException
 */
define([
    'dojo/Stateful',
    "dojo/_base/declare",
    'zh/core',
], function (Stateful, declare, zh) {
    var ValidationException = declare('zh/app/exceptions/ValidationException', [Stateful], {
        message: '',
        code: 0,
    });

    return ValidationException;
});