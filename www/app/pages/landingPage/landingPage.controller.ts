/**
 * LandingPageController
 * @description - Landing Page Controller
 */

module app.pages.landingPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ILandingPageController {
        form: ILandingForm;
        activate: () => void;
    }

    export interface ILandingScope extends angular.IScope {

    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ILandingForm {
        userData: IUserData;
        language: string;
        feedback: app.models.feedback.Feedback;
    }

    export interface IUserData {
        name: string;
        email: string;
        comment: string;
    }

    export interface IFormStatus {
        success: boolean;
        sending: boolean;
        sent: boolean;
        disabled: boolean;
    }

    interface ILandingValidate {
        country: app.core.util.functionsUtil.IValid;
        email: app.core.util.functionsUtil.IValid;
    }

    export interface ILandingError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class LandingPageController implements ILandingPageController {

        static controllerId = 'mainApp.pages.landingPage.LandingPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ILandingForm;
        infoCountry: IFormStatus;
        infoNewUser: IFormStatus;
        validate: ILandingValidate;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$state',
                                 'dataConfig',
                                 '$uibModal',
                                 'mainApp.core.util.messageUtilService',
                                 'mainApp.core.util.FunctionsUtilService',
                                 'mainApp.pages.landingPage.LandingPageService',
                                 'mainApp.models.feedback.FeedbackService',
                                 'mainApp.core.util.GetDataStaticJsonService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private LandingPageService: app.pages.landingPage.ILandingPageService,
            private FeedbackService: app.models.feedback.IFeedbackService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Init form
            this.form = {
                userData: {
                    name: '',
                    email: '',
                    comment: ''
                },
                language: this.functionsUtil.getCurrentLanguage() || 'en',
                feedback: new app.models.feedback.Feedback()
            };

            //Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            // Init Country form status
            this.infoCountry = {
                success: false,
                sending: false,
                sent: true,
                disabled: false
            };

            // Init New User form status
            this.infoNewUser = {
                success: false,
                sending: false,
                sent: true,
                disabled: false
            };

            // Build validate object fields
            this.validate = {
                country: {valid: true, message: ''},
                email: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('landingPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * changeLanguage
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */

        changeLanguage(): void {
             this.functionsUtil.changeLanguage(this.form.language);
        }



        /**
        * _sendCountryFeedback
        * @description - save country feedback to database
        * @use - this._sendCountryFeedback();
        * @function
        * @return {void}
        */

        private _sendCountryFeedback(): void {
            //CONSTANTS
            const FEEDBACK_SUCCESS_MESSAGE = '¡Gracias por tu recomendación!. La revisaremos y pondremos manos a la obra.';
            /***************************************************/

            //VARIABLES
            let self = this;
            this.form.feedback.NextCountry = this.countryObject.code;

            if(this.form.feedback.NextCountry) {
                this.infoCountry.sending = true;
                this.infoCountry.sent = false;
                this.infoCountry.disabled = true;
                this.FeedbackService.createFeedback(this.form.feedback).then(
                    function(response) {
                        if(response.createdAt) {
                            self.infoCountry.success = true;
                            self.messageUtil.success(FEEDBACK_SUCCESS_MESSAGE);
                            self.infoCountry.sent = true;
                            self.infoCountry.sending = false;
                            self.infoCountry.disabled = true;
                            self.validate.country.valid = true;
                            self.form.userData.email = '';
                        } else {
                            self.infoCountry.sending = false;
                            self.infoCountry.disabled = false;
                            self.validate.country.valid = true;
                        }
                    }
                );
            } else {
                this.validate.country.valid = false;
            }

        }



        /**
        * _createEarlyAdopter
        * @description - save new user's email early adopter
        * @use - this._createEarlyAdopter();
        * @function
        * @return {void}
        */

        private _createEarlyAdopter(): void {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const EMAIL_ENUM = app.core.util.functionsUtil.Validation.Email;
            /***************************************************/

            // VARIABLES
            let self = this;

            //Validate Email field
            let email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
            this.validate.email = this.functionsUtil.validator(this.form.userData.email, email_rules);

            if(this.validate.email.valid) {
                this.infoNewUser.sending = true;

                mixpanel.track("Click on Notify button", {
                    "name": this.form.userData.name || '*',
                    "email": this.form.userData.email,
                    "comment": this.form.userData.comment || '*'
                });

                let userData = {
                    name: this.form.userData.name || '*',
                    email: this.form.userData.email,
                    comment: this.form.userData.comment || '*'
                };
                this.LandingPageService.createEarlyAdopter(userData).then(
                    function(response) {
                        if(response.createdAt) {
                            self.infoNewUser.sent = true;
                            self.infoNewUser.sending = false;
                            self.infoNewUser.disabled = true;
                            self.infoNewUser.success = true;
                            self.validate.country.valid = true;
                        } else {
                            self.infoNewUser.sending = false;
                            self.infoNewUser.disabled = false;
                            self.infoNewUser.success = false;
                            self.validate.email.valid = true;
                        }
                    }
                );
            } else {
                this.validate.email.valid = false;
            }
        }



        /**
        * _openSignUpModal
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */
        private _openSignUpModal(): void {
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

            event.preventDefault();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.landingPage')
        .controller(LandingPageController.controllerId, LandingPageController);

}
