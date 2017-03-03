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
        showLogin: boolean;
    }

    export interface ILandingForm {
        userData: IUserDataLanding;
        language: string;
        feedback: app.models.feedback.Feedback;
    }

    export interface IUserDataLanding {
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
        isAuthenticated: boolean;
        isTeacher: boolean;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$scope',
                                 '$state',
                                 '$stateParams',
                                 'dataConfig',
                                 '$uibModal',
                                 'mainApp.auth.AuthService',
                                 'mainApp.core.util.messageUtilService',
                                 'mainApp.core.util.FunctionsUtilService',
                                 'mainApp.pages.landingPage.LandingPageService',
                                 'mainApp.models.feedback.FeedbackService',
                                 'mainApp.core.util.GetDataStaticJsonService',
                                 '$rootScope',
                                 'mainApp.localStorageService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: angular.IScope,
            private $state: ng.ui.IStateService,
            private $stateParams: IParams,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private AuthService: app.auth.IAuthService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private LandingPageService: app.pages.landingPage.ILandingPageService,
            private FeedbackService: app.models.feedback.IFeedbackService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private localStorage) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

            //Validate if user is teacher
            if(this.$rootScope.profileData) {
                this.isTeacher = this.$rootScope.profileData.IsTeacher;
            }

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

            //MIXPANEL
            mixpanel.track("Enter: Main Landing Page");

            //Validate if come from recommendation email
            if(this.$stateParams.id) {

                // modal default options
                let options: ng.ui.bootstrap.IModalSettings = {
                    animation: false,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: this.dataConfig.modalRecommendTeacherTmpl,
                    controller: 'mainApp.components.modal.ModalRecommendTeacherController as vm',
                    resolve: {
                        //one way to send data from this scope to modal
                        dataSetModal: function () {
                            return {
                                earlyId: self.$stateParams.id
                            }
                        }
                    }
                };

                // Open Teacher Recommendation Modal
                var modalInstance = this.$uibModal.open(options);
            }

            // Launch Login modal
            if(this.$stateParams.showLogin) {
                this._openLogInModal();
            }

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

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
             mixpanel.track("Change Language on landingPage");
        }



        /**
         * logout
         * @description - Log out current logged user (call AuthService to revoke token)
         * @use - this.logout();
         * @function
         * @return {void}
        */

        logout(): void {
            //VARIABLES
            let self = this;

            this.AuthService.logout().then(
                function(response) {
                    // Success
                    window.location.reload();
                },
                function(response) {
                    // Error
                    /* This can occur if connection to server is lost or server is down */
                    DEBUG && console.log('A problem occured while logging you out.');
                }
            );
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



        //TODO: Poner descripcion
        _recommendTeacher(): void {
            //VARIABLES
            let url = 'https://waysily.typeform.com/to/iAWFeg';

            //MIXPANEL
            mixpanel.track("Click on recommend teacher");
            window.open(url,'_blank');
        }



        //TODO: Poner descripcion
        _recommendSchool(): void {
            //VARIABLES
            let url = 'https://waysily.typeform.com/to/q5uT0P';

            //MIXPANEL
            mixpanel.track("Click on recommend school");
            window.open(url,'_blank');
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
        * @use - this._openSignUpModal();
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
                size:'sm',
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: false
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            mixpanel.track("Click on 'Join as Student' landing page header");
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
            mixpanel.track("Click on 'Log in' from landingPage");

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
                            hasNextStep: false
                        }
                    }
                }
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

        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Landing Page to Child's Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */
        private _subscribeToEvents(): void {
            // VARIABLES
            let self = this;

            /**
            * Is Authenticated event
            * @description - Parent (LandingPageController) receive Child's
                             event in order to know if user is authenticated
            * @event
            */
            this.$scope.$on('Is Authenticated', function(event, args) {
                //Validate if user is Authenticated
                self.isAuthenticated = self.AuthService.isAuthenticated();
                //Validate if user is teacher
                if(self.$rootScope.profileData) {
                    self.isTeacher = self.$rootScope.profileData.IsTeacher;
                }
            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.landingPage')
        .controller(LandingPageController.controllerId, LandingPageController);

}
