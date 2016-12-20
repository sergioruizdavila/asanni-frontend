/**
 * TeacherExperienceSectionController
 * @description - Teacher Experience Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherExperienceSectionController {
        form: ITeacherExperienceForm;
        validate: ITeacherExperienceValidate;
        activate: () => void;
    }

    export interface ITeacherExperienceScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    export interface ITeacherExperienceForm {
        type: string;
        experiences: Array<app.models.teacher.Experience>;
    }

    interface ITeacherExperienceValidate {
        type: app.core.util.functionsUtil.IValid;
        teacherSince: app.core.util.functionsUtil.IValid;
        experiences: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherExperienceSectionController implements ITeacherExperienceSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherExperienceSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherExperienceForm;
        validate: ITeacherExperienceValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        listYears: Array<app.core.interfaces.ISelectListElement>;
        yearObject: app.core.interfaces.ISelectListElement;
        private _hobbyChecked: any;
        private _professionalChecked: any;
        STEP3_STATE: string;
        STEP_ALTER_STATE: string;
        STEP5_STATE: string;
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
            private $scope: ITeacherExperienceScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP3_STATE = 'page.createTeacherPage.language';
            this.STEP5_STATE = 'page.createTeacherPage.method';
            this.STEP_ALTER_STATE = 'page.createTeacherPage.education';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(4, 8);

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

            // Build Years select lists
            this.listYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);

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
            console.log('TeacherExperienceSectionController controller actived');

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
                // GO TO ALTERNATIVE STEP IF IS PROFESSIONAL TEACHER, IF NOT GO
                // TO NEXT STEP
                if(this.form.type === 'P'){
                    this.$state.go(this.STEP_ALTER_STATE, {reload: true});
                } else {
                    this.$state.go(this.STEP5_STATE, {reload: true});
                }
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
            //Validate data form
            let formValid = this._validateForm();
            //If form is valid, save data model
            if(formValid) {
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data');
                this.$state.go(this.STEP3_STATE, {reload: true});
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
            const TYPE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.type.title.text');
            const TYPE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.description.text');
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

                case 'type':
                    this.helpText.title = TYPE_TITLE;
                    this.helpText.description = TYPE_DESCRIPTION;
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
        private _addEditExperience(index): void {
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
                            teacherId: self.$scope.$parent.vm.teacherData.Id
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
                console.info('Modal dismissed at: ' + new Date());
            });

            event.preventDefault();
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

            /*********************************/

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.Type = this.form.type;
            this.$scope.$parent.vm.teacherData.TeacherSince = this.yearObject.value;
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
                self.form.type = args.Type || 'H';
                if(self.form.type === 'H') {
                    self._professionalChecked.checked = false;
                    self._hobbyChecked.checked = true;
                } else {
                    self._professionalChecked.checked = true;
                    self._hobbyChecked.checked = false;
                }

                self.yearObject.value = args.TeacherSince;

                self.form.experiences = args.Experiences;
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherExperienceSectionController.controllerId,
                    TeacherExperienceSectionController);

}
