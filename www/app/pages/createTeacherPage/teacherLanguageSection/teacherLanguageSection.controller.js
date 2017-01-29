var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLanguageSectionController = (function () {
                function TeacherLanguageSectionController(dataConfig, functionsUtil, getDataFromJson, $state, $filter, $scope, $rootScope, $timeout, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.functionsUtil = functionsUtil;
                    this.getDataFromJson = getDataFromJson;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherLanguageSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(3, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        native: [],
                        learn: [],
                        teach: []
                    };
                    this.validate = {
                        native: { valid: true, message: '' },
                        teach: { valid: true, message: '' },
                        learn: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherLanguageSectionController.prototype.activate = function () {
                    console.log('TeacherLanguageSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherLanguageSectionController.prototype.goToNext = function () {
                    var CURRENT_STEP = 3;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data', CURRENT_STEP);
                        this.$state.go(this.STEP4_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherLanguageSectionController.prototype.goToBack = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP2_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherLanguageSectionController.prototype._fillForm = function (data) {
                    if (this.form.native.length === 0) {
                        var languageArray = this.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
                            if (data.Languages.Native) {
                                for (var j = 0; j < data.Languages.Native.length; j++) {
                                    if (data.Languages.Native[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.native == null) {
                                            this.form.native = [];
                                            this.form.native.push(obj);
                                        }
                                        else {
                                            this.form.native.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Learn) {
                                for (var j = 0; j < data.Languages.Learn.length; j++) {
                                    if (data.Languages.Learn[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.learn == null) {
                                            this.form.learn = [];
                                            this.form.learn.push(obj);
                                        }
                                        else {
                                            this.form.learn.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Teach) {
                                for (var j = 0; j < data.Languages.Teach.length; j++) {
                                    if (data.Languages.Teach[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.teach == null) {
                                            this.form.teach = [];
                                            this.form.teach.push(obj);
                                        }
                                        else {
                                            this.form.teach.push(obj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                TeacherLanguageSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var native_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.native = this.functionsUtil.validator(this.form.native, native_rules);
                    if (!this.validate.native.valid) {
                        formValid = this.validate.native.valid;
                    }
                    var learn_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.learn = this.functionsUtil.validator(this.form.learn, learn_rules);
                    if (!this.validate.learn.valid) {
                        formValid = this.validate.learn.valid;
                    }
                    var teach_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teach = this.functionsUtil.validator(this.form.teach, teach_rules);
                    if (!this.validate.teach.valid) {
                        formValid = this.validate.teach.valid;
                    }
                    return formValid;
                };
                TeacherLanguageSectionController.prototype.changeHelpText = function (type) {
                    var NATIVE_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.native.title.text');
                    var NATIVE_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.native.description.text');
                    var LEARN_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.learn.title.text');
                    var LEARN_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.learn.description.text');
                    var TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    var TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'native':
                            this.helpText.title = NATIVE_TITLE;
                            this.helpText.description = NATIVE_DESCRIPTION;
                            break;
                        case 'learn':
                            this.helpText.title = LEARN_TITLE;
                            this.helpText.description = LEARN_DESCRIPTION;
                            break;
                        case 'teach':
                            this.helpText.title = TEACH_TITLE;
                            this.helpText.description = TEACH_DESCRIPTION;
                            break;
                    }
                };
                TeacherLanguageSectionController.prototype._addNewLanguages = function (type, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalLanguagesTmpl,
                        controller: 'mainApp.components.modal.ModalLanguageController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    type: type,
                                    list: self.form[type]
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newLanguagesList) {
                        self.form[type] = newLanguagesList;
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                TeacherLanguageSectionController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                TeacherLanguageSectionController.prototype._setDataModelFromForm = function () {
                    if (this.form.native) {
                        var native = [];
                        for (var i = 0; i < this.form.native.length; i++) {
                            native.push(this.form.native[i].key);
                        }
                        this.$rootScope.teacherData.Languages.Native = native;
                    }
                    if (this.form.learn) {
                        var learn = [];
                        for (var i = 0; i < this.form.learn.length; i++) {
                            learn.push(this.form.learn[i].key);
                        }
                        this.$rootScope.teacherData.Languages.Learn = learn;
                    }
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.teacherData.Languages.Teach = teach;
                    }
                };
                TeacherLanguageSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                return TeacherLanguageSectionController;
            }());
            TeacherLanguageSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController';
            TeacherLanguageSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.GetDataStaticJsonService',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
                '$timeout',
                '$uibModal'
            ];
            createTeacherPage.TeacherLanguageSectionController = TeacherLanguageSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLanguageSectionController.controllerId, TeacherLanguageSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLanguageSection.controller.js.map