/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 * @file zh/plugins/bootstrap/widget/form/DateTimeTextBox
 */
define([
    'zh/widget/_base/_WidgetBase',
    'jquery',
    'bootstrap/js/bootstrap',
    'zh/widget/text/ValidationTextBox',
    'jquery/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker',
    'zh/plugins/PluginMixin',
    "dojo/_base/declare",
    "dojo/_base/lang",
    'dojo/request/xhr',
    'zh/util/languageUtils',
], function (_WidgetBase, $, bootstrap, ValidationTextBox, DateTimePicker, PluginMixin, declare, lang, requestXhr, languageUtils) {

    var DateTimeTextBox = declare('zh/plugins/bootstrap/widget/form/DateTimeTextBox', [ValidationTextBox, PluginMixin], {

        language: 'zh-CN',
        /**
         * 所有需要"Date" 的选项都可以处理Date 对象; a String formatted according to the given format; or a timedelta relative to today, eg '-1d', '+6m +1y', etc, where valid units are 'd' (day), 'w' (week), 'm' (month), and 'y' (year).

         你也可以指定一个符合 ISO-8601 格式的日期时间，就可以忽略下面的格式：
         yyyy-mm-dd
         yyyy-mm-dd hh:ii
         yyyy-mm-ddThh:ii
         yyyy-mm-dd hh:ii:ss
         yyyy-mm-ddThh:ii:ssZ
         format
         String. 默认值: 'mm/dd/yyyy'

         日期格式， p, P, h, hh, i, ii, s, ss, d, dd, m, mm, M, MM, yy, yyyy 的任意组合。
         p : meridian in lower case ('am' or 'pm') - according to locale file
         P : meridian in upper case ('AM' or 'PM') - according to locale file
         s : seconds without leading zeros
         ss : seconds, 2 digits with leading zeros
         i : minutes without leading zeros
         ii : minutes, 2 digits with leading zeros
         h : hour without leading zeros - 24-hour format
         hh : hour, 2 digits with leading zeros - 24-hour format
         H : hour without leading zeros - 12-hour format
         HH : hour, 2 digits with leading zeros - 12-hour format
         d : day of the month without leading zeros
         dd : day of the month, 2 digits with leading zeros
         m : numeric representation of month without leading zeros
         mm : numeric representation of the month, 2 digits with leading zeros
         M : short textual representation of a month, three letters
         MM : full textual representation of a month, such as January or March
         yy : two digit representation of a year
         yyyy : full numeric representation of a year, 4 digits
         */
        pFormat: 'yyyy-mm-dd hh:ii:ss',
        /**
         * weekStart
         * Integer. 默认值：0
         * 一周从哪一天开始。0（星期日）到6（星期六）
         */
        pWeekStart: 0,
        /**
         * startDate
         * Date. 默认值：开始时间
         * The earliest date that may be selected; all earlier dates will be disabled.
         */
        pStartDate: undefined,
        /**
         * endDate.
         * 默认值：结束时间
         * The latest date that may be selected; all later dates will be disabled.
         */
        pEndDate: undefined,
        /**
         * autoclose
         * Boolean. 默认值：false
         * 当选择一个日期之后是否立即关闭此日期时间选择器。
         */
        pAutoClose: true,
        /**
         * todayBtn
         * Boolean, "linked". 默认值: false
         * 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。
         * 如果是true的话，"Today" 按钮仅仅将视图转到当天的日期，如果是"linked"，当天日期将会被选中。
         */
        pTodayBtn: true,
        /**
         * todayHighlight
         * Boolean. 默认值: false
         * 如果为true, 高亮当前日期。
         */
        pTodayHighlight: true,
        /**
         * keyboardNavigation
         * Boolean. 默认值: true
         * 是否允许通过方向键改变日期。
         */
        pKeyboardNavigation: true,
        pFontAwesome: true,
        mapToPlugConfigPaths: [
            {from: 'language', to: 'language', isContinue: undefined},
            {from: 'pFormat', to: 'format', isContinue: undefined},
            {from: 'pWeekStart', to: 'weekStart', isContinue: undefined},
            {from: 'pStartDate', to: 'startDate', isContinue: undefined},
            {from: 'pEndDate', to: 'endDate', isContinue: undefined},
            {from: 'pAutoClose', to: 'autoclose', isContinue: undefined},
            {from: 'pTodayBtn', to: 'todayBtn', isContinue: undefined},
            {from: 'pTodayHighlight', to: 'todayHighlight', isContinue: undefined},
            {from: 'pKeyboardNavigation', to: 'keyboardNavigation', isContinue: undefined},


            {from: 'pFontAwesome', to: 'fontAwesome', isContinue: undefined},


        ],
        mapToPlugEventPaths: [
            {from: 'onDateTimePackerShow', to: 'show'},
            {from: 'onDateTimePackerHide', to: 'hide'},
        ],
        onDateTimePackerShow: function () {

        },
        onDateTimePackerHide: function () {
            this._updatePlaceHolder();
        },
        initPlug: function (plugConfig) {
            var me = this;
            var languageModulePath = 'jquery/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.' + me.language + '.js';
            languageUtils.loadJsAMDLanguageByModulePath(languageModulePath);
            if (this.readOnly === true) return;
            this._plugin = $(this.getDateTimePickerNode()).datetimepicker(plugConfig);
        },
        getDateTimePickerNode: function () {
            return this.textbox;
        },
        onPlugShow: function () {

        }
    });
    return DateTimeTextBox;
});