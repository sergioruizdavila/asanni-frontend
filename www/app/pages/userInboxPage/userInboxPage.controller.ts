/**
 * UserInboxPageController
 * @description - User Inbox Page Controller
 */

module app.pages.userInboxPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IUserInboxPageController {
        form: IUserInboxForm;
        error: IUserInboxError;
        activate: () => void;
    }

    interface IUserInboxScope extends angular.IScope {

    }

    interface IUserInboxForm {

    }

    interface IUserInboxError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class UserInboxPageController implements IUserInboxPageController {

        static controllerId = 'mainApp.pages.userInboxPage.UserInboxPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserInboxForm;
        error: IUserInboxError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    private $scope: IUserInboxScope) {

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
            console.log('userInboxPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        goToDetail(): void {
            this.$state.go('page.userInboxDetailsPage');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userInboxPage')
        .controller(UserInboxPageController.controllerId,
                    UserInboxPageController);

}
