var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher_1) {
            'use strict';
            var TeacherService = (function () {
                function TeacherService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    DEBUG && console.log('teacher service instanced');
                    this.TEACHER_URI = 'teachers';
                    this.PROFILE_TEACHER_URI = 'teachers?profileId=';
                    this.STATUS_TEACHER_URI = 'teachers?status=';
                    this.COUNTRY_TEACHER_URI = 'teachers?country=';
                    this.EXPERIENCES_URI = 'experiences';
                    this.EDUCATIONS_URI = 'educations';
                    this.CERTIFICATES_URI = 'certificates';
                }
                TeacherService.prototype.getTeacherById = function (id) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getTeacherByProfileId = function (profileId) {
                    var self = this;
                    var url = this.PROFILE_TEACHER_URI + profileId;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        if (response.results) {
                            var res = response.results[0] ? response.results[0] : '';
                            deferred.resolve(res);
                        }
                        else {
                            DEBUG && console.error(response);
                            deferred.reject(response);
                        }
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getAllTeachersByStatus = function (status) {
                    var self = this;
                    var url = this.STATUS_TEACHER_URI + status;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getAllTeachersByCountry = function (countryId) {
                    var statusParamUrl = '&status=VA';
                    var self = this;
                    var url = this.COUNTRY_TEACHER_URI + countryId + statusParamUrl;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getAllTeachers = function () {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createTeacher = function (teacher) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, teacher).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateTeacher = function (teacher) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: teacher.Id }, teacher).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createExperience = function (teacherId, experience) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, experience).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.log(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateExperience = function (teacherId, experience) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: experience.Id }, experience).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createEducation = function (teacherId, education) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, education).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateEducation = function (teacherId, education) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: education.Id }, education).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createCertificate = function (teacherId, certificate) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, certificate).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateCertificate = function (teacherId, certificate) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: certificate.Id }, certificate).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.serviceId = 'mainApp.models.teacher.TeacherService';
                TeacherService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return TeacherService;
            }());
            teacher_1.TeacherService = TeacherService;
            angular
                .module('mainApp.models.teacher', [])
                .service(TeacherService.serviceId, TeacherService);
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/teacher/teacher.service.js.map
