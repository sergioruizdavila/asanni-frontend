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
        earlyId: string;
    }


    class ModalRecommendTeacherController implements IModalRecommendTeacherController {

        static controllerId = 'mainApp.components.modal.ModalRecommendTeacherController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        defaultConfig: any;
        rating: app.models.teacher.Rating;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataSetModal',
            'mainApp.localStorageService',
            'mainApp.models.student.StudentService',
            '$state',
            'dataConfig',
            '$timeout',
            '$filter',
            '$rootScope'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataSetModal: IDataSet,
            private localStorage,
            private StudentService: app.models.student.IStudentService,
            private $state: ng.ui.IStateService,
            private dataConfig,
            private $timeout: angular.ITimeoutService,
            private $filter: angular.IFilterService,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

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
            //VARIABLES
            let self = this;
            //LOG
            console.log('modalRecommendTeacher controller actived');

            //Get Early Adopter Recommendation Details
            this.StudentService.getRatingByEarlyid(this.dataSetModal.earlyId).then(
                function(response) {
                    if(response.id) {

                        self.rating = new app.models.teacher.Rating(response);

                    }
                }
            );
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        //TODO: Poner descripcion
        _join(): void {
            //CONSTANTS
            const CREATE_TEACHER = 'page.createTeacherPage.start';
            //MIXPANEL
            mixpanel.track("Click on join as a teacher from recommendation modal");
            //Save early id on localStorage to keep it while user navigate waysily
            this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
            this.$uibModalInstance.close();
            // GO TO NEXT STEP
            this.$state.go(CREATE_TEACHER, {reload: true});
        }

        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            //MIXPANEL
            mixpanel.track("Click on Close recommend teacher modal button");
            //Save early id on localStorage to keep it while user navigate waysily
            this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
            this.$rootScope.activeMessageBar = true;
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalRecommendTeacherController.controllerId,
                    ModalRecommendTeacherController);

}
