var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherEducationSectionController = (function () {
                function TeacherEducationSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
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
                        certificates: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherEducationSectionController.prototype.activate = function () {
                    console.log('TeacherEducationSectionController controller actived');
                    this._subscribeToEvents();
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
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP4_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherEducationSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 4;
                    var EMPTY_ENUM = 5;
                    var formValid = true;
                    var education_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.educations = this.functionsUtilService.validator(this.form.educations, education_rules);
                    if (!this.validate.educations.valid) {
                        formValid = this.validate.educations.valid;
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
                TeacherEducationSectionController.prototype._addEditEducation = function (index) {
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
                                    teacherId: self.$scope.$parent.vm.teacherData.Id
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
                    event.preventDefault();
                };
                TeacherEducationSectionController.prototype._addEditCertificate = function (index) {
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
                                    teacherId: self.$scope.$parent.vm.teacherData.Id
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
                    event.preventDefault();
                };
                TeacherEducationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.educations = args.Educations;
                        self.form.certificates = args.Certificates;
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