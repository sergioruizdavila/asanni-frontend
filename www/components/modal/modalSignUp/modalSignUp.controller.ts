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
        globalValidate: app.core.util.functionsUtil.IValid;
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
        saving: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            'mainApp.auth.AuthService',
            'mainApp.account.AccountService',
            'mainApp.register.RegisterService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
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
            private AuthService: app.auth.IAuthService,
            private AccountService: app.account.IAccountService,
            private RegisterService: app.register.IRegisterService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
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

            //Init form
            this.form = {
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                password: ''
            };

            // Init saving loading
            this.saving = false;

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
                password: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
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

            //loading On
            this.saving = true;

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                //Create a username based on first name and last name
                this.form.username = this.functionsUtil.generateUsername(this.form.first_name, this.form.last_name);

                //Register current user
                this.RegisterService.register(this.form).then(

                    //Success
                    function(response: app.core.interfaces.IUserDataAuth) {
                        //LOG
                        DEBUG && console.log('Welcome!, Your new account has been successfuly created.');
                        //Log user signed up
                        self._loginAfterRegister(
                            response.username,
                            response.email,
                            response.password
                        );
                    },

                    //Error
                    function(error) {
                        //LOG
                        DEBUG && console.log(JSON.stringify(error));

                        //loading Off
                        self.saving = false;

                        //Parse Error
                        var errortext = [];
                        for (var key in error.data) {
                            //var line = key.toUpperCase();
                            var line = key;
                            line += ': '
                            line += error.data[key];
                            errortext.push(line);
                        }

                        //LOG Parsed Error
                        DEBUG && console.error(errortext);

                        self.validate.globalValidate.valid = false;
                        self.validate.globalValidate.message = errortext[0];
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
                //TODO: Traducir a Español tambien
                this.validate.password.message = 'Your password must be at least 6 characters. Please try again.';
            }

            return formValid;
        }



        /**
        * _checkIfEmailExist
        * @description - Check if email given exists
        * @use - this._checkIfEmailExist();
        * @function
        * @return {void}
        */
        private _checkIfEmailExist(): void {
            //VARIABLES
            let self = this;

            if(this.form.email) {
                this.RegisterService.checkEmail(this.form.email).then(

                    function(response) {
                        if(response.data) {
                            if(!response.data.emailExist) {
                                self.validate.email.valid = true;
                            } else {
                                self.validate.email.valid = false;
                                self.validate.email.message = 'That email address is already in use. Please log in.';
                            }
                        } else if(response.email) {
                            self.validate.email.valid = true;
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
                            hasNextStep: self.dataSetModal.hasNextStep
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            /* When modal is closed,validate if user is Authenticated in order to
            show current avatar user */
            modalInstance.result.then(function () {

                //Validate if user is Authenticated
                self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);

            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            this.$uibModalInstance.close();
        }



        /**
        * _loginAfterRegister
        * @description - Tries to login a user after a successful sign up
        * @use - this._loginAfterRegister();
        * @function
        * @return {void}
        */
        private _loginAfterRegister(username, email, password): void {
            //VARIABLES
            let self = this;
            let userData = {
                username: username,
                email: email,
                password: password
            };

            this.AuthService.login(userData).then(

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
                            /* NOTE: We received 'id' not 'userId' from this endpoint
                                that's why we have to parse 'id' to 'userId'*/
                            response.userId = response.id;
                            self.$rootScope.profileData = new app.models.user.Profile(response);

                            //Validate if user is Authenticated
                            self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);

                            if(!self.dataSetModal.hasNextStep) {
                                //Open Welcome Modal
                                self._openWelcomeModal();
                            }

                            self.$uibModalInstance.close();

                        }
                    );
                },

                // Error
                function(response) {
                    //loading Off
                    self.saving = false;
                    
                    if (response.status == 401) {
                        //TODO: Traducir mensaje a español
                        DEBUG && console.log('Incorrect username or password.');
                        self.validate.globalValidate.valid = false;
                        self.validate.globalValidate.message = 'Incorrect username or password.';
                    }

                    else if (response.status == -1) {
                        //TODO: Traducir mensaje a español
                        DEBUG && console.log('No response from server. Try again, please');
                        self.messageUtil.error('No response from server. Try again, please');
                    }

                    else {
                        //TODO: Traducir mensaje a español
                        DEBUG && console.log('There was a problem logging you in. Error code: ' + response.status + '.');
                        self.messageUtil.error('There was a problem logging you in. Error code: ' + response.status + '.');
                    }
                }
            );

        }



        /**
        * _openWelcomeModal
        * @description - open welcome Modal after a success signUp and log In
        * @use - this._openWelcomeModal();
        * @function
        * @return {void}
        */
        private _openWelcomeModal(): void {

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: true,
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                templateUrl: this.dataConfig.modalWelcomeTmpl,
                controller: 'mainApp.components.modal.ModalWelcomeController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

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
