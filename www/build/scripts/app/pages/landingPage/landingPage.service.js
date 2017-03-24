var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            'use strict';
            var LandingPageService = (function () {
                function LandingPageService(restApi, $q) {
                    this.restApi = restApi;
                    this.$q = $q;
                    this.EARLY_URI = 'early';
                }
                LandingPageService.prototype.createEarlyAdopter = function (userData) {
                    var url = this.EARLY_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, userData).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                LandingPageService.serviceId = 'mainApp.pages.landingPage.LandingPageService';
                LandingPageService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    '$q'
                ];
                return LandingPageService;
            }());
            landingPage.LandingPageService = LandingPageService;
            angular
                .module('mainApp.pages.landingPage')
                .service(LandingPageService.serviceId, LandingPageService);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/landingPage/landingPage.service.js.map
