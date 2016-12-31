/**
 * mainApp Filters
 * @description - Set of all mainApp's filters
 */

module app.core.util.filters {

    /**********************************/
    /*      GET I18N VALUE FILTER     */
    /**********************************/

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
                translated = $filter('translate')('%create.teacher.experience.form.type.hobby_option.text');
            } else if (value === 'P') {
                translated = $filter('translate')('%create.teacher.experience.form.type.professional_option.text');
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


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.core.util')
        .filter('getI18nFilter', GetI18nFilter)
        .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
        .filter('ageFilter', AgeFilter)
        .filter('yearMonthFormatFilter', YearMonthFormatFilter);

}
