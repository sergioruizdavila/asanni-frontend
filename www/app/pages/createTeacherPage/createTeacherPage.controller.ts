/**
 * CreateTeacherPageController
 * @description - Create Teacher Page Controller
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICreateTeacherPageController {
        form: ICreateTeacherForm;
        error: ICreateTeacherError;
        activate: () => void;
    }

    interface ICreateTeacherScope extends angular.IScope {

    }

    interface ICreateTeacherForm {
    }

    interface ICreateTeacherError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CreateTeacherPageController implements ICreateTeacherPageController {

        static controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ICreateTeacherForm;
        error: ICreateTeacherError;
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
            private $scope: ICreateTeacherScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init form
            this.form = {

            };

            this.step = 1;

            this.stepTemplate = 'app/pages/createTeacherPage/step1Section/step1Section.html';

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('createTeacherPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        private _getStepTemplate(): void {
            switch (this.step) {
                case 1:
                    this.stepTemplate = 'app/pages/createTeacherPage/step1Section/step1Section.html';
                    break;
                case 2:
                    this.stepTemplate =  'app/pages/createTeacherPage/step1Section/step2Section.html';
                    break;
                case 3:
                    this.stepTemplate =  'app/pages/createTeacherPage/step1Section/step3Section.html';
                    break;
            }
        }

        /*
        * progress
        * @description take callsStack and figuring the progress on stack
        * in order to draw the progress bar on view.
        */
        progress(): Object {
            // VARIABLES
            //let callsStack = this.addBusinessDataConfig.action.callsStack;
            //let currentPos = this.addBusinessDataConfig.action.posOnCallsStack;
            //let percent = (100 / callsStack.length) * (currentPos + 1);
            //return {width: percent + '%'};
            return;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(CreateTeacherPageController.controllerId,
                    CreateTeacherPageController);

}
