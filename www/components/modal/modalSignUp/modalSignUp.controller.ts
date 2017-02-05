/**
 * ModalSignUpController
 * @description - modal User SignUp controller definition, generic modal
 * in order to show user signUp form
 * @constructor
 */

module components.modal.modalSignUp {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalSignUpController {
        close: () => void;
        validate: IModalSignUpValidate;
        activate: () => void;
    }

    interface IModalSignUpScope extends ng.IScope {

    }

    interface IModalSignUpForm extends app.register.IRegisterUserData {
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        password: string;
    }

    interface IModalSignUpValidate {
        username: app.core.util.functionsUtil.IValid;
        email: app.core.util.functionsUtil.IValid;
        first_name: app.core.util.functionsUtil.IValid;
        last_name: app.core.util.functionsUtil.IValid;
        password: app.core.util.functionsUtil.IValid;
    }


    class ModalSignUpController implements IModalSignUpController {

        static controllerId = 'mainApp.components.modal.ModalSignUpController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalSignUpForm;
        validate: IModalSignUpValidate;
        passwordMinLength: number;
        passwordMaxLength: number;
        sending: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            'mainApp.register.RegisterService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
            'dataConfig',
            '$uibModal',
            '$uibModalInstance'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private RegisterService: app.register.IRegisterService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
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
                first_name: '',
                last_name: '',
                password: ''
            };

            // Password min length
            this.passwordMinLength = this.dataConfig.passwordMinLength;

            // Password max length
            this.passwordMaxLength = this.dataConfig.passwordMaxLength;

            // Build validate object fields
            this.validate = {
                username: {valid: true, message: ''},
                email: {valid: true, message: ''},
                first_name: {valid: true, message: ''},
                last_name: {valid: true, message: ''},
                password: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('modalSignUp controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * registerUser
        * @description - Tried to create a new user account
        * @use - this.registerUser();
        * @function
        * @return {void}
        */
        registerUser(): void {
            //VARIABLES
            let self = this;

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                //Create a username based on first name and last name
                this.form.username = this.functionsUtil.generateUsername(this.form.first_name, this.form.last_name);

                //Register current user
                this.RegisterService.register(this.form).then(

                    //Success
                    function(response) {
                        //LOG
                        DEBUG && console.log('Welcome!, Your new account has been successfuly created.');
                        //Show LogIn modal in order to allow user log in
                        self.messageUtil.success('Welcome!, Your new account has been successfuly created.');
                        self._openLogInModal();
                    },

                    //Error
                    function(error) {
                        //LOG
                        DEBUG && console.log(JSON.stringify(error));

                        //Parse Error
                        var errortext = [];
                        for (var key in error.data) {
                            var line = key.toUpperCase();
                            line += ': '
                            line += error.data[key];
                            errortext.push(line);
                        }

                        //LOG Parsed Error
                        DEBUG && console.error(errortext);
                    }
                );
            }

        }



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

            //Validate First Name field
            let firstName_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.first_name = this.functionsUtil.validator(this.form.first_name, firstName_rules);
            if(!this.validate.first_name.valid) {
                formValid = this.validate.first_name.valid;
            }

            //Validate Last Name field
            let lastName_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.last_name = this.functionsUtil.validator(this.form.last_name, lastName_rules);
            if(!this.validate.last_name.valid) {
                formValid = this.validate.last_name.valid;
            }

            //Validate Email field
            let email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
            this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
            if(!this.validate.email.valid) {
                formValid = this.validate.email.valid;
            }

            //Validate Password field
            let password_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.password = this.functionsUtil.validator(this.form.password, password_rules);
            if(!this.validate.password.valid) {
                formValid = this.validate.password.valid;
                this.validate.password.message = 'Your password must be at least 6 characters. Please try again.';
            }

            return formValid;
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
                templateUrl: this.dataConfig.modalLogInTmpl,
                controller: 'mainApp.components.modal.ModalLogInController as vm'
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
        .controller(ModalSignUpController.controllerId,
                    ModalSignUpController);

}
