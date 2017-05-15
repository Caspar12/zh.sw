/**
 * Created by 陈志杭 on 2016/12/27.
 * descriptipn
 * @file admin/services/data/region/cityies
 */
define([
    'admin/api/cache/regionHttpService/findAllByChina',
    'zh/util/linq',
], function (findAllByChina, linq) {
    var cityies = linq.From(findAllByChina).Where('$.level==2').ToArray();
    return cityies;
});