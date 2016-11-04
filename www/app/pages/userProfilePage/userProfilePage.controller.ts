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

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
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
        data: app.models.user.User;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.user.UserService',
            '$state',
            '$stateParams',
            '$filter',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private UserService: app.models.user.IUserService,
            private $state: ng.ui.IStateService,
            private $stateParams: IParams,
            private $filter: angular.IFilterService,
            private $scope: IUserProfileScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init user data
            this.data = null;

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
            //VARIABLES
            let self = this;
            //LOG
            console.log('userProfilePage controller actived');
            // Get User information
            this.UserService.getUserById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.user.Student(response);
                }
            );
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
