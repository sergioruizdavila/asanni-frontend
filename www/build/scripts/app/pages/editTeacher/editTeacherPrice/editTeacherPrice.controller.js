var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherPriceController = (function () {
                function EditTeacherPriceController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
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
                EditTeacherPriceController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        privateClass: new app.models.teacher.TypeOfPrice,
                        groupClass: new app.models.teacher.TypeOfPrice
                    };
                    this.validate = {
                        privateClassPrice: { valid: true, message: '' },
                        privateClassActive: { valid: true, message: '' },
                        groupClassPrice: { valid: true, message: '' },
                        groupClassActive: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherPriceController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherPriceController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherPriceController.prototype.changeStatus = function (type) {
                    this.form[type].Active = !this.form[type].Active;
                };
                EditTeacherPriceController.prototype.savePriceSection = function () {
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
                EditTeacherPriceController.prototype._fillForm = function (data) {
                    this.form.privateClass = data.Price.PrivateClass;
                    this.form.groupClass = data.Price.GroupClass;
                };
                EditTeacherPriceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var IS_NOT_ZERO_ENUM = 5;
                    var EMPTY_ENUM = 3;
                    var TRUE_ENUM = 7;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.price.validation.message.text');
                    var formValid = true;
                    if (this.form.privateClass.Active) {
                        var privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                        if (!this.validate.privateClassPrice.valid) {
                            formValid = this.validate.privateClassPrice.valid;
                        }
                    }
                    if (this.form.groupClass.Active) {
                        var groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                        if (!this.validate.groupClassPrice.valid) {
                            formValid = this.validate.groupClassPrice.valid;
                        }
                    }
                    var privateClassActive_rules = [TRUE_ENUM];
                    this.validate.privateClassActive = this.functionsUtilService.validator(this.form.privateClass.Active, privateClassActive_rules);
                    var groupClassActive_rules = [TRUE_ENUM];
                    this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);
                    if (!this.validate.privateClassActive.valid && !this.validate.groupClassActive.valid) {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    else {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    return formValid;
                };
                EditTeacherPriceController.prototype.changeHelpText = function (type) {
                    var PRIVATE_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.private_class.title.text');
                    var PRIVATE_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.private_class.description.text');
                    var GROUP_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.group_class.title.text');
                    var GROUP_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.group_class.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'privateClass':
                            this.helpText.title = PRIVATE_CLASS_TITLE;
                            this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                            break;
                        case 'groupClass':
                            this.helpText.title = GROUP_CLASS_TITLE;
                            this.helpText.description = GROUP_CLASS_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherPriceController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Price.PrivateClass = this.form.privateClass;
                    this.$rootScope.teacherData.Price.GroupClass = this.form.groupClass;
                };
                EditTeacherPriceController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherPriceController.controllerId = 'mainApp.pages.editTeacher.EditTeacherPriceController';
                EditTeacherPriceController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherPriceController;
            }());
            editTeacher.EditTeacherPriceController = EditTeacherPriceController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherPriceController.controllerId, EditTeacherPriceController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherPrice/editTeacherPrice.controller.js.map
