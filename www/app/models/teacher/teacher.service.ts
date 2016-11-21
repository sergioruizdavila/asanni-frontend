/**
 * TeacherService
 * @description - Services related on Teacher Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.teacher {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherService {
        getTeacherById: (id: string) => angular.IPromise<any>;
        getAllTeachers: () => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherService implements ITeacherService {

        static serviceId = 'mainApp.models.teacher.TeacherService';

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
            console.log('teacher service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getTeacherById
        * @description - get teacher by Id
        * @use - this.TeacherService.getUserById('98d667ae');
        * @function
        * @params {string} id - user id
        * @return {angular.IPromise<any>} promise - return teacher by Id
        */
        getTeacherById(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'teachers/';

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
        * getAllTeachers
        * @description - get all Teachers
        * @function
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllTeachers(): angular.IPromise<any> {
            //VARIABLES
            let url = 'teachers/';

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
        .module('mainApp.models.teacher', [])
        .service(TeacherService.serviceId, TeacherService);

}
