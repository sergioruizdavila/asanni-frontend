var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherPhotoSectionController = (function () {
                function TeacherPhotoSectionController(functionsUtilService, S3UploadService, messageUtil, Upload, $state, $filter, $scope, $rootScope) {
                    this.functionsUtilService = functionsUtilService;
                    this.S3UploadService = S3UploadService;
                    this.messageUtil = messageUtil;
                    this.Upload = Upload;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherPhotoSectionController.prototype._init = function () {
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.FINAL_STEP_STATE = 'page.createTeacherPage.finish';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.teacher.help_text.description.text');
                    this.uploading = false;
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(8, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
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
                TeacherPhotoSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherPhotoSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherPhotoSectionController.prototype.goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.uploading = true;
                        if (this.form.avatar) {
                            this._resizeImage().then(function (result) {
                                self.uploading = false;
                                if (result.Location) {
                                    self._setDataModelFromForm(result.Location);
                                    self.$scope.$emit('Save Profile Data');
                                    self.$state.go(self.FINAL_STEP_STATE, { reload: true });
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            });
                        }
                        else {
                            this.$scope.$emit('Save Profile Data');
                            this.$state.go(this.FINAL_STEP_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPhotoSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP7_STATE, { reload: true });
                };
                TeacherPhotoSectionController.prototype._fillForm = function (data) {
                    this.form.thumbnail = data.Avatar;
                };
                TeacherPhotoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var DEFINED_ENUM = 6;
                    var PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');
                    var formValid = true;
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtilService.validator(this.form.avatar, avatar_rules);
                    var thumbnail_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.thumbnail = this.functionsUtilService.validator(this.form.thumbnail, thumbnail_rules);
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
                TeacherPhotoSectionController.prototype.changeHelpText = function (type) {
                    var AVATAR_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.avatar.title.text');
                    var AVATAR_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.teacher.help_text.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'avatar':
                            this.helpText.title = AVATAR_TITLE;
                            this.helpText.description = AVATAR_DESCRIPTION;
                            break;
                    }
                };
                TeacherPhotoSectionController.prototype._resizeImage = function () {
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
                TeacherPhotoSectionController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        console.log('error', error);
                        return error;
                    });
                };
                TeacherPhotoSectionController.prototype._setDataModelFromForm = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                TeacherPhotoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherPhotoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherPhotoSectionController';
                TeacherPhotoSectionController.$inject = [
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.s3Upload.S3UploadService',
                    'mainApp.core.util.messageUtilService',
                    'Upload',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherPhotoSectionController;
            }());
            createTeacherPage.TeacherPhotoSectionController = TeacherPhotoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherPhotoSectionController.controllerId, TeacherPhotoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.controller.js.map
