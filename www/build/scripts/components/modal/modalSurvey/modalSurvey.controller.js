var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSurvey;
        (function (modalSurvey) {
            var ModalSurveyController = (function () {
                function ModalSurveyController($rootScope, $filter, $uibModalInstance, dataConfig, FeatureService, FeedbackService, functionsUtil, messageUtil) {
                    this.$rootScope = $rootScope;
                    this.$filter = $filter;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.FeatureService = FeatureService;
                    this.FeedbackService = FeedbackService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this._init();
                }
                ModalSurveyController.prototype._init = function () {
                    var self = this;
                    this.loading = true;
                    this.success = false;
                    this.optionsList = [];
                    this.addActive = false;
                    this.other = '';
                    this.validate = {
                        other: { valid: true, message: '' }
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
                ModalSurveyController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var other_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.other = this.functionsUtil.validator(this.other, other_rules);
                    if (!this.validate.other.valid) {
                        formValid = this.validate.other.valid;
                    }
                    return formValid;
                };
                ModalSurveyController.prototype.saveOption = function (option, isOther) {
                    if (isOther === void 0) { isOther = false; }
                    var click_mixpanel = '';
                    var self = this;
                    var feedback = new app.models.feedback.Feedback();
                    var formValid = true;
                    if (isOther) {
                        click_mixpanel = 'Click: Added new feature option: ' + option;
                        formValid = this._validateForm();
                        feedback.NextOtherFeature = option;
                    }
                    else {
                        click_mixpanel = 'Click: Selected feature option: ' + option;
                        feedback.NextFeature = parseInt(option);
                    }
                    if (!formValid) {
                        return;
                    }
                    this.loading = true;
                    this.FeedbackService.createFeedback(feedback).then(function (response) {
                        if (response.id) {
                            self.success = true;
                            self.loading = false;
                        }
                    }, function (error) {
                        var ERROR_MESSAGE = 'Error modalSurvey.controller.js method: saveOption ';
                        Raven.captureMessage(ERROR_MESSAGE, error);
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
                    'mainApp.core.util.FunctionsUtilService',
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
