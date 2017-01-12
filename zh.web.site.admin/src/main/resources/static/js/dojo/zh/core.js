/**
 * @author 陈志杭
 * @contact 279397942@qq.com
 * @date 2016/12/29
 * @description
 */
define([], function () {
    var zh = {
        isUndefined: function (value) {
            return typeof(value) === 'undefined';
        },
        thread:{
            sleep:function (milliseconds) {
                var start = new Date().getTime();
                while (true){
                    var end = new Date().getTime();
                    if((end - start) > milliseconds ){
                        break;
                    }
                }
            }
        }
    };
    return zh;
});