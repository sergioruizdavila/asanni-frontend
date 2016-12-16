var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherMethodSectionController = (function () {
                function TeacherMethodSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                TeacherMethodSectionController.prototype._init = function () {
                    this.STEP5_STATE = 'page.createTeacherPage.education';
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(6, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        methodology: '',
                        immersion: new app.models.teacher.Immersion
                    };
                    this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();
                    this.validate = {
                        methodology: { valid: true, message: '' },
                        immersionActive: { valid: true, message: '' },
                        typeOfImmersionList: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherMethodSectionController.prototype.activate = function () {
                    console.log('TeacherMethodSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherMethodSectionController.prototype.changeStatus = function () {
                    this.form.immersion.Active = !this.form.immersion.Active;
                };
                TeacherMethodSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP7_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherMethodSectionController.prototype.goToBack = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP5_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherMethodSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 3;
                    var EMPTY_ENUM = 4;
                    var formValid = true;
                    var methodology_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.methodology = this.functionsUtilService.validator(this.form.methodology, methodology_rules);
                    if (!this.validate.methodology.valid) {
                        formValid = this.validate.methodology.valid;
                    }
                    if (this.form.immersion.Active) {
                        var typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.typeOfImmersionList = this.functionsUtilService.validator(this.form.immersion.Types, typeOfImmersion_rules);
                        if (!this.validate.typeOfImmersionList.valid) {
                            formValid = this.validate.typeOfImmersionList.valid;
                        }
                    }
                    return formValid;
                };
                TeacherMethodSectionController.prototype.changeHelpText = function (type) {
                    var METHODOLOGY_TITLE = this.$filter('translate')('%create.teacher.method.help_text.methodology.title.text');
                    var METHODOLOGY_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.methodology.description.text');
                    var IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.immersion.title.text');
                    var IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.immersion.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'methodology':
                            this.helpText.title = METHODOLOGY_TITLE;
                            this.helpText.description = METHODOLOGY_DESCRIPTION;
                            break;
                        case 'immersion':
                            this.helpText.title = IMMERSION_TITLE;
                            this.helpText.description = IMMERSION_DESCRIPTION;
                            break;
                    }
                };
                TeacherMethodSectionController.prototype._addEditMethod = function (index) {
                    var self = this;
                    event.preventDefault();
                };
                TeacherMethodSectionController.prototype._setDataModelFromForm = function () {
                    this.$scope.$parent.vm.teacherData.Methodology = this.form.methodology;
                    this.$scope.$parent.vm.teacherData.Immersion = this.form.immersion;
                };
                TeacherMethodSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.methodology = args.Methodology;
                        self.form.immersion = args.Immersion;
                    });
                };
                return TeacherMethodSectionController;
            }());
            TeacherMethodSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherMethodSectionController';
            TeacherMethodSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope'
            ];
            createTeacherPage.TeacherMethodSectionController = TeacherMethodSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherMethodSectionController.controllerId, TeacherMethodSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherMethodSection.controller.js.map