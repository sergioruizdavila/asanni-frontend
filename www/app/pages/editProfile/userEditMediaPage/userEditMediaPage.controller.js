var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditMediaPage;
        (function (userEditMediaPage) {
            var UserEditMediaPageController = (function () {
                function UserEditMediaPageController(dataConfig, userService, S3UploadService, getDataFromJson, functionsUtil, Upload, $state, $filter, $timeout, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.S3UploadService = S3UploadService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.Upload = Upload;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                UserEditMediaPageController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    if (this.$rootScope.profileData) {
                        this.isTeacher = this.$rootScope.profileData.IsTeacher;
                    }
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.form = {
                        avatar: null,
                        croppedDataUrl: '',
                        thumbnail: ''
                    };
                    this.validate = {
                        avatar: { valid: true, message: '' },
                        thumbnail: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                UserEditMediaPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Edit Profile Page (Photo)';
                    DEBUG && console.log('userEditMediaPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                UserEditMediaPageController.prototype.goToEditProfile = function () {
                    this.$state.go('page.userEditProfilePage');
                };
                UserEditMediaPageController.prototype.goToEditLocation = function () {
                    this.$state.go('page.userEditLocationPage');
                };
                UserEditMediaPageController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var DEFINED_ENUM = 6;
                    var PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');
                    var formValid = true;
                    this.validate.globalValidate.valid = true;
                    this.validate.globalValidate.message = '';
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtil.validator(this.form.avatar, avatar_rules);
                    var thumbnail_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.thumbnail = this.functionsUtil.validator(this.form.thumbnail, thumbnail_rules);
                    if (!this.validate.avatar.valid) {
                        if (!this.validate.thumbnail.valid) {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = PHOTO_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                        else {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                    }
                    return formValid;
                };
                UserEditMediaPageController.prototype._resizeImage = function () {
                    var self = this;
                    var newName = app.core.util.functionsUtil.FunctionsUtilService.generateGuid() + '.jpeg';
                    var options = {
                        width: 250,
                        height: 250,
                        quality: 1.0,
                        type: 'image/jpeg',
                        pattern: '.jpg',
                        restoreExif: false
                    };
                    var file = this.Upload.dataUrltoBlob(this.form.croppedDataUrl, newName);
                    return this.Upload.resize(file, options).then(function (resizedFile) {
                        return self._uploadImage(resizedFile).then(function (result) {
                            return result;
                        });
                    });
                };
                UserEditMediaPageController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        DEBUG && console.error('error', error);
                        return error;
                    });
                };
                UserEditMediaPageController.prototype._setDataModelFromForm = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                UserEditMediaPageController.prototype.saveImageSection = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._setDataModelFromForm(result.Location);
                                self.save().then(function (saved) {
                                    self.saving = false;
                                    self.saved = saved;
                                    self.error = !saved;
                                    self.form.avatar = self.saved ? null : self.form.avatar;
                                    self.$timeout(function () {
                                        self.saved = false;
                                    }, self.TIME_SHOW_MESSAGE);
                                });
                            }
                            else {
                                self.error = true;
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                UserEditMediaPageController.prototype.save = function () {
                    var self = this;
                    return this.userService.updateUserProfile(this.$rootScope.profileData)
                        .then(function (response) {
                        var saved = false;
                        if (response.userId) {
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            saved = true;
                        }
                        return saved;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return false;
                    });
                };
                return UserEditMediaPageController;
            }());
            UserEditMediaPageController.controllerId = 'mainApp.pages.userEditMediaPage.UserEditMediaPageController';
            UserEditMediaPageController.$inject = [
                'dataConfig',
                'mainApp.models.user.UserService',
                'mainApp.core.s3Upload.S3UploadService',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'Upload',
                '$state',
                '$filter',
                '$timeout',
                '$scope',
                '$rootScope'
            ];
            userEditMediaPage.UserEditMediaPageController = UserEditMediaPageController;
            angular
                .module('mainApp.pages.userEditMediaPage')
                .controller(UserEditMediaPageController.controllerId, UserEditMediaPageController);
        })(userEditMediaPage = pages.userEditMediaPage || (pages.userEditMediaPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userEditMediaPage.controller.js.map