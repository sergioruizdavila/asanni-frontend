/**
 * ModalSignUpController
 * @description - modal User SignUp controller definition, generic modal
 * in order to show user signUp form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
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

    interface IModalSignUpForm {
        email: string;
    }

    interface IModalSignUpValidate {
        email: app.core.util.functionsUtil.IValid;
    }


    class ModalSignUpController implements IModalSignUpController {

        static controllerId = 'mainApp.components.modal.ModalSignUpController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        //TODO: Renombrar registerData a 'form'
        registerData: any;
        validate: IModalSignUpValidate;
        sending: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$scope',
            '$state',
            'mainApp.models.user.RegisterService',
            'mainApp.core.util.messageUtilService',
            'mainApp.core.util.FunctionsUtilService',
            'dataConfig',
            '$uibModalInstance'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        //TODO: Asignar tipos remover any
        constructor(
            private $scope: any,
            private $state: any,
            private RegisterService: any,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private dataConfig: IDataConfig,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Init form
            this.registerData = {};

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalSignUp controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        registerUser(): void {
            //VARIABLES
            let self = this;

            this.RegisterService.register(this.registerData).then(
                function(response) {
                    //Success
                    console.log('Welcome!, Your new account has been successfuly created.');
                    this.$state.go('/login');
                },

                function(response) {
                    //Error
                    self.dataConfig.debug && console.log(JSON.stringify(response));
                    var errortext = [];
                    for (var key in response.data) {
                        var line = key.toUpperCase();
                        line += ': '
                        line += response.data[key];
                        errortext.push(line);
                    }

                    console.error(errortext);
                }
            );
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
