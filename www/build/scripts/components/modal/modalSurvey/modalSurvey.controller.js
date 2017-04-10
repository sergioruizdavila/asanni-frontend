var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSurvey;
        (function (modalSurvey) {
            var ModalSurveyController = (function () {
                function ModalSurveyController($rootScope, $filter, $uibModalInstance, dataConfig) {
                    this.$rootScope = $rootScope;
                    this.$filter = $filter;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this._init();
                }
                ModalSurveyController.prototype._init = function () {
                    var self = this;
                    this.sending = false;
                    this.form = {
                        option: ''
                    };
                    this.activate();
                };
                ModalSurveyController.prototype.activate = function () {
                    var CLICK_MIXPANEL = 'Click: Open Survey Modal';
                    DEBUG && console.log('modalSurvey controller actived');
                    mixpanel.track(CLICK_MIXPANEL);
                };
                ModalSurveyController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalSurveyController.controllerId = 'mainApp.components.modal.ModalSurveyController';
                ModalSurveyController.$inject = [
                    '$rootScope',
                    '$filter',
                    '$uibModal',
                    '$uibModalInstance',
                    'dataConfig'
                ];
                return ModalSurveyController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalSurveyController.controllerId, ModalSurveyController);
        })(modalSurvey = modal.modalSurvey || (modal.modalSurvey = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalSurvey/modalSurvey.controller.js.map
