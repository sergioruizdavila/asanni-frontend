var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalExperience;
        (function (modalExperience) {
            var ModalExperienceController = (function () {
                function ModalExperienceController($uibModalInstance, dataSetModal, getDataFromJson, functionsUtilService, teacherService, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalExperienceController.prototype._init = function () {
                    var self = this;
                    this.experience = this.dataSetModal.experience || new app.models.teacher.Experience();
                    this.countryObject = { code: this.experience.Country || '', value: '' };
                    this.startYearObject = { value: this.experience.DateStart || '' };
                    this.finishYearObject = { value: this.experience.DateFinish || '' };
                    this.form = {
                        position: this.experience.Position || '',
                        company: this.experience.Company || '',
                        country: this.experience.Country || '',
                        city: this.experience.City || '',
                        dateStart: this.experience.DateStart || '',
                        dateFinish: this.experience.DateFinish || '',
                        description: this.experience.Description || ''
                    };
                    this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        position: { valid: true, message: '' },
                        company: { valid: true, message: '' },
                        country: { valid: true, message: '' },
                        city: { valid: true, message: '' },
                        dateStart: { valid: true, message: '' },
                        dateFinish: { valid: true, message: '' },
                        description: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalExperienceController.prototype.activate = function () {
                    console.log('modalExperience controller actived');
                };
                ModalExperienceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.position = this.functionsUtilService.validator(this.form.position, position_rules);
                    if (!this.validate.position.valid) {
                        formValid = this.validate.position.valid;
                    }
                    var company_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.company = this.functionsUtilService.validator(this.form.company, company_rules);
                    if (!this.validate.company.valid) {
                        formValid = this.validate.company.valid;
                    }
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.country = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.country.valid) {
                        formValid = this.validate.country.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.city = this.functionsUtilService.validator(this.form.city, city_rules);
                    if (!this.validate.city.valid) {
                        formValid = this.validate.city.valid;
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
                ModalExperienceController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        var countryCode = this.countryObject.code;
                        var startYear = this.startYearObject.value;
                        var finishYear = this.finishYearObject.value;
                        this.form.country = countryCode;
                        this.form.dateStart = startYear;
                        this.form.dateFinish = finishYear;
                        this.experience.Position = this.form.position;
                        this.experience.Country = this.form.country;
                        this.experience.City = this.form.city;
                        this.experience.Company = this.form.company;
                        this.experience.DateStart = this.form.dateStart;
                        this.experience.DateFinish = this.form.dateFinish;
                        this.experience.Description = this.form.description;
                        if (this.experience.Id) {
                            this.teacherService.updateExperience(this.dataSetModal.teacherId, this.experience)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.$uibModalInstance.close();
                                }
                                else {
                                }
                            });
                        }
                        else {
                            this.teacherService.createExperience(this.dataSetModal.teacherId, this.experience)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.experience.Id = response.id;
                                    self_1.$uibModalInstance.close(self_1.experience);
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
                ModalExperienceController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalExperienceController.controllerId = 'mainApp.components.modal.ModalExperienceController';
                ModalExperienceController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.teacher.TeacherService',
                    '$timeout',
                    '$filter'
                ];
                return ModalExperienceController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalExperienceController.controllerId, ModalExperienceController);
        })(modalExperience = modal.modalExperience || (modal.modalExperience = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalExperience/modalExperience.controller.js.map
