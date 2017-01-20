/**
 * ModalEducationController
 * @description - modal Teacher's Education controller definition, generic modal
 * in order to show add new teacher's education form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalEducation {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalEducationController {
        form: IModalEducationForm;
        validate: IModalEducationValidate;
        close: () => void;
        activate: () => void;
    }

    interface IModalEducationScope extends ng.IScope {

    }

    interface IModalEducationForm {
        school: string;
        degree: string;
        fieldStudy: string;
        dateStart: string;
        dateFinish: string;
        description: string;
    }

    interface IModalEducationValidate {
        school: app.core.util.functionsUtil.IValid;
        degree: app.core.util.functionsUtil.IValid;
        fieldStudy: app.core.util.functionsUtil.IValid;
        dateStart: app.core.util.functionsUtil.IValid;
        dateFinish: app.core.util.functionsUtil.IValid;
        description: app.core.util.functionsUtil.IValid;
    }

    interface IDataSet {
        education: app.models.teacher.Education;
        teacherId: string;
    }


    class ModalEducationController implements IModalEducationController {

        static controllerId = 'mainApp.components.modal.ModalEducationController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalEducationForm;
        validate: IModalEducationValidate;
        education: app.models.teacher.Education;
        listStartYears: Array<app.core.interfaces.ISelectListElement>;
        listFinishYears: Array<app.core.interfaces.ISelectListElement>;
        startYearObject: app.core.interfaces.ISelectListElement;
        finishYearObject: app.core.interfaces.ISelectListElement;
        degreeObject: app.core.interfaces.IDataFromJsonI18n;
        listDegrees: Array<app.core.interfaces.IDataFromJsonI18n>;
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

            //Create Education object
            this.education = this.dataSetModal.education || new app.models.teacher.Education();

            // Country Select List Structure
            this.degreeObject = {code: this.education.Degree || '', value: ''};

            // Years Select List Structure
            this.startYearObject = {value: this.education.DateStart || ''};
            this.finishYearObject = {value: this.education.DateFinish || ''};

            //Init form
            this.form = {
                school: this.education.School || '',
                degree: this.education.Degree || '',
                fieldStudy: this.education.FieldStudy || '',
                dateStart: this.education.DateStart || '',
                dateFinish: this.education.DateFinish || '',
                description: this.education.Description || ''
            };

            // Build Years select lists
            this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
            this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);

            //Build Countries select lists
            this.listDegrees = this.getDataFromJson.getDegreei18n();

            // Build validate object fields
            this.validate = {
                school: {valid: true, message: ''},
                degree: {valid: true, message: ''},
                fieldStudy: {valid: true, message: ''},
                dateStart: {valid: true, message: ''},
                dateFinish: {valid: true, message: ''},
                description: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalEducation controller actived');
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
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate School field
            let school_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.school = this.functionsUtilService.validator(this.form.school, school_rules);
            if(!this.validate.school.valid) {
                formValid = this.validate.school.valid;
            }

            //Validate Degree field
            let degree_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.degree = this.functionsUtilService.validator(this.degreeObject.code, degree_rules);
            if(!this.validate.degree.valid) {
                formValid = this.validate.degree.valid;
            }

            //Validate FieldStudy field
            let field_study_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.fieldStudy = this.functionsUtilService.validator(this.form.fieldStudy, field_study_rules);
            if(!this.validate.fieldStudy.valid) {
                formValid = this.validate.fieldStudy.valid;
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
        * send the new education data
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
                let degreeCode = this.degreeObject.code;
                let startYear = this.startYearObject.value;
                let finishYear = this.finishYearObject.value;
                /*********************************/

                this.form.degree = degreeCode;
                this.form.dateStart = startYear;
                this.form.dateFinish = finishYear;

                //Charge new data
                this.education.School = this.form.school;
                this.education.Degree = this.form.degree;
                this.education.FieldStudy = this.form.fieldStudy;
                this.education.DateStart = this.form.dateStart;
                this.education.DateFinish = this.form.dateFinish;
                this.education.Description = this.form.description;

                if(this.education.Id) {
                    this.teacherService.updateEducation(this.dataSetModal.teacherId, this.education)
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
                    this.teacherService.createEducation(this.dataSetModal.teacherId, this.education)
                    .then(
                        function(response) {
                            if(response.id) {
                                self.education.Id = response.id;
                                self.$uibModalInstance.close(self.education);
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
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalEducationController.controllerId,
                    ModalEducationController);

}
