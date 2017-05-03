var app;
(function (app) {
    var pages;
    (function (pages) {
        var countryProfilePage;
        (function (countryProfilePage) {
            var CountryProfilePageController = (function () {
                function CountryProfilePageController($scope, $state, $stateParams, dataConfig, AuthService, CountryService, SchoolService, TeacherService, FunctionsUtil, $rootScope) {
                    this.$scope = $scope;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.dataConfig = dataConfig;
                    this.AuthService = AuthService;
                    this.CountryService = CountryService;
                    this.SchoolService = SchoolService;
                    this.TeacherService = TeacherService;
                    this.FunctionsUtil = FunctionsUtil;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                CountryProfilePageController.prototype._init = function () {
                    this.data = new app.models.country.Country();
                    this.loading = true;
                    this.shadowsSchoolLoading = true;
                    this.shadowsTeacherLoading = true;
                    this.noSchoolResult = false;
                    this.noTeacherResult = false;
                    this.activate();
                };
                CountryProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Country Profile Page: ' + this.$stateParams.aliasCountry;
                    var self = this;
                    DEBUG && console.log('countryProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this.CountryService.getCountryByAlias(this.$stateParams.aliasCountry).then(function (response) {
                        self.data = new app.models.country.Country(response);
                        self._getCurrencyConverted(self.data.CurrencyCode);
                        self._getLocalTime(self.data.Zone);
                        self._buildSchoolCards(self.data);
                        self._buildTeacherCards(self.data);
                        self.loading = false;
                    });
                };
                CountryProfilePageController.prototype._getResultLoading = function (type) {
                    var STUDENT_TYPE = 'student';
                    var TEACHER_TYPE = 'teacher';
                    var SCHOOL_TYPE = 'school';
                    switch (type) {
                        case STUDENT_TYPE:
                            return 'app/pages/searchPage/studentResult/studentResult.html';
                        case TEACHER_TYPE:
                            return 'app/pages/searchPage/teacherLoading/teacherLoading.html';
                        case SCHOOL_TYPE:
                            return 'app/pages/searchPage/schoolLoading/schoolLoading.html';
                    }
                };
                CountryProfilePageController.prototype._buildTeacherCards = function (country) {
                    var self = this;
                    this.TeacherService.getAllTeachersByCountry(country.Id).then(function (response) {
                        if (response.results.length > 0) {
                            self._teachersList = response.results;
                        }
                        else {
                            self.noTeacherResult = true;
                        }
                        self.shadowsTeacherLoading = false;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildTeacherCards ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self.shadowsTeacherLoading = false;
                    });
                };
                CountryProfilePageController.prototype._buildSchoolCards = function (country) {
                    var self = this;
                    this.SchoolService.getAllSchoolsByCountry(country.Id).then(function (response) {
                        if (response.results.length > 0) {
                            self._schoolsList = response.results;
                        }
                        else {
                            self.noSchoolResult = true;
                        }
                        self.shadowsSchoolLoading = false;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildSchoolCards ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self.shadowsSchoolLoading = false;
                    });
                };
                CountryProfilePageController.prototype._getCurrencyConverted = function (code) {
                    var self = this;
                    this.FunctionsUtil.getCurrencyConverted(code).then(function (response) {
                        if (response > 0) {
                            self._currencyConverted = response.toFixed(2).toString();
                        }
                        else {
                            self._currencyConverted = '-';
                        }
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _getCurrencyConverted ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self._currencyConverted = '-';
                    });
                };
                CountryProfilePageController.prototype._getLocalTime = function (zone) {
                    var FORMAT_TIME = 'LT';
                    var today = moment();
                    this._localTime = today.tz(zone).format(FORMAT_TIME).toLowerCase();
                };
                CountryProfilePageController.prototype._recommendTeacher = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend Teacher from countryProfilePage: ' + this.$stateParams.aliasCountry;
                    var url = 'https://waysily.typeform.com/to/iAWFeg';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                CountryProfilePageController.prototype._recommendSchool = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend School from countryProfilePage: ' + this.$stateParams.aliasCountry;
                    var url = 'https://waysily.typeform.com/to/q5uT0P';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                CountryProfilePageController.prototype._joinAsSchool = function () {
                    var CLICK_MIXPANEL = 'Click: Join as a School from countryProfilePage: ' + this.$stateParams.aliasCountry;
                    var url = 'https://form.jotform.co/71177073983868';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
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
                    'mainApp.core.util.FunctionsUtilService',
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
