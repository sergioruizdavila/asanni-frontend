var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            var LandingPageController = (function () {
                function LandingPageController($state, $translate, LandingPageService) {
                    this.$state = $state;
                    this.$translate = $translate;
                    this.LandingPageService = LandingPageService;
                    this._init();
                }
                LandingPageController.prototype._init = function () {
                    this.form = {
                        userData: {
                            name: '',
                            email: '',
                            comment: ''
                        },
                        language: 'en'
                    };
                    this.success = false;
                    this.sending = false;
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
                LandingPageController.prototype.goDown = function () {
                    document.querySelector('.landingPage__title-block').scrollIntoView({ behavior: 'smooth' });
                };
                LandingPageController.prototype.createEarlyAdopter = function () {
                    var self = this;
                    this.sending = true;
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
                            self.success = true;
                        }
                        else {
                            self.sending = false;
                        }
                    });
                };
                return LandingPageController;
            }());
            LandingPageController.controllerId = 'mainApp.pages.landingPage.LandingPageController';
            LandingPageController.$inject = ['$state',
                '$translate',
                'mainApp.pages.landingPage.LandingPageService'];
            landingPage.LandingPageController = LandingPageController;
            angular
                .module('mainApp.pages.landingPage')
                .controller(LandingPageController.controllerId, LandingPageController);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=landingPage.controller.js.map