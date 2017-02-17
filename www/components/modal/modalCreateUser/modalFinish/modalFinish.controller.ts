/**
 * ModalFinishController
 * @description - modal welcome after the user signed up in Waysily
 * @constructor
 */

module components.modal.modalFinish {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalFinishController {
        close: () => void;
        activate: () => void;
    }

    class ModalFinishController implements IModalFinishController {

        static controllerId = 'mainApp.components.modal.ModalFinishController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataConfig',
            '$uibModal'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('modalFinish controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalFinishController.controllerId,
                    ModalFinishController);

}
