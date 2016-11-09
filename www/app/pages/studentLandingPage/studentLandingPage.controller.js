var app;
(function (app) {
    var pages;
    (function (pages) {
        var studentLandingPage;
        (function (studentLandingPage) {
            var StudentLandingPageController = (function () {
                function StudentLandingPageController($state, $translate, StudentLandingPageService) {
                    this.$state = $state;
                    this.$translate = $translate;
                    this.StudentLandingPageService = StudentLandingPageService;
                    this._init();
                }
                StudentLandingPageController.prototype._init = function () {
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
                    this.error = {
                        message: ''
                    };
                    this.addComment = false;
                    this.activate();
                };
                StudentLandingPageController.prototype.activate = function () {
                    var self = this;
                    console.log('studentLandingPage controller actived');
                };
                StudentLandingPageController.prototype.changeLanguage = function () {
                    this.$translate.use(this.form.language);
                    mixpanel.track("Change Language");
                };
                StudentLandingPageController.prototype.goToEarlyAccessForm = function () {
                    document.querySelector('.studentLandingPage__early-access-block').scrollIntoView({ behavior: 'smooth' });
                    mixpanel.track("Go to early access form");
                };
                StudentLandingPageController.prototype.showCommentsTextarea = function () {
                    event.preventDefault();
                    this.addComment = true;
                };
                StudentLandingPageController.prototype.createEarlyAdopter = function () {
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
                    this.StudentLandingPageService.createEarlyAdopter(userData).then(function (response) {
                        if (response.createdAt) {
                            self.success = true;
                        }
                        else {
                            self.sending = false;
                        }
                    });
                };
                return StudentLandingPageController;
            }());
            StudentLandingPageController.controllerId = 'mainApp.pages.studentLandingPage.StudentLandingPageController';
            StudentLandingPageController.$inject = ['$state',
                '$translate',
                'mainApp.pages.studentLandingPage.StudentLandingPageService'];
            studentLandingPage.StudentLandingPageController = StudentLandingPageController;
            angular
                .module('mainApp.pages.studentLandingPage')
                .controller(StudentLandingPageController.controllerId, StudentLandingPageController);
        })(studentLandingPage = pages.studentLandingPage || (pages.studentLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=studentLandingPage.controller.js.map