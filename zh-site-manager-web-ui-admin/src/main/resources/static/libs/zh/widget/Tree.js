/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([
    "dijit/Tree",
    "dojo/_base/declare",
], function (Tree, declare) {
    return declare([Tree], {
        /**
         * 是否显示叶节点的Icon
         */
        isShowLeafIcon: true,
        /**
         * node opened status class
         */
        folderOpenedClass: null,
        /**
         * node closed status class
         */
        folderClosedClass: null,
        /**
         * node leaf status class
         */
        leafClass: null,
        /**
         *
         */
        rowClass: null,
        /**
         * get node icon class
         * @param item dojo/data/Item
         * @param opened Boolean
         * @returns {string} folder opened status or folder closed status or leaf class
         */
        getIconClass: function (/*dojo/data/Item*/ item, /*Boolean*/ opened) {
            return (!item || this.model.mayHaveChildren(item)) ? (opened ? this.getFolderOpenedClass() : this.getFolderClosedClass()) : this.getLeafClass();
        },
        getFolderOpenedClass: function () {
            return this.folderOpenedClass || 'dijitFolderOpened';
        },
        getFolderClosedClass: function () {
            return this.folderCliosedClass || 'dijitFolderClosed';
        },
        getLeafClass: function () {
            if (this.isShowLeafIcon) {
                return this.leafClass || 'dijitLeaf';
            } else {
                return 'hide';
            }
        },
        /**
         * get row  class
         * @param item dojo/data/Item
         * @param opened Boolean
         * @returns {string}
         */
        getRowClass: function (/*dojo/data/Item*/ item, /*Boolean*/ opened) {
            return this.rowClass ? this.rowClass : '';
        }
    });
});