var app;
(function (app) {
    var pages;
    (function (pages) {
        var resetPasswordPage;
        (function (resetPasswordPage) {
            var ResetPasswordPageController = (function () {
                function ResetPasswordPageController($state, $stateParams, AuthService, functionsUtil, messageUtil) {
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.AuthService = AuthService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this._init();
                }
                ResetPasswordPageController.prototype._init = function () {
                    var self = this;
                    this.uid = this.$stateParams.uid;
                    this.token = this.$stateParams.token;
                    this.form = {
                        newPassword1: '',
                        newPassword2: ''
                    };
                    this.validate = {
                        newPassword1: { valid: true, message: '' },
                        newPassword2: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ResetPasswordPageController.prototype.activate = function () {
                    var self = this;
                    console.log('resetPasswordPage controller actived');
                };
                ResetPasswordPageController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.newPassword1 = this.functionsUtil.validator(this.form.newPassword1, password_rules);
                    if (!this.validate.newPassword1.valid) {
                        formValid = this.validate.newPassword1.valid;
                    }
                    this.validate.newPassword2 = this.functionsUtil.validator(this.form.newPassword2, password_rules);
                    if (!this.validate.newPassword2.valid) {
                        formValid = this.validate.newPassword2.valid;
                    }
                    if (this.form.newPassword1 !== this.form.newPassword2) {
                        formValid = false;
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = 'Your new passwords did not match. Please try again.';
                    }
                    return formValid;
                };
                ResetPasswordPageController.prototype._changePassword = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.AuthService.confirmResetPassword(self.uid, self.token, self.form.newPassword1, self.form.newPassword2).then(function (response) {
                            DEBUG && console.log(response);
                            self.messageUtil.success('Cambio exitoso!. Prueba iniciar sesión ahora.');
                            self.$state.go('page.landingPage', { showLogin: true }, { reload: true });
                        }, function (error) {
                            DEBUG && console.log(error);
                            if (error === 'Invalid value') {
                                self.validate.globalValidate.valid = false;
                                self.validate.globalValidate.message = 'El link que te enviamos al correo ya expiro, es necesario que solicites uno nuevo.';
                            }
                            else {
                                self.messageUtil.error('');
                            }
                        });
                    }
                };
                return ResetPasswordPageController;
            }());
            ResetPasswordPageController.controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';
            ResetPasswordPageController.$inject = [
                '$state',
                '$stateParams',
                'mainApp.auth.AuthService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.messageUtilService'
            ];
            resetPasswordPage.ResetPasswordPageController = ResetPasswordPageController;
            angular
                .module('mainApp.pages.resetPasswordPage')
                .controller(ResetPasswordPageController.controllerId, ResetPasswordPageController);
        })(resetPasswordPage = pages.resetPasswordPage || (pages.resetPasswordPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=resetPasswordPage.controller.js.map