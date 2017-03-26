var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalEducation;
        (function (modalEducation) {
            var ModalEducationController = (function () {
                function ModalEducationController($uibModalInstance, dataSetModal, getDataFromJson, functionsUtilService, teacherService, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalEducationController.prototype._init = function () {
                    var self = this;
                    this.education = this.dataSetModal.education || new app.models.teacher.Education();
                    this.degreeObject = { code: this.education.Degree || '', value: '' };
                    this.startYearObject = { value: this.education.DateStart || '' };
                    this.finishYearObject = { value: this.education.DateFinish || '' };
                    this.form = {
                        school: this.education.School || '',
                        degree: this.education.Degree || '',
                        fieldStudy: this.education.FieldStudy || '',
                        dateStart: this.education.DateStart || '',
                        dateFinish: this.education.DateFinish || '',
                        description: this.education.Description || ''
                    };
                    this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listDegrees = this.getDataFromJson.getDegreei18n();
                    this.validate = {
                        school: { valid: true, message: '' },
                        degree: { valid: true, message: '' },
                        fieldStudy: { valid: true, message: '' },
                        dateStart: { valid: true, message: '' },
                        dateFinish: { valid: true, message: '' },
                        description: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalEducationController.prototype.activate = function () {
                    console.log('modalEducation controller actived');
                };
                ModalEducationController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var school_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.school = this.functionsUtilService.validator(this.form.school, school_rules);
                    if (!this.validate.school.valid) {
                        formValid = this.validate.school.valid;
                    }
                    var degree_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.degree = this.functionsUtilService.validator(this.degreeObject.code, degree_rules);
                    if (!this.validate.degree.valid) {
                        formValid = this.validate.degree.valid;
                    }
                    var field_study_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.fieldStudy = this.functionsUtilService.validator(this.form.fieldStudy, field_study_rules);
                    if (!this.validate.fieldStudy.valid) {
                        formValid = this.validate.fieldStudy.valid;
                    }
                    var start_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateStart = this.functionsUtilService.validator(this.startYearObject.value, start_year_rules);
                    if (!this.validate.dateStart.valid) {
                        formValid = this.validate.dateStart.valid;
                    }
                    var finish_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateFinish = this.functionsUtilService.validator(this.finishYearObject.value, finish_year_rules);
                    if (!this.validate.dateFinish.valid) {
                        formValid = this.validate.dateFinish.valid;
                    }
                    return formValid;
                };
                ModalEducationController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        var degreeCode = this.degreeObject.code;
                        var startYear = this.startYearObject.value;
                        var finishYear = this.finishYearObject.value;
                        this.form.degree = degreeCode;
                        this.form.dateStart = startYear;
                        this.form.dateFinish = finishYear;
                        this.education.School = this.form.school;
                        this.education.Degree = this.form.degree;
                        this.education.FieldStudy = this.form.fieldStudy;
                        this.education.DateStart = this.form.dateStart;
                        this.education.DateFinish = this.form.dateFinish;
                        this.education.Description = this.form.description;
                        if (this.education.Id) {
                            this.teacherService.updateEducation(this.dataSetModal.teacherId, this.education)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.$uibModalInstance.close();
                                }
                                else {
                                }
                            });
                        }
                        else {
                            this.teacherService.createEducation(this.dataSetModal.teacherId, this.education)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.education.Id = response.id;
                                    self_1.$uibModalInstance.close(self_1.education);
                                }
                                else {
                                }
                            });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalEducationController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalEducationController.controllerId = 'mainApp.components.modal.ModalEducationController';
                ModalEducationController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.teacher.TeacherService',
                    '$timeout',
                    '$filter'
                ];
                return ModalEducationController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalEducationController.controllerId, ModalEducationController);
        })(modalEducation = modal.modalEducation || (modal.modalEducation = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalEducation/modalEducation.controller.js.map
