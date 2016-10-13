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

    export interface IUserProfileScope extends angular.IScope {
        date: any;
        datetimepickerConfig: any;
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
        mapConfig: components.map.IMapConfig;
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
            private $scope: IUserProfileScope) {

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

            // init map config
            this.mapConfig = {
                type: 'location-map'
            };


            this.$scope.date;

            //date time picker Config
            this.$scope.datetimepickerConfig = {
                minView: 'hour',
                dropdownSelector: '.my-toggle-select'
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

        onTimeSet (newDate, oldDate): void {
            console.log(newDate);
            console.log(oldDate);
        }

        beforeRender ($view, $dates, $leftDate, $upDate, $rightDate): void {
            var index = Math.floor(Math.random() * $dates.length);
            $dates[index].selectable = false;
        }

        goToConfirm (): void {
            //TODO: Buscar la forma de poder recargar la pagina cuando sea
            // necesario ya que muchas veces voy a tener que limpiar todo
            this.$state.go('page.meetingConfirmationPage');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userProfilePage')
        .controller(UserProfilePageController.controllerId, UserProfilePageController);

}
