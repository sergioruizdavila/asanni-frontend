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
        progressWidth: string;
        titleSection: string;
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        STEP1_STATE: string;
        STEP2_STATE: string;
        STEP3_STATE: string;
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
            this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.STEP3_STATE = 'page.createTeacherPage.step3';
            /*********************************/

            //Get current state
            let currentState = this.$state.current.name;

            //Put title section and progress bar width
            switch (currentState) {
                case this.STEP1_STATE:
                    this.titleSection = 'Step1: Basic Information';
                    this.progress(1);
                    break;
                case this.STEP2_STATE:
                    this.titleSection = 'Step2: Where are you located?';
                    this.progress(2);
                    break;
                case this.STEP3_STATE:
                    this.progress(3);
                    break;
            }

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
            //VARIABLES
            let self = this;

            //LOG
            console.log('createTeacherPage controller actived');

            //Charge teacher data if teacher entity exist on DB
            this.fillFormWithTeacherData();
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * progress
        * @description - increase or reduce progress bar width
        * @param {number} step - number of step
        * @function
        * @return void
        */
        progress(step: number): void {
            // CONSTANTS
            // quantity of steps + 1 (final page with success message)
            let STEPS = 9;
            /***********************/

            let percent = (100 / STEPS) * (step);
            this.progressWidth = percent + '%';
        }

        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {

            //VARIABLES
            let self = this;

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

            //Get current state
            let currentState = this.$state.current.name;

            // GO TO NEXT STEP
            switch (currentState) {
                case this.STEP1_STATE:
                    this.titleSection = 'Step1: Basic Information';
                    this.progress(2);
                    this.$state.go(this.STEP2_STATE, {reload: true});
                    break;
                case this.STEP2_STATE:
                    this.titleSection = 'Step2: Where are you located?';
                    this.progress(3);
                    this.$state.go(this.STEP3_STATE, {reload: true});
                    break;
                case this.STEP3_STATE:
                    break;
            }
        }



        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            //Get current state
            let currentState = this.$state.current.name;

            // GO TO BACK STEP
            switch (currentState) {
                case this.STEP1_STATE:
                    //Nothing to do
                    break;
                case this.STEP2_STATE:
                    this.progress(1);
                    this.$state.go(this.STEP1_STATE, {reload: true});
                    break;
                case this.STEP3_STATE:
                    this.progress(2);
                    this.$state.go(this.STEP2_STATE, {reload: true});
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
