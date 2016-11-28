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
        teacherData: app.models.teacher.Teacher;
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
        listMonths: Array<string>;
        listDays: Array<number>;
        listYears: Array<number>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'dataConfig',
            '$state',
            '$filter',
            '$scope',
            '$uibModal'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ICreateTeacherScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            const START_DAY = 1;
            const FINAL_DAY = 31;
            const START_YEAR = 1916;
            const FINAL_YEAR = 1998;
            /*********************************/

            //Init form
            this.form = {
                teacherData: new app.models.teacher.Teacher()
            };

            this.listMonths = this.getDataFromJson.getMonthi18n();
            this.listDays = this.functionsUtilService.generateRangesOfNumbers(1, 31);
            this.listYears = this.functionsUtilService.generateRangesOfNumbers(1916, 1998);

            this.step = 1;

            this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html';

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
                    this.stepTemplate = 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html';
                    break;
                case 2:
                    this.stepTemplate =  'app/pages/createTeacherPage/teacherInfoSection/step2Section.html';
                    break;
                case 3:
                    this.stepTemplate =  'app/pages/createTeacherPage/teacherInfoSection/step3Section.html';
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
