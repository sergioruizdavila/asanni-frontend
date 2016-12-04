var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLanguageSectionController = (function () {
                function TeacherLanguageSectionController(dataConfig, functionsUtilService, getDataFromJson, $state, $scope, $timeout, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.functionsUtilService = functionsUtilService;
                    this.getDataFromJson = getDataFromJson;
                    this.$state = $state;
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherLanguageSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(3, 9);
                    this.form = {
                        native: null,
                        learn: null,
                        teach: null
                    };
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                TeacherLanguageSectionController.prototype.activate = function () {
                    console.log('TeacherLanguageSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherLanguageSectionController.prototype.goToNext = function () {
                    var CURRENT_STEP = 3;
                    this._setDataModelFromForm();
                    this.$scope.$emit('Save Data', CURRENT_STEP);
                    this.$state.go(this.STEP4_STATE, { reload: true });
                };
                TeacherLanguageSectionController.prototype.goToBack = function () {
                    this._setDataModelFromForm();
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherLanguageSectionController.prototype._addNewLanguages = function (type) {
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
                    event.preventDefault();
                };
                TeacherLanguageSectionController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                TeacherLanguageSectionController.prototype._setDataModelFromForm = function () {
                    if (this.form.native !== null) {
                        var native = [];
                        for (var i = 0; i < this.form.native.length; i++) {
                            native.push(this.form.native[i].key);
                        }
                        this.$scope.$parent.vm.teacherData.Languages.Native = native;
                    }
                    if (this.form.learn !== null) {
                        var learn = [];
                        for (var i = 0; i < this.form.learn.length; i++) {
                            learn.push(this.form.learn[i].key);
                        }
                        this.$scope.$parent.vm.teacherData.Languages.Learn = learn;
                    }
                    if (this.form.teach !== null) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$scope.$parent.vm.teacherData.Languages.Teach = teach;
                    }
                };
                TeacherLanguageSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        var languageArray = self.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
                            if (args.Languages.Native) {
                                for (var j = 0; j < args.Languages.Native.length; j++) {
                                    if (args.Languages.Native[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (self.form.native == null) {
                                            self.form.native = [];
                                            self.form.native.push(obj);
                                        }
                                        else {
                                            self.form.native.push(obj);
                                        }
                                    }
                                }
                            }
                            if (args.Languages.Learn) {
                                for (var j = 0; j < args.Languages.Learn.length; j++) {
                                    if (args.Languages.Learn[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (self.form.learn == null) {
                                            self.form.learn = [];
                                            self.form.learn.push(obj);
                                        }
                                        else {
                                            self.form.learn.push(obj);
                                        }
                                    }
                                }
                            }
                            if (args.Languages.Teach) {
                                for (var j = 0; j < args.Languages.Teach.length; j++) {
                                    if (args.Languages.Teach[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (self.form.teach == null) {
                                            self.form.teach = [];
                                            self.form.teach.push(obj);
                                        }
                                        else {
                                            self.form.teach.push(obj);
                                        }
                                    }
                                }
                            }
                        }
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
                '$scope',
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