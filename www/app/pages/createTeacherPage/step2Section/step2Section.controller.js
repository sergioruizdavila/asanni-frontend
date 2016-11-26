var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var Step2SectionController = (function () {
                function Step2SectionController(dataConfig, $state, $filter, $scope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                Step2SectionController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                Step2SectionController.prototype.activate = function () {
                    console.log('step 2 section controller actived');
                };
                Step2SectionController.prototype.nextStep = function () {
                    this.$state.go('page.createTeacherPage.step3');
                };
                Step2SectionController.prototype.backStep = function () {
                    this.$state.go('page.createTeacherPage.step1');
                };
                return Step2SectionController;
            }());
            Step2SectionController.controllerId = 'mainApp.pages.createTeacherPage.Step2SectionController';
            Step2SectionController.$inject = [
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$uibModal'
            ];
            createTeacherPage.Step2SectionController = Step2SectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(Step2SectionController.controllerId, Step2SectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=step2Section.controller.js.map