/**
 * AccountService
 * @description - Services related on User's Account.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.account {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAccountService {
        getAccount:() => angular.IPromise<any>;
        getUsername:(email: string) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AccountService implements IAccountService {

        static serviceId = 'mainApp.account.AccountService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ACCOUNT_URI: string;
        ACCOUNT_GET_USERNAME_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$q',
            'mainApp.core.restApi.restApiService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $q: angular.IQService,
                    private restApi: app.core.restApi.IRestApi) {
            //LOG
            DEBUG && console.log('account service instanced');

            //CONSTANTS
            this.ACCOUNT_URI = 'account';
            this.ACCOUNT_GET_USERNAME_URI = 'account/username';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getAccount
        * @description - get account information
        * @use - this.AccountService.getAccount();
        * @function
        * @return {angular.IPromise<any>} promise - return user's account data
        */

        getAccount(): angular.IPromise<any> {
            //VARIABLES
            let url = this.ACCOUNT_URI;

            return this.restApi.show({url: url}).$promise
                .then(
                    function(response) {
                        return response;
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        return error;
                    }
                );
        }


        /**
        * getUsername
        * @description - Getting an username with a given email
        * @use - this.AccountService.getUsername();
        * @function
        * @param {string} email - user's email
        * @return {angular.IPromise<any>} promise
        */

        getUsername(email): angular.IPromise<any> {
            //VARIABLES
            let url = this.ACCOUNT_GET_USERNAME_URI;
            let deferred = this.$q.defer();
            let data = {
                email: email
            };

            this.restApi.create({url: url}, data).$promise
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
        .module('mainApp.account', [])
        .service(AccountService.serviceId, AccountService);

}
