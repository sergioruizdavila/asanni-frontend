var app;
(function (app) {
    var pages;
    (function (pages) {
        var resetPasswordPage;
        (function (resetPasswordPage) {
            var ResetPasswordPageController = (function () {
                function ResetPasswordPageController($state, $stateParams) {
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this._init();
                }
                ResetPasswordPageController.prototype._init = function () {
                    var self = this;
                    this.uid = this.$stateParams.uid;
                    this.token = this.$stateParams.token;
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                ResetPasswordPageController.prototype.activate = function () {
                    var self = this;
                    console.log('resetPasswordPage controller actived');
                };
                return ResetPasswordPageController;
            }());
            ResetPasswordPageController.controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';
            ResetPasswordPageController.$inject = [
                '$state',
                '$stateParams'
            ];
            resetPasswordPage.ResetPasswordPageController = ResetPasswordPageController;
            angular
                .module('mainApp.pages.resetPasswordPage')
                .controller(ResetPasswordPageController.controllerId, ResetPasswordPageController);
        })(resetPasswordPage = pages.resetPasswordPage || (pages.resetPasswordPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=resetPasswordPage.controller.js.map