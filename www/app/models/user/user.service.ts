/**
 * UserService
 * @description - Services related on User Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.user {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserService {
        getUserById: (id: string) => angular.IPromise<any>;
        getAllUsers: () => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserService implements IUserService {

        static serviceId = 'mainApp.models.user.UserService';

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
            console.log('user service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getUserById
        * @description - get user by Id
        * @use - this.UserService.getUserById('98d667ae');
        * @function
        * @params {string} id - user id
        * @return {angular.IPromise<any>} promise - return user by Id
        */
        getUserById(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'users';

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
        * getAllUsers
        * @description - get all Users
        * @function
        * @return {angular.IPromise<any>} return a promise with
        * users list
        */
        getAllUsers(): angular.IPromise<any> {
            //VARIABLES
            let url = 'users';

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
        .module('mainApp.models.user', [])
        .service(UserService.serviceId, UserService);

}
