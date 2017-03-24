var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalBasicInfo;
        (function (modalBasicInfo) {
            var ModalBasicInfoController = (function () {
                function ModalBasicInfoController(userService, getDataFromJson, functionsUtilService, $uibModalInstance, dataConfig, $filter, $uibModal, $rootScope) {
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
                ModalBasicInfoController.prototype._init = function () {
                    var PHONE_NUMBER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.phone_number.text');
                    var GENDER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.gender.text');
                    var ABOUT_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.about.text');
                    var self = this;
                    this.genderObject = { gender: { code: '', value: '' } };
                    this.listGenders = this.getDataFromJson.getSexi18n();
                    this.tooltip = {
                        phoneNumber: PHONE_NUMBER_TOOLTIP,
                        gender: GENDER_TOOLTIP,
                        about: ABOUT_TOOLTIP
                    };
                    this.form = {
                        phoneNumber: '',
                        gender: '',
                        about: ''
                    };
                    this.validate = {
                        phoneNumber: { valid: true, message: '' },
                        gender: { valid: true, message: '' },
                        about: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalBasicInfoController.prototype.activate = function () {
                    DEBUG && console.log('modalBasicInfo controller actived');
                };
                ModalBasicInfoController.prototype._openFinishModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalFinishTmpl,
                        controller: 'mainApp.components.modal.ModalFinishController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalBasicInfoController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var phoneNumber_rules = [NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || NaN;
                    this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var gender_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.gender = this.functionsUtilService.validator(this.genderObject.gender.code, gender_rules);
                    if (!this.validate.gender.valid) {
                        formValid = this.validate.gender.valid;
                    }
                    return formValid;
                };
                ModalBasicInfoController.prototype._parseData = function () {
                    var genderCode = this.genderObject.gender.code;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.About = this.form.about;
                };
                ModalBasicInfoController.prototype._goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._parseData();
                        this.userService.updateUserProfile(this.$rootScope.profileData)
                            .then(function (response) {
                            if (response.userId) {
                                self._openFinishModal();
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalBasicInfoController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalBasicInfoController.controllerId = 'mainApp.components.modal.ModalBasicInfoController';
                ModalBasicInfoController.$inject = [
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$uibModalInstance',
                    'dataConfig',
                    '$filter',
                    '$uibModal',
                    '$rootScope'
                ];
                return ModalBasicInfoController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalBasicInfoController.controllerId, ModalBasicInfoController);
        })(modalBasicInfo = modal.modalBasicInfo || (modal.modalBasicInfo = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalBasicInfo/modalBasicInfo.controller.js.map
