/**
 * RegisterService
 * @description - A service for handling user registration.
 */

module app.register {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IRegisterService {
        register: (userData: IRegisterUserData) => angular.IPromise<any>;
        checkEmail:(email) => angular.IPromise<any>;
        checkUsername:(username) => angular.IPromise<any>;

    }

    export interface IRegisterUserData {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        password: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class RegisterService implements IRegisterService {

        static serviceId = 'mainApp.register.RegisterService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        REGISTER_URI: string;
        REGISTER_CHECK_EMAIL_URI: string;
        REGISTER_CHECK_USERNAME_URI: string;
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
            DEBUG && console.log('register service instanced');

            //CONSTANTS
            this.REGISTER_URI = 'register';
            this.REGISTER_CHECK_EMAIL_URI = '/register/check-email/';
            this.REGISTER_CHECK_USERNAME_URI = '/register/check-username/';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * checkEmail
        * @description - check if email already exists on DB
        * @use - this.RegisterService.checkEmail();
        * @function
        * @param {string} email - user's email
        * @return {angular.IPromise<any>} promise
        */

        checkEmail(email): angular.IPromise<any> {
            //VARIABLES
            let url = this.REGISTER_CHECK_EMAIL_URI;

            return this.restApi.create({url: url}, email).$promise
                .then(
                    function(data) {
                        return data;
                    },

                    function(error) {
                        DEBUG && console.error(error);
                        return error;
                    }
                );
        }



        /**
        * checkUsername
        * @description - check if username already exists on DB
        * @use - this.RegisterService.checkUsername();
        * @function
        * @param {string} username - user's username
        * @return {angular.IPromise<any>} promise
        */

        checkUsername(username): angular.IPromise<any> {
            //VARIABLES
            let url = this.REGISTER_CHECK_USERNAME_URI;

            return this.restApi.create({url: url}, username).$promise
                .then(
                    function(data) {
                        return data;
                    },

                    function(error) {
                        DEBUG && console.log(error);
                        return error;
                    }
                );
        }



        /**
        * register
        * @description - Tried to create user account on DB
        * @use - this.RegisterService.register();
        * @function
        * @param {IRegisterUserData} userData - user basic data to create account
        * (username, password, first_name, last_name, email)
        * @return {angular.IPromise<any>} promise
        */

        register(userData): angular.IPromise<any> {
            //VARIABLES
            let url = this.REGISTER_URI;

            return this.restApi.create({url: url}, userData).$promise
                .then(
                    function(data) {
                        return data;
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
        .module('mainApp.register', [])
        .service(RegisterService.serviceId, RegisterService);

}
