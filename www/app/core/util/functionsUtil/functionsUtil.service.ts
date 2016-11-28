/**
* functionsUtilService
* @description - Service with util functions used accross the whole application
* @constructor
*/

module app.core.util.functionsUtil {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFunctionsUtilService {
        splitToColumns: (arr: Array<any>, size: number) => Array<any>;
        buildMarkersOnMap: (dataSet: Array<any>,
                            mapType: string,
                            position: components.map.IPosition) =>  components.map.IMapConfig;
        //dateMonthToString: (date: string, zone: string) => string;
        //getPositionByUid: (array: Array<any>, uid: string) => number;
        //groupByYear: (array: Array<any>) => any;
        //arrayToObject: (array: Array<any>) => any;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FunctionsUtilService implements IFunctionsUtilService {

        static serviceId = 'mainApp.core.util.FunctionsUtilService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('functionsUtil service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * splitToColumns
        * @description - split an array on one parent array with X arrays
        * @use - this.FunctionsUtilService.splitToColumns(array, 2);
        * @function
        * @params {Array<any>} arr - array
        * @params {number} size - size of new array
        * @return {Array<any>} newArr - parent array with X arrays inside.
        */
        splitToColumns(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }

        /**
        * buildMarkersOnMap
        * @description - build each marker on a specific map (based on a dataSet)
        * @use - this.FunctionsUtilService.buildMarkersOnMap(data, 2);
        * @function
        * @params {Array<any>} dataSet - dataSet array
        * @params {string} mapType - map type
        * @params {components.map.IPosition} position - position on map (lat and lng)
        * @return {components.map.IMapConfig} mapConfig - google map config.
        */
        buildMarkersOnMap(dataSet, mapType, position): components.map.IMapConfig {
            //VARIABLES
            let mapConfig: components.map.IMapConfig = {
                type: mapType,
                data: {
                    position: position,
                    markers: []
                }
            };

            for (let i = 0; i < dataSet.length; i++) {
                mapConfig.data.markers.push({
                    id: dataSet[i].id,
                    position: dataSet[i].location.position
                });
            }

            return mapConfig;
        }

        /*
        * External Function: extractCountriesFromHtml
        * @external
        * @description Get Countries and Codes from HTML (assets/schemas/countries/countries.html)
        * @use 1. You have to paste countries html in one app template (i.e. studentPage.html)
               2. On Dev Console Chrome put:
        * var countriesList = app.core.util.functionsUtil.FunctionsUtilService.extractCountriesFromHtml()
        * return on console: countries list Object formatted to i18n json
        */
        public static extractCountriesFromHtml(): any {
            // VARIABLES
            let countries_json = {};
            let language = 'EN'; //Change to specific language (ES, EN, etc)
            let html:any = document.getElementById("countriesList." + language);


            for (let i = 0; i < html.length; i++) {
                let countryText = html[i].innerText;
                let countryCode = html[i].attributes[0].nodeValue;
                countries_json["%country." + countryCode] = countryText;
            }

            console.log(JSON.stringify(countries_json));
        }

        /*
        * Split Date Format Method
        * @description Split Date in 3 parts: day, month and year
        */
        /*public static splitDateFormat(date: string): app.core.interfaces.IDateFormatted {
            //Format date to MM/DD/YYYY
            let dateString = moment(date).format('YYYY/MMM/DD').split('/');
            //Split date to day, month and year
            let dateFormatted = {
                complete: date,
                day: dateString[2],
                month: dateString[1],
                year: dateString[0]
            };

            return dateFormatted;
        }*/

        /**
        * dateMonthToString
        * @description - format month to long string (example: 'November')
        * @use - this.FinanceService.dateMonthToString('Mon May 01 2016 01:23:34 GMT-0500 (COT)', 'es-ES');
        * @function
        * @params {string} date - complete date
        * @params {string} zone - specific the language zone (example: 'en-US', 'es-ES')
        * @return {string} month - Returns month formatted to long string (example: 'November')
        */
        /*dateMonthToString(date, zone): string {
            //VARIABLES
            var dateFormatted = new Date(date);
            var options = {month: "long"};
            var month = dateFormatted.toLocaleDateString(zone, options);
            return month;
        }*/

        /**
        * formatCurrency
        * @description - format a number to currency string
        * @function
        * @params {number} num - number without format
        * @params {string} formatted - number formatted (if you don't have this value, please send '')
        * @return {object} currency - Returns an object with 2 properties: num - number without format
        * and formatted - number formatted.
        */
        /*formatCurrency(num: number, formatted: string): app.models.finance.IMoney {

            let currency = {
                num: num,
                formatted: formatted
            };

            if (currency.formatted) {
                currency.num = accounting.unformat(currency.formatted);
            }

            //TODO: Remove '$' hardcode, change it with some variable
            currency.formatted = accounting.formatMoney(currency.num, '$', 0);

            return currency;

        }*/

        /**
        * generateGuid
        * @description - generate Guid id string
        * @function
        * @return {string} guid - Returns an Guid Id string.
        */
        /*public static generateGuid(): string {
            var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            var guid = fmt.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
        }*/

        /**
        * getPositionByUid
        * @description - get Position on Array by Uid
        * @example - this.FunctionsUtilService.getPositionByUid(expenses, expenseId);
        * @function
        * @params {Array<any>} array - list of data
        @params {string} uid - data uid
        * @return {number} index - Returns an index position on Array
        */
        /*getPositionByUid(array, uid): number {
            let index = array.map(function(element){
                return element.Uid;
            }).indexOf(uid);
            return index;
        }*/

        /**
        * groupByYear
        * @description - take an array and grouping it by Year
        * @function
        * @return {Array<any>} newArrayGroupedByYear - Returns an array grouped by Year
        */
        /*groupByYear(array): any {
            let newArrayGroupedByYear = _.groupBy(array, function(item:any) {
                return item.dateCreated.year;
            });

            return newArrayGroupedByYear;
        }*/


        /**
        * arrayToObject
        * @description - change an Array to firebase object.
        * @example - array = [{title: 'text'}, {title: 'text'}]
                return  firebaseObject = {
                            367990d1-258b-404a-aa32-b29125fcde3e: {title: 'text'},
                            e8f703e7-6970-462c-88ae-66d1e9bf4792: {title: 'text'}
                        }
        * @function
        * @params {Array<any>} array - list of data
        * @return {Array<any>} newArrayGroupedByYear - Returns an array grouped by Year
        */
        /*arrayToObject(array): any {
            let newObject = {};

            for (let i = 0; i < array.length; ++i) {
                if (array[i] !== undefined) {
                    newObject[array[i].uid] = array[i];
                }
            }

            return newObject;
        }*/



    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('mainApp.core.util', [])
    .service(FunctionsUtilService.serviceId, FunctionsUtilService);

}
