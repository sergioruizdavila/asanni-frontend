var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalExperience;
        (function (modalExperience) {
            var ModalExperienceController = (function () {
                function ModalExperienceController($uibModalInstance, dataSetModal, $timeout) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.$timeout = $timeout;
                    this._init();
                }
                ModalExperienceController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        experience: this.dataSetModal.experience || new app.models.teacher.Experience()
                    };
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                ModalExperienceController.prototype.activate = function () {
                    console.log('modalExperience controller actived');
                };
                ModalExperienceController.prototype._save = function () {
                    this.$uibModalInstance.close(this.form.experience);
                };
                ModalExperienceController.prototype.close = function () {
                    this.$uibModalInstance.close();
                    event.preventDefault();
                };
                return ModalExperienceController;
            }());
            ModalExperienceController.controllerId = 'mainApp.components.modal.ModalExperienceController';
            ModalExperienceController.$inject = [
                '$uibModalInstance',
                'dataSetModal',
                '$timeout'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalExperienceController.controllerId, ModalExperienceController);
        })(modalExperience = modal.modalExperience || (modal.modalExperience = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalExperience.controller.js.map