var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController($scope, $state, RegisterService, messageUtil, functionsUtil, dataConfig, $uibModalInstance) {
                    this.$scope = $scope;
                    this.$state = $state;
                    this.RegisterService = RegisterService;
                    this.messageUtil = messageUtil;
                    this.functionsUtil = functionsUtil;
                    this.dataConfig = dataConfig;
                    this.$uibModalInstance = $uibModalInstance;
                    this._init();
                }
                ModalSignUpController.prototype._init = function () {
                    var self = this;
                    this.registerData = {};
                    this.activate();
                };
                ModalSignUpController.prototype.activate = function () {
                    console.log('modalSignUp controller actived');
                };
                ModalSignUpController.prototype.registerUser = function () {
                    var self = this;
                    this.RegisterService.register(this.registerData).then(function (response) {
                        console.log('Welcome!, Your new account has been successfuly created.');
                        this.$state.go('/login');
                    }, function (response) {
                        self.dataConfig.debug && console.log(JSON.stringify(response));
                        var errortext = [];
                        for (var key in response.data) {
                            var line = key.toUpperCase();
                            line += ': ';
                            line += response.data[key];
                            errortext.push(line);
                        }
                        console.error(errortext);
                    });
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalSignUpController;
            }());
            ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
            ModalSignUpController.$inject = [
                '$scope',
                '$state',
                'mainApp.models.user.RegisterService',
                'mainApp.core.util.messageUtilService',
                'mainApp.core.util.FunctionsUtilService',
                'dataConfig',
                '$uibModalInstance'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalSignUpController.controllerId, ModalSignUpController);
        })(modalSignUp = modal.modalSignUp || (modal.modalSignUp = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalSignUp.controller.js.map