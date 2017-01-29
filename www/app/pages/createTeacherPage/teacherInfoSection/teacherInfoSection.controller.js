var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherInfoSectionController = (function () {
                function TeacherInfoSectionController(getDataFromJson, functionsUtilService, localStorage, dataConfig, $state, $filter, $scope, $rootScope) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherInfoSectionController.prototype._init = function () {
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.sexObject = { sex: { code: '', value: '' } };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        sex: '',
                        birthDate: '',
                        born: '',
                        about: ''
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listSexs = this.getDataFromJson.getSexi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
                    this.validate = {
                        firstName: { valid: true, message: '' },
                        lastName: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        phoneNumber: { valid: true, message: '' },
                        sex: { valid: true, message: '' },
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        born: { valid: true, message: '' },
                        about: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherInfoSectionController.prototype.activate = function () {
                    console.log('TeacherInfoSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherInfoSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        mixpanel.track("Enter: Basic Info on Create Teacher", {
                            "name": this.form.firstName + ' ' + this.form.lastName,
                            "email": this.form.email,
                            "phone": this.form.phoneNumber
                        });
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP2_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherInfoSectionController.prototype._fillForm = function (data) {
                    this.form.firstName = data.FirstName;
                    this.form.lastName = data.LastName;
                    this.form.email = data.Email;
                    this.form.phoneNumber = data.PhoneNumber;
                    this.sexObject.sex.code = data.Sex;
                    var date = this.functionsUtilService.splitDate(data.BirthDate);
                    this.dateObject.day.value = parseInt(date.day);
                    this.dateObject.month.code = date.month;
                    this.dateObject.year.value = parseInt(date.year);
                    this.form.born = data.Born;
                    this.form.about = data.About;
                };
                TeacherInfoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var formValid = true;
                    var firstName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.firstName = this.functionsUtilService.validator(this.form.firstName, firstName_rules);
                    if (!this.validate.firstName.valid) {
                        formValid = this.validate.firstName.valid;
                    }
                    var lastName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.lastName = this.functionsUtilService.validator(this.form.lastName, lastName_rules);
                    if (!this.validate.lastName.valid) {
                        formValid = this.validate.lastName.valid;
                    }
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtilService.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    var phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || '';
                    this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var sex_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.sex = this.functionsUtilService.validator(this.sexObject.sex.code, sex_rules);
                    if (!this.validate.sex.valid) {
                        formValid = this.validate.sex.valid;
                    }
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = this.validate.birthDate.day.message;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = this.validate.birthDate.month.message;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
                    if (!this.validate.birthDate.year.valid) {
                        formValid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.message = this.validate.birthDate.year.message;
                    }
                    var born_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.born = this.functionsUtilService.validator(this.form.born, born_rules);
                    if (!this.validate.born.valid) {
                        formValid = this.validate.born.valid;
                    }
                    return formValid;
                };
                TeacherInfoSectionController.prototype.changeHelpText = function (type) {
                    var NAME_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.name.title.text');
                    var NAME_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.name.description.text');
                    var EMAIL_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.email.title.text');
                    var EMAIL_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.email.description.text');
                    var PHONE_NUMBER_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.title.text');
                    var PHONE_NUMBER_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.description.text');
                    var SEX_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.title.text');
                    var SEX_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.description.text');
                    var BIRTHDATE_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.title.text');
                    var BIRTHDATE_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.description.text');
                    var BORN_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.born.title.text');
                    var BORN_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.born.description.text');
                    var ABOUT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.about.title.text');
                    var ABOUT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.about.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'firstName':
                        case 'lastName':
                            this.helpText.title = NAME_TITLE;
                            this.helpText.description = NAME_DESCRIPTION;
                            break;
                        case 'email':
                            this.helpText.title = EMAIL_TITLE;
                            this.helpText.description = EMAIL_DESCRIPTION;
                            break;
                        case 'phoneNumber':
                            this.helpText.title = PHONE_NUMBER_TITLE;
                            this.helpText.description = PHONE_NUMBER_DESCRIPTION;
                            break;
                        case 'sex':
                            this.helpText.title = SEX_TITLE;
                            this.helpText.description = SEX_DESCRIPTION;
                            break;
                        case 'birthDate':
                            this.helpText.title = BIRTHDATE_TITLE;
                            this.helpText.description = BIRTHDATE_DESCRIPTION;
                            break;
                        case 'born':
                            this.helpText.title = BORN_TITLE;
                            this.helpText.description = BORN_DESCRIPTION;
                            break;
                        case 'about':
                            this.helpText.title = ABOUT_TITLE;
                            this.helpText.description = ABOUT_DESCRIPTION;
                            break;
                    }
                };
                TeacherInfoSectionController.prototype._setDataModelFromForm = function () {
                    var dateFormatted = this.functionsUtilService.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var sexCode = this.sexObject.sex.code;
                    var recommended = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
                    this.$rootScope.teacherData.FirstName = this.form.firstName;
                    this.$rootScope.teacherData.LastName = this.form.lastName;
                    this.$rootScope.teacherData.Email = this.form.email;
                    this.$rootScope.teacherData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.teacherData.Sex = sexCode;
                    this.$rootScope.teacherData.BirthDate = dateFormatted;
                    this.$rootScope.teacherData.Born = this.form.born;
                    this.$rootScope.teacherData.About = this.form.about;
                    this.$rootScope.teacherData.Recommended = recommended ? recommended : null;
                };
                TeacherInfoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                return TeacherInfoSectionController;
            }());
            TeacherInfoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherInfoSectionController';
            TeacherInfoSectionController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.localStorageService',
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$rootScope'
            ];
            createTeacherPage.TeacherInfoSectionController = TeacherInfoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherInfoSectionController.controllerId, TeacherInfoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherInfoSection.controller.js.map