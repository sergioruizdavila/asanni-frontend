var app;
(function (app) {
    var pages;
    (function (pages) {
        var studentLandingPage;
        (function (studentLandingPage) {
            'use strict';
            var StudentLandingPageService = (function () {
                function StudentLandingPageService(restApi) {
                    this.restApi = restApi;
                }
                StudentLandingPageService.prototype.createEarlyAdopter = function (userData) {
                    var url = 'early';
                    return this.restApi.create({ url: url }, userData).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                return StudentLandingPageService;
            }());
            StudentLandingPageService.serviceId = 'mainApp.pages.studentLandingPage.StudentLandingPageService';
            StudentLandingPageService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            studentLandingPage.StudentLandingPageService = StudentLandingPageService;
            angular
                .module('mainApp.pages.studentLandingPage')
                .service(StudentLandingPageService.serviceId, StudentLandingPageService);
        })(studentLandingPage = pages.studentLandingPage || (pages.studentLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=studentLandingPage.service.js.map