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
                    this.countryObject = { code: '', value: '' };
                    this.sexObject = { sex: { code: '', value: '' } };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        phoneNumber: '',
                        sex: '',
                        birthDate: null,
                        bornCountry: '',
                        bornCity: '',
                        about: ''
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listSexs = this.getDataFromJson.getSexi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        phoneNumber: { valid: true, message: '' },
                        sex: { valid: true, message: '' },
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        bornCountry: { valid: true, message: '' },
                        bornCity: { valid: true, message: '' },
                        about: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherInfoSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherInfoSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherInfoSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                        this.$state.go(this.STEP2_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherInfoSectionController.prototype._fillForm = function (data) {
                    this.form.phoneNumber = data.PhoneNumber;
                    this.sexObject.sex.code = data.Gender;
                    var date = this.functionsUtilService.splitDate(data.BirthDate);
                    this.dateObject.day.value = date.day ? parseInt(date.day) : '';
                    this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
                    this.dateObject.year.value = date.year ? parseInt(date.year) : '';
                    this.countryObject.code = data.BornCountry;
                    this.form.bornCity = data.BornCity;
                    this.form.about = data.About;
                };
                TeacherInfoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
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
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
                    if (!this.validate.birthDate.year.valid) {
                        formValid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    if (this.validate.birthDate.day.valid &&
                        this.validate.birthDate.month.valid &&
                        this.validate.birthDate.year.valid) {
                        this.validate.birthDate.valid = true;
                        this.validate.birthDate.message = '';
                    }
                    var country_born_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.bornCountry = this.functionsUtilService.validator(this.countryObject.code, country_born_rules);
                    if (!this.validate.bornCountry.valid) {
                        formValid = this.validate.bornCountry.valid;
                    }
                    var city_born_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.bornCity = this.functionsUtilService.validator(this.form.bornCity, city_born_rules);
                    if (!this.validate.bornCity.valid) {
                        formValid = this.validate.bornCity.valid;
                    }
                    var about_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.about = this.functionsUtilService.validator(this.form.about, about_rules);
                    if (!this.validate.about.valid) {
                        formValid = this.validate.about.valid;
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
                    var genderCode = this.sexObject.sex.code;
                    var countryCode = this.countryObject.code;
                    var recommended = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
                    this.form.bornCountry = countryCode;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.bornCountry;
                    this.$rootScope.profileData.BornCity = this.form.bornCity;
                    this.$rootScope.profileData.About = this.form.about;
                    this.$rootScope.teacherData.Profile = this.$rootScope.profileData;
                    this.$rootScope.teacherData.Recommended = recommended ? recommended : null;
                };
                TeacherInfoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
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