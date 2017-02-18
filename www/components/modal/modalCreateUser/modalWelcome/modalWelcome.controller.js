var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalWelcome;
        (function (modalWelcome) {
            var ModalWelcomeController = (function () {
                function ModalWelcomeController($uibModalInstance, dataConfig, $uibModal) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                ModalWelcomeController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalWelcomeController.prototype.activate = function () {
                    DEBUG && console.log('modalWelcome controller actived');
                };
                ModalWelcomeController.prototype._openPhotoModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalPhotoTmpl,
                        controller: 'mainApp.components.modal.ModalPhotoController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                return ModalWelcomeController;
            }());
            ModalWelcomeController.controllerId = 'mainApp.components.modal.ModalWelcomeController';
            ModalWelcomeController.$inject = [
                '$uibModalInstance',
                'dataConfig',
                '$uibModal'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalWelcomeController.controllerId, ModalWelcomeController);
        })(modalWelcome = modal.modalWelcome || (modal.modalWelcome = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalWelcome.controller.js.map