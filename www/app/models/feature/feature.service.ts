/**
 * FeatureService
 * @description - Services related on Feature Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.feature {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFeatureService {
        getFeaturesByRange: (minId: number) => angular.IPromise<any>;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FeatureService implements IFeatureService {

        static serviceId = 'mainApp.models.feature.FeatureService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        FEATURE_URI: string;
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
            this.FEATURE_URI = 'features';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getFeaturesByRange
        * @description - get feature by a range of id
        * @use - this.FeatureService.getFeaturesByRange('98d667ae');
        * @function
        * @param {number} minId - feature minimun id
        * @return {angular.IPromise<any>} promise - return features list since minimun id
        */
        getFeaturesByRange(minId: number): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.FEATURE_URI + '?minId=' + minId;
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
        .module('mainApp.models.feature', [])
        .service(FeatureService.serviceId, FeatureService);

}
