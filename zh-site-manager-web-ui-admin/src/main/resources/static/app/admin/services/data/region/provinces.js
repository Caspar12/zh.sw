/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/data/region/provinces
 */
define([
    'admin/api/cache/regionHttpService/findAllByChina',
    'zh/util/linq',
], function (findAllByChina, linq) {
    var provinces = linq.From(findAllByChina).Where('$.level==1').ToArray();
    return provinces;
});