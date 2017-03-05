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
        EARLY_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService',
            '$q'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private restApi: app.core.restApi.IRestApi,
            private $q: angular.IQService) {
            //CONSTANTS
            this.EARLY_URI = 'early';
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
            let url = this.EARLY_URI;
            let deferred = this.$q.defer();

            this.restApi.create({url: url}, userData).$promise
            .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.landingPage')
        .service(LandingPageService.serviceId, LandingPageService);

}
