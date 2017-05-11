var app;
(function (app) {
    var models;
    (function (models) {
        var country;
        (function (country) {
            'use strict';
            var CountryService = (function () {
                function CountryService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    DEBUG && console.log('feature service instanced');
                    this.COUNTRY_URI = 'countries';
                }
                CountryService.prototype.getCountryByAlias = function (aliasCountry) {
                    var self = this;
                    var url = this.COUNTRY_URI + '/' + aliasCountry;
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
                CountryService.prototype.getCountryById = function (id) {
                    var self = this;
                    var url = this.COUNTRY_URI;
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
                CountryService.prototype.getAllCountries = function () {
                    var self = this;
                    var url = this.COUNTRY_URI;
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
                CountryService.serviceId = 'mainApp.models.country.CountryService';
                CountryService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return CountryService;
            }());
            country.CountryService = CountryService;
            angular
                .module('mainApp.models.country', [])
                .service(CountryService.serviceId, CountryService);
        })(country = models.country || (models.country = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/country/country.service.js.map
