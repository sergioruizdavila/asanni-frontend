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

    interface IModalForgotPasswordForm extends app.core.interfaces.IUserDataAuth {
        username: string;
        email: string;
        password: string;
    }

    interface IModalForgotPasswordValidate {
        username: app.core.util.functionsUtil.IValid;
        email: app.core.util.functionsUtil.IValid;
        password: app.core.util.functionsUtil.IValid;
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
            '$state',
            'mainApp.auth.AuthService',
            'mainApp.account.AccountService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
            'mainApp.localStorageService',
            'dataConfig',
            '$uibModal',
            '$uibModalInstance'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $state: ng.ui.IStateService,
            private AuthService: app.auth.IAuthService,
            private AccountService: app.account.IAccountService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private localStorage,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Init form
            this.form = {
                username: '',
                email: '',
                password: ''
            };

            // Build validate object fields
            this.validate = {
                username: {valid: true, message: ''},
                email: {valid: true, message: ''},
                password: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            DEBUG && console.log('modalForgotPassword controller actived');
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
