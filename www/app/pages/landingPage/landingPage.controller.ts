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

    interface ICountryQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.country.Country>;
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
        private _slideout: boolean;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        private _countryContainers: Array<app.models.country.Country>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$scope',
                                 '$state',
                                 '$stateParams',
                                 '$filter',
                                 'dataConfig',
                                 '$uibModal',
                                 'mainApp.auth.AuthService',
                                 'mainApp.core.util.messageUtilService',
                                 'mainApp.core.util.FunctionsUtilService',
                                 'mainApp.pages.landingPage.LandingPageService',
                                 'mainApp.models.feedback.FeedbackService',
                                 'mainApp.core.util.GetDataStaticJsonService',
                                 'mainApp.models.country.CountryService',
                                 '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: angular.IScope,
            private $state: ng.ui.IStateService,
            private $stateParams: IParams,
            private $filter: angular.IFilterService,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private AuthService: app.auth.IAuthService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private LandingPageService: app.pages.landingPage.ILandingPageService,
            private FeedbackService: app.models.feedback.IFeedbackService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private countryService: app.models.country.ICountryService,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

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

            //Hide left menu
            this._slideout = false;

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
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Main Landing Page';
            //VARIABLES
            let self = this;
            //LOG
            DEBUG && console.log('landingPage controller actived');

            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            //Change language on puv text
            this._changeLanguageText();

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

            // Build country containers list
            this._buildCountryContainers();

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * slideNavMenu method
        * @description - Show or Hide Nav Menu when user press 'menu' button
        * (small devices)
        */

        slideNavMenu(): void {
            this._slideout = !this._slideout;
        }



        /**
        * _changeLanguageText
        * @description - change language text dynamically (on PUV)
        * @use - this._changeLanguageText();
        * @function
        * @return {void}
        */

        _changeLanguageText(): void {
           let languages = [
              this.$filter('translate')('%landing.puv.option_1.text'),
              this.$filter('translate')('%landing.puv.option_2.text'),
              this.$filter('translate')('%landing.puv.option_3.text'),
              this.$filter('translate')('%landing.puv.option_4.text'),
              this.$filter('translate')('%landing.puv.option_5.text'),
              this.$filter('translate')('%landing.puv.option_6.text'),
              this.$filter('translate')('%landing.puv.option_7.text'),
              this.$filter('translate')('%landing.puv.option_8.text'),
              this.$filter('translate')('%landing.puv.option_9.text')
           ];

           let language = [];
           let el;
           let $textChange = $('.text_change');
           let $container = $('#container');

           // init static
           $textChange.text(languages[0]);

           // create measurables
           for (var i = 0; i < languages.length; i++) {
              el = $('<div class="measurable">' + languages[i] + '</div>');
              $container.append(el);
              language.push(el.width());
           }

           // absolutize //
           let positions = [];
           $('#container > span').each(function() {
              positions.push($(this).position());
           });
           $('#container > span').each(function() {
              var pos = positions.shift();
              $(this).css({
                 position: 'absolute',
                 left: pos.left,
                 top: pos.top
              });
           });

           // remember initial sizes
           let textInitialWidth = $textChange.width();

           // loop the loop //
           let activeWordsIndex = 0;
           let interval = 4000;
           setInterval(function() {
              activeWordsIndex++;
              var languageIndex = activeWordsIndex % languages.length;

              $textChange.text(languages[languageIndex]);

              var languageLineOffset = (language[languageIndex] - textInitialWidth) / 2;

              $('.static.second').css({
                 transform: 'translateX(' + (-languageLineOffset) + 'px)'
              });

              $textChange.css({
                 transition: 'none',
                 transform: 'translate(' + (-languageLineOffset) + 'px, 30px)',
                 opacity: '0'
              });
              setTimeout(function() {
                 $textChange.css({
                    transition: 'all 1s ease',
                    transform: 'translate(' + (-languageLineOffset) + 'px, 0px)',
                    opacity: '1'
                 });
              }, 50);
           }, 4000);

        }



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
        * goToSearch
        * @description - go to search page
        * @function
        * @param {string} target - Section user clicked
        * @return {void}
        */
        goToSearch(target: string): void {
            //CONSTANTS
            const SEARCH_PAGE_STATE = 'page.searchPage';
            let GOTO_MIXPANEL = 'Go to Search from: ' + target + ' btn';
            /************************/

            //TODO: TEST - Remover despues de probar el link: 'Ayudame a encontrar'
            if(target == 'teacher') {
                GOTO_MIXPANEL = 'AYUDAME A TOMAR UNA DECISION';
            }

            //MIXPANEL
            mixpanel.track(GOTO_MIXPANEL);

            this.$state.go(SEARCH_PAGE_STATE, {target: target}, {reload: true});
        }



        /**
        * _buildCountryContainers
        * @description - Get Country list in order to build each country container
        * calling country service
        */

        private  _buildCountryContainers(): void {
            //VARIABLES
            let self = this;

            this.countryService.getAllCountries().then(
                function(response: ICountryQueryObject) {
                    self._countryContainers = response.results;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error landingPage.controller.js method: _buildCountryContainers';
                    Raven.captureMessage(ERROR_MESSAGE, error);
                }
            );
        }



        /**
        * goToCountryDetails
        * @description - when user clicked a specific country container, go to
        * details
        * @use - this.goToCountryDetails('new-zealand');
        * @function
        * @param {string} aliasCountry - entity aliasCountry (country)
        * @return {void}
        */

        goToCountryDetails(aliasCountry: string): void {
            const GOTO_MIXPANEL = 'Go to Country Details: ' + aliasCountry;
            /************************/

            //MIXPANEL
            mixpanel.track(GOTO_MIXPANEL);

            var url = this.$state.href('page.countryProfilePage', {aliasCountry: aliasCountry});
            window.open(url);

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
            const ENTER_MIXPANEL = 'Click: Send Country Feedback';
            const FEEDBACK_SUCCESS_MESSAGE = '¡Gracias por tu recomendación!. La revisaremos y pondremos manos a la obra.';
            /***************************************************/

            //VARIABLES
            let self = this;
            this.form.feedback.NextCountry = this.countryObject.code;

            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

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
        * _recommendTeacher
        * @description - user could recommend a known teacher
        * @use - this._recommendTeacher();
        * @function
        * @return {void}
        */

        _recommendTeacher(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Recommend Teacher';
            //VARIABLES
            let url = 'https://waysily.typeform.com/to/iAWFeg';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            window.open(url,'_blank');
        }



        /**
        * _recommendSchool
        * @description - user could recommend a known school
        * @use - this._recommendTeacher();
        * @function
        * @return {void}
        */

        _recommendSchool(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Recommend School';
            //VARIABLES
            let url = 'https://form.jotform.co/71480400807854';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

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
            const NEW_MIXPANEL = 'New Early Adopter data';
            /***************************************************/

            // VARIABLES
            let self = this;

            //Validate Email field
            let email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
            this.validate.email = this.functionsUtil.validator(this.form.userData.email, email_rules);

            if(this.validate.email.valid) {
                this.infoNewUser.sending = true;

                mixpanel.track(NEW_MIXPANEL, {
                    "name": this.form.userData.name || '*',
                    "email": this.form.userData.email,
                    "comment": this.form.userData.comment || '*'
                });

                let userData = {
                    uid: app.core.util.functionsUtil.FunctionsUtilService.generateGuid(),
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
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click on Sign up: main landing page';
            //VARIABLES
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

            mixpanel.track(CLICK_MIXPANEL);
        }



        /**
        * _openLogInModal
        * @description - open Modal in order to Log in action
        * @use - this._openLogInModal();
        * @function
        * @return {void}
        */
        private _openLogInModal(): void {
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
