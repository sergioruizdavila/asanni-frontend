var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalBorn;
        (function (modalBorn) {
            var ModalBornController = (function () {
                function ModalBornController(userService, getDataFromJson, functionsUtilService, $uibModalInstance, dataConfig, $filter, $uibModal, $rootScope) {
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalBornController.prototype._init = function () {
                    var BIRTHDATE_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.birthdate.text');
                    var COUNTRY_BIRTH_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.cntry_birth.text');
                    var CITY_BIRTH_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.city_birth.text');
                    var self = this;
                    this.form = {
                        country: '',
                        city: '',
                        birthDate: null
                    };
                    this.tooltip = {
                        birthDate: BIRTHDATE_TOOLTIP,
                        countryBirth: COUNTRY_BIRTH_TOOLTIP,
                        cityBirth: CITY_BIRTH_TOOLTIP
                    };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.countryObject = { code: '', value: '' };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 2017);
                    this.validate = {
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        country: { valid: true, message: '' },
                        city: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalBornController.prototype.activate = function () {
                    DEBUG && console.log('modalBorn controller actived');
                };
                ModalBornController.prototype._openBasicInfoModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalBasicInfoTmpl,
                        controller: 'mainApp.components.modal.ModalBasicInfoController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalBornController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    this.validate.birthDate.valid = true;
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
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.country = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.country.valid) {
                        formValid = this.validate.country.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.city = this.functionsUtilService.validator(this.form.city, city_rules);
                    if (!this.validate.city.valid) {
                        formValid = this.validate.city.valid;
                    }
                    return formValid;
                };
                ModalBornController.prototype._parseData = function () {
                    var dateFormatted = this.functionsUtilService.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var countryCode = this.countryObject.code;
                    this.form.country = countryCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.country;
                    this.$rootScope.profileData.BornCity = this.form.city;
                };
                ModalBornController.prototype._goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._parseData();
                        this.userService.updateUserProfile(this.$rootScope.profileData)
                            .then(function (response) {
                            if (response.userId) {
                                self._openBasicInfoModal();
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalBornController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalBornController.controllerId = 'mainApp.components.modal.ModalBornController';
                ModalBornController.$inject = [
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$uibModalInstance',
                    'dataConfig',
                    '$filter',
                    '$uibModal',
                    '$rootScope'
                ];
                return ModalBornController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalBornController.controllerId, ModalBornController);
        })(modalBorn = modal.modalBorn || (modal.modalBorn = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalBorn/modalBorn.controller.js.map
