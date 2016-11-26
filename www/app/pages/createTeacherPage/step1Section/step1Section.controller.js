var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var Step1SectionController = (function () {
                function Step1SectionController(dataConfig, $state, $filter, $scope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                Step1SectionController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                Step1SectionController.prototype.activate = function () {
                    console.log('step 1 section controller actived');
                };
                Step1SectionController.prototype.nextStep = function () {
                    this.$state.go('page.createTeacherPage.step2');
                };
                return Step1SectionController;
            }());
            Step1SectionController.controllerId = 'mainApp.pages.createTeacherPage.Step1SectionController';
            Step1SectionController.$inject = [
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$uibModal'
            ];
            createTeacherPage.Step1SectionController = Step1SectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(Step1SectionController.controllerId, Step1SectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=step1Section.controller.js.map