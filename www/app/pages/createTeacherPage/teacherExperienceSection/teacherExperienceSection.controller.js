var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherExperienceSectionController = (function () {
                function TeacherExperienceSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherExperienceSectionController.prototype._init = function () {
                    this.STEP3_STATE = 'page.createTeacherPage.language';
                    this.STEP5_STATE = 'page.createTeacherPage.method';
                    this.STEP_ALTER_STATE = 'page.createTeacherPage.education';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(4, 8);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        type: 'H',
                        experiences: []
                    };
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
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
                TeacherExperienceSectionController.prototype.activate = function () {
                    console.log('TeacherExperienceSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherExperienceSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        if (this.form.type === 'P') {
                            this.$state.go(this.STEP_ALTER_STATE, { reload: true });
                        }
                        else {
                            this.$state.go(this.STEP5_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherExperienceSectionController.prototype.goToBack = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP3_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherExperienceSectionController.prototype._checkType = function (key) {
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
                TeacherExperienceSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 4;
                    var EMPTY_ENUM = 5;
                    var formValid = true;
                    var teacher_since_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teacherSince = this.functionsUtilService.validator(this.yearObject.value, teacher_since_rules);
                    if (!this.validate.teacherSince.valid) {
                        formValid = this.validate.teacherSince.valid;
                    }
                    return formValid;
                };
                TeacherExperienceSectionController.prototype.changeHelpText = function (type) {
                    var TYPE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.type.title.text');
                    var TYPE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.description.text');
                    var SINCE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.title.text');
                    var SINCE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.description.text');
                    var EXPERIENCES_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.experiences.title.text');
                    var EXPERIENCES_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.experiences.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'type':
                            this.helpText.title = TYPE_TITLE;
                            this.helpText.description = TYPE_DESCRIPTION;
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
                TeacherExperienceSectionController.prototype._addEditExperience = function (index) {
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
                                    teacherId: self.$scope.$parent.vm.teacherData.Id
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
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    event.preventDefault();
                };
                TeacherExperienceSectionController.prototype._setDataModelFromForm = function () {
                    this.$scope.$parent.vm.teacherData.Type = this.form.type;
                    this.$scope.$parent.vm.teacherData.TeacherSince = this.yearObject.value;
                };
                TeacherExperienceSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.type = args.Type || 'H';
                        if (self.form.type === 'H') {
                            self._professionalChecked.checked = false;
                            self._hobbyChecked.checked = true;
                        }
                        else {
                            self._professionalChecked.checked = true;
                            self._hobbyChecked.checked = false;
                        }
                        self.yearObject.value = args.TeacherSince;
                        self.form.experiences = args.Experiences;
                    });
                };
                return TeacherExperienceSectionController;
            }());
            TeacherExperienceSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherExperienceSectionController';
            TeacherExperienceSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope',
                '$uibModal'
            ];
            createTeacherPage.TeacherExperienceSectionController = TeacherExperienceSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherExperienceSectionController.controllerId, TeacherExperienceSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherExperienceSection.controller.js.map