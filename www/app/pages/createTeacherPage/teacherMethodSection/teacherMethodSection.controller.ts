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
        otherCategory: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
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
        step5State: string;
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
            '$scope',
            '$rootScope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherMethodScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            this.step5State = '';
            //CONSTANTS
            this.STEP7_STATE = 'page.createTeacherPage.price';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
            /*********************************/

            // Update progress bar width
            this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(6, 9);

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
            this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersionTeacheri18n();

            // Init Type of Immersion options box
            this.typeOfImmersionOptionBox = [];

            // Build validate object fields
            this.validate = {
                methodology: {valid: true, message: ''},
                immersionActive: {valid: true, message: ''},
                typeOfImmersionList: {valid: true, message: ''},
                otherCategory: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherMethodSectionController controller actived');

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
            this.$state.go(this.step5State, {reload: true});
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
            //VARIABLES
            if(data.Type === 'P') {
                this.step5State = 'page.createTeacherPage.education';
            } else {
                this.step5State = 'page.createTeacherPage.experience';
            }
            this.form.methodology = data.Methodology;
            this.form.immersion = data.Immersion;

            //Charge immersion type list
            if(this.form.immersion.Active) {

                // type of immersion list was already filled
                if(this.typeOfImmersionOptionBox.length === 0) {

                    let immersionArray = this.getDataFromJson.getTypeOfImmersionTeacheri18n();
                    let newArray: Array<app.core.interfaces.IKeyValue> = [];

                    for (let i = 0; i < immersionArray.length; i++) {

                        for (let j = 0; j < this.form.immersion.Category.length; j++) {
                            if(this.form.immersion.Category[j] === immersionArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = immersionArray[i].code;
                                obj.value = immersionArray[i].value;
                                //Disable immersion option from select list
                                this._disableEnableOption(true, obj.key);
                                this.typeOfImmersionOptionBox.push(obj);
                            }
                        }

                    }

                }

            }

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
            const GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.method.validation.message.text');
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate 'Methodology' fields
            let methodology_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.methodology = this.functionsUtil.validator(this.form.methodology, methodology_rules);
            if(!this.validate.methodology.valid) {
                formValid = this.validate.methodology.valid;
            }

            //Validate type of immersion list If user select 'YES' immersion option
            if(this.form.immersion.Active) {

                let typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.typeOfImmersionList = this.functionsUtil.validator(this.form.immersion.Category, typeOfImmersion_rules);

                let otherCategory_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.otherCategory = this.functionsUtil.validator(this.form.immersion.OtherCategory, otherCategory_rules);

                if(this.validate.typeOfImmersionList.valid) {

                    this.validate.globalValidate.valid = true;
                    this.validate.globalValidate.message = '';

                } else if(this.validate.otherCategory.valid) {

                    this.validate.globalValidate.valid = true;
                    this.validate.globalValidate.message = '';

                } else {

                    this.validate.globalValidate.valid = false;
                    this.validate.globalValidate.message = GLOBAL_MESSAGE;
                    formValid = this.validate.globalValidate.valid;

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
            this.$rootScope.teacherData.Methodology = this.form.methodology;
            this.$rootScope.teacherData.Immersion = this.form.immersion;
            this.$rootScope.teacherData.Immersion.Category = this.form.immersion.Category;

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

                self._fillForm(args);

            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherMethodSectionController.controllerId,
                    TeacherMethodSectionController);

}
