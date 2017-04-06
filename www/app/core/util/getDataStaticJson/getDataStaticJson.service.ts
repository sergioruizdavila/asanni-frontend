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
        returnValuei18n: (type: string, code: any) => string;
        getMonthi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getSexi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getCountryi18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getLanguagei18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getDegreei18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getTypeOfImmersionTeacheri18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
        getTypeOfImmersionSchooli18n: () => Array<app.core.interfaces.IDataFromJsonI18n>;
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
        * returnValuei18n
        * @description - return value based on code from i18n json
        * @use - this.getDataFromJson.returnValuei18n('country', 'CO');
        * @function
        * @return {string} object's key from json i18n (e.g. '%country.CO')
        */
        returnValuei18n(type: string, code: any): string {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let key = '';

            for (var element in jsonDoc) {
                if (element.indexOf(type) >= 0) {

                    let regex = new RegExp('%' + type + '.', 'g');
                    let codeFromJson = element.replace(regex,'');
                    if(codeFromJson == code) {
                        key = element;
                    }

                }
            }

            return key;

        }



        /**
        * getMonthi18n
        * @description - get months texts & codes from i18n json files
        * @use - this.getDataFromJson.getMonthi18n();
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
        * @use - this.getDataFromJson.getSexi18n();
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
        * @use - this.getDataFromJson.getCountryi18n();
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
        * @use - this.getDataFromJson.getLanguagei18n();
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



        /**
        * getDegreei18n
        * @description - get degree texts & codes from i18n json files
        * @use - this.getDataFromJson.getDegreei18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} degree object array
        */
        getDegreei18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("degree") >= 0) {

                    let code = element.replace(/%degree./g,'');
                    array.push({value: element, code: code});
                }
            }

            return array;

        }



        /**
        * getTypeOfImmersionTeacheri18n
        * @description - get teacher type of immersion texts & codes from i18n json files
        * @use - this.getDataFromJson.getTypeOfImmersionTeacheri18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} typeOfImmersion object array
        */
        getTypeOfImmersionTeacheri18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("immersion.teacher") >= 0) {

                    let code = element.replace(/%immersion.teacher./g,'');
                    array.push({value: element, code: code});
                }
            }

            return array;

        }



        /**
        * getTypeOfImmersionSchooli18n
        * @description - get school type of immersion texts & codes from i18n json files
        * @use - this.getDataFromJson.getTypeOfImmersionSchooli18n();
        * @function
        * @return {Array<app.core.interfaces.IDataFromJsonI18n>} typeOfImmersion object array
        */
        getTypeOfImmersionSchooli18n(): Array<app.core.interfaces.IDataFromJsonI18n> {
            //VARIABLES
            let jsonDoc = this.$translate.getTranslationTable();
            let array = [];

            for (var element in jsonDoc) {
                if (element.indexOf("immersion.school") >= 0) {

                    let code = element.replace(/%immersion.school./g,'');
                    array.push({value: element, code: code});
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
