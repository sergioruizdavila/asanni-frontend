/**
 * userEditAgendaPageController
 * @description - User Edit Agenda Page Controller
 */

module app.pages.userEditAgendaPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserEditAgendaPageController {
        form: IUserEditAgendaForm;
        error: IUserEditAgendaError;
        activate: () => void;
        goToEditProfile: () => void;
        goToEditMedia: () => void;
    }

    export interface IUserEditAgendaForm {
        username: string;
        email: string;
    }

    export interface IUserEditAgendaError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserEditAgendaPageController implements IUserEditAgendaPageController {

        static controllerId = 'mainApp.pages.userEditAgendaPage.UserEditAgendaPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserEditAgendaForm;
        error: IUserEditAgendaError;
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
            console.log('userEditAgendaPage controller actived');
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
            this.$state.go('page.userEditProfilePage');
        }


        /*
        * Go to edit media page
        * @description this method is launched when user press 'Edit Media'
        * menu option
        */
        goToEditMedia(): void {
            this.$state.go('page.userEditMediaPage');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userEditAgendaPage')
        .controller(UserEditAgendaPageController.controllerId, UserEditAgendaPageController);

}
