var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, teacherService, messageUtil, localStorage, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.messageUtil = messageUtil;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                CreateTeacherPageController.prototype._init = function () {
                    var self = this;
                    var currentState = this.$state.current.name;
                    angular.element(this.$window).bind("scroll", function () {
                        var floatHeader = document.getElementById('header-float');
                        if (floatHeader) {
                            var floatHeaderClasses = floatHeader.classList;
                            if (this.pageYOffset >= 30) {
                                floatHeaderClasses.remove('hidden');
                            }
                            else {
                                floatHeaderClasses.add('hidden');
                            }
                        }
                    });
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    var self = this;
                    console.log('createTeacherPage controller actived');
                    mixpanel.track("Enter: Create Teacher Page");
                    this._subscribeToEvents();
                    if (this.$stateParams.type === 'new') {
                        this.localStorage.setItem(this.dataConfig.teacherIdLocalStorage, '');
                    }
                    this.fillFormWithTeacherData();
                };
                CreateTeacherPageController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    this.$rootScope.teacher_id = this.localStorage.getItem(this.dataConfig.teacherIdLocalStorage);
                    if (this.$rootScope.teacher_id) {
                        this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                            .then(function (response) {
                            if (response.id) {
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                            }
                            else {
                            }
                        });
                    }
                };
                CreateTeacherPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var numStep = args;
                        if (self.$rootScope.teacherData.Id) {
                            self.teacherService.updateTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.teacher_id = response.id;
                                    self.localStorage.setItem(self.dataConfig.teacherIdLocalStorage, response.id);
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                }
                                else {
                                }
                            });
                        }
                        else {
                            self.teacherService.createTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.teacher_id = response.id;
                                    self.localStorage.setItem(self.dataConfig.teacherIdLocalStorage, response.id);
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
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
                'mainApp.core.util.messageUtilService',
                'mainApp.localStorageService',
                'dataConfig',
                '$state',
                '$stateParams',
                '$filter',
                '$scope',
                '$window',
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