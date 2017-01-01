/**
 * LandingPageService
 * @description - Services related on Student Landing Page Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.pages.landingPage {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ILandingPageService {
        createEarlyAdopter: (userData) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class LandingPageService implements ILandingPageService {

        static serviceId = 'mainApp.pages.landingPage.LandingPageService';

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
        * @use - this.LandingPageService.createEarlyAdopter();
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
        .module('mainApp.pages.landingPage')
        .service(LandingPageService.serviceId, LandingPageService);

}
