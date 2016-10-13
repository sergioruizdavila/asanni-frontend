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
            'dataConfig',
            '$state',
            '$filter',
            '$scope',
            '$uibModal'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: IMeetingConfirmationScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

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
        addNewMeetingPoint(): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                templateUrl: this.dataConfig.modalMeetingPointTmpl,
                controller: 'mainApp.components.modal.ModalMeetingPointController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            model: {test: 'data'}
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the new meeting point
            modalInstance.result.then(function (newMeetingPoint) {
                /* TODO: Mostrar aqui el nuevo punto en el mapa, la info en el
                        cuadro, habilitamos el boton: Send Request */
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });

            event.preventDefault();
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.meetingConfirmationPage')
        .controller(MeetingConfirmationPageController.controllerId,
                    MeetingConfirmationPageController);

}
