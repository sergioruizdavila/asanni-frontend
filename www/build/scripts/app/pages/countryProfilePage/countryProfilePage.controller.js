var app;
(function (app) {
    var pages;
    (function (pages) {
        var countryProfilePage;
        (function (countryProfilePage) {
            var CountryProfilePageController = (function () {
                function CountryProfilePageController($scope, $state, $stateParams, dataConfig, AuthService, CountryService, SchoolService, TeacherService, $rootScope) {
                    this.$scope = $scope;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.dataConfig = dataConfig;
                    this.AuthService = AuthService;
                    this.CountryService = CountryService;
                    this.SchoolService = SchoolService;
                    this.TeacherService = TeacherService;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                CountryProfilePageController.prototype._init = function () {
                    this.data = new app.models.country.Country();
                    this.loading = true;
                    this.activate();
                };
                CountryProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Country Profile Page: ' + this.$stateParams.aliasCountry;
                    var self = this;
                    DEBUG && console.log('countryProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this.CountryService.getCountryByAlias(this.$stateParams.aliasCountry).then(function (response) {
                        self.data = new app.models.country.Country(response);
                        self._buildSchoolCards(self.data);
                        self._buildTeacherCards(self.data);
                        self.loading = false;
                    });
                };
                CountryProfilePageController.prototype._buildTeacherCards = function (country) {
                    var self = this;
                    this.TeacherService.getAllTeachersByCountry(country.Id).then(function (response) {
                        self._teachersList = response.results;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildTeacherCards ';
                        Raven.captureMessage(ERROR_MESSAGE, error);
                    });
                };
                CountryProfilePageController.prototype._buildSchoolCards = function (country) {
                    var self = this;
                    this.SchoolService.getAllSchoolsByCountry(country.Id).then(function (response) {
                        self._schoolsList = response.results;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildSchoolCards ';
                        Raven.captureMessage(ERROR_MESSAGE, error);
                    });
                };
                CountryProfilePageController.controllerId = 'mainApp.pages.countryProfilePage.CountryProfilePageController';
                CountryProfilePageController.$inject = ['$scope',
                    '$state',
                    '$stateParams',
                    'dataConfig',
                    'mainApp.auth.AuthService',
                    'mainApp.models.country.CountryService',
                    'mainApp.models.school.SchoolService',
                    'mainApp.models.teacher.TeacherService',
                    '$rootScope'];
                return CountryProfilePageController;
            }());
            countryProfilePage.CountryProfilePageController = CountryProfilePageController;
            angular
                .module('mainApp.pages.countryProfilePage')
                .controller(CountryProfilePageController.controllerId, CountryProfilePageController);
        })(countryProfilePage = pages.countryProfilePage || (pages.countryProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/countryProfilePage/countryProfilePage.controller.js.map
