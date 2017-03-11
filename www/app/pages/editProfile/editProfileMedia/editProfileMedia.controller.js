var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfileMedia;
        (function (editProfileMedia) {
            var EditProfileMediaController = (function () {
                function EditProfileMediaController(dataConfig, userService, S3UploadService, getDataFromJson, functionsUtil, Upload, $state, $filter, $timeout, $scope, $rootScope) {
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
                EditProfileMediaController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
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
                EditProfileMediaController.prototype.activate = function () {
                    DEBUG && console.log('EditProfileMedia controller actived');
                    this._subscribeToEvents();
                };
                EditProfileMediaController.prototype.goToEditProfile = function () {
                    this.$state.go('page.editProfile.basicInfo');
                };
                EditProfileMediaController.prototype.goToEditLocation = function () {
                    this.$state.go('page.editProfile.location');
                };
                EditProfileMediaController.prototype._validateForm = function () {
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
                EditProfileMediaController.prototype._resizeImage = function () {
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
                EditProfileMediaController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        DEBUG && console.error('error', error);
                        return error;
                    });
                };
                EditProfileMediaController.prototype._setDataModelFromForm = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                EditProfileMediaController.prototype.saveImageSection = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._setDataModelFromForm(result.Location);
                                self.$scope.$emit('Save Profile Data');
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
                EditProfileMediaController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.form.avatar = self.saved ? null : self.form.avatar;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                return EditProfileMediaController;
            }());
            EditProfileMediaController.controllerId = 'mainApp.pages.editProfile.EditProfileMediaController';
            EditProfileMediaController.$inject = [
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
            editProfileMedia.EditProfileMediaController = EditProfileMediaController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileMediaController.controllerId, EditProfileMediaController);
        })(editProfileMedia = pages.editProfileMedia || (pages.editProfileMedia = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=editProfileMedia.controller.js.map