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
    * @return {string} object's key from json i18n (e.g. '%country.CO')
    */
    export function GetI18nFilter($filter: angular.IFilterService,
                                  getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,) {
        return function (value: string, type: string): string {
            //VARIABLES
            let valueI18n = getDataFromJson.returnValuei18n(type, value);
            let translated = $filter('translate')(valueI18n);

            return translated;
        }
    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.core.util')
        .filter('getI18nFilter', GetI18nFilter);

}
