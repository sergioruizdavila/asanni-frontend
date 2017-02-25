var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController($rootScope, AuthService, AccountService, RegisterService, functionsUtil, messageUtil, $filter, localStorage, dataSetModal, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.RegisterService = RegisterService;
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
                ModalSignUpController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        username: '',
                        email: '',
                        first_name: '',
                        last_name: '',
                        password: ''
                    };
                    this.saving = false;
                    this.passwordMinLength = this.dataConfig.passwordMinLength;
                    this.passwordMaxLength = this.dataConfig.passwordMaxLength;
                    this.validate = {
                        username: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        first_name: { valid: true, message: '' },
                        last_name: { valid: true, message: '' },
                        password: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalSignUpController.prototype.activate = function () {
                    DEBUG && console.log('modalSignUp controller actived');
                };
                ModalSignUpController.prototype.registerUser = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this.form.username = this.functionsUtil.generateUsername(this.form.first_name, this.form.last_name);
                        this.RegisterService.register(this.form).then(function (response) {
                            DEBUG && console.log('Welcome!, Your new account has been successfuly created.');
                            self._loginAfterRegister(response.username, response.email, response.password);
                        }, function (error) {
                            DEBUG && console.log(JSON.stringify(error));
                            self.saving = false;
                            var errortext = [];
                            for (var key in error.data) {
                                var line = key;
                                line += ': ';
                                line += error.data[key];
                                errortext.push(line);
                            }
                            DEBUG && console.error(errortext);
                            self.validate.globalValidate.valid = false;
                            self.validate.globalValidate.message = errortext[0];
                        });
                    }
                };
                ModalSignUpController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var PASSWORD_MESSAGE = this.$filter('translate')('%modal.signup.error.short_password.text');
                    var formValid = true;
                    var firstName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.first_name = this.functionsUtil.validator(this.form.first_name, firstName_rules);
                    if (!this.validate.first_name.valid) {
                        formValid = this.validate.first_name.valid;
                    }
                    var lastName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.last_name = this.functionsUtil.validator(this.form.last_name, lastName_rules);
                    if (!this.validate.last_name.valid) {
                        formValid = this.validate.last_name.valid;
                    }
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.password = this.functionsUtil.validator(this.form.password, password_rules);
                    if (!this.validate.password.valid) {
                        formValid = this.validate.password.valid;
                        this.validate.password.message = PASSWORD_MESSAGE;
                    }
                    return formValid;
                };
                ModalSignUpController.prototype._checkIfEmailExist = function () {
                    var EMAIL_TAKEN_MESSAGE = this.$filter('translate')('%modal.signup.error.email_taken.text');
                    var self = this;
                    if (this.form.email) {
                        this.RegisterService.checkEmail(this.form.email).then(function (response) {
                            if (response.data) {
                                if (!response.data.emailExist) {
                                    self.validate.email.valid = true;
                                }
                                else {
                                    self.validate.email.valid = false;
                                    self.validate.email.message = EMAIL_TAKEN_MESSAGE;
                                }
                            }
                            else if (response.email) {
                                self.validate.email.valid = true;
                            }
                        });
                    }
                };
                ModalSignUpController.prototype._openLogInModal = function () {
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
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function () {
                        self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    this.$uibModalInstance.close();
                };
                ModalSignUpController.prototype._loginAfterRegister = function (username, email, password) {
                    var USERNAME_PASSWORD_WRONG = this.$filter('translate')('%error.username_password_wrong.text');
                    var SERVER_ERROR = this.$filter('translate')('%error.server_error.text');
                    var SERVER_CODE_ERROR = this.$filter('translate')('%error.server_error_code.text');
                    var self = this;
                    var userData = {
                        username: username,
                        email: email,
                        password: password
                    };
                    this.AuthService.login(userData).then(function (response) {
                        self.AccountService.getAccount().then(function (response) {
                            DEBUG && console.log('Data User: ', response);
                            self.saving = false;
                            self.localStorage.setItem(self.dataConfig.userDataLocalStorage, JSON.stringify(response));
                            self.$rootScope.userData = response;
                            response.userId = response.id;
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);
                            if (!self.dataSetModal.hasNextStep) {
                                self._openWelcomeModal();
                            }
                            self.$uibModalInstance.close();
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
                };
                ModalSignUpController.prototype._openWelcomeModal = function () {
                    var self = this;
                    var options = {
                        animation: true,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalWelcomeTmpl,
                        controller: 'mainApp.components.modal.ModalWelcomeController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalSignUpController;
            }());
            ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
            ModalSignUpController.$inject = [
                '$rootScope',
                'mainApp.auth.AuthService',
                'mainApp.account.AccountService',
                'mainApp.register.RegisterService',
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
                .controller(ModalSignUpController.controllerId, ModalSignUpController);
        })(modalSignUp = modal.modalSignUp || (modal.modalSignUp = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalSignUp.controller.js.map