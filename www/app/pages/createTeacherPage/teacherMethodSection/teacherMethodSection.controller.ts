/**
 * TeacherMethodSectionController
 * @description - Teacher Method Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherMethodSectionController {
        form: ITeacherMethodForm;
        validate: ITeacherMethodValidate;
        activate: () => void;
    }

    export interface ITeacherMethodScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    export interface ITeacherMethodForm {
        methodology: string;
        immersion: app.models.teacher.Immersion;
    }

    interface ITeacherMethodValidate {
        methodology: app.core.util.functionsUtil.IValid;
        immersionActive: app.core.util.functionsUtil.IValid;
        typeOfImmersionList: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherMethodSectionController implements ITeacherMethodSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherMethodSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherMethodForm;
        validate: ITeacherMethodValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        checked: boolean;
        typeOfImmersionList: Array<app.core.interfaces.ISelectListElement>;
        STEP5_STATE: string;
        STEP7_STATE: string;
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
            '$scope'
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
            private $scope: ITeacherMethodScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP5_STATE = 'page.createTeacherPage.education';
            this.STEP7_STATE = 'page.createTeacherPage.price';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(6, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            // Init form
            this.form = {
                methodology: '',
                immersion: new app.models.teacher.Immersion
            };

            // Init Immersion Switch
            this.checked = false;

            // Build Type of Immersion select lists
            this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();

            // Build validate object fields
            this.validate = {
                methodology: {valid: true, message: ''},
                immersionActive: {valid: true, message: ''},
                typeOfImmersionList: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherMethodSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * changeStatus
        * @description - change 'Immersion Switch' Status
        * @function
        * @return void
        */
        changeStatus(): void {
            this.checked = !this.checked;
        }

        

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
                this.$state.go(this.STEP7_STATE, {reload: true});
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
                this.$state.go(this.STEP5_STATE, {reload: true});
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
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate 'Methodology' fields
            let methodology_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.methodology = this.functionsUtilService.validator(this.form.methodology, methodology_rules);
            if(!this.validate.methodology.valid) {
                formValid = this.validate.methodology.valid;
            }

            //Validate type of immersion list If user select 'YES' immersion option
            if(this.form.immersion.Active){

                let typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.typeOfImmersionList = this.functionsUtilService.validator(this.form.immersion.Types, typeOfImmersion_rules);
                if(!this.validate.typeOfImmersionList.valid) {
                    formValid = this.validate.typeOfImmersionList.valid;
                }

            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (methodology, immerison)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const METHODOLOGY_TITLE = this.$filter('translate')('%create.teacher.method.help_text.methodology.title.text');
            const METHODOLOGY_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.methodology.description.text');
            const IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.immersion.title.text');
            const IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.immersion.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'methodology':
                    this.helpText.title = METHODOLOGY_TITLE;
                    this.helpText.description = METHODOLOGY_DESCRIPTION;
                break;

                case 'immersion':
                    this.helpText.title = IMMERSION_TITLE;
                    this.helpText.description = IMMERSION_DESCRIPTION;
                break;
            }

        }



        /**
        * _addEditMethod
        * @description - open Modal in order to add a New Teacher's Method on Box
        * @use - this._addEditMethod();
        * @function
        * @return {void}
        */
        private _addEditMethod(index): void {
            let self = this;
            //TODO: Aqui deberia tomar lo que este en el select list de typeOfImmersion
            // y enviarlo a: new app.models.teacher.Immersion.addType

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
            this.$scope.$parent.vm.teacherData.Methodology = this.form.methodology;
            this.$scope.$parent.vm.teacherData.Immersion = this.form.immersion;
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
            * @description - Parent send teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {

                self.form.methodology = args.Methodology;
                self.form.immersion = args.Immersion;

            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherMethodSectionController.controllerId,
                    TeacherMethodSectionController);

}
