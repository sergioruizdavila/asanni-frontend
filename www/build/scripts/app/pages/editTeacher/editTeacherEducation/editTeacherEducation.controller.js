var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherEducationController = (function () {
                function EditTeacherEducationController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherEducationController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.education.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        educations: [],
                        certificates: []
                    };
                    this.validate = {
                        educations: { valid: true, message: '' },
                        certificates: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherEducationController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherEducationController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherEducationController.prototype.saveEducationSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherEducationController.prototype._fillForm = function (data) {
                    this.form.educations = data.Educations;
                    this.form.certificates = data.Certificates;
                };
                EditTeacherEducationController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.education.validation.message.text');
                    var formValid = true;
                    var education_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.educations = this.functionsUtilService.validator(this.form.educations, education_rules);
                    var certificates_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.certificates = this.functionsUtilService.validator(this.form.certificates, certificates_rules);
                    if (this.validate.educations.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else if (this.validate.certificates.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    return formValid;
                };
                EditTeacherEducationController.prototype.changeHelpText = function (type) {
                    var EDUCATIONS_TITLE = this.$filter('translate')('%create.teacher.education.help_text.educations.title.text');
                    var EDUCATIONS_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.educations.description.text');
                    var CERTIFICATES_TITLE = this.$filter('translate')('%create.teacher.education.help_text.certificates.title.text');
                    var CERTIFICATES_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.certificates.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'educations':
                            this.helpText.title = EDUCATIONS_TITLE;
                            this.helpText.description = EDUCATIONS_DESCRIPTION;
                            break;
                        case 'certificates':
                            this.helpText.title = CERTIFICATES_TITLE;
                            this.helpText.description = CERTIFICATES_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherEducationController.prototype._addEditEducation = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalEducationTmpl,
                        controller: 'mainApp.components.modal.ModalEducationController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    education: self.form.educations[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newEducation) {
                        if (newEducation) {
                            self.form.educations.push(newEducation);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherEducationController.prototype._addEditCertificate = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalCertificateTmpl,
                        controller: 'mainApp.components.modal.ModalCertificateController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    certificate: self.form.certificates[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newCertificate) {
                        if (newCertificate) {
                            self.form.certificates.push(newCertificate);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherEducationController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherEducationController.controllerId = 'mainApp.pages.editTeacher.EditTeacherEducationController';
                EditTeacherEducationController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherEducationController;
            }());
            editTeacher.EditTeacherEducationController = EditTeacherEducationController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherEducationController.controllerId, EditTeacherEducationController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.controller.js.map
