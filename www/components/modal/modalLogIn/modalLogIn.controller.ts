/**
 * ModalLogInController
 * @description - modal User LogIn controller definition, generic modal
 * in order to show user logIn form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalLogIn {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalLogInController {
        close: () => void;
        validate: IModalLogInValidate;
        activate: () => void;
    }

    interface IModalLogInScope extends ng.IScope {

    }

    interface IModalLogInForm {
        username: string;
        email: string;
        password: string;
    }

    interface IModalLogInValidate {
        username: app.core.util.functionsUtil.IValid;
        email: app.core.util.functionsUtil.IValid;
        password: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }


    class ModalLogInController implements IModalLogInController {

        static controllerId = 'mainApp.components.modal.ModalLogInController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalLogInForm;
        validate: IModalLogInValidate;
        saving: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            '$state',
            'mainApp.auth.AuthService',
            'mainApp.account.AccountService',
            'mainApp.models.user.UserService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
            '$filter',
            'mainApp.localStorageService',
            'dataSetModal',
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
            private userService: app.models.user.IUserService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private $filter: angular.IFilterService,
            private localStorage,
            private dataSetModal: app.core.interfaces.IDataSet,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            // Init saving loading
            this.saving = false;

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
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Log in modal';
            //LOG
            DEBUG && console.log('modalLogIn controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * login
        * @description - Tries to login a user by calling login AuthService method
        * @use - this.login();
        * @function
        * @return {void}
        */
        login(): void {
            //CONSTANTS
            const USERNAME_PASSWORD_WRONG = this.$filter('translate')('%error.username_password_wrong.text');
            const SERVER_ERROR = this.$filter('translate')('%error.server_error.text');
            const SERVER_CODE_ERROR = this.$filter('translate')('%error.server_error_code.text');

            //VARIABLES
            let self = this;

            //loading On
            this.saving = true;

            let formValid = this._validateForm();

            if(formValid) {
                //get username given an user email
                this.AccountService.getUsername(this.form.email).then(
                    function(response) {

                        //If username exists, add this field on request to login
                        if(response.userExist) {
                            self.form.username = response.username;
                        } else {
                            //TODO: Solucion nada optima, no esta bien asignar el email,
                            // como si fuera el username, solo para que rompa, y devuelva
                            // error de login, buscar una solucion mejor.
                            self.form.username = self.form.email;
                        }

                        self.AuthService.login(self.form).then(

                            //Success
                            function(response) {
                                self.AccountService.getAccount().then(
                                    function(response) {
                                        //LOG
                                        DEBUG && console.log('Data User: ', response);

                                        //loading Off
                                        self.saving = false;

                                        //Set logged User data in localStorage
                                        self.localStorage.setItem(self.dataConfig.userDataLocalStorage, JSON.stringify(response));
                                        //Set logged User data in $rootScope
                                        self.$rootScope.userData = response;

                                        self.userService.getUserProfileById(response.id).then(
                                            function(response) {
                                                if(response.userId) {
                                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                                }

                                                //Close modal
                                                self.$uibModalInstance.close();
                                            }
                                        );

                                    }
                                );
                            },

                            // Error
                            function(response) {
                                //loading Off
                                self.saving = false;

                                if (response.status == 401) {
                                    DEBUG && console.log(USERNAME_PASSWORD_WRONG);
                                    self.validate.globalValidate.valid = false;
                                    self.validate.globalValidate.message = USERNAME_PASSWORD_WRONG;
                                }

                                else if (response.status == -1) {
                                    DEBUG && console.log(SERVER_ERROR);
                                    self.messageUtil.error(SERVER_ERROR);
                                }

                                else {
                                    DEBUG && console.log(SERVER_CODE_ERROR + response.status);
                                    self.messageUtil.error(SERVER_CODE_ERROR + response.status);
                                }
                            }
                        );
                    }
                );

            } else {
                //loading Off
                this.saving = false;
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
            }

            return formValid;
        }



        /**
        * _openForgotPasswordModal
        * @description - open Modal in order to recover password
        * @use - this._openForgotPasswordModal();
        * @function
        * @return {void}
        */
        private _openForgotPasswordModal(): void {
            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                templateUrl: this.dataConfig.modalForgotPasswordTmpl,
                controller: 'mainApp.components.modal.ModalForgotPasswordController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: self.dataSetModal.hasNextStep
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            this.$uibModalInstance.close();
        }



        /**
        * _openSignUpModal
        * @description - open Modal in order to Log in action
        * @use - this._openSignUpModal();
        * @function
        * @return {void}
        */
        private _openSignUpModal(): void {

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: self.dataSetModal.hasNextStep
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

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
        .controller(ModalLogInController.controllerId,
                    ModalLogInController);

}
