var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherTeachController = (function () {
                function EditTeacherTeachController(dataConfig, functionsUtil, getDataFromJson, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.functionsUtil = functionsUtil;
                    this.getDataFromJson = getDataFromJson;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherTeachController.prototype._init = function () {
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        teach: []
                    };
                    this.validate = {
                        teach: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherTeachController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherTeachController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                EditTeacherTeachController.prototype.saveTeachSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherTeachController.prototype._fillForm = function (data) {
                    if (this.form.teach.length === 0) {
                        var languageArray = this.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
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
                EditTeacherTeachController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var teach_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teach = this.functionsUtil.validator(this.form.teach, teach_rules);
                    if (!this.validate.teach.valid) {
                        formValid = this.validate.teach.valid;
                    }
                    return formValid;
                };
                EditTeacherTeachController.prototype.changeHelpText = function (type) {
                    var TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    var TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'teach':
                            this.helpText.title = TEACH_TITLE;
                            this.helpText.description = TEACH_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherTeachController.prototype._addNewLanguages = function (type, $event) {
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
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherTeachController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                EditTeacherTeachController.prototype._setDataModelFromForm = function () {
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.profileData.Languages.Teach = teach;
                    }
                };
                EditTeacherTeachController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                return EditTeacherTeachController;
            }());
            EditTeacherTeachController.controllerId = 'mainApp.pages.editTeacher.EditTeacherTeachController';
            EditTeacherTeachController.$inject = [
                'dataConfig',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.core.util.GetDataStaticJsonService',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
                '$uibModal'
            ];
            editTeacher.EditTeacherTeachController = EditTeacherTeachController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherTeachController.controllerId, EditTeacherTeachController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=editTeacherTeach.controller.js.map