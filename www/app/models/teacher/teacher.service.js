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
                }
                TeacherService.prototype.getTeacherById = function (id) {
                    var url = 'teachers';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                TeacherService.prototype.getAllTeachers = function () {
                    var url = 'teachers';
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                TeacherService.prototype.createTeacher = function (teacher) {
                    var promise;
                    var url = 'teachers';
                    promise = this.restApi.create({ url: url }, teacher)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                TeacherService.prototype.updateTeacher = function (teacher) {
                    var promise;
                    var url = 'teachers';
                    promise = this.restApi.update({ url: url, id: teacher.Id }, teacher)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                TeacherService.prototype.createExperience = function (teacherId, experience) {
                    var promise;
                    var url = 'teachers/' + teacherId + '/experiences';
                    promise = this.restApi.create({ url: url }, experience)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                TeacherService.prototype.updateExperience = function (teacherId, experience) {
                    var promise;
                    var url = 'teachers/' + teacherId + '/experiences';
                    promise = this.restApi.update({ url: url, id: experience.Id }, experience)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
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