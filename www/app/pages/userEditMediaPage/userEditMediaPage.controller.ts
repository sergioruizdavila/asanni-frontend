/**
 * userEditMediaPageController
 * @description - User Edit Medi Page Controller
 */

module app.pages.userEditMediaPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserEditMediaPageController {
        form: IUserEditMediaForm;
        error: IUserEditMediaError;
        activate: () => void;
        goToEditProfile: () => void;
        goToEditAgenda: () => void;
    }

    export interface IUserEditMediaForm {
        username: string;
        email: string;
    }

    export interface IUserEditMediaError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserEditMediaPageController implements IUserEditMediaPageController {

        static controllerId = 'mainApp.pages.userEditMediaPage.UserEditMediaPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserEditMediaForm;
        error: IUserEditMediaError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$filter',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope) {

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
            //LOG
            console.log('userEditMediaPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Go to edit profile page
        * @description this method is launched when user press 'Edit Profile'
        * menu option
        */
        goToEditProfile(): void {
            // Go to next page on calls stack
            this.$state.go('page.userEditProfilePage');
        }


        /*
        * Go to edit agenda page
        * @description this method is launched when user press 'Edit Agenda'
        * menu option
        */
        goToEditAgenda(): void {
            // Go to next page on calls stack
            //this.$state.go('page.userEditMediaPage');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userEditMediaPage')
        .controller(UserEditMediaPageController.controllerId, UserEditMediaPageController);

}
