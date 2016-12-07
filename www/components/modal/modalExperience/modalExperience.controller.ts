/**
 * ModalExperienceController
 * @description - modal Contact controller definition, generic modal in order
 * to show add new meeting point form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalExperience {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalExperienceController {
        close: () => void;
        activate: () => void;
    }

    interface IModalExperienceScope extends ng.IScope {

    }

    interface IModalExperienceForm {
        experience: app.models.teacher.Experience;
    }


    interface IModalExperienceError {
        message: string;
    }

    interface IDataSet {
        experience: app.models.teacher.Experience;
    }


    class ModalExperienceController implements IModalExperienceController {

        static controllerId = 'mainApp.components.modal.ModalExperienceController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalExperienceForm;
        error: IModalExperienceError;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataSetModal',
            '$timeout'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataSetModal: IDataSet,
            private $timeout: angular.ITimeoutService ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Init form
            this.form = {
                experience: this.dataSetModal.experience || new app.models.teacher.Experience()
            };

            // Charge Form with experience data
            /*this.$timeout(function(){
                self._buildExperienceChecked();
            });*/


            this.error = {
                message: ''
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalExperience controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _save
        * @description - when user click "Save" button, close the modal and
        * send the new experience data
        * @use - this.save();
        * @function
        * @return {void}
        */
        private _save(): void {
            this.$uibModalInstance.close(this.form.experience);
        }



        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
            event.preventDefault();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalExperienceController.controllerId,
                    ModalExperienceController);

}
