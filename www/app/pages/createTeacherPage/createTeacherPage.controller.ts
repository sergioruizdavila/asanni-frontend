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
        dateSplitted: ITeacherBirthdateForm;
    }

    interface ITeacherBirthdateForm {
        day: string;
        month: app.core.interfaces.IDataFromJsonI18n;
        year: string;
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
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<number>;
        listYears: Array<number>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.models.teacher.TeacherService',
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
            private teacherService: app.models.teacher.ITeacherService,
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
                teacherData: new app.models.teacher.Teacher(),
                dateSplitted: {day:'', month: {value:'', code: ''}, year: ''}
            };

            this.listMonths = this.getDataFromJson.getMonthi18n();
            this.listDays = this.functionsUtilService.generateRangesOfNumbers(1, 31);
            this.listYears = this.functionsUtilService.generateRangesOfNumbers(1916, 1998);

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

        goToNext(): void {
            //CONSTANTS
            const BASIC_INFO_STATE = 'page.createTeacherPage.basicInfo';
            const STEP2_STATE = 'page.createTeacherPage.step2';
            const STEP3_STATE = 'page.createTeacherPage.step3';
            /*********************************/

            //VARIABLES
            let currentState = this.$state.current.name;

            let dateFormatted = this.functionsUtilService.joinDate(
                                    this.form.dateSplitted.day,
                                    this.form.dateSplitted.month.code,
                                    this.form.dateSplitted.year);

            this.form.teacherData.BirthDate = dateFormatted;


            // TODO: Analizar si es bueno que se llame el BE asyncronamente con
            // el cambio de pantalla. Que pasa si el server falla? se pierden esos
            // datos?.
            this.teacherService.createTeacher(this.form.teacherData)
            .then(
                function(response){
                    console.log('response');
                }
            );

            switch (currentState) {
                case BASIC_INFO_STATE:
                    this.$state.go('page.createTeacherPage.step2');
                    break;
                case STEP2_STATE:
                    this.$state.go('page.createTeacherPage.step3');
                    break;
                case STEP3_STATE:
                    //TODO: Hacer algo cuando este en el ultimo paso.
                    break;
            }
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(CreateTeacherPageController.controllerId,
                    CreateTeacherPageController);

}
