/**
 * TeacherEducationSectionController
 * @description - Teacher Education Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherEducationSectionController {
        form: ITeacherEducationForm;
        validate: ITeacherEducationValidate;
        activate: () => void;
    }

    export interface ITeacherEducationScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    export interface ITeacherEducationForm {
        educations: Array<app.models.teacher.Education>;
        certificates: Array<app.models.teacher.Certificate>;
    }

    interface ITeacherEducationValidate {
        educations: app.core.util.functionsUtil.IValid;
        certificates: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherEducationSectionController implements ITeacherEducationSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherEducationSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherEducationForm;
        validate: ITeacherEducationValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        STEP4_STATE: string;
        STEP6_STATE: string;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$scope',
            '$rootScope',
            '$uibModal'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherEducationScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP4_STATE = 'page.createTeacherPage.experience';
            this.STEP6_STATE = 'page.createTeacherPage.method';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.education.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.description.text');
            /*********************************/

            // Update progress bar width
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(5, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            //Init form
            this.form = {
                educations: [],
                certificates: []
            };

            // Build validate object fields
            this.validate = {
                educations: {valid: true, message: ''},
                certificates: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('TeacherEducationSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //FILL FORM FROM ROOTSCOPE TEACHER INFO
            if(this.$rootScope.teacherData) {
                this._fillForm(this.$rootScope.teacherData);
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
                this.$scope.$emit('Save Data');
                // GO TO NEXT STEP
                this.$state.go(this.STEP6_STATE, {reload: true});
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            this.$state.go(this.STEP4_STATE, {reload: true});
        }



        /**
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.teacher.Teacher} data - Teacher Data
        * @return {void}
        */
        private _fillForm(data: app.models.teacher.Teacher): void {
            this.form.educations = data.Educations;
            this.form.certificates = data.Certificates;
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
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.education.validation.message.text');
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Educations list
            let education_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.educations = this.functionsUtilService.validator(this.form.educations, education_rules);

            //Validate Certificates list
            let certificates_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.certificates = this.functionsUtilService.validator(this.form.certificates, certificates_rules);

            //If educations is not valid
            if(this.validate.educations.valid) {

                this.validate.globalValidate.valid = true;
                this.validate.globalValidate.message = '';

            } else if(this.validate.certificates.valid) {

                this.validate.globalValidate.valid = true;
                this.validate.globalValidate.message = '';

            } else {

                this.validate.globalValidate.valid = false;
                this.validate.globalValidate.message = GLOBAL_MESSAGE;
                formValid = this.validate.globalValidate.valid;

            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (type, since, educations)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const EDUCATIONS_TITLE = this.$filter('translate')('%create.teacher.education.help_text.educations.title.text');
            const EDUCATIONS_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.educations.description.text');
            const CERTIFICATES_TITLE = this.$filter('translate')('%create.teacher.education.help_text.certificates.title.text');
            const CERTIFICATES_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.certificates.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'educations':
                    this.helpText.title = EDUCATIONS_TITLE;
                    this.helpText.description = EDUCATIONS_DESCRIPTION;
                break;

                case 'certificates':
                    this.helpText.title = CERTIFICATES_TITLE;
                    this.helpText.description = CERTIFICATES_DESCRIPTION;
                break;
            }

        }



        /**
        * _addEditEducation
        * @description - open Modal in order to add/edit a Teacher's Education on Box
        * @use - this._addEditEducation();
        * @function
        * @return {void}
        */
        private _addEditEducation(index, $event): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalEducationTmpl,
                controller: 'mainApp.components.modal.ModalEducationController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            education: self.form.educations[index],
                            teacherId: self.$rootScope.teacherData.Id
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the new education data
            modalInstance.result.then(function (newEducation) {
                if(newEducation) {
                    self.form.educations.push(newEducation);
                }
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            $event.preventDefault();
        }



        /**
        * _addEditCertificate
        * @description - open Modal in order to add/edit a Teacher's Certificate on Box
        * @use - this._addEditCertificate();
        * @function
        * @return {void}
        */
        private _addEditCertificate(index, $event): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalCertificateTmpl,
                controller: 'mainApp.components.modal.ModalCertificateController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            certificate: self.form.certificates[index],
                            teacherId: self.$rootScope.teacherData.Id
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the new certificate data
            modalInstance.result.then(function (newCertificate) {
                if(newCertificate) {
                    self.form.certificates.push(newCertificate);
                }
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            $event.preventDefault();
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
                self._fillForm(args);
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherEducationSectionController.controllerId,
                    TeacherEducationSectionController);

}
