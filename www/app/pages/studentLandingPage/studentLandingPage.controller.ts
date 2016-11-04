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
        username: string;
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
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$state'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init form
            this.form = {
                username: '',
                email: ''
            };

            this.error = {
                message: ''
            };

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


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.studentLandingPage')
        .controller(StudentLandingPageController.controllerId, StudentLandingPageController);

}
