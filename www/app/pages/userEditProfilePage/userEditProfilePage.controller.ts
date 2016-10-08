/**
 * UserEditProfilePageController
 * @description - User Edit Profile Page Controller
 */

module app.pages.userEditProfilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserEditProfilePageController {
        form: IUserEditProfileForm;
        error: IUserEditProfileError;
        activate: () => void;
        goToEditMedia: () => void;
        goToEditAgenda: () => void;
    }

    export interface IUserEditProfileForm {
        username: string;
        email: string;
    }

    export interface IUserEditProfileError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserEditProfilePageController implements IUserEditProfilePageController {

        static controllerId = 'mainApp.pages.userEditProfilePage.UserEditProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserEditProfileForm;
        error: IUserEditProfileError;
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
            console.log('userEditProfilePage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Go to edit media page
        * @description this method is launched when user press 'Edit Photo' menu
        * option
        */
        goToEditMedia(): void {
            // Go to next page on calls stack
            this.$state.go('page.userEditMediaPage');
        }


        /*
        * Go to edit agenda page
        * @description this method is launched when user press 'Edit Agenda' menu
        * option
        */
        goToEditAgenda(): void {
            this.$state.go('page.userEditAgendaPage');
        }
    


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userEditProfilePage')
        .controller(UserEditProfilePageController.controllerId, UserEditProfilePageController);

}
