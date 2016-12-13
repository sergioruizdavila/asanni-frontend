var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var filters;
            (function (filters) {
                GetI18nFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];
                function GetI18nFilter($filter, getDataFromJson) {
                    return function (value, type) {
                        var valueI18n = getDataFromJson.returnValuei18n(type, value);
                        var translated = $filter('translate')(valueI18n);
                        return translated;
                    };
                }
                filters.GetI18nFilter = GetI18nFilter;
                angular
                    .module('mainApp.core.util')
                    .filter('getI18nFilter', GetI18nFilter);
            })(filters = util.filters || (util.filters = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=app.filter.js.map