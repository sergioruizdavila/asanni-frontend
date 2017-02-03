var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLogIn;
        (function (modalLogIn) {
            var ModalLogInController = (function () {
                function ModalLogInController($state, AuthService, AccountService, messageUtil, dataConfig, $uibModal, $uibModalInstance) {
                    this.$state = $state;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.messageUtil = messageUtil;
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
                    this.activate();
                };
                ModalLogInController.prototype.activate = function () {
                    console.log('modalLogIn controller actived');
                };
                ModalLogInController.prototype.login = function () {
                    var self = this;
                    this.AuthService.login(this.form).then(function (response) {
                        self.AccountService.getAccount().then(function (response) {
                            DEBUG && console.log('Data User: ', response);
                            self.$uibModalInstance.close();
                        });
                    }, function (response) {
                        if (response.status == 401) {
                            DEBUG && console.log('Incorrect username or password.');
                        }
                        else if (response.status == -1) {
                            DEBUG && console.log('No response from server.');
                        }
                        else {
                            DEBUG && console.log('There was a problem logging you in. Error code: ' + response.status + '.');
                        }
                    });
                };
                ModalLogInController.prototype._openSignUpModal = function () {
                    mixpanel.track("Click on 'Sign up' from logIn modal");
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
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
                '$state',
                'mainApp.auth.AuthService',
                'mainApp.account.AccountService',
                'mainApp.core.util.messageUtilService',
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