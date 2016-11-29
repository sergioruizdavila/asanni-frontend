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
        dateSplitted: IBirthdateForm;
        locationCountry: app.core.interfaces.IDataFromJsonI18n;
    }

    interface IBirthdateForm {
        day: app.core.interfaces.ISelectListElement;
        month: app.core.interfaces.IDataFromJsonI18n;
        year: app.core.interfaces.ISelectListElement;
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
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.models.teacher.TeacherService',
            'mainApp.localStorageService',
            'dataConfig',
            '$state',
            '$filter',
            '$scope',
            '$rootScope',
            '$uibModal'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private teacherService: app.models.teacher.ITeacherService,
            private localStorage,
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ICreateTeacherScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
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
                dateSplitted: {day:{value:''}, month: {code:'', value:''}, year: {value:''}},
                locationCountry: {code: '', value: ''}
            };

            //build select lists
            this.listMonths = this.getDataFromJson.getMonthi18n();
            this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
            this.listCountries = this.getDataFromJson.getCountryi18n();

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('createTeacherPage controller actived');

            //Charge teacher data if teacher entity exist on DB
            this.fillFormWithTeacherData();
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

        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {
            //CONSTANTS
            const STEP1_STATE = 'page.createTeacherPage.basicInfo';
            const STEP2_STATE = 'page.createTeacherPage.location';
            const STEP3_STATE = 'page.createTeacherPage.step3';
            /*********************************/

            //VARIABLES
            let self = this;
            let currentState = this.$state.current.name;

            let dateFormatted = this.functionsUtilService.joinDate(
                                    this.form.dateSplitted.day.value,
                                    this.form.dateSplitted.month.code,
                                    this.form.dateSplitted.year.value);
            let countryCode = this.form.locationCountry.code;
            /*********************************/

            this.form.teacherData.BirthDate = dateFormatted;
            this.form.teacherData.CountryLocation = countryCode;

            if(this.$rootScope.teacher_id) {
                // UPDATE EXISTING TEACHER
                this.form.teacherData.Id = this.$rootScope.teacher_id;
                this.teacherService.updateTeacher(this.form.teacherData)
                .then(
                    function(response) {
                        if(response.id) {
                            //Save teacher id
                            self.$rootScope.teacher_id = response.id;
                            self.localStorage.setItem('waysily.teacher_id', response.id);

                        } else {
                            //error
                        }
                    }
                );
            } else {
                // CREATE NEW TEACHER
                this.teacherService.createTeacher(this.form.teacherData)
                .then(
                    function(response) {
                        if(response.id) {
                            //Save teacher id
                            self.$rootScope.teacher_id = response.id;
                            self.localStorage.setItem('waysily.teacher_id', response.id);

                        } else {
                            //error
                        }
                    }
                );
            }

            // GO TO NEXT STEP
            switch (currentState) {
                case STEP1_STATE:
                    this.$state.go(STEP2_STATE, {reload: true});
                    break;
                case STEP2_STATE:
                    this.$state.go(STEP3_STATE, {reload: true});
                    break;
                case STEP3_STATE:
                    //TODO: Hacer algo cuando este en el ultimo paso.
                    break;
            }
        }


        goToBack(): void {
            //CONSTANTS
            const STEP1_STATE = 'page.createTeacherPage.basicInfo';
            const STEP2_STATE = 'page.createTeacherPage.location';
            const STEP3_STATE = 'page.createTeacherPage.step3';
            /*********************************/

            // VARIABLES
            let currentState = this.$state.current.name;

            // GO TO NEXT STEP
            switch (currentState) {
                case STEP1_STATE:
                    break;
                case STEP2_STATE:
                    this.$state.go(STEP1_STATE, {reload: true});
                    break;
                case STEP3_STATE:
                    //TODO: Hacer algo cuando este en el ultimo paso.
                    this.$state.go(STEP2_STATE, {reload: true});
                    break;
            }
        }


        /**
        * fillFormWithTeacherData
        * @description - get teacher data from DB, and fill each field on form.
        * @function
        * @return void
        */
        fillFormWithTeacherData(): void {
            // VARIABLES
            let self = this;

            this.$rootScope.teacher_id = this.localStorage.getItem('waysily.teacher_id');

            if(this.$rootScope.teacher_id) {
                // GET TEACHER DATA
                this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                .then(
                    function(response) {
                        if(response.id) {
                            //Build birthdate (Charge on select List)
                            let date = self.functionsUtilService.splitDate(response.birthDate);
                            self.form.dateSplitted.day.value = parseInt(date.day);
                            self.form.dateSplitted.month.code = date.month;
                            self.form.dateSplitted.year.value = parseInt(date.year);
                            //Charge Country on select List
                            self.form.locationCountry.code = response.countryLocation;
                            //Fill form fields with teacher data
                            self.form.teacherData = new app.models.teacher.Teacher(response);

                        } else {
                            //error
                        }
                    }
                );
            }
        }


    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(CreateTeacherPageController.controllerId,
                    CreateTeacherPageController);

}
