/**
* getDataStaticJsonService
* @description - get data from static jsons service
* @constructor
*/

module app.core.util.getDataStaticJson {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IGetDataStaticJsonService {
        getMonthi18n: () => Array<string>;
    }

    export interface IAppTranslate extends angular.translate.ITranslateService {
        getTranslationTable: () => Object;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class GetDataStaticJsonService implements IGetDataStaticJsonService {

        static serviceId = 'mainApp.core.util.GetDataStaticJsonService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$translate'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $translate: IAppTranslate) {
            console.log('getDataStaticJsonService service called');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getMonthi18n
        * @description - build each marker on a specific map (based on a dataSet)
        * @use - this.FunctionsUtilService.buildMarkersOnMap(data, 2);
        * @function
        * @params {Array<any>} dataSet - dataSet array
        * @params {string} mapType - map type
        * @params {components.map.IPosition} position - position on map (lat and lng)
        * @return {components.map.IMapConfig} mapConfig - google map config.
        */
        getMonthi18n(): Array<string> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("month") >= 0) {
                    array.push(element);
                }
            }

            return array;

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('mainApp.core.util')
    .service(GetDataStaticJsonService.serviceId, GetDataStaticJsonService);

}
