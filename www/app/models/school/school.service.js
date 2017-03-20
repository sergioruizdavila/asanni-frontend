var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            'use strict';
            var SchoolService = (function () {
                function SchoolService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    DEBUG && console.log('schools service instanced');
                    this.SCHOOL_URI = 'schools';
                    this.USER_SCHOOL_URI = 'schools?userId=';
                }
                SchoolService.prototype.getSchoolById = function (id) {
                    var self = this;
                    var url = this.SCHOOL_URI;
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
                SchoolService.prototype.getSchoolByUserId = function (userId) {
                    var self = this;
                    var url = this.USER_SCHOOL_URI + userId;
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
                SchoolService.prototype.getAllSchools = function () {
                    var self = this;
                    var url = this.SCHOOL_URI;
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
                return SchoolService;
            }());
            SchoolService.serviceId = 'mainApp.models.school.SchoolService';
            SchoolService.$inject = [
                'mainApp.core.restApi.restApiService',
                'mainApp.auth.AuthService',
                '$q'
            ];
            school.SchoolService = SchoolService;
            angular
                .module('mainApp.models.school', [])
                .service(SchoolService.serviceId, SchoolService);
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=school.service.js.map