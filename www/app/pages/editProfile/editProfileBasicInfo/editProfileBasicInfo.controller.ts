/**
 * EditProfileBasicInfoController
 * @description - Edit User Basic info Profile Page Controller
 */

module app.pages.editProfileBasicInfo {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditProfileBasicInfoController {
        form: IEditProfileBasicInfoForm;
        validate: IEditProfileBasicInfoValidate;
        activate: () => void;
        goToEditMedia: () => void;
        goToEditLocation: () => void;
    }

    interface IGenderForm {
        gender: app.core.interfaces.IDataFromJsonI18n;
    }

    interface IBirthdateForm {
        day: app.core.interfaces.ISelectListElement;
        month: app.core.interfaces.IDataFromJsonI18n;
        year: app.core.interfaces.ISelectListElement;
    }

    interface IEditProfileBasicInfoForm {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: string;
        birthDate: string;
        countryBirth: string;
        cityBirth: string;
        about: string;
        native: Array<app.core.interfaces.IKeyValue>;
        learn: Array<app.core.interfaces.IKeyValue>;
        teach: Array<app.core.interfaces.IKeyValue>;
    }

    interface IEditProfileBasicInfoValidate {
        firstName: app.core.util.functionsUtil.IValid;
        lastName: app.core.util.functionsUtil.IValid;
        phoneNumber: app.core.util.functionsUtil.IValid;
        gender: app.core.util.functionsUtil.IValid;
        birthDate: app.core.interfaces.IBirthdateValidate;
        countryBirth: app.core.util.functionsUtil.IValid;
        cityBirth: app.core.util.functionsUtil.IValid;
        about: app.core.util.functionsUtil.IValid;
        native: app.core.util.functionsUtil.IValid;
        learn: app.core.util.functionsUtil.IValid;
        teach: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditProfileBasicInfoController implements IEditProfileBasicInfoController {

        static controllerId = 'mainApp.pages.editProfile.EditProfileBasicInfoController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IEditProfileBasicInfoForm;
        validate: IEditProfileBasicInfoValidate;
        saving: boolean;
        saved: boolean;
        error: boolean;
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listGenders: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        dateObject: IBirthdateForm;
        genderObject: IGenderForm;
        TIME_SHOW_MESSAGE: number;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.models.user.UserService',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$timeout',
            '$uibModal',
            '$scope',
            '$rootScope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private userService: app.models.user.IUserService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $timeout: angular.ITimeoutService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $scope: angular.IScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.TIME_SHOW_MESSAGE = 6000;

            // Init saving loading
            this.saving = false;

            // Init saved message
            this.saved = false;

            // Init error message
            this.error = false;

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            // Gender Select List Structure
            this.genderObject = {gender: {code:'', value:''}};

            // Birthdate Select List Structure
            this.dateObject = {day:{value:''}, month: {code:'', value:''}, year: {value:''}};

            //Init form
            this.form = {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                gender: '',
                birthDate: null,
                countryBirth: '',
                cityBirth: '',
                about: '',
                native: [],
                learn: [],
                teach: []
            };

            // Build Months, Days and Years select lists
            this.listMonths = this.getDataFromJson.getMonthi18n();
            //TODO: podemos optimizar esto ya que en listMonth ya traigo el json,
            // no es necesario volverlo a traer aqui.
            this.listGenders = this.getDataFromJson.getSexi18n();
            this.listDays = this.functionsUtil.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtil.buildNumberSelectList(1916, 2017);
            // Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Build validate object fields
            this.validate = {
                firstName: {valid: true, message: ''},
                lastName: {valid: true, message: ''},
                phoneNumber: {valid: true, message: ''},
                gender: {valid: true, message: ''},
                birthDate: {
                    day:{valid: true, message: ''},
                    month: {valid: true, message: ''},
                    year: {valid: true, message: ''},
                    valid: true,
                    message: ''
                },
                countryBirth: {valid: true, message: ''},
                cityBirth: {valid: true, message: ''},
                about: {valid: true, message: ''},
                native: {valid: true, message: ''},
                teach: {valid: true, message: ''},
                learn: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('EditProfileBasicInfo controller actived');

            //FILL FORM FROM ROOTSCOPE USER INFO
            this._fillForm(this.$rootScope.profileData);
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Go to edit media page
        * @description this method is launched when user press 'Edit Photo' menu
        * option
        */
        goToEditMedia(): void {
            this.$state.go('page.userEditMediaPage');
        }


        /*
        * Go to edit location page
        * @description this method is launched when user press 'Edit Location' menu
        * option
        */
        goToEditLocation(): void {
            this.$state.go('page.userEditLocationPage');
        }



        /**
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.user.Profile} data - Profile Data
        * @return {void}
        */
        private _fillForm(data: app.models.user.Profile): void {
            this.form.firstName = data.FirstName;
            this.form.lastName = data.LastName;
            this.form.phoneNumber = data.PhoneNumber;
            //Charge Sex on select List
            this.genderObject.gender.code = data.Gender;

            //Build birthdate (Charge on select List)
            let date = this.functionsUtil.splitDate(data.BirthDate);
            this.dateObject.day.value = date.day ? parseInt(date.day) : '';
            this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
            this.dateObject.year.value = date.year ? parseInt(date.year) : '';

            //Charge Country on select List
            this.countryObject.code = data.BornCountry;
            this.form.cityBirth = data.BornCity;
            this.form.about = data.About;

            // Form is already filled (Just take native because it's required has a native language)
            if(this.form.native.length === 0) {

                let languageArray = this.getDataFromJson.getLanguagei18n();
                for (let i = 0; i < languageArray.length; i++) {

                    if(data.Languages.Native) {
                        // Build user native language list
                        for (let j = 0; j < data.Languages.Native.length; j++) {

                            if(data.Languages.Native[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.native == null) {
                                    this.form.native = [];
                                    this.form.native.push(obj);
                                } else {
                                    this.form.native.push(obj);
                                }
                            }

                        }
                    }

                    if(data.Languages.Learn) {
                        // Build user learn language list
                        for (let j = 0; j < data.Languages.Learn.length; j++) {

                            if(data.Languages.Learn[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.learn == null) {
                                    this.form.learn = [];
                                    this.form.learn.push(obj);
                                } else {
                                    this.form.learn.push(obj);
                                }
                            }

                        }
                    }

                    if(data.Languages.Teach) {
                        // Build user teach language list
                        for (let j = 0; j < data.Languages.Teach.length; j++) {

                            if(data.Languages.Teach[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.teach == null) {
                                    this.form.teach = [];
                                    this.form.teach.push(obj);
                                } else {
                                    this.form.teach.push(obj);
                                }
                            }

                        }
                    }

                }

            }

        }



        /**
        * _validateBasicInfoForm
        * @description - Validate each field on basic info's form
        * @use - this._validateBasicInfoForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateBasicInfoForm(): boolean {
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

            //Validate First Name field
            let first_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.firstName = this.functionsUtil.validator(this.form.firstName, first_rules);
            if(!this.validate.firstName.valid) {
                formValid = this.validate.firstName.valid;
            }

            //Validate Last Name field
            let last_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.lastName = this.functionsUtil.validator(this.form.lastName, last_rules);
            if(!this.validate.lastName.valid) {
                formValid = this.validate.lastName.valid;
            }

            //Validate Phone Number field
            let phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
            let onlyNum: any = this.form.phoneNumber.replace(/\D+/g, "");
            onlyNum = parseInt(onlyNum) || '';
            this.validate.phoneNumber = this.functionsUtil.validator(onlyNum, phoneNumber_rules);
            if(!this.validate.phoneNumber.valid) {
                formValid = this.validate.phoneNumber.valid;
            }

            //Validate Sex field
            let gender_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.gender = this.functionsUtil.validator(this.genderObject.gender.code, gender_rules);
            if(!this.validate.gender.valid) {
                formValid = this.validate.gender.valid;
            }

            //Validate 'Day' Birth Date fields
            let day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
            this.validate.birthDate.day = this.functionsUtil.validator(this.dateObject.day.value, day_birthdate_rules);
            if(!this.validate.birthDate.day.valid) {
                formValid = this.validate.birthDate.day.valid;
                this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                this.validate.birthDate.message = BIRTHDATE_MESSAGE;
            }

            //Validate 'Month' Birth Date fields
            let month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.birthDate.month = this.functionsUtil.validator(this.dateObject.month.code, month_birthdate_rules);
            if(!this.validate.birthDate.month.valid) {
                formValid = this.validate.birthDate.month.valid;
                this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                this.validate.birthDate.message = BIRTHDATE_MESSAGE;
            }

            //Validate 'Year' Birth Date fields
            let year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
            this.validate.birthDate.year = this.functionsUtil.validator(this.dateObject.year.value, year_birthdate_rules);
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

            //Validate Country Birth field
            let country_birth_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.countryBirth = this.functionsUtil.validator(this.countryObject.code, country_birth_rules);
            if(!this.validate.countryBirth.valid) {
                formValid = this.validate.countryBirth.valid;
            }

            //Validate City Birth field
            let city_birth_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.cityBirth = this.functionsUtil.validator(this.form.cityBirth, city_birth_rules);
            if(!this.validate.cityBirth.valid) {
                formValid = this.validate.cityBirth.valid;
            }

            //Validate About me field
            let about_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.about = this.functionsUtil.validator(this.form.about, about_rules);
            if(!this.validate.about.valid) {
                formValid = this.validate.about.valid;
            }

            return formValid;
        }



        /**
        * _validateLanguagesForm
        * @description - Validate each field on languages' form
        * @use - this._validateLanguagesForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateLanguagesForm(): boolean {
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

            //Validate Native Languages List
            let native_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.native = this.functionsUtil.validator(this.form.native, native_rules);
            if(!this.validate.native.valid) {
                formValid = this.validate.native.valid;
            }

            //Validate Learn Languages List
            let learn_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.learn = this.functionsUtil.validator(this.form.learn, learn_rules);
            if(!this.validate.learn.valid) {
                formValid = this.validate.learn.valid;
            }

            return formValid;
        }



        /**
        * _addNewLanguages
        * @description - open Modal in order to add a New Languages on Box
        * @use - this._addNewLanguages();
        * @function
        * @return {void}
        */
        private _addNewLanguages(type, $event): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalLanguagesTmpl,
                controller: 'mainApp.components.modal.ModalLanguageController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            type: type,
                            list: self.form[type]
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the languages options list
            modalInstance.result.then(function (newLanguagesList) {
                self.form[type] = newLanguagesList;
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });

            $event.preventDefault();
        }



        /**
        * _removeLanguage
        * @description - remove a language element of options array
        * @use - this._removeLanguage(3);
        * @function
        * @param {string} key - languages deselected by user
        * @param {string} type - type of languages list (native, learn, teach)
        * @return {void}
        */
        private _removeLanguage(key, type): void {
             let newArray = this.form[type].filter(function(el) {
                 return el.key !== key;
             });

             this.form[type] = newArray;
        }



        /**
        * _setBasicInfoFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._setBasicInfoFromForm();
        * @function
        * @return {void}
        */
        private _setBasicInfoFromForm(): void {
            //VARIABLES
            let dateFormatted = this.functionsUtil.joinDate(
                                    this.dateObject.day.value,
                                    this.dateObject.month.code,
                                    this.dateObject.year.value);
            let genderCode = this.genderObject.gender.code;
            let countryCode = this.countryObject.code;
            /*********************************/

            this.form.countryBirth = countryCode;
            // Send data to parent (createTeacherPage)
            this.$rootScope.profileData.FirstName = this.form.firstName;
            this.$rootScope.profileData.LastName = this.form.lastName;
            this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
            this.$rootScope.profileData.Gender = genderCode;
            this.$rootScope.profileData.BirthDate = dateFormatted;
            this.$rootScope.profileData.BornCountry = this.form.countryBirth;
            this.$rootScope.profileData.BornCity = this.form.cityBirth;
            this.$rootScope.profileData.About = this.form.about;
        }



        /**
        * _setLanguageFromForm
        * @description - get languages data from form's input
        * in order to put it on $parent.profileData
        * @use - this._setLanguageFromForm();
        * @function
        * @return {void}
        */
        private _setLanguageFromForm(): void {

            if(this.form.native) {
                let native = [];
                for (let i = 0; i < this.form.native.length; i++) {
                    native.push(this.form.native[i].key);
                }
                this.$rootScope.profileData.Languages.Native = native;
            }

            if(this.form.learn) {
                let learn = [];
                for (let i = 0; i < this.form.learn.length; i++) {
                    learn.push(this.form.learn[i].key);
                }
                this.$rootScope.profileData.Languages.Learn = learn;
            }

            if(this.form.teach) {
                let teach = [];
                for (let i = 0; i < this.form.teach.length; i++) {
                    teach.push(this.form.teach[i].key);
                }
                this.$rootScope.profileData.Languages.Teach = teach;
            }
        }


        /**
        * saveBasicInfoSection
        * @description - Update profile's basic data calling to save method
        * @function
        * @return void
        */
        saveBasicInfoSection(): void {
            //VARIABLES
            let self = this;
            //Validate data form
            let formValid = this._validateBasicInfoForm();

            if(formValid) {
                //loading On
                this.saving = true;
                this._setBasicInfoFromForm();
                this.$scope.$emit('Save Profile Data');
            }
        }



        /**
        * saveLanguagesSection
        * @description - Update profile's languages data calling to save method
        * @function
        * @return void
        */
        saveLanguagesSection(): void {
            //VARIABLES
            let self = this;

            //Validate data form
            let formValid = this._validateLanguagesForm();

            if(formValid) {
                //loading On
                this.saving = true;
                this._setLanguageFromForm();
                this.$scope.$emit('Save Profile Data');
            }
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes User Basic Info Section
        * to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */
        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * Fill Form event
            * @parent - EditUserController
            * @description - Parent send user profile data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill User Profile Form',
                function(event, args) {
                    self.error = false;
                    if(args !== 'error') {
                        self._fillForm(args);
                    } else {
                        self.error = true;
                    }
                }
            );


            /**
            * Saved event
            * @parent - EditProfileController
            * @description - Parent notify that data was saved successful
            * @event
            */
            this.$scope.$on('Saved',
                function(event, args) {
                    //loading Off
                    self.saving = false;
                    self.error = false;
                    self.saved = true;

                    self.$timeout(function() {
                        self.saved = false;
                    }, self.TIME_SHOW_MESSAGE);
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editProfile')
        .controller(EditProfileBasicInfoController.controllerId, EditProfileBasicInfoController);

}
