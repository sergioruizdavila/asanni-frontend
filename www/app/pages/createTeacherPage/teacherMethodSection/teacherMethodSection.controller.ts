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

    export interface ISelectListElementDisabled extends app.core.interfaces.IDataFromJsonI18n {
        disabled?: boolean;
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
        typeOfImmersionList: Array<ISelectListElementDisabled>;
        typeOfImmersionOptionBox: Array<app.core.interfaces.IKeyValue>;
        typeObject: app.core.interfaces.IDataFromJsonI18n;
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
            if(this.$scope.$parent.vm.teacherData.Type === 'P'){
                this.STEP5_STATE = 'page.createTeacherPage.education';
            } else {
                this.STEP5_STATE = 'page.createTeacherPage.experience';
            }
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

            // Build Type of Immersion select lists
            this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();

            // Init Type of Immersion options box
            this.typeOfImmersionOptionBox = [];

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
            this.form.immersion.Active = !this.form.immersion.Active;
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
            if(this.form.immersion.Active) {

                let typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.typeOfImmersionList = this.functionsUtilService.validator(this.form.immersion.Category, typeOfImmersion_rules);
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
            const IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.imm.title.text');
            const IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.imm.description.text');
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
        * _addNewImmersion
        * @description - add new immersion type from typeOfImmersionList to typeOfImmersionOptionBox
        * @use - this._addNewImmersion();
        * @function
        * @return {void}
        */
        private _addNewImmersion(): void {
            let self = this;

            //Disable immersion option from select list
            this._disableEnableOption(true, this.typeObject.code);

            this.typeOfImmersionOptionBox.push({key: this.typeObject.code, value: this.typeObject.value});

            //Add new immersion type on form object
            this.form.immersion.Category = [];
            for (let i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
            }

            event.preventDefault();
        }



        /**
        * _removeImmersion
        * @description - remove a immersion type element of options array
        * @use - this._removeImmersion(3);
        * @function
        * @param {string} key - immersion deselected by user
        * @return {void}
        */
        private _removeImmersion(key): void {

            //Enable immersion option from select list
            this._disableEnableOption(false, key);

            let newArray = this.typeOfImmersionOptionBox.filter(function(el) {
                return el.key !== key;
            });

             this.typeOfImmersionOptionBox = newArray;

             //Create new immersion type list on form object
             this.form.immersion.Category = [];
             for (let i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                 this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
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
            let immersionOptions = this.typeOfImmersionOptionBox;
            /*********************************/

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.Methodology = this.form.methodology;
            this.$scope.$parent.vm.teacherData.Immersion = this.form.immersion;
            this.$scope.$parent.vm.teacherData.Immersion.Category = this.form.immersion.Category;

        }



        /**
        * _disableEnableOption
        * @description - disable/enable a select option from selectlist
        * @use - this._disableEnableOption(true, '01');
        * @function
        * @param {string} key - immersion option key
        * @param {boolean} action - enable (false) / disable (true)
        * @return {void}
        */
        private _disableEnableOption(action, key): void {
            for (let i = 0; i < this.typeOfImmersionList.length; i++) {
                if(this.typeOfImmersionList[i].code === key) {
                    this.typeOfImmersionList[i].disabled = action;
                }
            }
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

                //Charge immersion type list
                if(self.form.immersion.Active) {
                    let immersionArray = self.getDataFromJson.getTypeOfImmersioni18n();
                    let newArray: Array<app.core.interfaces.IKeyValue> = [];
                    for (let i = 0; i < immersionArray.length; i++) {

                        for (let j = 0; j < self.form.immersion.Category.length; j++) {
                            if(self.form.immersion.Category[j] === immersionArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = immersionArray[i].code;
                                obj.value = immersionArray[i].value;
                                //Disable immersion option from select list
                                self._disableEnableOption(true, obj.key);
                                self.typeOfImmersionOptionBox.push(obj);
                            }
                        }

                    }
                }

            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherMethodSectionController.controllerId,
                    TeacherMethodSectionController);

}
