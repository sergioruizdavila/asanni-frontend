/**
 * EditTeacherExperienceController
 * @description - Edit Teacher Experience Section Controller (edit teacher)
 */

module app.pages.editTeacher {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditTeacherExperienceController {
        form: IEditTeacherExperienceForm;
        validate: IEditTeacherExperienceValidate;
        activate: () => void;
    }

    export interface IEditTeacherExperienceForm {
        type: string;
        experiences: Array<app.models.teacher.Experience>;
    }

    interface IEditTeacherExperienceValidate {
        type: app.core.util.functionsUtil.IValid;
        teacherSince: app.core.util.functionsUtil.IValid;
        experiences: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditTeacherExperienceController implements IEditTeacherExperienceController {

        static controllerId = 'mainApp.pages.editTeacher.EditTeacherExperienceController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IEditTeacherExperienceForm;
        saving: boolean;
        saved: boolean;
        error: boolean;
        validate: IEditTeacherExperienceValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        yearObject: app.core.interfaces.ISelectListElement;
        private _hobbyChecked: any;
        private _professionalChecked: any;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        TIME_SHOW_MESSAGE: number;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$timeout',
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
            private $timeout: angular.ITimeoutService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.TIME_SHOW_MESSAGE = 6000;
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
            /*********************************/

            // Init saving loading
            this.saving = false;

            // Init saved message
            this.saved = false;

            // Init error message
            this.error = false;

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            //Init form
            this.form = {
                type: 'H',
                experiences: []
            };

            // Current Year
            let currentYear = parseInt(this.dataConfig.currentYear);

            // Build Years select lists
            this.listYears = this.functionsUtilService.buildNumberSelectList(1957, currentYear);

            //
            this.yearObject = {value: ''};

            // Init type of teacher checks
            this._hobbyChecked = {type:'H', checked: true};
            this._professionalChecked = {type:'P', checked: false};

            // Build validate object fields
            this.validate = {
                type: {valid: true, message: ''},
                teacherSince: {valid: true, message: ''},
                experiences: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('EditTeacherExperienceController controller actived');

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
        * saveExperienceSection
        * @description - save teacher experiences (update teacher data on DB)
        * @function
        * @return void
        */
        saveExperienceSection(): void {
            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                //loading On
                this.saving = true;
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data');
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * _checkType
        * @description - select a type of teacher
        * @use - this._checkType();
        * @function
        * @param {key} option - type of teacher option selected by user
        * @return {void}
        */
        private _checkType(key): void {
            let type = key.type;
            if(type === 'H') {
                this._professionalChecked.checked = false;
                this._hobbyChecked.checked = true;
                this.form.type = this._hobbyChecked.type;
            } else {
                this._professionalChecked.checked = true;
                this._hobbyChecked.checked = false;
                this.form.type = this._professionalChecked.type;
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
        private _fillForm(data: app.models.teacher.Teacher): void {
            this.form.type = data.Type || 'H';
            if(this.form.type === 'H') {
                this._professionalChecked.checked = false;
                this._hobbyChecked.checked = true;
            } else {
                this._professionalChecked.checked = true;
                this._hobbyChecked.checked = false;
            }

            this.yearObject.value = data.TeacherSince;

            this.form.experiences = data.Experiences;
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

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate 'Year' Teacher Since fields
            let teacher_since_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.teacherSince = this.functionsUtilService.validator(this.yearObject.value, teacher_since_rules);
            if(!this.validate.teacherSince.valid) {
                formValid = this.validate.teacherSince.valid;
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (type, since, experiences)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const TYPE_HOBBY_TITLE = this.$filter('translate')('%global.teacher.type.hobby.text');
            const TYPE_HOBBY_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.hobby.description.text');
            const TYPE_PROFESSIONAL_TITLE = this.$filter('translate')('%global.teacher.type.professional.text');
            const TYPE_PROFESSIONAL_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.professional.description.text');
            const SINCE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.title.text');
            const SINCE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.description.text');
            const EXPERIENCES_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.experiences.title.text');
            const EXPERIENCES_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.experiences.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'hobby':
                    this.helpText.title = TYPE_HOBBY_TITLE;
                    this.helpText.description = TYPE_HOBBY_DESCRIPTION;
                break;

                case 'professional':
                    this.helpText.title = TYPE_PROFESSIONAL_TITLE;
                    this.helpText.description = TYPE_PROFESSIONAL_DESCRIPTION;
                break;

                case 'teacherSince':
                    this.helpText.title = SINCE_TITLE;
                    this.helpText.description = SINCE_DESCRIPTION;
                break;

                case 'experiences':
                    this.helpText.title = EXPERIENCES_TITLE;
                    this.helpText.description = EXPERIENCES_DESCRIPTION;
                break;
            }

        }



        /**
        * _addEditExperience
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */
        private _addEditExperience(index, $event): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalExperienceTmpl,
                controller: 'mainApp.components.modal.ModalExperienceController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            experience: self.form.experiences[index],
                            teacherId: self.$rootScope.teacherData.Id
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the new experience data
            modalInstance.result.then(function (newExperience) {
                if(newExperience) {
                    self.form.experiences.push(newExperience);
                }
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            $event.preventDefault();
        }



        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it
        * on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(): void {
            // Send data to parent (editTeacher)
            this.$rootScope.teacherData.Type = this.form.type;
            this.$rootScope.teacherData.TeacherSince = this.yearObject.value;
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Teacher Location Section
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
            * @parent - EditTeacherController
            * @description - Parent send markers teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form',
                function(event, args) {
                    //loading Off
                    self.saving = false;
                    self.saved = true;

                    self.$timeout(function() {
                        self.saved = false;
                    }, self.TIME_SHOW_MESSAGE);

                    if(args !== 'error') {
                        self._fillForm(args);
                    }
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editTeacher')
        .controller(EditTeacherExperienceController.controllerId,
                    EditTeacherExperienceController);

}
