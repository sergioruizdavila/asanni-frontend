/**
 * StudentLandingPageService
 * @description - Services related on Student Landing Page Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.pages.studentLandingPage {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IStudentLandingPageService {
        createEarlyAdopter: (userData) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class StudentLandingPageService implements IStudentLandingPageService {

        static serviceId = 'mainApp.pages.studentLandingPage.StudentLandingPageService';

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

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * createEarlyAdopter
        * @description - create early adopter object
        * @use - this.StudentLandingPageService.createEarlyAdopter();
        * @function
        * @return {angular.IPromise<any>} promise - return early adopter object
        */
        createEarlyAdopter(userData): angular.IPromise<any> {
            //VARIABLES
            let url = 'early/';

            return this.restApi.create({url: url}, userData).$promise
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
        .module('mainApp.models.user', [])
        .service(StudentLandingPageService.serviceId, StudentLandingPageService);

}
