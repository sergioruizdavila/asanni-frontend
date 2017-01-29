var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherEducationSectionController = (function () {
                function TeacherEducationSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherEducationSectionController.prototype._init = function () {
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.STEP6_STATE = 'page.createTeacherPage.method';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.education.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(5, 9);
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
                TeacherEducationSectionController.prototype.activate = function () {
                    console.log('TeacherEducationSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherEducationSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP6_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherEducationSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP4_STATE, { reload: true });
                };
                TeacherEducationSectionController.prototype._fillForm = function (data) {
                    this.form.educations = data.Educations;
                    this.form.certificates = data.Certificates;
                };
                TeacherEducationSectionController.prototype._validateForm = function () {
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
                TeacherEducationSectionController.prototype.changeHelpText = function (type) {
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
                TeacherEducationSectionController.prototype._addEditEducation = function (index, $event) {
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
                TeacherEducationSectionController.prototype._addEditCertificate = function (index, $event) {
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
                TeacherEducationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                return TeacherEducationSectionController;
            }());
            TeacherEducationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherEducationSectionController';
            TeacherEducationSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
                '$uibModal'
            ];
            createTeacherPage.TeacherEducationSectionController = TeacherEducationSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherEducationSectionController.controllerId, TeacherEducationSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherEducationSection.controller.js.map