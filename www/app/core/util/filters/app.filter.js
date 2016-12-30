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
                GetTypeOfTeacherFilter.$inject = ['$filter'];
                function GetTypeOfTeacherFilter($filter) {
                    return function (value) {
                        var translated = '';
                        if (value === 'H') {
                            translated = $filter('translate')('%create.teacher.experience.form.type.hobby_option.text');
                        }
                        else if (value === 'P') {
                            translated = $filter('translate')('%create.teacher.experience.form.type.professional_option.text');
                        }
                        return translated;
                    };
                }
                filters.GetTypeOfTeacherFilter = GetTypeOfTeacherFilter;
                AgeFilter.$inject = ['$filter', 'mainApp.core.util.FunctionsUtilService'];
                function AgeFilter($filter, functionsUtil) {
                    return function (value) {
                        var age = functionsUtil.ageFormat(value);
                        var translated = $filter('translate')('%global.age.text');
                        return age + ' ' + translated;
                    };
                }
                filters.AgeFilter = AgeFilter;
                angular
                    .module('mainApp.core.util')
                    .filter('getI18nFilter', GetI18nFilter)
                    .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
                    .filter('ageFilter', AgeFilter);
            })(filters = util.filters || (util.filters = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=app.filter.js.map