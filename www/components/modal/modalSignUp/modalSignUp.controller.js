var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController(RegisterService, messageUtil, dataConfig, $uibModal, $uibModalInstance) {
                    this.RegisterService = RegisterService;
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
                    this.activate();
                };
                ModalSignUpController.prototype.activate = function () {
                    DEBUG && console.log('modalSignUp controller actived');
                };
                ModalSignUpController.prototype.registerUser = function () {
                    var self = this;
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
                    this.$uibModalInstance.close();
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalSignUpController;
            }());
            ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
            ModalSignUpController.$inject = [
                'mainApp.register.RegisterService',
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