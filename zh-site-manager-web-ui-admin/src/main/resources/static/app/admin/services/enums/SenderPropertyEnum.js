/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/SenderPropertyEnum
 */
define([], function () {
    var SenderPropertyEnum = {
        Id: {id: 'id', text: 'id',width:'150px'},
        Name: {id: 'name', text: '发件人', width:'150px'},
        CompanyName: {id: 'companyName', text: '发件公司',width:'150px'},
        Address: {id: 'address', text: '发件地址',width:'150px'},
        Contact: {id: 'contact', text: '发件人电话',width:'150px'},
        CreatedDt: {id: 'createdDt', text: '创建时间',width:'150px'},
        DefaultFlag: {id: 'defaultFlag', text: '默认打印寄件信息',width:'150px'},
        DefaultFlagText: {id: 'defaultFlagText', text: '默认打印寄件信息',width:'150px'},
    };
    for (var proName in SenderPropertyEnum) {
        var enumValue = SenderPropertyEnum[proName];
        enumValue.data = enumValue.id;
        enumValue.title = enumValue.text;
    }


    return SenderPropertyEnum;
});