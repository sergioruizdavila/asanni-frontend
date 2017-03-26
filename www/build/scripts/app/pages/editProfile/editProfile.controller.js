var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfile;
        (function (editProfile) {
            var EditProfileController = (function () {
                function EditProfileController(getDataFromJson, functionsUtilService, userService, teacherService, messageUtil, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal, waitForAuth) {
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
                EditProfileController.prototype._init = function () {
                    var self = this;
                    var loggedUserId = this.$rootScope.userData.id;
                    var currentState = this.$state.current.name;
                    if (this.$rootScope.profileData) {
                        this.isTeacher = this.$rootScope.profileData.IsTeacher;
                    }
                    this.activate();
                };
                EditProfileController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Edit Profile Page';
                    var self = this;
                    DEBUG && console.log('editProfile controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    this.fillFormWithProfileData();
                };
                EditProfileController.prototype.fillFormWithProfileData = function () {
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
                EditProfileController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Profile Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var userId = self.$rootScope.profileData.UserId;
                        if (userId) {
                            self.userService.updateUserProfile(self.$rootScope.profileData)
                                .then(function (response) {
                                if (response.userId) {
                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                    self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                    self.$scope.$broadcast('Saved');
                                }
                            }, function (error) {
                                self.messageUtil.error('');
                                self.$scope.$broadcast('Fill User Profile Form', 'error');
                            });
                        }
                    });
                };
                EditProfileController.controllerId = 'mainApp.pages.editProfile.EditProfileController';
                EditProfileController.$inject = [
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
                    'waitForAuth'];
                return EditProfileController;
            }());
            editProfile.EditProfileController = EditProfileController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileController.controllerId, EditProfileController);
        })(editProfile = pages.editProfile || (pages.editProfile = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/editProfile/editProfile.controller.js.map
