var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLogIn;
        (function (modalLogIn) {
            var ModalLogInController = (function () {
                function ModalLogInController($rootScope, $state, AuthService, AccountService, functionsUtil, messageUtil, localStorage, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this._init();
                }
                ModalLogInController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        username: '',
                        email: '',
                        password: ''
                    };
                    this.validate = {
                        username: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        password: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalLogInController.prototype.activate = function () {
                    DEBUG && console.log('modalLogIn controller actived');
                };
                ModalLogInController.prototype.login = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.AccountService.getUsername(this.form.email).then(function (response) {
                            if (response.userExist) {
                                self.form.username = response.username;
                            }
                            else {
                                self.form.username = self.form.email;
                            }
                            self.AuthService.login(self.form).then(function (response) {
                                self.AccountService.getAccount().then(function (response) {
                                    DEBUG && console.log('Data User: ', response);
                                    self.localStorage.setItem('currentUser', JSON.stringify(response));
                                    self.$rootScope.currentUser = JSON.parse(self.localStorage.getItem('currentUser'));
                                    self.$uibModalInstance.close();
                                });
                            }, function (response) {
                                if (response.status == 401) {
                                    DEBUG && console.log('Incorrect username or password.');
                                    self.validate.globalValidate.valid = false;
                                    self.validate.globalValidate.message = 'Incorrect username or password.';
                                }
                                else if (response.status == -1) {
                                    DEBUG && console.log('No response from server. Try again, please');
                                    self.messageUtil.error('No response from server. Try again, please');
                                }
                                else {
                                    DEBUG && console.log('There was a problem logging you in. Error code: ' + response.status + '.');
                                    self.messageUtil.error('There was a problem logging you in. Error code: ' + response.status + '.');
                                }
                            });
                        });
                    }
                };
                ModalLogInController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.password = this.functionsUtil.validator(this.form.password, password_rules);
                    if (!this.validate.password.valid) {
                        formValid = this.validate.password.valid;
                    }
                    return formValid;
                };
                ModalLogInController.prototype._openForgotPasswordModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalForgotPasswordTmpl,
                        controller: 'mainApp.components.modal.ModalForgotPasswordController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalLogInController.prototype._openSignUpModal = function () {
                    mixpanel.track("Click on 'Sign up' from logIn modal");
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalLogInController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalLogInController;
            }());
            ModalLogInController.controllerId = 'mainApp.components.modal.ModalLogInController';
            ModalLogInController.$inject = [
                '$rootScope',
                '$state',
                'mainApp.auth.AuthService',
                'mainApp.account.AccountService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.messageUtilService',
                'mainApp.localStorageService',
                'dataConfig',
                '$uibModal',
                '$uibModalInstance'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalLogInController.controllerId, ModalLogInController);
        })(modalLogIn = modal.modalLogIn || (modal.modalLogIn = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalLogIn.controller.js.map