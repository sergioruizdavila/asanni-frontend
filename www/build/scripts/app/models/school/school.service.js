var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school_1) {
            'use strict';
            var SchoolService = (function () {
                function SchoolService(restApi, functionsUtil, AuthService, dataConfig, $q) {
                    this.restApi = restApi;
                    this.functionsUtil = functionsUtil;
                    this.AuthService = AuthService;
                    this.dataConfig = dataConfig;
                    this.$q = $q;
                    DEBUG && console.log('schools service instanced');
                    this.SCHOOL_URI = 'schools';
                    this.USER_SCHOOL_URI = 'schools?userId=';
                    this.STATUS_SCHOOL_URI = 'schools?status=';
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
                SchoolService.prototype.getSchoolByAlias = function (aliasSchool) {
                    var self = this;
                    var url = this.SCHOOL_URI + '/' + aliasSchool;
                    var deferred = this.$q.defer();
                    this.restApi.show({ url: url }).$promise
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
                SchoolService.prototype.getAllSchoolsByStatus = function (status) {
                    var self = this;
                    var url = this.STATUS_SCHOOL_URI + status;
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
                            if (minorValue > 0) {
                                minorValue = privateIntensiveValue < minorValue ? privateIntensiveValue : minorValue;
                            }
                            else {
                                minorValue = privateIntensiveValue;
                            }
                        }
                    }
                    if (prices.GroupClass.Active) {
                        if (prices.GroupClass.GeneralType.Active) {
                            if (minorValue > 0) {
                                minorValue = groupGeneralValue < minorValue ? groupGeneralValue : minorValue;
                            }
                            else {
                                minorValue = groupGeneralValue;
                            }
                        }
                        if (prices.GroupClass.IntensiveType.Active) {
                            if (minorValue > 0) {
                                minorValue = groupIntensiveValue < minorValue ? groupIntensiveValue : minorValue;
                            }
                            else {
                                minorValue = groupIntensiveValue;
                            }
                        }
                    }
                    return minorValue;
                };
                SchoolService.prototype.getMinorSchoolPackagePrice = function (pkg) {
                    var minorValue = null;
                    var price = 0;
                    if (pkg.Active) {
                        for (var i = 0; i < pkg.PackageOption.length; i++) {
                            if (pkg.PackageOption[i].Active) {
                                price = pkg.PackageOption[i].Price;
                                if (minorValue) {
                                    minorValue = price < minorValue ? price : minorValue;
                                }
                                else {
                                    minorValue = price;
                                }
                            }
                        }
                    }
                    else {
                        minorValue = 0;
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
                SchoolService.prototype.buildMetaTagValue = function (school) {
                    var imageUrl = 'https://www.waysily.com/assets/images/waysily-shared.png';
                    var metaTags = { title: '', description: '', image: '', robots: '', url: '' };
                    metaTags.title = school.Name;
                    if (school.Price.Active) {
                        var minorPrice = this.getMinorSchoolPrice(school.Price);
                        metaTags.description = 'Classes from $' + minorPrice + ' per week. ';
                    }
                    else {
                        var packageMinorPrice = this.getMinorSchoolPackagePrice(school.Package);
                        metaTags.description = 'Package from $' + packageMinorPrice + '. ';
                    }
                    if (school.Immersion.Active) {
                        metaTags.description += 'Offers immersion, language exchange';
                    }
                    if (school.Accommodation.Active) {
                        metaTags.description += ', accomodation';
                    }
                    if (school.Volunteering.Active) {
                        metaTags.description += ', volunteering';
                    }
                    if (school.Tour.Active) {
                        var city = school.Location.City;
                        metaTags.description += ', tour in the city of ' + city + '. ';
                    }
                    else {
                        metaTags.description += '. ';
                    }
                    metaTags.description += 'Find everything ' + school.Name + ' offers to learn a language.';
                    metaTags.image = imageUrl;
                    metaTags.robots = 'follow,index';
                    metaTags.url = 'https://' + this.dataConfig.domain + '/page/school/' + school.AliasSchool;
                    return metaTags;
                };
                SchoolService.serviceId = 'mainApp.models.school.SchoolService';
                SchoolService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.auth.AuthService',
                    'dataConfig',
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
