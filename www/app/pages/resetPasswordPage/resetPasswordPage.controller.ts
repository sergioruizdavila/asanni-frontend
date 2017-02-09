/**
 * ResetPasswordPageController
 * @description - Create Teacher Page Controller
 */

module app.pages.resetPasswordPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IResetPasswordPageController {
        form: IResetPasswordForm;
        error: IResetPasswordError;
        activate: () => void;
    }

    interface IResetPasswordScope extends angular.IScope {

    }

    interface IResetPasswordForm {
        newPassword1: string;
        newPassword2: string;
    }

    interface IResetPasswordError {
        message: string;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    interface IResetPasswordParams extends app.core.interfaces.IStateParamsData {
        uid: string;
        token: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class ResetPasswordPageController implements IResetPasswordPageController {

        static controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        uid: string;
        token: string;
        form: IResetPasswordForm;
        error: IResetPasswordError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$stateParams'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $stateParams: IResetPasswordParams
        ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            this.uid = this.$stateParams.uid;

            this.token = this.$stateParams.token;

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
            console.log('resetPasswordPage controller actived');

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.resetPasswordPage')
        .controller(ResetPasswordPageController.controllerId,
                    ResetPasswordPageController);

}
