var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalFinish;
        (function (modalFinish) {
            var ModalFinishController = (function () {
                function ModalFinishController($uibModalInstance, dataConfig, $uibModal) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                ModalFinishController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalFinishController.prototype.activate = function () {
                    DEBUG && console.log('modalFinish controller actived');
                };
                ModalFinishController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalFinishController.controllerId = 'mainApp.components.modal.ModalFinishController';
                ModalFinishController.$inject = [
                    '$uibModalInstance',
                    'dataConfig',
                    '$uibModal'
                ];
                return ModalFinishController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalFinishController.controllerId, ModalFinishController);
        })(modalFinish = modal.modalFinish || (modal.modalFinish = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalFinish/modalFinish.controller.js.map
