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
        getTeacherByProfileId: (profileId: string) => angular.IPromise<any>;
        getAllTeachers: () => angular.IPromise<any>;
        getAllTeachersByStatus: (status) => angular.IPromise<any>;
        getAllTeachersByCountry: (countryId) => angular.IPromise<any>;
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
        TEACHER_URI: string;
        PROFILE_TEACHER_URI: string;
        STATUS_TEACHER_URI: string;
        COUNTRY_TEACHER_URI: string;
        EXPERIENCES_URI: string;
        EDUCATIONS_URI: string;
        CERTIFICATES_URI: string;
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
            DEBUG && console.log('teacher service instanced');

            //CONSTANTS
            this.TEACHER_URI = 'teachers';
            this.PROFILE_TEACHER_URI = 'teachers?profileId=';
            this.STATUS_TEACHER_URI = 'teachers?status=';
            this.COUNTRY_TEACHER_URI = 'teachers?country=';
            this.EXPERIENCES_URI = 'experiences';
            this.EDUCATIONS_URI = 'educations';
            this.CERTIFICATES_URI = 'certificates';
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getTeacherById
        * @description - get teacher by Id
        * @use - this.TeacherService.getTeacherById('98d667ae');
        * @function
        * @params {string} id - user id
        * @return {angular.IPromise<any>} promise - return teacher by Id
        */
        getTeacherById(id): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI;
            let deferred = this.$q.defer();

            this.restApi.show({url: url, id: id}).$promise
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



        /**
        * getTeacherByProfileId
        * @description - get teacher by user profile id filter value
        * @function
        * @return {angular.IPromise<any>} return a promise with user profile teacher data
        */
        getTeacherByProfileId(profileId): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.PROFILE_TEACHER_URI + profileId;
            let deferred = this.$q.defer();

            this.restApi.queryObject({url: url}).$promise
                .then(
                    function(response) {
                        if(response.results) {
                            let res = response.results[0] ? response.results[0] : '';
                            deferred.resolve(res);
                        } else {
                            DEBUG && console.error(response);
                            deferred.reject(response);
                        }
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



        /**
        * getAllTeachersByStatus
        * @description - get all Teachers by status filter value
        * @function
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllTeachersByStatus(status): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.STATUS_TEACHER_URI + status;
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



        /**
        * getAllTeachersByCountry
        * @description - get all Teachers by status and country filter value
        * @function
        * @param {number} countryId - country id
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllTeachersByCountry(countryId): angular.IPromise<any> {
            //CONSTANTS
            const statusParamUrl = '&status=VA';
            //VARIABLES
            let self = this;
            let url = this.COUNTRY_TEACHER_URI + countryId + statusParamUrl;
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



        /**
        * getAllTeachers
        * @description - get all Teachers
        * @function
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllTeachers(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI;
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



        /**
        * createTeacher
        * @description - create Teacher entity on DB
        * @function
        * @params {app.models.teacher.Teacher} teacher - teacher Object
        * @return {promise} promise - Return a promise of "Add Teacher Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createTeacher(teacher): ng.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI;
            let deferred = this.$q.defer();

            this.restApi.create({ url: url }, teacher).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI;
            let deferred = this.$q.defer();

            this.restApi.update({ url: url, id: teacher.Id }, teacher).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
            let deferred = this.$q.defer();

            this.restApi.create({ url: url }, experience).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.log(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
            let deferred = this.$q.defer();

            this.restApi.update({ url: url, id: experience.Id }, experience).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
            let deferred = this.$q.defer();

            this.restApi.create({ url: url }, education).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
            let deferred = this.$q.defer();

            this.restApi.update({ url: url, id: education.Id }, education).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
            let deferred = this.$q.defer();

            this.restApi.create({ url: url }, certificate).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
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
            //VARIABLES
            let self = this;
            let url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
            let deferred = this.$q.defer();

            this.restApi.update({ url: url, id: certificate.Id }, certificate).$promise
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
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
        .module('mainApp.models.teacher', [])
        .service(TeacherService.serviceId, TeacherService);

}
