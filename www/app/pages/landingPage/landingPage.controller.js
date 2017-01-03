var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            var LandingPageController = (function () {
                function LandingPageController($state, $translate, messageUtil, functionsUtil, LandingPageService, FeedbackService, getDataFromJson) {
                    this.$state = $state;
                    this.$translate = $translate;
                    this.messageUtil = messageUtil;
                    this.functionsUtil = functionsUtil;
                    this.LandingPageService = LandingPageService;
                    this.FeedbackService = FeedbackService;
                    this.getDataFromJson = getDataFromJson;
                    this._init();
                }
                LandingPageController.prototype._init = function () {
                    this.form = {
                        userData: {
                            name: '',
                            email: '',
                            comment: ''
                        },
                        language: this.$translate.use() || 'en',
                        feedback: new app.models.feedback.Feedback()
                    };
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
                    var self = this;
                    console.log('landingPage controller actived');
                };
                LandingPageController.prototype.changeLanguage = function () {
                    this.$translate.use(this.form.language);
                };
                LandingPageController.prototype.goToEarlyAccessForm = function () {
                    document.querySelector('.landingPage__early-access-block').scrollIntoView({ behavior: 'smooth' });
                };
                LandingPageController.prototype._sendCountryFeedback = function () {
                    var self = this;
                    this.form.feedback.NextCountry = this.countryObject.code;
                    if (this.form.feedback.NextCountry) {
                        this.infoCountry.sending = true;
                        this.infoCountry.sent = false;
                        this.infoCountry.disabled = true;
                        this.FeedbackService.createFeedback(this.form.feedback).then(function (response) {
                            if (response.createdAt) {
                                self.infoCountry.success = true;
                                self.messageUtil.success('¡Gracias por tu recomendación!. La revisaremos y pondremos manos a la obra.');
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
                LandingPageController.prototype._createEarlyAdopter = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var self = this;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.userData.email, email_rules);
                    if (this.validate.email.valid) {
                        this.infoNewUser.sending = true;
                        mixpanel.track("Click on Notify button", {
                            "name": this.form.userData.name || '*',
                            "email": this.form.userData.email,
                            "comment": this.form.userData.comment || '*'
                        });
                        var userData = {
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
                return LandingPageController;
            }());
            LandingPageController.controllerId = 'mainApp.pages.landingPage.LandingPageController';
            LandingPageController.$inject = ['$state',
                '$translate',
                'mainApp.core.util.messageUtilService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.pages.landingPage.LandingPageService',
                'mainApp.models.feedback.FeedbackService',
                'mainApp.core.util.GetDataStaticJsonService'];
            landingPage.LandingPageController = LandingPageController;
            angular
                .module('mainApp.pages.landingPage')
                .controller(LandingPageController.controllerId, LandingPageController);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=landingPage.controller.js.map