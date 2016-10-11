/**
 * MeetingConfirmationPageController
 * @description - Meeting Confirmation Page Controller
 */

module app.pages.meetingConfirmationPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMeetingConfirmationPageController {
        form: IMeetingConfirmationForm;
        error: IMeetingConfirmationError;
        activate: () => void;
    }

    export interface IMeetingConfirmationScope extends angular.IScope {

    }

    export interface IMeetingConfirmationForm {
        username: string;
        email: string;
    }

    export interface IMeetingConfirmationError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MeetingConfirmationPageController implements IMeetingConfirmationPageController {

        static controllerId = 'mainApp.pages.meetingConfirmationPage.MeetingConfirmationPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IMeetingConfirmationForm;
        error: IMeetingConfirmationError;
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
            private $scope: IMeetingConfirmationScope) {

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

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('meetingConfirmationPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.meetingConfirmationPage')
        .controller(MeetingConfirmationPageController.controllerId,
                    MeetingConfirmationPageController);

}
