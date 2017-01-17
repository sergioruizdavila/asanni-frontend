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
        getAllTeachersByStatus: (status) => angular.IPromise<any>;
        createTeacher: (teacher: app.models.teacher.Teacher) => angular.IPromise<any>;
        updateTeacher: (teacher: app.models.teacher.Teacher) => angular.IPromise<any>;
        createExperience: (teacherId: string, experience: app.models.teacher.Experience) => angular.IPromise<any>;
        updateExperience: (teacherId: string, experience: app.models.teacher.Experience) => angular.IPromise<any>;
        createEducation: (teacherId: string, education: app.models.teacher.Education) => angular.IPromise<any>;
        updateEducation: (teacherId: string, education: app.models.teacher.Education) => angular.IPromise<any>;
        createCertificate: (teacherId: string, certificate: app.models.teacher.Certificate) => angular.IPromise<any>;
        updateCertificate: (teacherId: string, certificate: app.models.teacher.Certificate) => angular.IPromise<any>;
    }

    export interface ITeacherQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.teacher.Teacher>;
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
            let url = 'teachers';

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
        * getAllTeachersByStatus
        * @description - get all Teachers by status filter value
        * @function
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllTeachersByStatus(status): angular.IPromise<any> {
            //VARIABLES
            let url = 'teachers?status=' + status;

            return this.restApi.queryObject({url: url}).$promise
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
            let url = 'teachers';

            return this.restApi.queryObject({url: url}).$promise
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
        * createTeacher
        * @description - create Teacher entity on DB
        * @function
        * @params {app.models.teacher.Teacher} teacher - teacher Object
        * @return {promise} promise - Return a promise of "Add Teacher Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createTeacher(teacher): ng.IPromise<any> {
            var promise;
            let url = 'teachers';
            promise = this.restApi.create({ url: url }, teacher)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * updateTeacher
        * @description - update Teacher entity on DB
        * @function
        * @params {app.models.teacher.Teacher} teacher - teacher Object
        * @return {promise} promise - Return a promise of "Add Teacher Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        updateTeacher(teacher): ng.IPromise<any> {
            var promise;
            let url = 'teachers';
            promise = this.restApi.update({ url: url, id: teacher.Id }, teacher)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * createExperience
        * @description - create Teacher's experience entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Experience} experience - experience Object
        * @return {promise} promise - Return a promise of "Add Teacher's Experience Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createExperience(teacherId, experience): angular.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/experiences';
            promise = this.restApi.create({ url: url }, experience)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * updateExperience
        * @description - update Teacher's Experience entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Experience} experience - experience Object
        * @return {promise} promise - Return a promise of "Update Teacher's Experience Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        updateExperience(teacherId, experience): ng.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/experiences';
            promise = this.restApi.update({ url: url, id: experience.Id }, experience)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * createEducation
        * @description - create Teacher's education entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Education} education - education Object
        * @return {promise} promise - Return a promise of "Add Teacher's Education Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createEducation(teacherId, education): angular.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/educations';
            promise = this.restApi.create({ url: url }, education)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * updateEducation
        * @description - update Teacher's Education entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Education} education - education Object
        * @return {promise} promise - Return a promise of "Update Teacher's Education Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        updateEducation(teacherId, education): ng.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/educations';
            promise = this.restApi.update({ url: url, id: education.Id }, education)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * createCertificate
        * @description - create Teacher's certificate entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Certificate} certificate - certificate Object
        * @return {promise} promise - Return a promise of "Add Teacher's Certificate Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createCertificate(teacherId, certificate): angular.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/certificates';
            promise = this.restApi.create({ url: url }, certificate)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * updateCertificate
        * @description - update Teacher's Certificate entity on DB
        * @function
        * @params {string} teacherId - teacher Object
        * @params {app.models.teacher.Certificate} certificate - certificate Object
        * @return {promise} promise - Return a promise of "Update Teacher's Certificate Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        updateCertificate(teacherId, certificate): ng.IPromise<any> {
            var promise;
            let url = 'teachers/' + teacherId + '/certificates';
            promise = this.restApi.update({ url: url, id: certificate.Id }, certificate)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
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
        .module('mainApp.models.teacher', [])
        .service(TeacherService.serviceId, TeacherService);

}
