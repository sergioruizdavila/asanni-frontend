var app;
(function (app) {
    var pages;
    (function (pages) {
        var studentLandingPage;
        (function (studentLandingPage) {
            var StudentLandingPageController = (function () {
                function StudentLandingPageController($state) {
                    this.$state = $state;
                    this._init();
                }
                StudentLandingPageController.prototype._init = function () {
                    this.form = {
                        username: '',
                        email: ''
                    };
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                StudentLandingPageController.prototype.activate = function () {
                    var self = this;
                    console.log('studentLandingPage controller actived');
                };
                return StudentLandingPageController;
            }());
            StudentLandingPageController.controllerId = 'mainApp.pages.studentLandingPage.StudentLandingPageController';
            StudentLandingPageController.$inject = ['$state'];
            studentLandingPage.StudentLandingPageController = StudentLandingPageController;
            angular
                .module('mainApp.pages.studentLandingPage')
                .controller(StudentLandingPageController.controllerId, StudentLandingPageController);
        })(studentLandingPage = pages.studentLandingPage || (pages.studentLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=studentLandingPage.controller.js.map