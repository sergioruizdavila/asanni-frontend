var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, teacherService, dataConfig, $state, $filter, $scope, $uibModal) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
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
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    console.log('createTeacherPage controller actived');
                };
                CreateTeacherPageController.prototype.progress = function () {
                    return;
                };
                CreateTeacherPageController.prototype.goToNext = function () {
                    var BASIC_INFO_STATE = 'page.createTeacherPage.basicInfo';
                    var STEP2_STATE = 'page.createTeacherPage.step2';
                    var STEP3_STATE = 'page.createTeacherPage.step3';
                    var date = this.form.teacherData.Birth_date.year + '-' + 'July' + '-' + this.form.teacherData.Birth_date.day;
                    this.form.teacherData.Birth_date = moment(date).format('YYYY-MM-DD');
                    var currentState = this.$state.current.name;
                    this.teacherService.createTeacher(this.form.teacherData)
                        .then(function (response) {
                        console.log('response');
                    });
                    switch (currentState) {
                        case BASIC_INFO_STATE:
                            this.$state.go('page.createTeacherPage.step2');
                            break;
                        case STEP2_STATE:
                            this.$state.go('page.createTeacherPage.step3');
                            break;
                        case STEP3_STATE:
                            break;
                    }
                };
                return CreateTeacherPageController;
            }());
            CreateTeacherPageController.controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';
            CreateTeacherPageController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.teacher.TeacherService',
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