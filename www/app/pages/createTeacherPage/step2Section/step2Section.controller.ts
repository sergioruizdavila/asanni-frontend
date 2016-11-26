/**
 * Step2SectionController
 * @description - Step2 Section Controller
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IStep2SectionController {
        form: IStep2SectionForm;
        error: IStep2SectionError;
        activate: () => void;
    }

    interface IStep2SectionScope extends angular.IScope {

    }

    interface IStep2SectionForm {
    }

    interface IStep2SectionError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class Step2SectionController implements IStep2SectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.Step2SectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IStep2SectionForm;
        error: IStep2SectionError;
        step: number;
        stepTemplate: string;
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
            private $scope: IStep2SectionScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

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

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('step 2 section controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        nextStep(): void {
            this.$state.go('page.createTeacherPage.step3');
        }

        backStep(): void {
            this.$state.go('page.createTeacherPage.step1');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(Step2SectionController.controllerId,
                    Step2SectionController);

}
