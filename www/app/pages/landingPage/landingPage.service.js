var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            'use strict';
            var LandingPageService = (function () {
                function LandingPageService(restApi) {
                    this.restApi = restApi;
                }
                LandingPageService.prototype.createEarlyAdopter = function (userData) {
                    var url = 'early';
                    return this.restApi.create({ url: url }, userData).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                return LandingPageService;
            }());
            LandingPageService.serviceId = 'mainApp.pages.landingPage.LandingPageService';
            LandingPageService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            landingPage.LandingPageService = LandingPageService;
            angular
                .module('mainApp.pages.landingPage')
                .service(LandingPageService.serviceId, LandingPageService);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=landingPage.service.js.map