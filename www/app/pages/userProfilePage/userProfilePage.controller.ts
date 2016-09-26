/**
 * UserProfilePageController
 * @description - User Profile Page Controller
 */

module app.pages.userProfilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserProfilePageController {
        form: IUserProfileForm;
        error: IUserProfileError;
        activate: () => void;
    }

    export interface IUserProfileForm {
        username: string;
        email: string;
    }

    export interface IUserProfileError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserProfilePageController implements IUserProfilePageController {

        static controllerId = 'mainApp.pages.userProfilePage.UserProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserProfileForm;
        error: IUserProfileError;
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
            console.log('userProfilePage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/



    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userProfilePage')
        .controller(UserProfilePageController.controllerId, UserProfilePageController);

}
