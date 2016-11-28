var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, dataConfig, $state, $filter, $scope, $uibModal) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                CreateTeacherPageController.prototype._init = function () {
                    var START_DAY = 1;
                    var FINAL_DAY = 31;
                    var START_YEAR = 1916;
                    var FINAL_YEAR = 1998;
                    this.form = {
                        teacherData: new app.models.teacher.Teacher()
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.generateRangesOfNumbers(1, 31);
                    this.listYears = this.functionsUtilService.generateRangesOfNumbers(1916, 1998);
                    this.step = 1;
                    this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html';
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    console.log('createTeacherPage controller actived');
                };
                CreateTeacherPageController.prototype._getStepTemplate = function () {
                    switch (this.step) {
                        case 1:
                            this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html';
                            break;
                        case 2:
                            this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/step2Section.html';
                            break;
                        case 3:
                            this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/step3Section.html';
                            break;
                    }
                };
                CreateTeacherPageController.prototype.progress = function () {
                    return;
                };
                return CreateTeacherPageController;
            }());
            CreateTeacherPageController.controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';
            CreateTeacherPageController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$uibModal'
            ];
            createTeacherPage.CreateTeacherPageController = CreateTeacherPageController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(CreateTeacherPageController.controllerId, CreateTeacherPageController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=createTeacherPage.controller.js.map