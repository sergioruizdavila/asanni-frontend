var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, teacherService, localStorage, dataConfig, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                CreateTeacherPageController.prototype._init = function () {
                    var START_DAY = 1;
                    var FINAL_DAY = 31;
                    var START_YEAR = 1916;
                    var FINAL_YEAR = 1998;
                    this.form = {
                        teacherData: new app.models.teacher.Teacher(),
                        dateSplitted: { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } }
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    console.log('createTeacherPage controller actived');
                    this.fillFormWithTeacherData();
                };
                CreateTeacherPageController.prototype.progress = function () {
                    return;
                };
                CreateTeacherPageController.prototype.goToNext = function () {
                    var STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    var STEP2_STATE = 'page.createTeacherPage.location';
                    var STEP3_STATE = 'page.createTeacherPage.step3';
                    var self = this;
                    var currentState = this.$state.current.name;
                    var dateFormatted = this.functionsUtilService.joinDate(this.form.dateSplitted.day.value, this.form.dateSplitted.month.code, this.form.dateSplitted.year.value);
                    this.form.teacherData.BirthDate = dateFormatted;
                    if (this.$rootScope.teacher_id) {
                        this.form.teacherData.Id = this.$rootScope.teacher_id;
                        this.teacherService.updateTeacher(this.form.teacherData)
                            .then(function (response) {
                            if (response.id) {
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);
                            }
                            else {
                            }
                        });
                    }
                    else {
                        this.teacherService.createTeacher(this.form.teacherData)
                            .then(function (response) {
                            if (response.id) {
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);
                            }
                            else {
                            }
                        });
                    }
                    switch (currentState) {
                        case STEP1_STATE:
                            this.$state.go(STEP2_STATE, { reload: true });
                            break;
                        case STEP2_STATE:
                            this.$state.go(STEP3_STATE, { reload: true });
                            break;
                        case STEP3_STATE:
                            break;
                    }
                };
                CreateTeacherPageController.prototype.goToBack = function () {
                    var STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    var STEP2_STATE = 'page.createTeacherPage.location';
                    var STEP3_STATE = 'page.createTeacherPage.step3';
                    var currentState = this.$state.current.name;
                    switch (currentState) {
                        case STEP1_STATE:
                            break;
                        case STEP2_STATE:
                            this.$state.go(STEP1_STATE, { reload: true });
                            break;
                        case STEP3_STATE:
                            this.$state.go(STEP2_STATE, { reload: true });
                            break;
                    }
                };
                CreateTeacherPageController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    this.$rootScope.teacher_id = this.localStorage.getItem('waysily.teacher_id');
                    if (this.$rootScope.teacher_id) {
                        this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                            .then(function (response) {
                            if (response.id) {
                                var date = self.functionsUtilService.splitDate(response.birthDate);
                                self.form.dateSplitted.day.value = parseInt(date.day);
                                self.form.dateSplitted.month.code = date.month;
                                self.form.dateSplitted.year.value = parseInt(date.year);
                                self.form.teacherData = new app.models.teacher.Teacher(response);
                            }
                            else {
                            }
                        });
                    }
                };
                return CreateTeacherPageController;
            }());
            CreateTeacherPageController.controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';
            CreateTeacherPageController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.teacher.TeacherService',
                'mainApp.localStorageService',
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
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