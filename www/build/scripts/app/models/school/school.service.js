var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school_1) {
            'use strict';
            var SchoolService = (function () {
                function SchoolService(restApi, functionsUtil, AuthService, $q) {
                    this.restApi = restApi;
                    this.functionsUtil = functionsUtil;
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
                SchoolService.prototype.getMinorSchoolPrice = function (prices) {
                    var privateGeneralValue = prices.PrivateClass.GeneralType.Value;
                    var privateIntensiveValue = prices.PrivateClass.IntensiveType.Value;
                    var groupGeneralValue = prices.GroupClass.GeneralType.Value;
                    var groupIntensiveValue = prices.GroupClass.IntensiveType.Value;
                    var minorValue = 0;
                    if (prices.PrivateClass.Active) {
                        if (prices.PrivateClass.GeneralType.Active) {
                            minorValue = privateGeneralValue;
                        }
                        if (prices.PrivateClass.IntensiveType.Active) {
                            minorValue = privateIntensiveValue < minorValue ? privateIntensiveValue : minorValue;
                        }
                    }
                    if (prices.GroupClass.Active) {
                        if (prices.GroupClass.GeneralType.Active) {
                            minorValue = groupGeneralValue < minorValue ? groupGeneralValue : minorValue;
                        }
                        if (prices.GroupClass.IntensiveType.Active) {
                            minorValue = groupIntensiveValue < minorValue ? groupIntensiveValue : minorValue;
                        }
                    }
                    return minorValue;
                };
                SchoolService.prototype.schoolFeatureRatingAverage = function (school) {
                    var middleValue = 2;
                    var atmosphere = school.Atmosphere > 0 ? school.Atmosphere : middleValue;
                    var immersion = school.Immersion.Rating > 0 ? school.Immersion.Rating : middleValue;
                    var volunteering = school.Volunteering.Rating > 0 ? school.Volunteering.Rating : middleValue;
                    var amenities = school.Amenities.Rating > 0 ? school.Amenities.Rating : middleValue;
                    var accommodation = school.Accommodation.Rating > 0 ? school.Accommodation.Rating : middleValue;
                    var average = 0;
                    var newArr = [atmosphere, immersion, volunteering, amenities, accommodation];
                    average = this.functionsUtil.averageNumbersArray(newArr);
                    return average;
                };
                SchoolService.serviceId = 'mainApp.models.school.SchoolService';
                SchoolService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return SchoolService;
            }());
            school_1.SchoolService = SchoolService;
            angular
                .module('mainApp.models.school', [])
                .service(SchoolService.serviceId, SchoolService);
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/school/school.service.js.map
