var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var filters;
            (function (filters) {
                TranslateFilter.$inject = ['$filter', 'mainApp.core.util.FunctionsUtilService'];
                function TranslateFilter($filter, functionsUtil) {
                    return function (obj, typeLabel) {
                        var currentLanguageCode = functionsUtil.getCurrentLanguage() || 'en';
                        var regex = new RegExp(typeLabel, 'g');
                        var translated = '';
                        for (var prop in obj) {
                            if (prop.indexOf(typeLabel) >= 0) {
                                var codeFromJson = prop.replace(regex, '').toLowerCase();
                                if (codeFromJson === currentLanguageCode) {
                                    translated = obj[prop];
                                    break;
                                }
                            }
                        }
                        return translated;
                    };
                }
                filters.TranslateFilter = TranslateFilter;
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
                RangeFilter.$inject = [];
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
                RangeFormatFilter.$inject = [];
                function RangeFormatFilter() {
                    return function (value) {
                        var result = '0';
                        if (value.length === 1) {
                            result = value[0];
                        }
                        else if (value.length === 2) {
                            result = value[0] + ' - ' + value[1];
                        }
                        return result;
                    };
                }
                filters.RangeFormatFilter = RangeFormatFilter;
                angular
                    .module('mainApp.core.util')
                    .filter('translateFilter', TranslateFilter)
                    .filter('getI18nFilter', GetI18nFilter)
                    .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
                    .filter('ageFilter', AgeFilter)
                    .filter('yearMonthFormatFilter', YearMonthFormatFilter)
                    .filter('rangeFilter', RangeFilter)
                    .filter('rangeFormatFilter', RangeFormatFilter);
            })(filters = util.filters || (util.filters = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/core/util/filters/app.filter.js.map
