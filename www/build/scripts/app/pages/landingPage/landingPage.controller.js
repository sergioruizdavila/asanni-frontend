var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            var LandingPageController = (function () {
                function LandingPageController($scope, $state, $stateParams, dataConfig, $uibModal, AuthService, messageUtil, functionsUtil, LandingPageService, FeedbackService, getDataFromJson, $rootScope, localStorage) {
                    this.$scope = $scope;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.AuthService = AuthService;
                    this.messageUtil = messageUtil;
                    this.functionsUtil = functionsUtil;
                    this.LandingPageService = LandingPageService;
                    this.FeedbackService = FeedbackService;
                    this.getDataFromJson = getDataFromJson;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this._init();
                }
                LandingPageController.prototype._init = function () {
                    this.isAuthenticated = this.AuthService.isAuthenticated();
                    this.form = {
                        userData: {
                            name: '',
                            email: '',
                            comment: ''
                        },
                        language: this.functionsUtil.getCurrentLanguage() || 'en',
                        feedback: new app.models.feedback.Feedback()
                    };
                    this._slideout = false;
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.countryObject = { code: '', value: '' };
                    this.infoCountry = {
                        success: false,
                        sending: false,
                        sent: true,
                        disabled: false
                    };
                    this.infoNewUser = {
                        success: false,
                        sending: false,
                        sent: true,
                        disabled: false
                    };
                    this.validate = {
                        country: { valid: true, message: '' },
                        email: { valid: true, message: '' }
                    };
                    this.activate();
                };
                LandingPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Main Landing Page';
                    var self = this;
                    console.log('landingPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    if (this.$stateParams.id) {
                        var options = {
                            animation: false,
                            backdrop: 'static',
                            keyboard: false,
                            templateUrl: this.dataConfig.modalRecommendTeacherTmpl,
                            controller: 'mainApp.components.modal.ModalRecommendTeacherController as vm',
                            resolve: {
                                dataSetModal: function () {
                                    return {
                                        earlyId: self.$stateParams.id
                                    };
                                }
                            }
                        };
                        var modalInstance = this.$uibModal.open(options);
                    }
                    if (this.$stateParams.showLogin) {
                        this._openLogInModal();
                    }
                    this._subscribeToEvents();
                };
                LandingPageController.prototype.slideNavMenu = function () {
                    this._slideout = !this._slideout;
                };
                LandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                };
                LandingPageController.prototype.logout = function () {
                    var self = this;
                    this.AuthService.logout().then(function (response) {
                        window.location.reload();
                    }, function (response) {
                        DEBUG && console.log('A problem occured while logging you out.');
                    });
                };
                LandingPageController.prototype.goToSearch = function (target) {
                    var SEARCH_PAGE_STATE = 'page.searchPage';
                    var GOTO_MIXPANEL = 'Go to Search from: ' + target + ' btn';
                    mixpanel.track(GOTO_MIXPANEL);
                    this.$state.go(SEARCH_PAGE_STATE, { target: target }, { reload: true });
                };
                LandingPageController.prototype._sendCountryFeedback = function () {
                    var ENTER_MIXPANEL = 'Click: Send Country Feedback';
                    var FEEDBACK_SUCCESS_MESSAGE = '¡Gracias por tu recomendación!. La revisaremos y pondremos manos a la obra.';
                    var self = this;
                    this.form.feedback.NextCountry = this.countryObject.code;
                    mixpanel.track(ENTER_MIXPANEL);
                    if (this.form.feedback.NextCountry) {
                        this.infoCountry.sending = true;
                        this.infoCountry.sent = false;
                        this.infoCountry.disabled = true;
                        this.FeedbackService.createFeedback(this.form.feedback).then(function (response) {
                            if (response.createdAt) {
                                self.infoCountry.success = true;
                                self.messageUtil.success(FEEDBACK_SUCCESS_MESSAGE);
                                self.infoCountry.sent = true;
                                self.infoCountry.sending = false;
                                self.infoCountry.disabled = true;
                                self.validate.country.valid = true;
                                self.form.userData.email = '';
                            }
                            else {
                                self.infoCountry.sending = false;
                                self.infoCountry.disabled = false;
                                self.validate.country.valid = true;
                            }
                        });
                    }
                    else {
                        this.validate.country.valid = false;
                    }
                };
                LandingPageController.prototype._recommendTeacher = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend Teacher';
                    var url = 'https://waysily.typeform.com/to/iAWFeg';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                LandingPageController.prototype._recommendSchool = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend School';
                    var url = 'https://waysily.typeform.com/to/q5uT0P';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                LandingPageController.prototype._createEarlyAdopter = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NEW_MIXPANEL = 'New Early Adopter data';
                    var self = this;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.userData.email, email_rules);
                    if (this.validate.email.valid) {
                        this.infoNewUser.sending = true;
                        mixpanel.track(NEW_MIXPANEL, {
                            "name": this.form.userData.name || '*',
                            "email": this.form.userData.email,
                            "comment": this.form.userData.comment || '*'
                        });
                        var userData = {
                            uid: app.core.util.functionsUtil.FunctionsUtilService.generateGuid(),
                            name: this.form.userData.name || '*',
                            email: this.form.userData.email,
                            comment: this.form.userData.comment || '*'
                        };
                        this.LandingPageService.createEarlyAdopter(userData).then(function (response) {
                            if (response.createdAt) {
                                self.infoNewUser.sent = true;
                                self.infoNewUser.sending = false;
                                self.infoNewUser.disabled = true;
                                self.infoNewUser.success = true;
                                self.validate.country.valid = true;
                            }
                            else {
                                self.infoNewUser.sending = false;
                                self.infoNewUser.disabled = false;
                                self.infoNewUser.success = false;
                                self.validate.email.valid = true;
                            }
                        });
                    }
                    else {
                        this.validate.email.valid = false;
                    }
                };
                LandingPageController.prototype._openSignUpModal = function () {
                    var CLICK_MIXPANEL = 'Click on Sign up: main landing page';
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: false
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    mixpanel.track(CLICK_MIXPANEL);
                };
                LandingPageController.prototype._openLogInModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalLogInTmpl,
                        controller: 'mainApp.components.modal.ModalLogInController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: false
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function () {
                        self.$rootScope.$broadcast('Is Authenticated');
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                };
                LandingPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Is Authenticated', function (event, args) {
                        self.isAuthenticated = self.AuthService.isAuthenticated();
                        if (self.$rootScope.profileData) {
                            self.isTeacher = self.$rootScope.profileData.IsTeacher;
                        }
                    });
                };
                LandingPageController.controllerId = 'mainApp.pages.landingPage.LandingPageController';
                LandingPageController.$inject = ['$scope',
                    '$state',
                    '$stateParams',
                    'dataConfig',
                    '$uibModal',
                    'mainApp.auth.AuthService',
                    'mainApp.core.util.messageUtilService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.pages.landingPage.LandingPageService',
                    'mainApp.models.feedback.FeedbackService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    '$rootScope',
                    'mainApp.localStorageService'];
                return LandingPageController;
            }());
            landingPage.LandingPageController = LandingPageController;
            angular
                .module('mainApp.pages.landingPage')
                .controller(LandingPageController.controllerId, LandingPageController);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/landingPage/landingPage.controller.js.map
