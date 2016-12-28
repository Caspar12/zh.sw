/**
 * Created by 陈志杭 on 2016/12/27.
 */
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!login.html"
], function(declare, _WidgetBase, _TemplatedMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template
    });

});