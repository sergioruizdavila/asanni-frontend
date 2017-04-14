/**
 * mainApp Filters
 * @description - Set of all mainApp's filters
 */

module app.core.util.filters {

    /**********************************/
    /*      GET I18N VALUE FILTER     */
    /**********************************/

    /*-- INJECT DEPENDENCIES --*/
    TranslateFilter.$inject = ['$filter', 'mainApp.core.util.FunctionsUtilService'];

    /**
    * TranslateFilter
    * @description - return value based on code from i18n json
    * @use - {{ 'CO' | getI18nFilter:'country' }}
    * @function
    * @return {string} country translated (e.g. 'Estados Unidos')
    */

    export function TranslateFilter(
        $filter: angular.IFilterService,
        functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService) {
        return function (obj: Object, typeLabel: string): string {
            //VARIABLES
            let currentLanguageCode = functionsUtil.getCurrentLanguage() || 'en';
            let regex = new RegExp(typeLabel, 'g');
            let translated = '';

            for (var prop in obj) {
                if (prop.indexOf(typeLabel) >= 0) {
                    let codeFromJson = prop.replace(regex,'').toLowerCase();
                    if(codeFromJson === currentLanguageCode) {
                        translated = obj[prop];
                        break;
                    }
                }
            }

            return translated;
        }
    }

    /*-- INJECT DEPENDENCIES --*/
    GetI18nFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];

    /**
    * GetI18nFilter
    * @description - return value based on code from i18n json
    * @use - {{ 'CO' | getI18nFilter:'country' }}
    * @function
    * @return {string} country translated (e.g. 'Estados Unidos')
    */
    export function GetI18nFilter($filter: angular.IFilterService,
                                  getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService) {
        return function (value: string, type: string): string {
            //VARIABLES
            let valueI18n = getDataFromJson.returnValuei18n(type, value);
            let translated = $filter('translate')(valueI18n);

            return translated;
        }
    }



    /*-- INJECT DEPENDENCIES --*/
    GetTypeOfTeacherFilter.$inject = ['$filter'];

    /**
    * GetTypeOfTeacherFilter
    * @description - return the type of teacher text based on teacher type on DB ('H' or 'P')
    * @use - {{ 'H' | getTypeOfTeacherFilter }}
    * @function
    * @return {string} type of teacher text translated
    */
    export function GetTypeOfTeacherFilter($filter: angular.IFilterService) {
        return function (value: string): string {
            //VARIABLES
            let translated = '';

            if(value === 'H') {
                translated = $filter('translate')('%global.teacher.type.hobby.text');
            } else if (value === 'P') {
                translated = $filter('translate')('%global.teacher.type.professional.text');
            }

            return translated;
        }
    }



    /*-- INJECT DEPENDENCIES --*/
    AgeFilter.$inject = ['$filter', 'mainApp.core.util.FunctionsUtilService'];

    /**
    * AgeFilter
    * @description - return age translated (e.g. '35 años')
    * @use - {{ '1982' | ageFilter }}
    * @function
    * @return {string} user years old
    */
    export function AgeFilter(
        $filter: angular.IFilterService,
        functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService) {
        return function (value: string): string {

            let age = functionsUtil.ageFormat(value);
            let translated = $filter('translate')('%global.age.text');

            return age + ' ' + translated;
        }
    }



    /*-- INJECT DEPENDENCIES --*/
    YearMonthFormatFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];

    /**
    * YearMonthFormatFilter
    * @description - return date formatted as 'September 2017'
    * @use - {{ date | yearMonthFormatFilter }}
    * @function
    * @return {string} date formatted as 'Month YYYY'
    */
    export function YearMonthFormatFilter($filter: angular.IFilterService,
                                          getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService) {
        return function (value: string): string {
            let dateString = moment(value).format('YYYY/MM/DD').split('/');
            let valueI18n = getDataFromJson.returnValuei18n('month', dateString[1]);
            let translated = $filter('translate')(valueI18n);
            //Split date to day, month and year
            let dateFormatted = {
                month: translated,
                year: dateString[0]
            };
            return dateFormatted.month + ' ' + dateFormatted.year;
        }
    }



    /*-- INJECT DEPENDENCIES --*/
    RangeFilter.$inject = [];

    /**
    * RangeFilter
    * @description - Receive a number range (e.g. [-1, 1] or [1, 5]), and return
    * a list of number in order to show inside a ng-repeat loop.
    * @use - ng-repeat = "i in [-1,1] | RangeFilter"
    * @function
    * @return {Array<number>} result - number list to show in ng-repeat loop
    */
    export function RangeFilter() {
        return function (value: Array<number>): Array<number> {
            let lowBound, highBound;
            if (value.length == 1) {
              lowBound = 0;
              highBound = +value[0] - 1;
          } else if (value.length == 2) {
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
        }
    }



    /*-- INJECT DEPENDENCIES --*/
    RangeFormatFilter.$inject = [];

    /**
    * RangeFormatFilter
    * @description - Receive a number range (e.g. [-1, 1] or [1, 5]), and return
    * this range formatted: '1 - 5' or '2 - 10'
    * @use - {{ array<number> | rangeFormatFilter }}
    * @function
    * @param {Array<number>} value - number array with 1 or 2 elements (e.g [1, 4] or [7])
    * @return {string} result - range formatted
    */
    export function RangeFormatFilter() {
        return function (value: Array<number>): string {
            let result = '0';

            if(value.length === 1) {
                result = value[0];
            } else if(value.length === 2) {
                result = value[0] + ' - ' + value[1];
            }

            return result;
        }
    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.core.util')
        .filter('translateFilter', TranslateFilter)
        .filter('getI18nFilter', GetI18nFilter)
        .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
        .filter('ageFilter', AgeFilter)
        .filter('yearMonthFormatFilter', YearMonthFormatFilter)
        .filter('rangeFilter', RangeFilter)
        .filter('rangeFormatFilter', RangeFormatFilter);

}
