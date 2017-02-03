var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher_1) {
            'use strict';
            var TeacherService = (function () {
                function TeacherService(restApi) {
                    this.restApi = restApi;
                    console.log('teacher service instanced');
                    this.TEACHER_URI = 'teachers';
                    this.STATUS_TEACHER_URI = 'teachers?status=';
                    this.EXPERIENCES_URI = 'experiences';
                    this.EDUCATIONS_URI = 'educations';
                    this.CERTIFICATES_URI = 'certificates';
                }
                TeacherService.prototype.getTeacherById = function (id) {
                    var url = this.TEACHER_URI;
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.getAllTeachersByStatus = function (status) {
                    var url = this.STATUS_TEACHER_URI + status;
                    return this.restApi.queryObject({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.getAllTeachers = function () {
                    var url = this.TEACHER_URI;
                    return this.restApi.queryObject({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.createTeacher = function (teacher) {
                    var url = this.TEACHER_URI;
                    return this.restApi.create({ url: url }, teacher).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.updateTeacher = function (teacher) {
                    var url = this.TEACHER_URI;
                    return this.restApi.update({ url: url, id: teacher.Id }, teacher).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.createExperience = function (teacherId, experience) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    return this.restApi.create({ url: url }, experience).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.log(error);
                        return error;
                    });
                };
                TeacherService.prototype.updateExperience = function (teacherId, experience) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    return this.restApi.update({ url: url, id: experience.Id }, experience).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.createEducation = function (teacherId, education) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    return this.restApi.create({ url: url }, education).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.updateEducation = function (teacherId, education) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    return this.restApi.update({ url: url, id: education.Id }, education).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.createCertificate = function (teacherId, certificate) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    return this.restApi.create({ url: url }, certificate).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                TeacherService.prototype.updateCertificate = function (teacherId, certificate) {
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    return this.restApi.update({ url: url, id: certificate.Id }, certificate).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                return TeacherService;
            }());
            TeacherService.serviceId = 'mainApp.models.teacher.TeacherService';
            TeacherService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            teacher_1.TeacherService = TeacherService;
            angular
                .module('mainApp.models.teacher', [])
                .service(TeacherService.serviceId, TeacherService);
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=teacher.service.js.map