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

    interface IMeetingConfirmationScope extends angular.IScope {

    }

    interface IMeetingConfirmationForm {
        helloText: string;
        meetingPoint: IMeetingPoint;
    }

    interface IMeetingConfirmationError {
        message: string;
    }

    export interface IMeetingPoint {
        name: string;
        category: string;
        address: string;
        prices: IPrice;
        position: components.map.IPosition;
    }

    export interface IPrice {
        min: number;
        max: number;
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
        processCompleted: boolean;
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
                helloText: '',
                meetingPoint: {
                    name: 'Escoge un punto de encuentro',
                    category: '',
                    address: '',
                    prices: {min:0, max:0},
                    position: {lat: null, lng: null}
                }
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
                backdrop: 'static',
                keyboard: false,
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


        chooseMeetingPoint(): void {
            /*TODO: Aqui deberiamos:
                1. Tomar el punto escogido, y reemplazarlo con el
                    texto que dice: Escoge punto de encuentro. */

            //Build Meeting Point Model
            // e.g. this.meetingPoint = new meetingPoint(this.form.meetingPoint);
            var meetingPoint = {
                name: 'Café Vervlet',
                category: 'Café',
                address: 'Trans 33 Sur',
                prices: {min:23000, max:30000},
                position: {lat: 6.1739743,lng: -75.5822414}
            };

            this.form.meetingPoint = meetingPoint;

            /*
                2. Validar si el usuario ya lleno el textarea de: Say Hello.
                3. Deberia ocultar todo el bloque izquierdo, dandole
                   protagonismo al bloque derecho, habilitando el
                   botón: Send Request.
                4. El texto del textarea: Decir hola!, deberia aparecer
                   debajo del punto de encuentro, con la opción de poder
                   editarlo, cuando presione de nuevo ahi, apareceria el
                   bloque izquierdo (igualmente al dar clicn en el punto de
                   encuentro).
            */
            if(this.form.helloText != '' &&
               this.form.meetingPoint.position.lat != null &&
               this.form.meetingPoint.position.lng != null) {

                this.processCompleted = true;

            }

        }

        saveMessage (): void {
            if(this.form.helloText != '' &&
               this.form.meetingPoint.position.lat != null &&
               this.form.meetingPoint.position.lng != null) {

                this.processCompleted = true;

            }
        }

        edit(): void {
            this.processCompleted = false;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.meetingConfirmationPage')
        .controller(MeetingConfirmationPageController.controllerId,
                    MeetingConfirmationPageController);

}
