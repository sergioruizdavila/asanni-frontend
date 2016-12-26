var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherFinishSectionController = (function () {
                function TeacherFinishSectionController(dataConfig, getDataFromJson, functionsUtilService, S3UploadService, messageUtil, Upload, $state, $filter, $scope) {
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
                TeacherFinishSectionController.prototype._init = function () {
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.FINAL_STEP_STATE = 'page.createTeacherPage.final';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.finish.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.finish.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        avatar: null,
                        croppedDataUrl: ''
                    };
                    this.validate = {
                        avatar: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherFinishSectionController.prototype.activate = function () {
                    console.log('TeacherFinishSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherFinishSectionController.prototype.goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._setDataModelFromForm(result.Location);
                                self.$scope.$emit('Save Data');
                                self.$state.go(this.FINAL_STEP_STATE, { reload: true });
                            }
                            else {
                                self.messageUtil.error('');
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherFinishSectionController.prototype.goToBack = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._setDataModelFromForm(result.Location);
                                self.$scope.$emit('Save Data');
                                self.$state.go(this.STEP7_STATE, { reload: true });
                            }
                            else {
                                self.messageUtil.error('');
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherFinishSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 4;
                    var EMPTY_ENUM = 5;
                    var DEFINED_ENUM = 6;
                    var formValid = true;
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtilService.validator(this.form.avatar, avatar_rules);
                    if (!this.validate.avatar.valid) {
                        formValid = this.validate.avatar.valid;
                    }
                    return formValid;
                };
                TeacherFinishSectionController.prototype.changeHelpText = function (type) {
                    var AVATAR_TITLE = this.$filter('translate')('%create.teacher.finish.help_text.avatar.title.text');
                    var AVATAR_DESCRIPTION = this.$filter('translate')('%create.teacher.finish.help_text.avatar.description.text');
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
                TeacherFinishSectionController.prototype._resizeImage = function () {
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
                TeacherFinishSectionController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        console.log('error', error);
                        return error;
                    });
                };
                TeacherFinishSectionController.prototype._setDataModelFromForm = function (avatar) {
                    this.$scope.$parent.vm.teacherData.Avatar = avatar;
                };
                TeacherFinishSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                    });
                };
                return TeacherFinishSectionController;
            }());
            TeacherFinishSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';
            TeacherFinishSectionController.$inject = [
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
            createTeacherPage.TeacherFinishSectionController = TeacherFinishSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherFinishSectionController.controllerId, TeacherFinishSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherFinishSection.controller.js.map