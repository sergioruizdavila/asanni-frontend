/**
 * ModalMeetingPointController
 * @description - modal Contact controller definition, generic modal in order
 * to show add new meeting point form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalMeetingPoint {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalMeetingPointController {
        close: () => void;
        activate: () => void;
    }

    interface IModalMeetingPointScope extends ng.IScope {

    }

    interface IModalMeetingPointForm {

    }


    interface IModalMeetingPointError {
        message: string;
    }

    interface IDataSet {
        //model: app.models.Tenant;
        model: any;
    }


    class ModalMeetingPointController implements IModalMeetingPointController {

        static controllerId = 'mainApp.components.modal.ModalMeetingPointController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalMeetingPointForm;
        error: IModalMeetingPointError;
        defaultConfig: any;
        mapConfigModal: components.map.IMapConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataSetModal'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataSetModal: IDataSet) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init form
            this.form = {
            };

            this.error = {
                message: ''
            };

            // init map config
            this.mapConfigModal = {
                type: 'modal-assign-marker-map'
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalMeetingPoint controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        close(): void {
            this.$uibModalInstance.close();
            event.preventDefault();
        }

    }

    angular.module('mainApp.components.modal')
        .controller(ModalMeetingPointController.controllerId,
                    ModalMeetingPointController);

}
