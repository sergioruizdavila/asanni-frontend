var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherMethodSectionController = (function () {
                function TeacherMethodSectionController(dataConfig, getDataFromJson, functionsUtil, $state, $filter, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherMethodSectionController.prototype._init = function () {
                    this.step5State = '';
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(6, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        methodology: '',
                        immersion: new app.models.teacher.Immersion
                    };
                    this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();
                    this.typeOfImmersionOptionBox = [];
                    this.validate = {
                        methodology: { valid: true, message: '' },
                        immersionActive: { valid: true, message: '' },
                        typeOfImmersionList: { valid: true, message: '' },
                        otherCategory: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherMethodSectionController.prototype.activate = function () {
                    console.log('TeacherMethodSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
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
                    this.$state.go(this.step5State, { reload: true });
                };
                TeacherMethodSectionController.prototype._fillForm = function (data) {
                    if (data.Type === 'P') {
                        this.step5State = 'page.createTeacherPage.education';
                    }
                    else {
                        this.step5State = 'page.createTeacherPage.experience';
                    }
                    this.form.methodology = data.Methodology;
                    this.form.immersion = data.Immersion;
                    if (this.form.immersion.Active) {
                        if (this.typeOfImmersionOptionBox.length === 0) {
                            var immersionArray = this.getDataFromJson.getTypeOfImmersioni18n();
                            var newArray = [];
                            for (var i = 0; i < immersionArray.length; i++) {
                                for (var j = 0; j < this.form.immersion.Category.length; j++) {
                                    if (this.form.immersion.Category[j] === immersionArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = immersionArray[i].code;
                                        obj.value = immersionArray[i].value;
                                        this._disableEnableOption(true, obj.key);
                                        this.typeOfImmersionOptionBox.push(obj);
                                    }
                                }
                            }
                        }
                    }
                };
                TeacherMethodSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.method.validation.message.text');
                    var formValid = true;
                    var methodology_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.methodology = this.functionsUtil.validator(this.form.methodology, methodology_rules);
                    if (!this.validate.methodology.valid) {
                        formValid = this.validate.methodology.valid;
                    }
                    if (this.form.immersion.Active) {
                        var typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.typeOfImmersionList = this.functionsUtil.validator(this.form.immersion.Category, typeOfImmersion_rules);
                        var otherCategory_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.otherCategory = this.functionsUtil.validator(this.form.immersion.OtherCategory, otherCategory_rules);
                        if (this.validate.typeOfImmersionList.valid) {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else if (this.validate.otherCategory.valid) {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = GLOBAL_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                    }
                    return formValid;
                };
                TeacherMethodSectionController.prototype.changeHelpText = function (type) {
                    var METHODOLOGY_TITLE = this.$filter('translate')('%create.teacher.method.help_text.methodology.title.text');
                    var METHODOLOGY_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.methodology.description.text');
                    var IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.imm.title.text');
                    var IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.imm.description.text');
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
                TeacherMethodSectionController.prototype._addNewImmersion = function () {
                    var self = this;
                    this._disableEnableOption(true, this.typeObject.code);
                    this.typeOfImmersionOptionBox.push({ key: this.typeObject.code, value: this.typeObject.value });
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                    event.preventDefault();
                };
                TeacherMethodSectionController.prototype._removeImmersion = function (key) {
                    this._disableEnableOption(false, key);
                    var newArray = this.typeOfImmersionOptionBox.filter(function (el) {
                        return el.key !== key;
                    });
                    this.typeOfImmersionOptionBox = newArray;
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                };
                TeacherMethodSectionController.prototype._setDataModelFromForm = function () {
                    var immersionOptions = this.typeOfImmersionOptionBox;
                    this.$rootScope.teacherData.Methodology = this.form.methodology;
                    this.$rootScope.teacherData.Immersion = this.form.immersion;
                    this.$rootScope.teacherData.Immersion.Category = this.form.immersion.Category;
                };
                TeacherMethodSectionController.prototype._disableEnableOption = function (action, key) {
                    for (var i = 0; i < this.typeOfImmersionList.length; i++) {
                        if (this.typeOfImmersionList[i].code === key) {
                            this.typeOfImmersionList[i].disabled = action;
                        }
                    }
                };
                TeacherMethodSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherMethodSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherMethodSectionController';
                TeacherMethodSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherMethodSectionController;
            }());
            createTeacherPage.TeacherMethodSectionController = TeacherMethodSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherMethodSectionController.controllerId, TeacherMethodSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.controller.js.map
