/**
 * CountryService
 * @description - Services related on Country Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.country {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICountryService {
        getCountryByAlias: (aliasCountry: string) => angular.IPromise<any>;
        getAllCountries: () => angular.IPromise<any>;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CountryService implements ICountryService {

        static serviceId = 'mainApp.models.country.CountryService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        COUNTRY_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService',
            'mainApp.auth.AuthService',
            '$q'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private restApi: app.core.restApi.IRestApi,
            private AuthService: app.auth.IAuthService,
            private $q: angular.IQService) {
            //LOG
            DEBUG && console.log('feature service instanced');

            //CONSTANTS
            this.COUNTRY_URI = 'countries';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getCountryByAlias
        * @description - get country by Alias Country
        * @use - this.CountryService.getCountryByAlias('new-zealand');
        * @function
        * @param {string} aliasCountry - alias country value
        * @return {angular.IPromise<any>} promise - return country by Alias
        */
        getCountryByAlias(aliasCountry: string): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.COUNTRY_URI + '/' + aliasCountry;
            let deferred = this.$q.defer();

            this.restApi.show({url: url}).$promise
                .then(
                    function(response) {
                        deferred.resolve(response);
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }


        /**
        * getAllCountries
        * @description - get all Countries
        * @function
        * @return {angular.IPromise<any>} return a promise with Countries list
        */
        getAllCountries(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.COUNTRY_URI;
            let deferred = this.$q.defer();

            this.restApi.queryObject({url: url}).$promise
                .then(
                    function(response) {
                        deferred.resolve(response);
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.country', [])
        .service(CountryService.serviceId, CountryService);

}
