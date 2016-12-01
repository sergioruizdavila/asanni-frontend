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
                    var currentState = this.$state.current.name;
                    this.teacherData = new app.models.teacher.Teacher();
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    var self = this;
                    console.log('createTeacherPage controller actived');
                    this._subscribeToEvents();
                    this.fillFormWithTeacherData();
                };
                CreateTeacherPageController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    this.$rootScope.teacher_id = this.localStorage.getItem('waysily.teacher_id');
                    if (this.$rootScope.teacher_id) {
                        this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                            .then(function (response) {
                            if (response.id) {
                                self.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.teacherData);
                            }
                            else {
                            }
                        });
                    }
                };
                CreateTeacherPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Data', function (event, args) {
                        var numStep = args;
                        if (self.$rootScope.teacher_id) {
                            self.teacherData.Id = self.$rootScope.teacher_id;
                            self.teacherService.updateTeacher(self.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    self.$rootScope.teacher_id = response.id;
                                    self.localStorage.setItem('waysily.teacher_id', response.id);
                                    self.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.teacherData);
                                }
                                else {
                                }
                            });
                        }
                        else {
                            self.teacherService.createTeacher(self.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    self.$rootScope.teacher_id = response.id;
                                    self.localStorage.setItem('waysily.teacher_id', response.id);
                                    self.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.teacherData);
                                }
                                else {
                                }
                            });
                        }
                    });
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