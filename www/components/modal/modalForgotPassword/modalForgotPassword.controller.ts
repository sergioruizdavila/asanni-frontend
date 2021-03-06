/**
 * ModalForgotPasswordController
 * @description - modal Forgot Password controller definition, generic modal
 * in order to show user forgotPassword form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalForgotPassword {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalForgotPasswordController {
        close: () => void;
        validate: IModalForgotPasswordValidate;
        activate: () => void;
    }

    interface IModalForgotPasswordScope extends ng.IScope {

    }

    interface IModalForgotPasswordForm {
        email: string;
    }

    interface IModalForgotPasswordValidate {
        email: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }


    class ModalForgotPasswordController implements IModalForgotPasswordController {

        static controllerId = 'mainApp.components.modal.ModalForgotPasswordController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalForgotPasswordForm;
        validate: IModalForgotPasswordValidate;
        sending: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            'mainApp.auth.AuthService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
            'mainApp.register.RegisterService',
            '$filter',
            '$uibModal',
            '$uibModalInstance',
            'dataConfig'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private AuthService: app.auth.IAuthService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private RegisterService: app.register.IRegisterService,
            private $filter: angular.IFilterService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            // Init sending loading
            this.sending = false;

            //Init form
            this.form = {
                email: ''
            };

            // Build validate object fields
            this.validate = {
                email: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Forgot Passwod Modal';
            //LOG
            DEBUG && console.log('modalForgotPassword controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const EMAIL_ENUM = app.core.util.functionsUtil.Validation.Email;
            /***************************************************/

            //VARIABLES
            let formValid = true;

            //Validate Email field
            let email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
            this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
            if(!this.validate.email.valid) {
                formValid = this.validate.email.valid;
            }

            return formValid;
        }



        /**
        * _sendInstructions
        * @description - Send email with link to reset password
        * @use - this._sendInstructions();
        * @function
        * @return {void}
        */
        private _sendInstructions(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Send instructions from Forgot Password';
            const NO_ACCOUNT_EXISTS_1 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part1.text');
            const NO_ACCOUNT_EXISTS_2 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part2.text');
            const SENT_LINK = this.$filter('translate')('%modal.forgot_password.sent_link.text');

            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL, {
                "email": this.form.email || '*'
            });

            //VARIABLES
            let self = this;

            let formValid = this._validateForm();

            if(formValid) {

                //loading On
                this.sending = true;

                //Validate if given email is in DB
                this.RegisterService.checkEmail(this.form.email).then(

                    //Success
                    function(response) {
                        //VARIABLES
                        let emailExist = true;

                        if(response.data) {
                            //TODO: Validar mejor cuando de un error de servidor
                            emailExist = response.data.emailExist || true;
                        } else {
                            emailExist = false;
                        }

                        self.validate.globalValidate.valid = emailExist;

                        if(!emailExist) {
                            //loading Off
                            self.sending = false;
                            self.validate.globalValidate.message = NO_ACCOUNT_EXISTS_1 + self.form.email + NO_ACCOUNT_EXISTS_2;
                        } else {
                            //Send instructions to reset password
                            self.AuthService.resetPassword(self.form.email).then(

                                //Success
                                function(response) {
                                    //loading Off
                                    self.sending = false;
                                    self.messageUtil.info(SENT_LINK + self.form.email);
                                    //Open Log In modal to prepare user to log in
                                    self._openLogInModal();
                                },

                                //Error
                                function(error) {
                                    //loading Off
                                    self.sending = false;
                                    DEBUG && console.error(error);
                                    self.messageUtil.error('');
                                }
                            );
                        }

                    }

                );

            }

        }



        /**
        * _openLogInModal
        * @description - open Modal in order to Log in action
        * @use - this._openLogInModal();
        * @function
        * @return {void}
        */
        private _openLogInModal(): void {
            //MIXPANEL
            mixpanel.track("Click on 'Log in' from signUp modal");

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                templateUrl: this.dataConfig.modalLogInTmpl,
                controller: 'mainApp.components.modal.ModalLogInController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: false
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            /* When modal is closed,validate if user is Authenticated in order to
            show current avatar user */
            modalInstance.result.then(function () {
                //Validate if user is Authenticated
                self.$rootScope.$broadcast('Is Authenticated');
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            this.$uibModalInstance.close();
        }




        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalForgotPasswordController.controllerId,
                    ModalForgotPasswordController);

}
