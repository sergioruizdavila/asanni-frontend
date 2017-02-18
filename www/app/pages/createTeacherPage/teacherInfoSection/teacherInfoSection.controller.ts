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
        phoneNumber: string;
        sex: string;
        birthDate: string;
        bornCountry: string;
        bornCity: string;
        about: string;
    }

    interface ITeacherInfoValidate {
        phoneNumber: app.core.util.functionsUtil.IValid;
        sex: app.core.util.functionsUtil.IValid;
        birthDate: app.core.interfaces.IBirthdateValidate;
        bornCountry: app.core.util.functionsUtil.IValid;
        bornCity: app.core.util.functionsUtil.IValid;
        about: app.core.util.functionsUtil.IValid;
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
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        dateObject: IBirthdateForm;
        sexObject: ISexForm;
        STEP2_STATE: string;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.localStorageService',
            'dataConfig',
            '$state',
            '$filter',
            '$scope',
            '$rootScope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private localStorage,
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherInfoScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.description.text');
            /*********************************/

            // Update progress bar width
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            // Sex Select List Structure
            this.sexObject = {sex: {code:'', value:''}};

            // Birthdate Select List Structure
            this.dateObject = {day:{value:''}, month: {code:'', value:''}, year: {value:''}};

            //Init form
            this.form = {
                phoneNumber: '',
                sex: '',
                birthDate: null,
                bornCountry: '',
                bornCity: '',
                about: ''
            };

            // Build Months, Days and Years select lists
            this.listMonths = this.getDataFromJson.getMonthi18n();
            //TODO: podemos optimizar esto ya que en listMonth ya traigo el json,
            // no es necesario volverlo a traer aqui.
            this.listSexs = this.getDataFromJson.getSexi18n();
            this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
            // Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Build validate object fields
            this.validate = {
                phoneNumber: {valid: true, message: ''},
                sex: {valid: true, message: ''},
                birthDate: {
                    day:{valid: true, message: ''},
                    month: {valid: true, message: ''},
                    year: {valid: true, message: ''},
                    valid: true,
                    message: ''
                },
                bornCountry: {valid: true, message: ''},
                bornCity: {valid: true, message: ''},
                about: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('TeacherInfoSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //FILL FORM FROM ROOTSCOPE USER PROFILE INFO
            if(this.$rootScope.profileData) {
                this._fillForm(this.$rootScope.profileData);
            }

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
                this.$scope.$emit('Save Profile Data');
                // GO TO NEXT STEP
                this.$state.go(this.STEP2_STATE, {reload: true});
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.teacher.Teacher} data - Teacher Data
        * @return {void}
        */
        private _fillForm(data: app.models.user.Profile): void {
            this.form.phoneNumber = data.PhoneNumber;
            //Charge Sex on select List
            this.sexObject.sex.code = data.Gender;

            //Build birthdate (Charge on select List)
            let date = this.functionsUtilService.splitDate(data.BirthDate);
            this.dateObject.day.value = date.day ? parseInt(date.day) : '';
            this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
            this.dateObject.year.value = date.year ? parseInt(date.year) : '';

            //Charge Country on select List
            this.countryObject.code = data.BornCountry;
            this.form.bornCity = data.BornCity;
            this.form.about = data.About;
        }



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const NAN_ENUM = app.core.util.functionsUtil.Validation.IsNotNaN;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const EMAIL_ENUM = app.core.util.functionsUtil.Validation.Email;
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;
            const BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');

            /***************************************************/
            //VARIABLES
            let formValid = true;

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
            let day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
            this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
            if(!this.validate.birthDate.day.valid) {
                formValid = this.validate.birthDate.day.valid;
                this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                this.validate.birthDate.message = BIRTHDATE_MESSAGE;
            }

            //Validate 'Month' Birth Date fields
            let month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
            if(!this.validate.birthDate.month.valid) {
                formValid = this.validate.birthDate.month.valid;
                this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                this.validate.birthDate.message = BIRTHDATE_MESSAGE;
            }

            //Validate 'Year' Birth Date fields
            let year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
            this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
            if(!this.validate.birthDate.year.valid) {
                formValid = this.validate.birthDate.year.valid;
                this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                this.validate.birthDate.message = BIRTHDATE_MESSAGE;
            }

            //Clean error message if birthdate is valid
            if(this.validate.birthDate.day.valid &&
               this.validate.birthDate.month.valid &&
               this.validate.birthDate.year.valid) {
                   this.validate.birthDate.valid = true;
                   this.validate.birthDate.message = '';
            }

            //Validate Country field
            let country_born_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.bornCountry = this.functionsUtilService.validator(this.countryObject.code, country_born_rules);
            if(!this.validate.bornCountry.valid) {
                formValid = this.validate.bornCountry.valid;
            }

            //Validate City Born field
            let city_born_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.bornCity = this.functionsUtilService.validator(this.form.bornCity, city_born_rules);
            if(!this.validate.bornCity.valid) {
                formValid = this.validate.bornCity.valid;
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
                    this.helpText.title = BIRTHDATE_TITLE;
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
            let genderCode = this.sexObject.sex.code;
            let countryCode = this.countryObject.code;
            let recommended = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
            /*********************************/

            this.form.bornCountry = countryCode;
            // Send data to parent (createTeacherPage)
            this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
            this.$rootScope.profileData.Gender = genderCode;
            this.$rootScope.profileData.BirthDate = dateFormatted;
            this.$rootScope.profileData.BornCountry = this.form.bornCountry;
            this.$rootScope.profileData.BornCity = this.form.bornCity;
            this.$rootScope.profileData.About = this.form.about;

            //If this teacher was recommended by a Student
            this.$rootScope.teacherData.Recommended = recommended ? recommended : null;

            //MIXPANEL
            mixpanel.track("Enter: Basic Info on Create Teacher", {
                "name": this.$rootScope.profileData.FirstName + ' ' + this.$rootScope.profileData.LastName,
                "email": this.$rootScope.profileData.Email,
                "phone": this.$rootScope.profileData.PhoneNumber
            });
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
            * @description - Parent send user profile data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill User Profile Form',
                function(event, args: app.models.user.Profile) {
                    self._fillForm(args);
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherInfoSectionController.controllerId,
                    TeacherInfoSectionController);

}
