var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherPriceSectionController = (function () {
                function TeacherPriceSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                TeacherPriceSectionController.prototype._init = function () {
                    this.STEP6_STATE = 'page.createTeacherPage.method';
                    this.FINAL_STEP_STATE = 'page.createTeacherPage.final';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(6, 9);
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
                        groupClassActive: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherPriceSectionController.prototype.activate = function () {
                    console.log('TeacherPriceSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherPriceSectionController.prototype.changeStatus = function (type) {
                    this.form[type].Active = !this.form[type].Active;
                };
                TeacherPriceSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.FINAL_STEP_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPriceSectionController.prototype.goToBack = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP6_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPriceSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 3;
                    var EMPTY_ENUM = 4;
                    var TRUE_ENUM = 5;
                    var formValid = true;
                    if (this.form.privateClass.Active) {
                        var privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                        if (!this.validate.privateClassPrice.valid) {
                            formValid = this.validate.privateClassPrice.valid;
                        }
                    }
                    if (this.form.groupClass.Active) {
                        var groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                        if (!this.validate.groupClassPrice.valid) {
                            formValid = this.validate.groupClassPrice.valid;
                        }
                    }
                    var privateClassActive_rules = [TRUE_ENUM];
                    this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.groupClass.Active, privateClassActive_rules);
                    if (!this.validate.privateClassPrice.valid) {
                        formValid = this.validate.privateClassPrice.valid;
                    }
                    var groupClassActive_rules = [TRUE_ENUM];
                    this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);
                    if (!this.validate.groupClassActive.valid) {
                        formValid = this.validate.groupClassActive.valid;
                    }
                    return formValid;
                };
                TeacherPriceSectionController.prototype.changeHelpText = function (type) {
                    var PRIVATE_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.private_class.title.text');
                    var PRIVATE_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.private_class.description.text');
                    var GROUP_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.group_class.title.text');
                    var GROUP_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.group_class.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'private_class':
                            this.helpText.title = PRIVATE_CLASS_TITLE;
                            this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                            break;
                        case 'group_class':
                            this.helpText.title = GROUP_CLASS_TITLE;
                            this.helpText.description = GROUP_CLASS_DESCRIPTION;
                            break;
                    }
                };
                TeacherPriceSectionController.prototype._setDataModelFromForm = function () {
                    this.$scope.$parent.vm.teacherData.Price.PrivateClass = this.form.privateClass;
                    this.$scope.$parent.vm.teacherData.Price.GroupClass = this.form.groupClass;
                };
                TeacherPriceSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.privateClass = args.Price.PrivateClass;
                        self.form.groupClass = args.Price.GroupClass;
                    });
                };
                return TeacherPriceSectionController;
            }());
            TeacherPriceSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherPriceSectionController';
            TeacherPriceSectionController.$inject = [
                'dataConfig',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope'
            ];
            createTeacherPage.TeacherPriceSectionController = TeacherPriceSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherPriceSectionController.controllerId, TeacherPriceSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherPriceSection.controller.js.map