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
        form: IModalSignUpForm;
        validate: IModalSignUpValidate;
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
        form: IModalSignUpForm;
        validate: IModalSignUpValidate;
        sending: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.pages.landingPage.LandingPageService',
            'mainApp.core.util.messageUtilService',
            '$filter'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private LandingPageService: app.pages.landingPage.ILandingPageService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Init form
            this.form = {
                email: ''
            };

            this.sending = false;

            // Build validate object fields
            this.validate = {
                email: {valid: true, message: ''}
            };

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
        * save
        * @description - when user click "Save" button, close the modal and
        * send the new signUp data
        * @use - this.save();
        * @function
        * @return {void}
        */
        save(): void {
            //Validate data form
            let formValid = this._validateForm();
            //If form is valid, save data model
            if(formValid) {
                //VARIABLES
                let self = this;
                /*********************************/

                this.sending = true;

                mixpanel.track("Click on Join as a Student button", {
                    "name": '*',
                    "email": this.form.email,
                    "comment": '*'
                });

                let userData = {
                    name: '*',
                    email: this.form.email,
                    comment: '*'
                };

                this.LandingPageService.createEarlyAdopter(userData)
                .then(
                    function(response) {
                        if(response.createdAt) {
                            self.messageUtil.success('¡Gracias!, Ya está todo listo. Te agregaremos a nuestra lista.');
                            self.$uibModalInstance.close();
                        } else {
                            self.sending = false;
                        }
                    }
                );

            }

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
            event.preventDefault();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalSignUpController.controllerId,
                    ModalSignUpController);

}
