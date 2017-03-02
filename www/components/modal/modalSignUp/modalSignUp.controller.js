var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController($uibModalInstance, functionsUtil, LandingPageService, messageUtil, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.functionsUtil = functionsUtil;
                    this.LandingPageService = LandingPageService;
                    this.messageUtil = messageUtil;
                    this.$filter = $filter;
                    this._init();
                }
                ModalSignUpController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        email: ''
                    };
                    this.sending = false;
                    this.validate = {
                        email: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalSignUpController.prototype.activate = function () {
                    console.log('modalSignUp controller actived');
                };
                ModalSignUpController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    return formValid;
                };
                ModalSignUpController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        this.sending = true;
                        mixpanel.track("Click on Join as a Student button", {
                            "name": '*',
                            "email": this.form.email,
                            "comment": '*'
                        });
                        var userData = {
                            uid: app.core.util.functionsUtil.FunctionsUtilService.generateGuid(),
                            name: '*',
                            email: this.form.email,
                            comment: '*'
                        };
                        this.LandingPageService.createEarlyAdopter(userData)
                            .then(function (response) {
                            if (response.createdAt) {
                                self_1.messageUtil.success('¡Gracias!, Ya está todo listo. Te agregaremos a nuestra lista.');
                                self_1.$uibModalInstance.close();
                            }
                            else {
                                self_1.sending = false;
                            }
                        });
                    }
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                    event.preventDefault();
                };
                return ModalSignUpController;
            }());
            ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
            ModalSignUpController.$inject = [
                '$uibModalInstance',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.pages.landingPage.LandingPageService',
                'mainApp.core.util.messageUtilService',
                '$filter'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalSignUpController.controllerId, ModalSignUpController);
        })(modalSignUp = modal.modalSignUp || (modal.modalSignUp = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalSignUp.controller.js.map