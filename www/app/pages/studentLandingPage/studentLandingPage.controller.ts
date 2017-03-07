/**
 * StudentLandingPageController
 * @description - Student Landing Page Controller
 */

module app.pages.studentLandingPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IStudentLandingPageController {
        form: IStudentLandingForm;
        error: IStudentLandingError;
        activate: () => void;
    }

    export interface IStudentLandingScope extends angular.IScope {

    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface IStudentLandingForm {
        userData: IUserDataStudentLanding;
        language: string;
    }

    export interface IUserDataStudentLanding {
        name: string;
        comment: string;
        email: string;
    }

    export interface IStudentLandingError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class StudentLandingPageController implements IStudentLandingPageController {

        static controllerId = 'mainApp.pages.studentLandingPage.StudentLandingPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IStudentLandingForm;
        error: IStudentLandingError;
        success: boolean;
        sending: boolean;
        addComment: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$state',
                                 'mainApp.core.util.FunctionsUtilService',
                                 'mainApp.pages.studentLandingPage.StudentLandingPageService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private StudentLandingPageService: app.pages.studentLandingPage.IStudentLandingPageService) {

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
                language: this.functionsUtil.getCurrentLanguage() || 'en'
            };

            this.success = false;

            this.sending = false;

            this.error = {
                message: ''
            };

            this.addComment = false;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('studentLandingPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        changeLanguage(): void {
             this.functionsUtil.changeLanguage(this.form.language);
        }

        goToEarlyAccessForm(): void {
            // Scroll to a certain element
            document.querySelector('.studentLandingPage__early-access-block').scrollIntoView({ behavior: 'smooth' });
        }

        goDown(): void {
            // Scroll to a certain element
            document.querySelector('.studentLandingPage__title-block').scrollIntoView({ behavior: 'smooth' });
        }

        showCommentsTextarea(): void {
            event.preventDefault();
            this.addComment = true;
        }

        createEarlyAdopter(): void {
            // VARIABLES
            let self = this;

            this.sending = true;

            //TODO: Validate If email is not null
            let userData = {
                name: this.form.userData.name || '*',
                email: this.form.userData.email,
                comment: this.form.userData.comment || '*'
            };

            this.StudentLandingPageService.createEarlyAdopter(userData).then(
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
        .module('mainApp.pages.studentLandingPage')
        .controller(StudentLandingPageController.controllerId, StudentLandingPageController);

}
