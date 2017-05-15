/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/data/region/areas
 */
define([
    'admin/api/cache/regionHttpService/findAllByChina',
    'zh/util/linq',
], function (findAllByChina, linq) {
    var areas = linq.From(findAllByChina).Where('$.level==3').ToArray();
    return areas;
});