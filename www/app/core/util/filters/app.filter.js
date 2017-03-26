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
                            translated = $filter('translate')('%global.teacher.type.hobby.text');
                        }
                        else if (value === 'P') {
                            translated = $filter('translate')('%global.teacher.type.professional.text');
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
                YearMonthFormatFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];
                function YearMonthFormatFilter($filter, getDataFromJson) {
                    return function (value) {
                        var dateString = moment(value).format('YYYY/MM/DD').split('/');
                        var valueI18n = getDataFromJson.returnValuei18n('month', dateString[1]);
                        var translated = $filter('translate')(valueI18n);
                        var dateFormatted = {
                            month: translated,
                            year: dateString[0]
                        };
                        return dateFormatted.month + ' ' + dateFormatted.year;
                    };
                }
                filters.YearMonthFormatFilter = YearMonthFormatFilter;
                RangeFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];
                function RangeFilter() {
                    return function (value) {
                        var lowBound, highBound;
                        if (value.length == 1) {
                            lowBound = 0;
                            highBound = +value[0] - 1;
                        }
                        else if (value.length == 2) {
                            lowBound = +value[0];
                            highBound = +value[1];
                        }
                        var i = lowBound;
                        var result = [];
                        while (i <= highBound) {
                            result.push(i);
                            i++;
                        }
                        return result;
                    };
                }
                filters.RangeFilter = RangeFilter;
                angular
                    .module('mainApp.core.util')
                    .filter('getI18nFilter', GetI18nFilter)
                    .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
                    .filter('ageFilter', AgeFilter)
                    .filter('yearMonthFormatFilter', YearMonthFormatFilter)
                    .filter('rangeFilter', RangeFilter);
            })(filters = util.filters || (util.filters = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=app.filter.js.map