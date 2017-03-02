var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherExperienceController = (function () {
                function EditTeacherExperienceController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
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
                EditTeacherExperienceController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        type: 'H',
                        experiences: []
                    };
                    var currentYear = parseInt(this.dataConfig.currentYear);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1957, currentYear);
                    this.yearObject = { value: '' };
                    this._hobbyChecked = { type: 'H', checked: true };
                    this._professionalChecked = { type: 'P', checked: false };
                    this.validate = {
                        type: { valid: true, message: '' },
                        teacherSince: { valid: true, message: '' },
                        experiences: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherExperienceController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherExperienceController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherExperienceController.prototype.saveExperienceSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherExperienceController.prototype._checkType = function (key) {
                    var type = key.type;
                    if (type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                        this.form.type = this._hobbyChecked.type;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                        this.form.type = this._professionalChecked.type;
                    }
                };
                EditTeacherExperienceController.prototype._fillForm = function (data) {
                    this.form.type = data.Type || 'H';
                    if (this.form.type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                    }
                    this.yearObject.value = data.TeacherSince;
                    this.form.experiences = data.Experiences;
                };
                EditTeacherExperienceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var teacher_since_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teacherSince = this.functionsUtilService.validator(this.yearObject.value, teacher_since_rules);
                    if (!this.validate.teacherSince.valid) {
                        formValid = this.validate.teacherSince.valid;
                    }
                    return formValid;
                };
                EditTeacherExperienceController.prototype.changeHelpText = function (type) {
                    var TYPE_HOBBY_TITLE = this.$filter('translate')('%global.teacher.type.hobby.text');
                    var TYPE_HOBBY_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.hobby.description.text');
                    var TYPE_PROFESSIONAL_TITLE = this.$filter('translate')('%global.teacher.type.professional.text');
                    var TYPE_PROFESSIONAL_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.professional.description.text');
                    var SINCE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.title.text');
                    var SINCE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.description.text');
                    var EXPERIENCES_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.experiences.title.text');
                    var EXPERIENCES_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.experiences.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'hobby':
                            this.helpText.title = TYPE_HOBBY_TITLE;
                            this.helpText.description = TYPE_HOBBY_DESCRIPTION;
                            break;
                        case 'professional':
                            this.helpText.title = TYPE_PROFESSIONAL_TITLE;
                            this.helpText.description = TYPE_PROFESSIONAL_DESCRIPTION;
                            break;
                        case 'teacherSince':
                            this.helpText.title = SINCE_TITLE;
                            this.helpText.description = SINCE_DESCRIPTION;
                            break;
                        case 'experiences':
                            this.helpText.title = EXPERIENCES_TITLE;
                            this.helpText.description = EXPERIENCES_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherExperienceController.prototype._addEditExperience = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalExperienceTmpl,
                        controller: 'mainApp.components.modal.ModalExperienceController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    experience: self.form.experiences[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newExperience) {
                        if (newExperience) {
                            self.form.experiences.push(newExperience);
                        }
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherExperienceController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Type = this.form.type;
                    this.$rootScope.teacherData.TeacherSince = this.yearObject.value;
                };
                EditTeacherExperienceController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.saving = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                    });
                };
                return EditTeacherExperienceController;
            }());
            EditTeacherExperienceController.controllerId = 'mainApp.pages.editTeacher.EditTeacherExperienceController';
            EditTeacherExperienceController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$timeout',
                '$filter',
                '$scope',
                '$rootScope',
                '$uibModal'
            ];
            editTeacher.EditTeacherExperienceController = EditTeacherExperienceController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherExperienceController.controllerId, EditTeacherExperienceController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=editTeacherExperience.controller.js.map