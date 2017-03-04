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
        getUserProfileById: (id: string) => angular.IPromise<any>;
        getAllUsersProfile: () => angular.IPromise<any>;
        updateUserProfile: (user: app.models.user.Profile) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserService implements IUserService {

        static serviceId = 'mainApp.models.user.UserService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        USER_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService',
            'mainApp.auth.AuthService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private restApi: app.core.restApi.IRestApi,
            private AuthService: app.auth.IAuthService) {
            //LOG
            console.log('user service instanced');
            //CONSTANTS
            this.USER_URI = 'users';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getUserProfileById
        * @description - get user by Id
        * @use - this.UserService.getUserProfileById('98d667ae');
        * @function
        * @params {string} id - user id
        * @return {angular.IPromise<any>} promise - return user profile by Id
        */
        getUserProfileById(id): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.USER_URI;

            return this.restApi.show({url: url, id: id}).$promise
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    }
                );
        }



        /**
        * getAllUsersProfile
        * @description - get all Users Profiles
        * @function
        * @return {angular.IPromise<any>} return a promise with
        * users list
        */
        getAllUsersProfile(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.USER_URI;

            return this.restApi.query({url: url}).$promise
                .then(
                    function(data) {
                        return data;
                    }
                ).catch(
                    function(error) {
                        DEBUG && console.log(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    }
                );
        }



        /**
        * updateUserProfile
        * @description - update User information entity on DB
        * @function
        * @params {app.models.user.Profile} user - user profile Object
        * @return {promise} promise - Return a promise of "Updated User Profile".
        * @return {object} response - Returns response about If request was success or error.
        */
        updateUserProfile(profile): ng.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.USER_URI;

            return this.restApi.update({ url: url, id: profile.userId }, profile).$promise
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    }
                );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.user', [])
        .service(UserService.serviceId, UserService);

}
