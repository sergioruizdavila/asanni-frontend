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

    export interface IUserEditAgendaScope extends angular.IScope {
        calendarConfig: any;
        eventSources: any;
        events: any;
        changeView: any;
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
            '$scope',
            'uiCalendarConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: IUserEditAgendaScope,
            private uiCalendarConfig) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            let self = this;

            //Init form
            this.form = {
                username: '',
                email: ''
            };

            this.error = {
                message: ''
            };

            //Calendar Config
            this.$scope.calendarConfig = {
                calendar: {
                    editable: true,
                    header: {
                     left: 'prev',
                     center: 'title',
                     right: 'month, agendaDay, next'
                    },
                    slotDuration: '01:00:00',
                    slotLabelFormat: 'h(:mm) a',
                    navLinks: true,
                    allDaySlot: false,
                    events: [
     				    {
                            title: 'Rosa',
                            start: '2016-10-12T17:00:00',
                            end: '2016-10-12T18:00:00',
                            editable: false
                        },
                        {
                            title: 'Carlos',
                            start: '2016-10-20T20:00:00',
                            end: '2016-10-20T21:00:00',
                            editable: false
                        },
                        {
                            title: 'Michaelson',
                            start: '2016-10-23T07:00:00',
                            end: '2016-10-23T08:00:00',
                            editable: false
                        }
                    ],
                    timeFormat: 'h:mm a',
                    buttonText: {
                        month: 'view calendar'
                    }
                }
            };

            /* Change View */
            this.$scope.changeView = function(view,calendar) {
              self.uiCalendarConfig.calendars['userAgenda'].fullCalendar('changeView','agendaDay');
            };


            //Agenda sources
            this.$scope.eventSources = [];

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
