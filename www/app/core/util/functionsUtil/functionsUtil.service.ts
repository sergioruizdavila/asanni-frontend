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
        generateRangesOfNumbers: (from: number, to:number) => Array<number>;
        dateFormat: (date: string) => string;
        joinDate: (day:string, month:string, year:string) => string;
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
        * dateFormat
        * @description - format a date to 'YYYY-MM-DD'
        * @use - this.FunctionsUtilService.dateFormat('June 10, 2016');
        * @function
        * @params {string} date - date to format
        * @return {string} dateFormatted - date formatted.
        */
        dateFormat(date: string): string {
            let dateFormatted = moment(date).format('YYYY-MM-DD');
            return dateFormatted;
        }

        /**
        * joinDate
        * @description - join separate values (day, month and year) and formatting
        * a date to 'YYYY-MM-DD'
        * @use - this.FunctionsUtilService.joinDate(obj);
        * @function
        * @params {string} day - day value
        * @params {string} month - month value
        * @params {string} year - year value
        * @return {string} dateFormatted - date formatted.
        */
        joinDate(day, month, year): string {
            let newDate = year + '-' + month + '-' + day;
            let dateFormatted = moment(newDate).format('YYYY-MM-DD');
            return dateFormatted;
        }

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


        /**
        * generateRangesOfNumbers
        * @description - generate a range of numbers (i.e from 3 until 34)
        * @use - this.FunctionsUtilService.generateRangesOfNumbers(1, 31);
        * @function
        * @params {number} from - start number
        * @params {number} to - finish number
        * @return {Array<number>} array - range of numbers array.
        */
        generateRangesOfNumbers(from, to): Array<number> {
            var array = [];
            for (var i = from; i <= to; i++) {
                array.push(i);
            }
            return array;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('mainApp.core.util', [])
    .service(FunctionsUtilService.serviceId, FunctionsUtilService);

}
