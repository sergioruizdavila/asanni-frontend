/**
 * ModalSurveyController
 * @description - modal Forgot Password controller definition, generic modal
 * in order to show user forgotPassword form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalSurvey {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalSurveyController {
        close: () => void;
        activate: () => void;
    }

    interface IModalSurveyScope extends ng.IScope {

    }

    interface IModalSurveyForm {
        option: string;
    }


    class ModalSurveyController implements IModalSurveyController {

        static controllerId = 'mainApp.components.modal.ModalSurveyController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalSurveyForm;
        sending: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            '$filter',
            '$uibModal',
            '$uibModalInstance',
            'dataConfig'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $filter: angular.IFilterService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            // Init sending loading
            this.sending = false;

            //Init form
            this.form = {
                option: ''
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Open Survey Modal';
            //LOG
            DEBUG && console.log('modalSurvey controller actived');
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);
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
        .controller(ModalSurveyController.controllerId,
                    ModalSurveyController);

}
