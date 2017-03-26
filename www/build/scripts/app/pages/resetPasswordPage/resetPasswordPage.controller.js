var app;
(function (app) {
    var pages;
    (function (pages) {
        var resetPasswordPage;
        (function (resetPasswordPage) {
            var ResetPasswordPageController = (function () {
                function ResetPasswordPageController($state, dataConfig, $filter, $stateParams, AuthService, functionsUtil, messageUtil) {
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$stateParams = $stateParams;
                    this.AuthService = AuthService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this._init();
                }
                ResetPasswordPageController.prototype._init = function () {
                    var self = this;
                    this.saving = false;
                    this.uid = this.$stateParams.uid;
                    this.token = this.$stateParams.token;
                    this.passwordMinLength = this.dataConfig.passwordMinLength;
                    this.passwordMaxLength = this.dataConfig.passwordMaxLength;
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
                    var ENTER_MIXPANEL = 'Enter: Reset Password Page';
                    var self = this;
                    console.log('resetPasswordPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL, {
                        "uid": this.uid || '*',
                        "token": this.token || '*'
                    });
                };
                ResetPasswordPageController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var PASSWORD_MESSAGE = this.$filter('translate')('%recover.password.not_match.text');
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
                        this.validate.globalValidate.message = PASSWORD_MESSAGE;
                    }
                    return formValid;
                };
                ResetPasswordPageController.prototype._changePassword = function () {
                    var SUCCESS_CHANGE_PROCESS = this.$filter('translate')('%recover.password.success.text');
                    var LINK_EXPIRED = this.$filter('translate')('%recover.password.link_expired.text');
                    var PASSWORD_COMMON = this.$filter('translate')('%recover.password.password_common.text');
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.validate.globalValidate.valid = true;
                        this.saving = true;
                        this.AuthService.confirmResetPassword(self.uid, self.token, self.form.newPassword1, self.form.newPassword2).then(function (response) {
                            self.saving = false;
                            self.messageUtil.success(SUCCESS_CHANGE_PROCESS);
                            self.$state.go('page.landingPage', { showLogin: true }, { reload: true });
                        }, function (error) {
                            self.saving = false;
                            self.validate.globalValidate.valid = false;
                            if (error.data) {
                                if (error.data.token) {
                                    if (error.data.token[0] === 'Invalid value') {
                                        self.validate.globalValidate.message = LINK_EXPIRED;
                                    }
                                    else {
                                        self.messageUtil.error('');
                                    }
                                }
                                else if (error.data.newPassword2) {
                                    self.validate.globalValidate.message = PASSWORD_COMMON;
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            }
                        });
                    }
                };
                ResetPasswordPageController.controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';
                ResetPasswordPageController.$inject = [
                    '$state',
                    'dataConfig',
                    '$filter',
                    '$stateParams',
                    'mainApp.auth.AuthService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.messageUtilService'
                ];
                return ResetPasswordPageController;
            }());
            resetPasswordPage.ResetPasswordPageController = ResetPasswordPageController;
            angular
                .module('mainApp.pages.resetPasswordPage')
                .controller(ResetPasswordPageController.controllerId, ResetPasswordPageController);
        })(resetPasswordPage = pages.resetPasswordPage || (pages.resetPasswordPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/resetPasswordPage/resetPasswordPage.controller.js.map
