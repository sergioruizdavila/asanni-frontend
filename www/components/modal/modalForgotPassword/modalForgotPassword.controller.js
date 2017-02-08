var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalForgotPassword;
        (function (modalForgotPassword) {
            var ModalForgotPasswordController = (function () {
                function ModalForgotPasswordController($rootScope, $state, AuthService, AccountService, functionsUtil, messageUtil, localStorage, dataConfig, $uibModal, $uibModalInstance) {
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
                ModalForgotPasswordController.prototype._init = function () {
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
                ModalForgotPasswordController.prototype.activate = function () {
                    DEBUG && console.log('modalForgotPassword controller actived');
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
                ModalForgotPasswordController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalForgotPasswordController;
            }());
            ModalForgotPasswordController.controllerId = 'mainApp.components.modal.ModalForgotPasswordController';
            ModalForgotPasswordController.$inject = [
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
                .controller(ModalForgotPasswordController.controllerId, ModalForgotPasswordController);
        })(modalForgotPassword = modal.modalForgotPassword || (modal.modalForgotPassword = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalForgotPassword.controller.js.map