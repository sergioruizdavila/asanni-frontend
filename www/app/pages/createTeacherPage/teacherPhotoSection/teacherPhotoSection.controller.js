var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherPhotoSectionController = (function () {
                function TeacherPhotoSectionController(dataConfig, getDataFromJson, functionsUtilService, S3UploadService, messageUtil, Upload, $state, $filter, $scope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.S3UploadService = S3UploadService;
                    this.messageUtil = messageUtil;
                    this.Upload = Upload;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                TeacherPhotoSectionController.prototype._init = function () {
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.FINAL_STEP_STATE = 'page.createTeacherPage.finish';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.help_text.description.text');
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
                        avatar: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherPhotoSectionController.prototype.activate = function () {
                    console.log('TeacherPhotoSectionController controller actived');
                    this._subscribeToEvents();
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
                                    self.$scope.$emit('Save Data');
                                    self.$state.go(self.FINAL_STEP_STATE, { reload: true });
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            });
                        }
                        else {
                            this.$scope.$emit('Save Data');
                            this.$state.go(this.FINAL_STEP_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPhotoSectionController.prototype.goToBack = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.uploading = true;
                        if (this.form.avatar) {
                            this._resizeImage().then(function (result) {
                                self.uploading = false;
                                if (result.Location) {
                                    self._setDataModelFromForm(result.Location);
                                    self.$scope.$emit('Save Data');
                                    self.$state.go(self.STEP7_STATE, { reload: true });
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            });
                        }
                        else {
                            this.$scope.$emit('Save Data');
                            this.$state.go(this.STEP7_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPhotoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 4;
                    var EMPTY_ENUM = 5;
                    var DEFINED_ENUM = 6;
                    var PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');
                    var formValid = true;
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtilService.validator(this.form.avatar, avatar_rules);
                    this.validate.avatar = this.functionsUtilService.validator(this.form.thumbnail, avatar_rules);
                    if (!this.validate.avatar.valid) {
                        this.validate.avatar.message = PHOTO_MESSAGE;
                        formValid = this.validate.avatar.valid;
                    }
                    return formValid;
                };
                TeacherPhotoSectionController.prototype.changeHelpText = function (type) {
                    var AVATAR_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.avatar.title.text');
                    var AVATAR_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.help_text.avatar.description.text');
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
                    var newName = this.functionsUtilService.generateGuid() + '.jpeg';
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
                    this.$scope.$parent.vm.teacherData.Avatar = avatar;
                };
                TeacherPhotoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.thumbnail = args.Avatar;
                    });
                };
                return TeacherPhotoSectionController;
            }());
            TeacherPhotoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherPhotoSectionController';
            TeacherPhotoSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.s3Upload.S3UploadService',
                'mainApp.core.util.messageUtilService',
                'Upload',
                '$state',
                '$filter',
                '$scope'
            ];
            createTeacherPage.TeacherPhotoSectionController = TeacherPhotoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherPhotoSectionController.controllerId, TeacherPhotoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherPhotoSection.controller.js.map