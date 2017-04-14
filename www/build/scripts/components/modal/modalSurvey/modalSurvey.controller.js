var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSurvey;
        (function (modalSurvey) {
            var ModalSurveyController = (function () {
                function ModalSurveyController($rootScope, $filter, $uibModalInstance, dataConfig, FeatureService, FeedbackService, messageUtil) {
                    this.$rootScope = $rootScope;
                    this.$filter = $filter;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.FeatureService = FeatureService;
                    this.FeedbackService = FeedbackService;
                    this.messageUtil = messageUtil;
                    this._init();
                }
                ModalSurveyController.prototype._init = function () {
                    var self = this;
                    this.loading = true;
                    this.success = false;
                    this.optionsList = [];
                    this.form = {
                        option: ''
                    };
                    this.activate();
                };
                ModalSurveyController.prototype.activate = function () {
                    var CLICK_MIXPANEL = 'Click: Open Survey Modal';
                    var self = this;
                    DEBUG && console.log('modalSurvey controller actived');
                    mixpanel.track(CLICK_MIXPANEL);
                    this.FeatureService.getFeaturesByRange(this.dataConfig.featureMinId).then(function (response) {
                        self.optionsList = response.results;
                        self.loading = false;
                    });
                };
                ModalSurveyController.prototype.saveOption = function (option) {
                    var CLICK_MIXPANEL = 'Click: Selected feature option' + option.id;
                    var self = this;
                    var feedback = new app.models.feedback.Feedback();
                    feedback.NextFeature = option.id;
                    this.loading = true;
                    this.FeedbackService.createFeedback(feedback).then(function (response) {
                        if (response.id) {
                            self.success = true;
                            self.loading = false;
                        }
                    }, function (error) {
                        self.messageUtil.error('');
                    });
                };
                ModalSurveyController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalSurveyController.controllerId = 'mainApp.components.modal.ModalSurveyController';
                ModalSurveyController.$inject = [
                    '$rootScope',
                    '$filter',
                    '$uibModalInstance',
                    'dataConfig',
                    'mainApp.models.feature.FeatureService',
                    'mainApp.models.feedback.FeedbackService',
                    'mainApp.core.util.messageUtilService'
                ];
                return ModalSurveyController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalSurveyController.controllerId, ModalSurveyController);
        })(modalSurvey = modal.modalSurvey || (modal.modalSurvey = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalSurvey/modalSurvey.controller.js.map
