var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            'use strict';
            var SchoolService = (function () {
                function SchoolService(restApi) {
                    this.restApi = restApi;
                    console.log('school service instanced');
                }
                SchoolService.prototype.getSchoolById = function (id) {
                    var url = 'schools/';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                SchoolService.prototype.getAllSchools = function () {
                    var url = 'schools/';
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                return SchoolService;
            }());
            SchoolService.serviceId = 'mainApp.models.school.SchoolService';
            SchoolService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            school.SchoolService = SchoolService;
            angular
                .module('mainApp.models.school', [])
                .service(SchoolService.serviceId, SchoolService);
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=school.service.js.map