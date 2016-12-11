/**
 * ModalExperienceController
 * @description - modal Contact controller definition, generic modal in order
 * to show add new meeting point form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalExperience {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalExperienceController {
        form: IModalExperienceForm;
        validate: IModalExperienceValidate;
        close: () => void;
        activate: () => void;
    }

    interface IModalExperienceScope extends ng.IScope {

    }

    interface IModalExperienceForm {
        position: string;
        company: string;
        country: string;
        city: string;
        dateStart: string;
        dateFinish: string;
        description: string;
    }

    interface IModalExperienceValidate {
        position: app.core.util.functionsUtil.IValid;
        company: app.core.util.functionsUtil.IValid;
        country: app.core.util.functionsUtil.IValid;
        city: app.core.util.functionsUtil.IValid;
        dateStart: app.core.util.functionsUtil.IValid;
        dateFinish: app.core.util.functionsUtil.IValid;
        description: app.core.util.functionsUtil.IValid;
    }

    interface IDataSet {
        experience: app.models.teacher.Experience;
        teacherId: string;
    }


    class ModalExperienceController implements IModalExperienceController {

        static controllerId = 'mainApp.components.modal.ModalExperienceController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalExperienceForm;
        validate: IModalExperienceValidate;
        experience: app.models.teacher.Experience;
        listStartYears: Array<app.core.interfaces.ISelectListElement>;
        listFinishYears: Array<app.core.interfaces.ISelectListElement>;
        startYearObject: app.core.interfaces.ISelectListElement;
        finishYearObject: app.core.interfaces.ISelectListElement;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        defaultConfig: any;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataSetModal',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.models.teacher.TeacherService',
            '$timeout',
            '$filter'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataSetModal: IDataSet,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private teacherService: app.models.teacher.ITeacherService,
            private $timeout: angular.ITimeoutService,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Create Experience object
            this.experience = this.dataSetModal.experience || new app.models.teacher.Experience();

            // Country Select List Structure
            this.countryObject = {code: this.experience.Country || '', value: ''};

            // Years Select List Structure
            this.startYearObject = {value: this.experience.DateStart || ''};
            this.finishYearObject = {value: this.experience.DateFinish || ''};

            //Init form
            this.form = {
                position: this.experience.Position || '',
                company: this.experience.Company || '',
                country: this.experience.Country || '',
                city: this.experience.City || '',
                dateStart: this.experience.DateStart || '',
                dateFinish: this.experience.DateFinish || '',
                description: this.experience.Description || ''
            };

            // Build Years select lists
            this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
            this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);

            //Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Build validate object fields
            this.validate = {
                position: {valid: true, message: ''},
                company: {valid: true, message: ''},
                country: {valid: true, message: ''},
                city: {valid: true, message: ''},
                dateStart: {valid: true, message: ''},
                dateFinish: {valid: true, message: ''},
                description: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalExperience controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/



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
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Position field
            let position_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.position = this.functionsUtilService.validator(this.form.position, position_rules);
            if(!this.validate.position.valid) {
                formValid = this.validate.position.valid;
            }

            //Validate Company field
            let company_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.company = this.functionsUtilService.validator(this.form.company, company_rules);
            if(!this.validate.company.valid) {
                formValid = this.validate.company.valid;
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

            //Validate 'Start Year' fields
            let start_year_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.dateStart = this.functionsUtilService.validator(this.startYearObject.value, start_year_rules);
            if(!this.validate.dateStart.valid) {
                formValid = this.validate.dateStart.valid;
            }

            //Validate 'Finish Year' fields
            let finish_year_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.dateFinish = this.functionsUtilService.validator(this.finishYearObject.value, finish_year_rules);
            if(!this.validate.dateFinish.valid) {
                formValid = this.validate.dateFinish.valid;
            }

            return formValid;
        }



        /**
        * save
        * @description - when user click "Save" button, close the modal and
        * send the new experience data
        * @use - this.save();
        * @function
        * @return {void}
        */
        save(): void {
            //Validate data form
            let formValid = this._validateForm();
            //If form is valid, save data model
            if(formValid) {
                //VARIABLES
                let self = this;
                let countryCode = this.countryObject.code;
                let startYear = this.startYearObject.value;
                let finishYear = this.finishYearObject.value;
                /*********************************/

                this.form.country = countryCode;
                this.form.dateStart = startYear;
                this.form.dateFinish = finishYear;

                //Charge new data
                this.experience.Position = this.form.position;
                this.experience.Country = this.form.country;
                this.experience.City = this.form.city;
                this.experience.Company = this.form.company;
                this.experience.DateStart = this.form.dateStart;
                this.experience.DateFinish = this.form.dateFinish;
                this.experience.Description = this.form.description;

                if(this.experience.Id) {
                    this.teacherService.updateExperience(this.dataSetModal.teacherId, this.experience)
                    .then(
                        function(response) {
                            if(response.id) {
                                self.$uibModalInstance.close();
                            } else {
                                //error
                            }
                        }
                    );
                } else {
                    this.teacherService.createExperience(this.dataSetModal.teacherId, this.experience)
                    .then(
                        function(response) {
                            if(response.id) {
                                self.experience.Id = response.id;
                                self.$uibModalInstance.close(self.experience);
                            } else {
                                //error
                            }
                        }
                    );
                }

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
            event.preventDefault();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalExperienceController.controllerId,
                    ModalExperienceController);

}
