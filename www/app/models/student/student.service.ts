/**
 * StudentService
 * @description - Services related on Student Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.student {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IStudentService {
        getStudentById: (id: string) => angular.IPromise<any>;
        getAllStudents: () => angular.IPromise<any>;
        getRatingByEarlyid: (id: string) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class StudentService implements IStudentService {

        static serviceId = 'mainApp.models.student.StudentService';

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
            console.log('student service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getStudentById
        * @description - get teacher by Id
        * @use - this.StudentService.getStudentByUid('98d667ae');
        * @function
        * @params {string} id - student id
        * @return {angular.IPromise<any>} promise - return student by Id
        */
        getStudentById(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'students';

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
        * getAllStudents
        * @description - get all Students
        * @function
        * @return {angular.IPromise<any>} return a promise with
        * students list
        */
        getAllStudents(): angular.IPromise<any> {
            //VARIABLES
            let url = 'students';

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



        /** TODO: Mover a su respectivo lugar cuando se cree el modelo independiente
        * de Rating
        * getRatingByEarlyid
        * @description - get rating by Early Id
        * @use - this.StudentService.getRatingByEarlyid('98d667ae');
        * @function
        * @params {string} id - early adopter id
        * @return {angular.IPromise<any>} promise - return rating by Ealry Adopter Id
        */
        getRatingByEarlyid(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'ratings';

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

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.student', [])
        .service(StudentService.serviceId, StudentService);

}
