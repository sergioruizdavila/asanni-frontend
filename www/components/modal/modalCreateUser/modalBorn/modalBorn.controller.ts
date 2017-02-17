/**
 * ModalBornController
 * @description - modal get user born information after the user signed up in Waysily
 * @constructor
 */

module components.modal.modalBorn {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalBornController {
        close: () => void;
        form: IModalBornForm;
        validate: IModalBornValidate;
        activate: () => void;
    }

    interface IModalBornForm {
        birthDate: string;
        country: string;
        city: string;
    }

    interface IModalBornValidate {
        country: app.core.util.functionsUtil.IValid;
        city: app.core.util.functionsUtil.IValid;
        birthDate: app.core.interfaces.IBirthdateValidate;
    }

    interface IBirthdateForm {
        day: app.core.interfaces.ISelectListElement;
        month: app.core.interfaces.IDataFromJsonI18n;
        year: app.core.interfaces.ISelectListElement;
    }

    class ModalBornController implements IModalBornController {

        static controllerId = 'mainApp.components.modal.ModalBornController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalBornForm;
        validate: IModalBornValidate;
        listMonths: Array<app.core.interfaces.IDataFromJsonI18n>;
        listDays: Array<app.core.interfaces.ISelectListElement>;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        dateObject: IBirthdateForm;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.models.user.UserService',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$uibModalInstance',
            'dataConfig',
            '$filter',
            '$uibModal',
            '$rootScope'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private userService: app.models.user.IUserService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig,
            private $filter: angular.IFilterService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $rootScope: app.core.interfaces.IMainAppRootScope
        ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Init form
            this.form = {
                country: '',
                city: '',
                birthDate: ''
            };

            // Birthdate Select List Structure
            this.dateObject = {day:{value:''}, month: {code:'', value:''}, year: {value:''}};

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            // Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Build Months, Days and Years select lists
            this.listMonths = this.getDataFromJson.getMonthi18n();
            this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
            this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 2017);

            // Build validate object fields
            this.validate = {
                birthDate: {
                    day:{valid: true, message: ''},
                    month: {valid: true, message: ''},
                    year: {valid: true, message: ''},
                    valid: true,
                    message: ''
                },
                country: {valid: true, message: ''},
                city: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('modalBorn controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _openBasicInfoModal
        * @description - open Modal in order to ask user basic info
        * @use - this._openBasicInfoModal();
        * @function
        * @return {void}
        */
        private _openBasicInfoModal(): void {
            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                templateUrl: this.dataConfig.modalBasicInfoTmpl,
                controller: 'mainApp.components.modal.ModalBasicInfoController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            this.$uibModalInstance.close();
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
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;
            const BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Reset validation
            this.validate.birthDate.valid = true;

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

            //Validate Country field
            let country_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.country = this.functionsUtilService.validator(this.countryObject.code, country_rules);
            if(!this.validate.country.valid) {
                formValid = this.validate.country.valid;
            }

            //Validate City field
            let city_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.city = this.functionsUtilService.validator(this.form.city, city_rules);
            if(!this.validate.city.valid) {
                formValid = this.validate.city.valid;
            }

            return formValid;
        }



        /**
        * _parseData
        * @description - parse data in order to send to DB
        * @use - this._parseData();
        * @function
        * @return {void}
        */
        private _parseData(): void {
            //VARIABLES
            let dateFormatted = this.functionsUtilService.joinDate(
                                    this.dateObject.day.value,
                                    this.dateObject.month.code,
                                    this.dateObject.year.value);
            let countryCode = this.countryObject.code;
            /*********************************/

            this.form.country = countryCode;
            // Prepare data to send to DB
            this.$rootScope.profileData.BirthDate = dateFormatted;
            this.$rootScope.profileData.BornCountry = this.form.country;
            this.$rootScope.profileData.BornCity = this.form.city;

        }



        /**
        * goToNext
        * @description - go to next step (save user information on DB)
        * @function
        * @return void
        */
        private _goToNext(): void {
            //VARIABLES
            let self = this;

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                this._parseData();
                // UPDATE EXISTING TEACHER
                this.userService.updateUserProfile(this.$rootScope.profileData)
                .then(
                    function(response) {
                        if(response.userId) {
                            //go to next step
                            self._openBasicInfoModal();
                        }
                    }
                );
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalBornController.controllerId,
                    ModalBornController);

}
