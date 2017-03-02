var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditProfilePage;
        (function (userEditProfilePage) {
            var UserEditProfilePageController = (function () {
                function UserEditProfilePageController(dataConfig, userService, getDataFromJson, functionsUtil, $state, $filter, $timeout, $uibModal, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                UserEditProfilePageController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.countryObject = { code: '', value: '' };
                    this.genderObject = { gender: { code: '', value: '' } };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        gender: '',
                        birthDate: null,
                        countryBirth: '',
                        cityBirth: '',
                        about: '',
                        native: [],
                        learn: [],
                        teach: []
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listGenders = this.getDataFromJson.getSexi18n();
                    this.listDays = this.functionsUtil.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtil.buildNumberSelectList(1916, 1998);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        firstName: { valid: true, message: '' },
                        lastName: { valid: true, message: '' },
                        phoneNumber: { valid: true, message: '' },
                        gender: { valid: true, message: '' },
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        countryBirth: { valid: true, message: '' },
                        cityBirth: { valid: true, message: '' },
                        about: { valid: true, message: '' },
                        native: { valid: true, message: '' },
                        teach: { valid: true, message: '' },
                        learn: { valid: true, message: '' }
                    };
                    this.activate();
                };
                UserEditProfilePageController.prototype.activate = function () {
                    DEBUG && console.log('UserEditProfilePage controller actived');
                    this.fillFormWithProfileData();
                };
                UserEditProfilePageController.prototype.goToEditMedia = function () {
                    this.$state.go('page.userEditMediaPage');
                };
                UserEditProfilePageController.prototype.goToEditLocation = function () {
                    this.$state.go('page.userEditLocationPage');
                };
                UserEditProfilePageController.prototype.fillFormWithProfileData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self._fillForm(self.$rootScope.profileData);
                            }
                        });
                    }
                };
                UserEditProfilePageController.prototype._fillForm = function (data) {
                    this.form.firstName = data.FirstName;
                    this.form.lastName = data.LastName;
                    this.form.phoneNumber = data.PhoneNumber;
                    this.genderObject.gender.code = data.Gender;
                    var date = this.functionsUtil.splitDate(data.BirthDate);
                    this.dateObject.day.value = date.day ? parseInt(date.day) : '';
                    this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
                    this.dateObject.year.value = date.year ? parseInt(date.year) : '';
                    this.countryObject.code = data.BornCountry;
                    this.form.cityBirth = data.BornCity;
                    this.form.about = data.About;
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
                UserEditProfilePageController.prototype._validateBasicInfoForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var first_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.firstName = this.functionsUtil.validator(this.form.firstName, first_rules);
                    if (!this.validate.firstName.valid) {
                        formValid = this.validate.firstName.valid;
                    }
                    var last_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.lastName = this.functionsUtil.validator(this.form.lastName, last_rules);
                    if (!this.validate.lastName.valid) {
                        formValid = this.validate.lastName.valid;
                    }
                    var phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || '';
                    this.validate.phoneNumber = this.functionsUtil.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var gender_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.gender = this.functionsUtil.validator(this.genderObject.gender.code, gender_rules);
                    if (!this.validate.gender.valid) {
                        formValid = this.validate.gender.valid;
                    }
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.day = this.functionsUtil.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtil.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.year = this.functionsUtil.validator(this.dateObject.year.value, year_birthdate_rules);
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
                    var country_birth_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryBirth = this.functionsUtil.validator(this.countryObject.code, country_birth_rules);
                    if (!this.validate.countryBirth.valid) {
                        formValid = this.validate.countryBirth.valid;
                    }
                    var city_birth_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityBirth = this.functionsUtil.validator(this.form.cityBirth, city_birth_rules);
                    if (!this.validate.cityBirth.valid) {
                        formValid = this.validate.cityBirth.valid;
                    }
                    var about_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.about = this.functionsUtil.validator(this.form.about, about_rules);
                    if (!this.validate.about.valid) {
                        formValid = this.validate.about.valid;
                    }
                    return formValid;
                };
                UserEditProfilePageController.prototype._validateLanguagesForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
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
                    return formValid;
                };
                UserEditProfilePageController.prototype._addNewLanguages = function (type, $event) {
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
                UserEditProfilePageController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                UserEditProfilePageController.prototype._setBasicInfoFromForm = function () {
                    var dateFormatted = this.functionsUtil.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var genderCode = this.genderObject.gender.code;
                    var countryCode = this.countryObject.code;
                    this.form.countryBirth = countryCode;
                    this.$rootScope.profileData.FirstName = this.form.firstName;
                    this.$rootScope.profileData.LastName = this.form.lastName;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.countryBirth;
                    this.$rootScope.profileData.BornCity = this.form.cityBirth;
                    this.$rootScope.profileData.About = this.form.about;
                };
                UserEditProfilePageController.prototype._setLanguageFromForm = function () {
                    if (this.form.native) {
                        var native = [];
                        for (var i = 0; i < this.form.native.length; i++) {
                            native.push(this.form.native[i].key);
                        }
                        this.$rootScope.profileData.Languages.Native = native;
                    }
                    if (this.form.learn) {
                        var learn = [];
                        for (var i = 0; i < this.form.learn.length; i++) {
                            learn.push(this.form.learn[i].key);
                        }
                        this.$rootScope.profileData.Languages.Learn = learn;
                    }
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.profileData.Languages.Teach = teach;
                    }
                };
                UserEditProfilePageController.prototype.saveBasicInfoSection = function () {
                    var self = this;
                    var formValid = this._validateBasicInfoForm();
                    if (formValid) {
                        this.saving = true;
                        this._setBasicInfoFromForm();
                        this.save().then(function (saved) {
                            self.saving = false;
                            self.saved = saved;
                            self.error = !saved;
                            self.$timeout(function () {
                                self.saved = false;
                            }, self.TIME_SHOW_MESSAGE);
                        });
                    }
                };
                UserEditProfilePageController.prototype.saveLanguagesSection = function () {
                    var self = this;
                    var formValid = this._validateLanguagesForm();
                    if (formValid) {
                        this.saving = true;
                        this._setLanguageFromForm();
                        this.save().then(function (saved) {
                            self.saving = false;
                            self.saved = saved;
                            self.error = !saved;
                            self.$timeout(function () {
                                self.saved = false;
                            }, self.TIME_SHOW_MESSAGE);
                        });
                    }
                };
                UserEditProfilePageController.prototype.save = function () {
                    var self = this;
                    return this.userService.updateUserProfile(this.$rootScope.profileData)
                        .then(function (response) {
                        var saved = false;
                        if (response.userId) {
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            saved = true;
                        }
                        return saved;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return false;
                    });
                };
                return UserEditProfilePageController;
            }());
            UserEditProfilePageController.controllerId = 'mainApp.pages.userEditProfilePage.UserEditProfilePageController';
            UserEditProfilePageController.$inject = [
                'dataConfig',
                'mainApp.models.user.UserService',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$timeout',
                '$uibModal',
                '$scope',
                '$rootScope'
            ];
            userEditProfilePage.UserEditProfilePageController = UserEditProfilePageController;
            angular
                .module('mainApp.pages.userEditProfilePage')
                .controller(UserEditProfilePageController.controllerId, UserEditProfilePageController);
        })(userEditProfilePage = pages.userEditProfilePage || (pages.userEditProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userEditProfilePage.controller.js.map