var components;
(function (components) {
    var survey;
    (function (survey) {
        'use strict';
        var MaSurvey = (function () {
            function MaSurvey() {
                this.bindToController = true;
                this.controller = SurveyController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    surveyValue: '=',
                    size: '@',
                    showLabel: '=',
                    showBorder: '='
                };
                this.templateUrl = 'components/survey/survey.html';
                DEBUG && console.log('maSurvey directive constructor');
            }
            MaSurvey.prototype.link = function ($scope, elm, attr) {
                DEBUG && console.log('maSurvey link function');
            };
            MaSurvey.instance = function () {
                return new MaSurvey();
            };
            MaSurvey.directiveId = 'maSurvey';
            return MaSurvey;
        }());
        angular
            .module('mainApp.components.survey')
            .directive(MaSurvey.directiveId, MaSurvey.instance);
        var SurveyController = (function () {
            function SurveyController($filter, $uibModal, dataConfig) {
                this.$filter = $filter;
                this.$uibModal = $uibModal;
                this.dataConfig = dataConfig;
                this.init();
            }
            SurveyController.prototype.init = function () {
                this.activate();
            };
            SurveyController.prototype.activate = function () {
                DEBUG && console.log('survey controller actived');
            };
            SurveyController.prototype._openSurveyModal = function () {
                var CLICK_MIXPANEL = 'Click on Survey Button';
                var self = this;
                var options = {
                    animation: false,
                    backdrop: 'static',
                    keyboard: true,
                    size: 'sm',
                    templateUrl: this.dataConfig.modalSurveyTmpl,
                    controller: 'mainApp.components.modal.ModalSurveyController as vm'
                };
                var modalInstance = this.$uibModal.open(options);
                mixpanel.track(CLICK_MIXPANEL);
            };
            SurveyController.controllerId = 'mainApp.components.survey.SurveyController';
            SurveyController.$inject = ['$filter',
                '$uibModal',
                'dataConfig'];
            return SurveyController;
        }());
        survey.SurveyController = SurveyController;
        angular.module('mainApp.components.survey')
            .controller(SurveyController.controllerId, SurveyController);
    })(survey = components.survey || (components.survey = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/survey/survey.directive.js.map
