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
            DEBUG && console.log('account service instanced');

            //CONSTANTS
            this.ACCOUNT_URI = 'account';
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

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.account', [])
        .service(AccountService.serviceId, AccountService);

}
