var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController($rootScope, RegisterService, functionsUtil, messageUtil, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.RegisterService = RegisterService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
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
                    this.passwordMinLength = this.dataConfig.passwordMinLength;
                    this.passwordMaxLength = this.dataConfig.passwordMaxLength;
                    this.validate = {
                        username: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        first_name: { valid: true, message: '' },
                        last_name: { valid: true, message: '' },
                        password: { valid: true, message: '' }
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
                        this.form.username = this.functionsUtil.generateUsername(this.form.first_name, this.form.last_name);
                        this.RegisterService.register(this.form).then(function (response) {
                            DEBUG && console.log('Welcome!, Your new account has been successfuly created.');
                            self.messageUtil.success('Welcome!, Your new account has been successfuly created.');
                            self._openLogInModal();
                        }, function (error) {
                            DEBUG && console.log(JSON.stringify(error));
                            var errortext = [];
                            for (var key in error.data) {
                                var line = key.toUpperCase();
                                line += ': ';
                                line += error.data[key];
                                errortext.push(line);
                            }
                            DEBUG && console.error(errortext);
                        });
                    }
                };
                ModalSignUpController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
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
                        this.validate.password.message = 'Your password must be at least 6 characters. Please try again.';
                    }
                    return formValid;
                };
                ModalSignUpController.prototype._openLogInModal = function () {
                    mixpanel.track("Click on 'Log in' from signUp modal");
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalLogInTmpl,
                        controller: 'mainApp.components.modal.ModalLogInController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function () {
                        self.$rootScope.$broadcast('Is Authenticated');
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    this.$uibModalInstance.close();
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalSignUpController;
            }());
            ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
            ModalSignUpController.$inject = [
                '$rootScope',
                'mainApp.register.RegisterService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.messageUtilService',
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