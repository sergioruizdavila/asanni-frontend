/**
 * SchoolService
 * @description - Services related on School Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.school {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISchoolService {
        getSchoolById: (id: string) => angular.IPromise<any>;
        getAllSchools: () => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SchoolService implements ISchoolService {

        static serviceId = 'mainApp.models.school.SchoolService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private restApi: app.core.restApi.IRestApi) {
            //LOG
            console.log('school service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getSchoolById
        * @description - get school by Id
        * @use - this.SchoolService.getSchoolById('98d667ae');
        * @function
        * @params {string} id - school id
        * @return {angular.IPromise<any>} promise - return school by Id
        */
        getSchoolById(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'schools/';

            return this.restApi.show({url: url, id: id}).$promise
                .then(
                    function(data) {
                        return data;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );
        }

        /**
        * getAllSchools
        * @description - get all Schools
        * @function
        * @return {angular.IPromise<any>} return a promise with schools list
        */
        getAllSchools(): angular.IPromise<any> {
            //VARIABLES
            let url = 'schools/';

            return this.restApi.query({url: url}).$promise
                .then(
                    function(data) {
                        return data;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.school', [])
        .service(SchoolService.serviceId, SchoolService);

}
