var app;
(function (app) {
    var pages;
    (function (pages) {
        var schoolProfilePage;
        (function (schoolProfilePage) {
            var SchoolProfilePageController = (function () {
                function SchoolProfilePageController($rootScope, CountryService, SchoolService, TeacherService, functionsUtil, $state, $stateParams, $filter) {
                    this.$rootScope = $rootScope;
                    this.CountryService = CountryService;
                    this.SchoolService = SchoolService;
                    this.TeacherService = TeacherService;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this._init();
                }
                SchoolProfilePageController.prototype._init = function () {
                    this.data = new app.models.school.School();
                    this.country = new app.models.country.Country();
                    this.loading = true;
                    this.shadowsSchoolLoading = true;
                    this.shadowsTeacherLoading = true;
                    this.noSchoolResult = false;
                    this.noTeacherResult = false;
                    this.marker = 'long';
                    this.activate();
                };
                SchoolProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: School Profile Page Id: ' + this.$stateParams.aliasSchool;
                    var SCROLL_TO_ID = 'schoolProfile-information';
                    var AVERAGE_RATING = 'schoolProfile-average-rating';
                    var self = this;
                    this._paymentMethodsList = this._buildPaymentMethodsClassList();
                    DEBUG && console.log('schoolProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    $(window).scroll(function () {
                        self.functionsUtil.stickContainer(this, SCROLL_TO_ID, AVERAGE_RATING);
                    });
                    this.SchoolService.getSchoolByAlias(this.$stateParams.aliasSchool).then(function (response) {
                        self.data = new app.models.school.School(response);
                        self._buildMetaTags(self.data);
                        self.mapConfig = self.functionsUtil.buildMapConfig([
                            {
                                id: self.data.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Location.Position.Lat),
                                        lng: parseFloat(self.data.Location.Position.Lng)
                                    }
                                }
                            }
                        ], 'location-marker-map', { lat: parseFloat(self.data.Location.Position.Lat), lng: parseFloat(self.data.Location.Position.Lng) }, null);
                        self._buildSchoolCards(self.data.Country);
                        self._buildTeacherCards(self.data.Country);
                        self._getCountryInfo(self.data.Country);
                        self.loading = false;
                    });
                };
                SchoolProfilePageController.prototype._getResultLoading = function (type) {
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
                SchoolProfilePageController.prototype._buildMetaTags = function (school) {
                    var metaTags = this.SchoolService.buildMetaTagValue(school);
                    this.$rootScope.title = metaTags.title;
                    this.$rootScope.description = metaTags.description;
                    this.$rootScope.url = metaTags.url;
                    this.$rootScope.robots = metaTags.robots;
                    this.$rootScope.image = metaTags.image;
                };
                SchoolProfilePageController.prototype._buildTeacherCards = function (countryId) {
                    var LIMIT = 3;
                    var OFFSET = 0;
                    var self = this;
                    this.TeacherService.getAllTeachersByCountryAndRange(countryId, LIMIT, OFFSET).then(function (response) {
                        if (response.results.length > 0) {
                            self._teachersList = response.results;
                        }
                        else {
                            self.noTeacherResult = true;
                        }
                        self.shadowsTeacherLoading = false;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _buildTeacherCards ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self.shadowsTeacherLoading = false;
                    });
                };
                SchoolProfilePageController.prototype._buildSchoolCards = function (countryId) {
                    var LIMIT = 3;
                    var OFFSET = 0;
                    var self = this;
                    this.SchoolService.getAllSchoolsByCountryAndRange(countryId, LIMIT, OFFSET).then(function (response) {
                        if (response.results.length > 0) {
                            self._schoolsList = response.results;
                        }
                        else {
                            self.noSchoolResult = true;
                        }
                        self.shadowsSchoolLoading = false;
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _buildSchoolCards ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self.shadowsSchoolLoading = false;
                    });
                };
                SchoolProfilePageController.prototype._getCountryInfo = function (countryId) {
                    var self = this;
                    this.CountryService.getCountryById(countryId).then(function (response) {
                        if (response.id) {
                            self.country = new app.models.country.Country(response);
                        }
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _getCountryInfo ';
                        DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                        self.shadowsSchoolLoading = false;
                    });
                };
                SchoolProfilePageController.prototype.goToSite = function (url) {
                    var EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
                    if (EMAIL_REGEX.test(url)) {
                        url = 'mailto:' + url;
                        window.open(url);
                    }
                    if (url) {
                        window.open(url, '_blank');
                    }
                };
                SchoolProfilePageController.prototype.assignAmenitieIconClass = function (amenitie) {
                    var size = 'small';
                    var amenitiePrefixClass = 'ma-liner-icons--' + size + '--';
                    var iconClass = this.functionsUtil.assignAmenitieIconClass(amenitie);
                    return amenitiePrefixClass + iconClass;
                };
                SchoolProfilePageController.prototype.assignAccommodationAmenitieIconClass = function (amenitie) {
                    var size = 'small';
                    var amenitiePrefixClass = 'ma-liner-icons--' + size + '--';
                    var iconClass = this.functionsUtil.assignAccommodationAmenitieIconClass(amenitie);
                    return amenitiePrefixClass + iconClass;
                };
                SchoolProfilePageController.prototype.assignPaymentMethodsIconClass = function (method) {
                    var iconClass = 'ma-payment-methods-icons--medium--' + method.value;
                    var arr = this.data.PaymentMethod.Methods;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == method.key) {
                            method.disabled = false;
                        }
                    }
                    if (method.disabled) {
                        iconClass = iconClass + ' ma-payment-methods-icons--disabled';
                    }
                    return iconClass;
                };
                SchoolProfilePageController.prototype._ratingFeatureAverage = function (school) {
                    return this.SchoolService.schoolFeatureRatingAverage(school);
                };
                SchoolProfilePageController.prototype._buildPaymentMethodsClassList = function () {
                    var options = [
                        {
                            key: '1',
                            value: 'visa',
                            name: 'Visa',
                            disabled: true
                        },
                        {
                            key: '2',
                            value: 'mastercard',
                            name: 'MasterCard',
                            disabled: true
                        },
                        {
                            key: '3',
                            value: 'american-express',
                            name: 'American Express',
                            disabled: true
                        },
                        {
                            key: '4',
                            value: 'paypal',
                            name: 'Paypal',
                            disabled: true
                        },
                        {
                            key: '5',
                            value: 'cash',
                            name: 'Cash',
                            disabled: true
                        }
                    ];
                    return options;
                };
                SchoolProfilePageController.controllerId = 'mainApp.pages.schoolProfilePage.SchoolProfilePageController';
                SchoolProfilePageController.$inject = [
                    '$rootScope',
                    'mainApp.models.country.CountryService',
                    'mainApp.models.school.SchoolService',
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$stateParams',
                    '$filter'];
                return SchoolProfilePageController;
            }());
            schoolProfilePage.SchoolProfilePageController = SchoolProfilePageController;
            angular
                .module('mainApp.pages.schoolProfilePage')
                .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);
        })(schoolProfilePage = pages.schoolProfilePage || (pages.schoolProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/schoolProfilePage/schoolProfilePage.controller.js.map
