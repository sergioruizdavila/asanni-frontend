/**
 * TeacherInfoSectionController
 * @description - Teacher Info Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherInfoSectionController {
        form: ITeacherInfoForm;
        error: ITeacherInfoError;
        activate: () => void;
    }

    export interface ITeacherInfoScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    interface IBirthdateForm {
        day: app.core.interfaces.ISelectListElement;
        month: app.core.interfaces.IDataFromJsonI18n;
        year: app.core.interfaces.ISelectListElement;
    }

    export interface ITeacherInfoForm {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        sex: string;
        birthDate: string;
        born: string;
        about: string;
    }


    export interface ITeacherInfoError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherInfoSectionController implements ITeacherInfoSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherInfoSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherInfoForm;
        error: ITeacherInfoError;
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        dateObject: IBirthdateForm;
        STEP1_STATE: string;
        STEP2_STATE: string;
        STEP3_STATE: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$scope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $scope: ITeacherInfoScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.STEP3_STATE = 'page.createTeacherPage.map';
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.titleSection = 'Step1: Basic Information';
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);

            // Birthdate Select List Structure
            this.dateObject = {day:{value:''}, month: {code:'', value:''}, year: {value:''}};

            //Init form
            this.form = {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                sex: '',
                birthDate: '',
                born: '',
                about: ''
            };

            // Build Months, Days and Years select lists
            this.listMonths = this.getDataFromJson.getMonthi18n();
            this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherInfoSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {
            this._setDataModelFromForm();
            this.$scope.$emit('Save Data');
            // GO TO NEXT STEP
            this.$state.go(this.STEP2_STATE, {reload: true});

        }



        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(): void {
            //VARIABLES
            let dateFormatted = this.functionsUtilService.joinDate(
                                    this.dateObject.day.value,
                                    this.dateObject.month.code,
                                    this.dateObject.year.value);
            /*********************************/

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.FirstName = this.form.firstName;
            this.$scope.$parent.vm.teacherData.LastName = this.form.lastName;
            this.$scope.$parent.vm.teacherData.Email = this.form.email;
            this.$scope.$parent.vm.teacherData.PhoneNumber = this.form.phoneNumber;
            this.$scope.$parent.vm.teacherData.Sex = this.form.sex;
            this.$scope.$parent.vm.teacherData.BirthDate = dateFormatted;
            this.$scope.$parent.vm.teacherData.Born = this.form.born;
            this.$scope.$parent.vm.teacherData.About = this.form.about;
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Teacher Location Section to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * Fill Form event
            * @parent - CreateTeacherPageController
            * @description - Parent send markers teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {
                self.form.firstName = args.FirstName;
                self.form.lastName = args.LastName;
                self.form.email = args.Email;
                self.form.phoneNumber = args.PhoneNumber;
                self.form.sex = args.Sex;

                //Build birthdate (Charge on select List)
                let date = self.functionsUtilService.splitDate(args.BirthDate);
                self.dateObject.day.value = parseInt(date.day);
                self.dateObject.month.code = date.month;
                self.dateObject.year.value = parseInt(date.year);

                self.form.born = args.Born;
                self.form.about = args.About;
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherInfoSectionController.controllerId,
                    TeacherInfoSectionController);

}
