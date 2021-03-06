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
        passwordMinLength: number;
        passwordMaxLength: number;
        saving: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            'dataConfig',
            '$filter',
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
            private dataConfig: IDataConfig,
            private $filter: angular.IFilterService,
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

            // Init saving loading
            this.saving = false;

            this.uid = this.$stateParams.uid;

            this.token = this.$stateParams.token;

            // Password min length
            this.passwordMinLength = this.dataConfig.passwordMinLength;

            // Password max length
            this.passwordMaxLength = this.dataConfig.passwordMaxLength;

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
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Reset Password Page';
            //VARIABLES
            let self = this;

            //LOG
            console.log('resetPasswordPage controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL, {
                "uid": this.uid || '*',
                "token": this.token || '*'
            });

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
            const PASSWORD_MESSAGE = this.$filter('translate')('%recover.password.not_match.text');
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
                this.validate.globalValidate.message = PASSWORD_MESSAGE;
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
            //CONSTANTS
            const SUCCESS_CHANGE_PROCESS = this.$filter('translate')('%recover.password.success.text');
            const LINK_EXPIRED = this.$filter('translate')('%recover.password.link_expired.text');
            const PASSWORD_COMMON = this.$filter('translate')('%recover.password.password_common.text');

            //VARIABLES
            let self = this;

            let formValid = this._validateForm();

            if(formValid) {

                this.validate.globalValidate.valid = true;

                //loading On
                this.saving = true;

                this.AuthService.confirmResetPassword(
                    self.uid,
                    self.token,
                    self.form.newPassword1,
                    self.form.newPassword2).then(
                        //Success
                        function(response) {
                            //loading Off
                            self.saving = false;
                            self.messageUtil.success(SUCCESS_CHANGE_PROCESS);
                            self.$state.go('page.landingPage',{showLogin: true}, {reload: true});
                        },

                        //Error
                        function(error) {
                            //loading Off
                            self.saving = false;
                            self.validate.globalValidate.valid = false;
                            if(error.data) {
                                if(error.data.token) {
                                    if(error.data.token[0] === 'Invalid value'){
                                        self.validate.globalValidate.message = LINK_EXPIRED;
                                    } else {
                                        self.messageUtil.error('');
                                    }
                                } else if(error.data.newPassword2) {
                                    self.validate.globalValidate.message = PASSWORD_COMMON;
                                } else {
                                    self.messageUtil.error('');
                                }
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
