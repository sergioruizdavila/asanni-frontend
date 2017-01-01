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
    }

    export interface IUserData {
        name: string;
        email: string;
        comment: string;
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
        success: boolean;
        sending: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$state',
                                 '$translate',
                                 'mainApp.pages.landingPage.LandingPageService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $translate: angular.translate.ITranslateService,
            private LandingPageService: app.pages.landingPage.ILandingPageService) {

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
                language: 'en'
            };

            this.success = false;

            this.sending = false;

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
        changeLanguage(): void {
             this.$translate.use(this.form.language);
        }

        goToEarlyAccessForm(): void {
            // Scroll to a certain element
            document.querySelector('.landingPage__early-access-block').scrollIntoView({ behavior: 'smooth' });
        }

        goDown(): void {
            // Scroll to a certain element
            document.querySelector('.landingPage__title-block').scrollIntoView({ behavior: 'smooth' });
        }

        createEarlyAdopter(): void {
            // VARIABLES
            let self = this;

            this.sending = true;

            mixpanel.track("Click on Notify button", {
                "name": this.form.userData.name || '*',
                "email": this.form.userData.email,
                "comment": this.form.userData.comment || '*'
            });

            //TODO: Validate If email is not null
            let userData = {
                name: this.form.userData.name || '*',
                email: this.form.userData.email,
                comment: this.form.userData.comment || '*'
            };
            this.LandingPageService.createEarlyAdopter(userData).then(
                function(response) {
                    if(response.createdAt) {
                        self.success = true;
                    } else {
                        self.sending = false;
                    }
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.landingPage')
        .controller(LandingPageController.controllerId, LandingPageController);

}
