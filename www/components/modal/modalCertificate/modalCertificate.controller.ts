/**
 * ModalCertificateController
 * @description - modal Teacher's Certificate controller definition, generic modal in order
 * to show add new teacher's certificate form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalCertificate {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalCertificateController {
        form: IModalCertificateForm;
        validate: IModalCertificateValidate;
        close: () => void;
        activate: () => void;
    }

    interface IModalCertificateScope extends ng.IScope {

    }

    interface IModalCertificateForm {
        name: string;
        institution: string;
        dateReceived: string;
        description: string;
    }

    interface IModalCertificateValidate {
        name: app.core.util.functionsUtil.IValid;
        institution: app.core.util.functionsUtil.IValid;
        dateReceived: app.core.util.functionsUtil.IValid;
        description: app.core.util.functionsUtil.IValid;
    }

    interface IDataSet {
        certificate: app.models.teacher.Certificate;
        teacherId: string;
    }


    class ModalCertificateController implements IModalCertificateController {

        static controllerId = 'mainApp.components.modal.ModalCertificateController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalCertificateForm;
        validate: IModalCertificateValidate;
        certificate: app.models.teacher.Certificate;
        listReceivedYears: Array<app.core.interfaces.ISelectListElement>;
        receivedYearObject: app.core.interfaces.ISelectListElement;
        defaultConfig: any;
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

            //Create Certificate object
            this.certificate = this.dataSetModal.certificate || new app.models.teacher.Certificate();

            // Years Select List Structure
            this.receivedYearObject = {value: this.certificate.DateReceived || ''};

            //Init form
            this.form = {
                name: this.certificate.Name || '',
                institution: this.certificate.Institution || '',
                dateReceived: this.certificate.DateReceived || '',
                description: this.certificate.Description || ''
            };

            // Build Years select lists
            this.listReceivedYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);

            // Build validate object fields
            this.validate = {
                name: {valid: true, message: ''},
                institution: {valid: true, message: ''},
                dateReceived: {valid: true, message: ''},
                description: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalCertificate controller actived');
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
        private _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const EMAIL_ENUM = app.core.util.functionsUtil.Validation.Email;

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Name field
            let name_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.name = this.functionsUtilService.validator(this.form.name, name_rules);
            if(!this.validate.name.valid) {
                formValid = this.validate.name.valid;
            }

            //Validate Institution field
            let institution_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.institution = this.functionsUtilService.validator(this.form.institution, institution_rules);
            if(!this.validate.institution.valid) {
                formValid = this.validate.institution.valid;
            }

            //Validate 'Received Year' fields
            let received_year_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.dateReceived = this.functionsUtilService.validator(this.receivedYearObject.value, received_year_rules);
            if(!this.validate.dateReceived.valid) {
                formValid = this.validate.dateReceived.valid;
            }

            return formValid;
        }



        /**
        * save
        * @description - when user click "Save" button, close the modal and
        * send the new certificate data
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
                let receivedYear = this.receivedYearObject.value;
                /*********************************/

                this.form.dateReceived = receivedYear;

                //Charge new data
                this.certificate.Name = this.form.name;
                this.certificate.Institution = this.form.institution;
                this.certificate.DateReceived = this.form.dateReceived;
                this.certificate.Description = this.form.description;

                if(this.certificate.Id) {
                    this.teacherService.updateCertificate(this.dataSetModal.teacherId, this.certificate)
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
                    this.teacherService.createCertificate(this.dataSetModal.teacherId, this.certificate)
                    .then(
                        function(response) {
                            if(response.id) {
                                self.certificate.Id = response.id;
                                self.$uibModalInstance.close(self.certificate);
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
        * @function TODO: deberia siempre llamarse a close, no a $uibModalInstance
        * dejarle la funcion de cerrar a este metodo.
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalCertificateController.controllerId,
                    ModalCertificateController);

}
