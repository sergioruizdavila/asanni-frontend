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
        validate: ITeacherInfoValidate;
        activate: () => void;
    }

    export interface ITeacherInfoScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    interface ISexForm {
        sex: app.core.interfaces.IDataFromJsonI18n;
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

    interface ITeacherInfoValidate {
        firstName: app.core.util.functionsUtil.IValid;
        lastName: app.core.util.functionsUtil.IValid;
        email: app.core.util.functionsUtil.IValid;
        phoneNumber: app.core.util.functionsUtil.IValid;
        sex: app.core.util.functionsUtil.IValid;
        birthDate: IBirthdateValidate;
        born: app.core.util.functionsUtil.IValid;
        about: app.core.util.functionsUtil.IValid;
    }

    interface IBirthdateValidate {
        day: app.core.util.functionsUtil.IValid,
        month: app.core.util.functionsUtil.IValid,
        year: app.core.util.functionsUtil.IValid,
        valid: boolean,
        message: string
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
        validate: ITeacherInfoValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listSexs: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        dateObject: IBirthdateForm;
        sexObject: ISexForm;
        STEP1_STATE: string;
        STEP2_STATE: string;
        STEP3_STATE: string;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$scope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherInfoScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.STEP3_STATE = 'page.createTeacherPage.map';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.description.text');
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            // Sex Select List Structure
            this.sexObject = {sex: {code:'', value:''}};

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
            //TODO: podemos optimizar esto ya que en listMonth ya traigo el json,
            // no es necesario volverlo a traer aqui.
            this.listSexs = this.getDataFromJson.getSexi18n();
            this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);

            // Build validate object fields
            this.validate = {
                firstName: {valid: true, message: ''},
                lastName: {valid: true, message: ''},
                email: {valid: true, message: ''},
                phoneNumber: {valid: true, message: ''},
                sex: {valid: true, message: ''},
                birthDate: {
                    day:{valid: true, message: ''},
                    month: {valid: true, message: ''},
                    year: {valid: true, message: ''},
                    valid: true,
                    message: ''
                },
                born: {valid: true, message: ''},
                about: {valid: true, message: ''}
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

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data');
                // GO TO NEXT STEP
                this.$state.go(this.STEP2_STATE, {reload: true});
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const EMAIL_ENUM = app.core.util.functionsUtil.Validation.Email;
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate First Name field
            let firstName_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.firstName = this.functionsUtilService.validator(this.form.firstName, firstName_rules);
            if(!this.validate.firstName.valid) {
                formValid = this.validate.firstName.valid;
            }

            //Validate Last Name field
            let lastName_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.lastName = this.functionsUtilService.validator(this.form.lastName, lastName_rules);
            if(!this.validate.lastName.valid) {
                formValid = this.validate.lastName.valid;
            }

            //Validate Email field
            let email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
            this.validate.email = this.functionsUtilService.validator(this.form.email, email_rules);
            if(!this.validate.email.valid) {
                formValid = this.validate.email.valid;
            }

            //Validate Phone Number field
            let phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
            let onlyNum: any = this.form.phoneNumber.replace(/\D+/g, "");
            onlyNum = parseInt(onlyNum) || '';
            this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
            if(!this.validate.phoneNumber.valid) {
                formValid = this.validate.phoneNumber.valid;
            }

            //Validate Sex field
            let sex_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.sex = this.functionsUtilService.validator(this.sexObject.sex.code, sex_rules);
            if(!this.validate.sex.valid) {
                formValid = this.validate.sex.valid;
            }

            //Validate 'Day' Birth Date fields
            let day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
            if(!this.validate.birthDate.day.valid) {
                formValid = this.validate.birthDate.day.valid;
                this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                this.validate.birthDate.message = this.validate.birthDate.day.message;
            }

            //Validate 'Month' Birth Date fields
            let month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
            if(!this.validate.birthDate.month.valid) {
                formValid = this.validate.birthDate.month.valid;
                this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                this.validate.birthDate.message = this.validate.birthDate.month.message;
            }

            //Validate 'Year' Birth Date fields
            let year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
            if(!this.validate.birthDate.year.valid) {
                formValid = this.validate.birthDate.year.valid;
                this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                this.validate.birthDate.message = this.validate.birthDate.year.message;
            }

            //Validate Born field
            let born_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.born = this.functionsUtilService.validator(this.form.born, born_rules);
            if(!this.validate.born.valid) {
                formValid = this.validate.born.valid;
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (firstName, lastName, email, etc)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const NAME_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.name.title.text');
            const NAME_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.name.description.text');
            const EMAIL_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.email.title.text');
            const EMAIL_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.email.description.text');
            const PHONE_NUMBER_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.title.text');
            const PHONE_NUMBER_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.description.text');
            const SEX_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.title.text');
            const SEX_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.description.text');
            const BIRTHDATE_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.title.text');
            const BIRTHDATE_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.description.text');
            const BORN_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.born.title.text');
            const BORN_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.born.description.text');
            const ABOUT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.about.title.text');
            const ABOUT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.about.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'firstName':
                case 'lastName':
                    this.helpText.title = NAME_TITLE;
                    this.helpText.description = NAME_DESCRIPTION;
                break;

                case 'email':
                    this.helpText.title = EMAIL_TITLE;
                    this.helpText.description = EMAIL_DESCRIPTION;
                break;

                case 'phoneNumber':
                    this.helpText.title = PHONE_NUMBER_TITLE;
                    this.helpText.description = PHONE_NUMBER_DESCRIPTION;
                break;

                case 'sex':
                    this.helpText.title = SEX_TITLE;
                    this.helpText.description = SEX_DESCRIPTION;
                break;

                case 'birthDate':
                    this.helpText.title = BIRTHDATE_DESCRIPTION;
                    this.helpText.description = BIRTHDATE_DESCRIPTION;
                break;

                case 'born':
                    this.helpText.title = BORN_TITLE;
                    this.helpText.description = BORN_DESCRIPTION;
                break;

                case 'about':
                    this.helpText.title = ABOUT_TITLE;
                    this.helpText.description = ABOUT_DESCRIPTION;
                break;
            }

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
            let sexCode = this.sexObject.sex.code;
            /*********************************/

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.FirstName = this.form.firstName;
            this.$scope.$parent.vm.teacherData.LastName = this.form.lastName;
            this.$scope.$parent.vm.teacherData.Email = this.form.email;
            this.$scope.$parent.vm.teacherData.PhoneNumber = this.form.phoneNumber;
            this.$scope.$parent.vm.teacherData.Sex = sexCode;
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
                //Charge Sex on select List
                self.sexObject.sex.code = args.Sex;

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
