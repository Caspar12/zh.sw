/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/enums/DeliverPrintWaybillTemplatePropertyEnum
 */
define([], function () {
    var DeliverPrintWaybillTemplatePropertyEnum = {
        id: {id: 'id', text: 'id',},
        DeliverId: {id: 'deliverId', text: '快递公司Id',},
        DeliverName: {id: 'deliverName', text: '快递公司',},
        TemplateName: {id: 'templateName', text: '模板名称',},
        TemplateContent: {id: 'templateContent', text: '模板内容',},
        SystemFlag: {id: 'systemFlag', text: '系统模板',},
        SystemFlagText: {id: 'systemFlagText', text: '是否系统模板',},
        PreviewBgImgUrl: {id: 'previewBgImgUrl', text: '系统模板预览背景',},
        Width: {id: 'width', text: '模板宽度',},
        Height: {id: 'height', text: '模板高度',},
        OffsetTop: {id: 'offsetTop', text: 'y轴偏移量(mm)',},
        OffsetLeft: {id: 'offsetLeft', text: 'x轴偏移量(mm)',},
    };
    for (var proName in DeliverPrintWaybillTemplatePropertyEnum) {
        var enumValue = DeliverPrintWaybillTemplatePropertyEnum[proName];
        enumValue.data = enumValue.id;
        enumValue.title = enumValue.text;
    }

    return DeliverPrintWaybillTemplatePropertyEnum;
});