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
        getMonthi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getSexi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getCountryi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getLanguagei18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
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
        * @description - get months texts & codes from i18n json files
        * @use - this.FunctionsUtilService.getMonthi18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} months object array
        */
        getMonthi18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("month") >= 0) {

                    let code = element.replace(/%month./g,'');
                    array.push({value: element, code: code});
                }
            }

            return array;

        }



        /**
        * getSexi18n
        * @description - get user's sex texts & codes from i18n json files
        * @use - this.FunctionsUtilService.getSexi18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} sexs object array
        */
        getSexi18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("sex") >= 0) {

                    let code = element.replace(/%sex./g,'');
                    array.push({value: element, code: code});
                }
            }

            return array;

        }



        /**
        * getCountryi18n
        * @description - get countries texts & codes from i18n json files
        * @use - this.FunctionsUtilService.getCountryi18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} countries object array
        */
        getCountryi18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("country") >= 0) {

                    let code = element.replace(/%country./g,'');
                    array.push({value: element, code: code});
                }
            }

            return array;

        }



        /**
        * getLanguagei18n
        * @description - get languages texts & codes from i18n json files
        * @use - this.FunctionsUtilService.getLanguagei18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} languages object array
        */
        getLanguagei18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("language") >= 0) {

                    let code = element.replace(/%language./g,'');
                    let value = jsonDoc[element];
                    array.push({value: value, code: code});
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
