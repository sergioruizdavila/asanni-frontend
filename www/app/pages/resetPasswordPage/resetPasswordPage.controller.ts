/**
 * ResetPasswordPageController
 * @description - Create Teacher Page Controller
 */

module app.pages.resetPasswordPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IResetPasswordPageController {
        form: IResetPasswordForm;
        validate: IResetPasswordValidate;
        activate: () => void;
    }

    interface IResetPasswordForm {
        newPassword1: string;
        newPassword2: string;
    }

    interface IResetPasswordValidate {
        newPassword1: app.core.util.functionsUtil.IValid;
        newPassword2: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    interface IResetPasswordParams extends app.core.interfaces.IStateParamsData {
        uid: string;
        token: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ResetPasswordPageController implements IResetPasswordPageController {

        static controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        uid: string;
        token: string;
        form: IResetPasswordForm;
        validate: IResetPasswordValidate;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$stateParams',
            'mainApp.auth.AuthService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $stateParams: IResetPasswordParams,
            private AuthService: app.auth.IAuthService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService
        ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            this.uid = this.$stateParams.uid;

            this.token = this.$stateParams.token;

            //Init form
            this.form = {
                newPassword1: '',
                newPassword2: ''
            };

            // Build validate object fields
            this.validate = {
                newPassword1: {valid: true, message: ''},
                newPassword2: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;

            //LOG
            console.log('resetPasswordPage controller actived');

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
            /***************************************************/

            //VARIABLES
            let formValid = true;
            let password_rules = [NULL_ENUM, EMPTY_ENUM];

            //Validate New Password field
            this.validate.newPassword1 = this.functionsUtil.validator(this.form.newPassword1, password_rules);
            if(!this.validate.newPassword1.valid) {
                formValid = this.validate.newPassword1.valid;
            }

            //Validate Confirm Password field
            this.validate.newPassword2 = this.functionsUtil.validator(this.form.newPassword2, password_rules);
            if(!this.validate.newPassword2.valid) {
                formValid = this.validate.newPassword2.valid;
            }

            //Validate if both password are equal
            if(this.form.newPassword1 !== this.form.newPassword2) {
                formValid = false;
                this.validate.globalValidate.valid = false;
                this.validate.globalValidate.message = 'Your new passwords did not match. Please try again.';
            }

            return formValid;
        }



        /**
        * _changePassword
        * @description - Send change password request to Auth DB
        * @use - this._changePassword();
        * @function
        * @return {void}
        */
        private _changePassword(): void {
            //VARIABLES
            let self = this;

            let formValid = this._validateForm();

            if(formValid) {

                this.AuthService.confirmResetPassword(
                    self.uid,
                    self.token,
                    self.form.newPassword1,
                    self.form.newPassword2).then(
                        //Success
                        function(response) {
                            DEBUG && console.log(response);
                            /* TODO: Lo ideal es que lo loguee de inmediato, pero
                                como no tengo el email aqui, tendria que implementar
                                algo más complejo, por ahora solo lo direccionó al
                                main, y lo invito a loguearse.
                            */
                            //TODO: Traducir
                            self.messageUtil.success('Cambio exitoso!. Prueba iniciar sesión ahora.');
                            self.$state.go('page.landingPage',{showLogin: true}, {reload: true});
                        },

                        //Error
                        function(error) {
                            DEBUG && console.log(error);
                            if(error === 'Invalid value') {
                                self.validate.globalValidate.valid = false;
                                //TODO: Traducir
                                self.validate.globalValidate.message = 'El link que te enviamos al correo ya expiro, es necesario que solicites uno nuevo.';
                            } else {
                                self.messageUtil.error('');
                            }
                        }
                    );

            }

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.resetPasswordPage')
        .controller(ResetPasswordPageController.controllerId,
                    ResetPasswordPageController);

}
