var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLogIn;
        (function (modalLogIn) {
            var ModalLogInController = (function () {
                function ModalLogInController($rootScope, $state, AuthService, AccountService, userService, functionsUtil, messageUtil, $filter, localStorage, dataSetModal, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.userService = userService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.$filter = $filter;
                    this.localStorage = localStorage;
                    this.dataSetModal = dataSetModal;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this._init();
                }
                ModalLogInController.prototype._init = function () {
                    var self = this;
                    this.saving = false;
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
                    var ENTER_MIXPANEL = 'Enter: Log in modal';
                    DEBUG && console.log('modalLogIn controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                ModalLogInController.prototype.login = function () {
                    var USERNAME_PASSWORD_WRONG = this.$filter('translate')('%error.username_password_wrong.text');
                    var SERVER_ERROR = this.$filter('translate')('%error.server_error.text');
                    var SERVER_CODE_ERROR = this.$filter('translate')('%error.server_error_code.text');
                    var self = this;
                    this.saving = true;
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
                                    self.saving = false;
                                    self.localStorage.setItem(self.dataConfig.userDataLocalStorage, JSON.stringify(response));
                                    self.$rootScope.userData = response;
                                    self.userService.getUserProfileById(response.id).then(function (response) {
                                        if (response.userId) {
                                            self.$rootScope.profileData = new app.models.user.Profile(response);
                                            self.functionsUtil.addUserIndentifyMixpanel(self.$rootScope.profileData.UserId);
                                        }
                                        self.$uibModalInstance.close();
                                    });
                                });
                            }, function (response) {
                                self.saving = false;
                                if (response.status == 401) {
                                    DEBUG && console.log(USERNAME_PASSWORD_WRONG);
                                    self.validate.globalValidate.valid = false;
                                    self.validate.globalValidate.message = USERNAME_PASSWORD_WRONG;
                                }
                                else if (response.status == -1) {
                                    DEBUG && console.log(SERVER_ERROR);
                                    self.messageUtil.error(SERVER_ERROR);
                                }
                                else {
                                    DEBUG && console.log(SERVER_CODE_ERROR + response.status);
                                    self.messageUtil.error(SERVER_CODE_ERROR + response.status);
                                }
                            });
                        });
                    }
                    else {
                        this.saving = false;
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
                        controller: 'mainApp.components.modal.ModalForgotPasswordController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalLogInController.prototype._openSignUpModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
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
                'mainApp.models.user.UserService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.messageUtilService',
                '$filter',
                'mainApp.localStorageService',
                'dataSetModal',
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