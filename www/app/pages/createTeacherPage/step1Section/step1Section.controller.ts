/**
 * Step1SectionController
 * @description - Step1 Section Controller
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IStep1SectionController {
        form: IStep1SectionForm;
        error: IStep1SectionError;
        activate: () => void;
    }

    interface IStep1SectionScope extends angular.IScope {

    }

    interface IStep1SectionForm {
    }

    interface IStep1SectionError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class Step1SectionController implements IStep1SectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.Step1SectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IStep1SectionForm;
        error: IStep1SectionError;
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
            private $scope: IStep1SectionScope,
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
            console.log('step 1 section controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        nextStep(): void {
            this.$state.go('page.createTeacherPage.step2');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(Step1SectionController.controllerId,
                    Step1SectionController);

}
