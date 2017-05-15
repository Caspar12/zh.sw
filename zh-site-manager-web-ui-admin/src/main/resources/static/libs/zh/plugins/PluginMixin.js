/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @file zh/plugins/PluginMixin
 */
define([
    'zh/core',
    'dojo/_base/lang',
    'zh/util/dojoUtils',
    'dojo/on',
    "dojo/_base/declare",
    'dojo/_base/array',
], function (zh, lang, dojoUtils, on, declare, array) {
    return declare('zh/plugins/PluginMixin', null, {
        /**
         * 映射到插件的属性路径
         */
        mapToPlugConfigPaths: undefined,
        mapToPlugEventPaths: undefined,
        getPlugConfig: function () {
            var me = this;
            if (zh.isUndefined(me.mapToPlugConfigPaths)) return;
            return dojoUtils.mapFromObjectToNew({
                from: me,
                paths: me.mapToPlugConfigPaths
            });
        },
        postCreate: function () {
            var me = this;
            me.inherited(arguments);
            this.initPlug(this.getPlugConfig());
            this.initBindPluginEvents();
        },
        startup: function () {
            var me = this;
            me.inherited(arguments);
        },
        destroy: function () {
            this.destroyPlug();
            this.inherited(arguments);
        },
        destroyPlug: function () {

        },
        initPlug: function (plugConfig) {

        },
        getPlugin: function () {
            return this._plugin;
        },
        initBindPluginEvents: function () {
            var me = this;
            if (!this.mapToPlugEventPaths || !me.getPlugin()) return;
            array.forEach(this.mapToPlugEventPaths, function (item) {
                var plugin = me.getPlugin();
                plugin.on(item.to, lang.hitch(me, item.from));
            });
        },
        isInitPluginFinished:function () {
            return true;
        }
    });
});