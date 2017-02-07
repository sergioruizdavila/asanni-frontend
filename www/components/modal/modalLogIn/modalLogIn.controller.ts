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
        activate: () => void;
    }

    interface IModalLogInScope extends ng.IScope {

    }

    interface IModalLogInForm extends app.core.interfaces.IUserDataAuth {
    }

    interface IModalLogInValidate {
        email: app.core.util.functionsUtil.IValid;
    }


    class ModalLogInController implements IModalLogInController {

        static controllerId = 'mainApp.components.modal.ModalLogInController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalLogInForm;
        validate: IModalLogInValidate;
        sending: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            '$state',
            'mainApp.auth.AuthService',
            'mainApp.account.AccountService',
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

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalLogIn controller actived');
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
            //VARIABLES
            let self = this;

            //TODO: Validar bien esto, ya que toco hacer una rosca
            // rara por que no encontre la forma de que OAuth2 permitiera
            // loguear con email y no con username.
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

                                    //Set logged User data in localStorage
                                    self.localStorage.setItem('currentUser', JSON.stringify(response));
                                    //Set logged User data in $rootScope
                                    //TODO: Crear un modelo: Account, y crear un objeto
                                    // tipo Account: new app.models.Account();
                                    self.$rootScope.currentUser = JSON.parse(self.localStorage.getItem('currentUser'));
                                    //Close modal
                                    self.$uibModalInstance.close();
                                }
                            );
                        },

                        // Error
                        function(response) {
                            if (response.status == 401) {
                                DEBUG && console.log('Incorrect username or password.');
                            }

                            else if (response.status == -1) {
                                DEBUG && console.log('No response from server.');
                            }

                            else {
                                DEBUG && console.log('There was a problem logging you in. Error code: ' + response.status + '.');
                            }
                        }
                    );
                }
            );
        }



        /**
        * _openSignUpModal
        * @description - open Modal in order to Log in action
        * @use - this._openSignUpModal();
        * @function
        * @return {void}
        */
        private _openSignUpModal(): void {
            //MIXPANEL
            mixpanel.track("Click on 'Sign up' from logIn modal");

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm'
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
