var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherController = (function () {
                function EditTeacherController(getDataFromJson, functionsUtilService, userService, teacherService, messageUtil, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal, waitForAuth) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.userService = userService;
                    this.teacherService = teacherService;
                    this.messageUtil = messageUtil;
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
                EditTeacherController.prototype._init = function () {
                    var self = this;
                    var loggedUserId = this.$rootScope.userData.id;
                    var currentState = this.$state.current.name;
                    this.$rootScope.teacherData = new app.models.teacher.Teacher();
                    this.$rootScope.teacherData.Profile.UserId = loggedUserId;
                    this.activate();
                };
                EditTeacherController.prototype.activate = function () {
                    var self = this;
                    console.log('editTeacher controller actived');
                    this._subscribeToEvents();
                    this.fillFormWithProfileData();
                    this.fillFormWithTeacherData();
                };
                EditTeacherController.prototype.fillFormWithProfileData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        });
                    }
                };
                EditTeacherController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    this.teacherService.getTeacherByProfileId(userId).then(function (response) {
                        if (response.id) {
                            self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                            self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                        }
                    });
                };
                EditTeacherController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Profile Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var userId = self.$rootScope.profileData.UserId;
                        if (userId) {
                            self.userService.updateUserProfile(self.$rootScope.profileData)
                                .then(function (response) {
                                if (response.userId) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                    self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                }
                            }, function (error) {
                                DEBUG && console.error(error);
                            });
                        }
                    });
                    this.$scope.$on('Save Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        if (self.$rootScope.teacherData.Id) {
                            self.teacherService.updateTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                }
                            });
                        }
                        else {
                            self.teacherService.createTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                }
                            });
                        }
                    });
                };
                return EditTeacherController;
            }());
            EditTeacherController.controllerId = 'mainApp.pages.editTeacher.EditTeacherController';
            EditTeacherController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.user.UserService',
                'mainApp.models.teacher.TeacherService',
                'mainApp.core.util.messageUtilService',
                'dataConfig',
                '$state',
                '$stateParams',
                '$filter',
                '$scope',
                '$window',
                '$rootScope',
                '$uibModal',
                'waitForAuth'
            ];
            editTeacher.EditTeacherController = EditTeacherController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherController.controllerId, EditTeacherController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=editTeacher.controller.js.map