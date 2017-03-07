var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalForgotPassword;
        (function (modalForgotPassword) {
            var ModalForgotPasswordController = (function () {
                function ModalForgotPasswordController($rootScope, AuthService, functionsUtil, messageUtil, RegisterService, $filter, $uibModal, $uibModalInstance, dataConfig) {
                    this.$rootScope = $rootScope;
                    this.AuthService = AuthService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.RegisterService = RegisterService;
                    this.$filter = $filter;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this._init();
                }
                ModalForgotPasswordController.prototype._init = function () {
                    var self = this;
                    this.sending = false;
                    this.form = {
                        email: ''
                    };
                    this.validate = {
                        email: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalForgotPasswordController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Forgot Passwod Modal';
                    DEBUG && console.log('modalForgotPassword controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                ModalForgotPasswordController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    return formValid;
                };
                ModalForgotPasswordController.prototype._sendInstructions = function () {
                    var CLICK_MIXPANEL = 'Click: Send instructions from Forgot Password';
                    var NO_ACCOUNT_EXISTS_1 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part1.text');
                    var NO_ACCOUNT_EXISTS_2 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part2.text');
                    var SENT_LINK = this.$filter('translate')('%modal.forgot_password.sent_link.text');
                    mixpanel.track(CLICK_MIXPANEL, {
                        "email": this.form.email || '*'
                    });
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.sending = true;
                        this.RegisterService.checkEmail(this.form.email).then(function (response) {
                            var emailExist = true;
                            if (response.data) {
                                emailExist = response.data.emailExist || true;
                            }
                            else {
                                emailExist = false;
                            }
                            self.validate.globalValidate.valid = emailExist;
                            if (!emailExist) {
                                self.sending = false;
                                self.validate.globalValidate.message = NO_ACCOUNT_EXISTS_1 + self.form.email + NO_ACCOUNT_EXISTS_2;
                            }
                            else {
                                self.AuthService.resetPassword(self.form.email).then(function (response) {
                                    self.sending = false;
                                    self.messageUtil.info(SENT_LINK + self.form.email);
                                    self._openLogInModal();
                                }, function (error) {
                                    self.sending = false;
                                    DEBUG && console.error(error);
                                    self.messageUtil.error('');
                                });
                            }
                        });
                    }
                };
                ModalForgotPasswordController.prototype._openLogInModal = function () {
                    mixpanel.track("Click on 'Log in' from signUp modal");
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
                    this.$uibModalInstance.close();
                };
                ModalForgotPasswordController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalForgotPasswordController;
            }());
            ModalForgotPasswordController.controllerId = 'mainApp.components.modal.ModalForgotPasswordController';
            ModalForgotPasswordController.$inject = [
                '$rootScope',
                'mainApp.auth.AuthService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.messageUtilService',
                'mainApp.register.RegisterService',
                '$filter',
                '$uibModal',
                '$uibModalInstance',
                'dataConfig'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalForgotPasswordController.controllerId, ModalForgotPasswordController);
        })(modalForgotPassword = modal.modalForgotPassword || (modal.modalForgotPassword = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalForgotPassword.controller.js.map