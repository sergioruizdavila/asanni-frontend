/**
 * ModalRecommendTeacherController
 * @description - modal Teacher's Certificate controller definition, generic modal in order
 * to show add new teacher's certificate form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalRecommendTeacher {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalRecommendTeacherController {
        close: () => void;
        activate: () => void;
    }

    interface IModalRecommendTeacherScope extends ng.IScope {

    }

    interface IDataSet {
        certificate: app.models.teacher.Certificate;
        teacherId: string;
    }


    class ModalRecommendTeacherController implements IModalRecommendTeacherController {

        static controllerId = 'mainApp.components.modal.ModalRecommendTeacherController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        certificate: app.models.teacher.Certificate;
        listReceivedYears: Array<app.core.interfaces.ISelectListElement>;
        receivedYearObject: app.core.interfaces.ISelectListElement;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.models.teacher.TeacherService',
            '$timeout',
            '$filter'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private $timeout: angular.ITimeoutService,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalRecommendTeacher controller actived');
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
        .controller(ModalRecommendTeacherController.controllerId,
                    ModalRecommendTeacherController);

}
