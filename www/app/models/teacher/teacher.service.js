var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher) {
            'use strict';
            var TeacherService = (function () {
                function TeacherService(restApi) {
                    this.restApi = restApi;
                    console.log('teacher service instanced');
                }
                TeacherService.prototype.getTeacherById = function (id) {
                    var url = 'teachers/';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                TeacherService.prototype.getAllTeachers = function () {
                    var url = 'teachers/';
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                return TeacherService;
            }());
            TeacherService.serviceId = 'mainApp.models.teacher.TeacherService';
            TeacherService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            teacher.TeacherService = TeacherService;
            angular
                .module('mainApp.models.teacher', [])
                .service(TeacherService.serviceId, TeacherService);
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=teacher.service.js.map