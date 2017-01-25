var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalRecommendTeacher;
        (function (modalRecommendTeacher) {
            var ModalRecommendTeacherController = (function () {
                function ModalRecommendTeacherController($uibModalInstance, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalRecommendTeacherController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalRecommendTeacherController.prototype.activate = function () {
                    console.log('modalRecommendTeacher controller actived');
                };
                ModalRecommendTeacherController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                return ModalRecommendTeacherController;
            }());
            ModalRecommendTeacherController.controllerId = 'mainApp.components.modal.ModalRecommendTeacherController';
            ModalRecommendTeacherController.$inject = [
                '$uibModalInstance',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.teacher.TeacherService',
                '$timeout',
                '$filter'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalRecommendTeacherController.controllerId, ModalRecommendTeacherController);
        })(modalRecommendTeacher = modal.modalRecommendTeacher || (modal.modalRecommendTeacher = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalRecommendTeacher.controller.js.map