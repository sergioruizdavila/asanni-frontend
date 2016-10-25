/**
 * UserInboxDetailsPageController
 * @description - User Inbox Details Page Controller
 */

module app.pages.userInboxDetailsPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IUserInboxDetailsPageController {
        form: IUserInboxDetailsForm;
        error: IUserInboxDetailsError;
        activate: () => void;
    }

    interface IUserInboxDetailsScope extends angular.IScope {

    }

    interface IUserInboxDetailsForm {

    }

    interface IUserInboxDetailsError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserInboxDetailsPageController implements IUserInboxDetailsPageController {

        static controllerId = 'mainApp.pages.userInboxDetailsPage.UserInboxDetailsPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserInboxDetailsForm;
        error: IUserInboxDetailsError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    private $scope: IUserInboxDetailsScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init form
            this.form = {};

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('userInboxDetailsPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userInboxDetailsPage')
        .controller(UserInboxDetailsPageController.controllerId,
                    UserInboxDetailsPageController);

}
