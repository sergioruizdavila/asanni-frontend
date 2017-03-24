var app;
(function (app) {
    var models;
    (function (models) {
        var student;
        (function (student) {
            'use strict';
            var StudentService = (function () {
                function StudentService(restApi) {
                    this.restApi = restApi;
                    console.log('student service instanced');
                }
                StudentService.prototype.getStudentById = function (id) {
                    var url = 'students';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.prototype.getAllStudents = function () {
                    var url = 'students';
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.prototype.getRatingByEarlyid = function (id) {
                    var url = 'ratings';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.serviceId = 'mainApp.models.student.StudentService';
                StudentService.$inject = [
                    'mainApp.core.restApi.restApiService'
                ];
                return StudentService;
            }());
            student.StudentService = StudentService;
            angular
                .module('mainApp.models.student', [])
                .service(StudentService.serviceId, StudentService);
        })(student = models.student || (models.student = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/student/student.service.js.map
