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
        class: 'kk',
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
            return this.folderClosedClass || 'dijitFolderClosed';
        },
        getLeafClass: function () {
            return this.leafClass || 'dijitLeaf';
        },
    });
});