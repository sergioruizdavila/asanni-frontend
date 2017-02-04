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
        activate: () => void;
    }

    interface IModalSignUpScope extends ng.IScope {

    }

    interface IModalSignUpForm extends app.register.IRegisterUserData {
    }

    interface IModalSignUpValidate {
        email: app.core.util.functionsUtil.IValid;
    }


    class ModalSignUpController implements IModalSignUpController {

        static controllerId = 'mainApp.components.modal.ModalSignUpController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalSignUpForm;
        validate: IModalSignUpValidate;
        sending: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            'mainApp.register.RegisterService',
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
