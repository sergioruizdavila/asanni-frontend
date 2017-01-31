/**
 * RegisterService
 * @description - A service for handling user registration.
 */

module app.models.user {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IRegisterService {
        //TODO: Poner los metodos aqui
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class RegisterService implements IRegisterService {

        static serviceId = 'mainApp.models.user.RegisterService';

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
            console.log('register service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        checkEmail(value): angular.IPromise<any> {
            //VARIABLES
            let url = '/register/check-email/';

            return this.restApi.create({url: url}, value).$promise
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



        checkUsername(value): angular.IPromise<any> {
            //VARIABLES
            let url = '/register/check-username/';

            return this.restApi.create({url: url}, value).$promise
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


        register(value): angular.IPromise<any> {
            //VARIABLES
            var promise;
            let url = 'register/';
            promise = this.restApi.create({url: url}, value)
                .$promise.then(
                    function(data) {
                        return data;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );
            return promise;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.user', [])
        .service(RegisterService.serviceId, RegisterService);

}
