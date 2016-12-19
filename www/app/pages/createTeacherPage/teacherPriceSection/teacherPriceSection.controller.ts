/**
 * TeacherPriceSectionController
 * @description - Teacher Price Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherPriceSectionController {
        form: ITeacherPriceForm;
        validate: ITeacherPriceValidate;
        activate: () => void;
    }

    export interface ITeacherPriceScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    export interface ITeacherPriceForm {
        privateClass: app.models.teacher.TypeOfPrice;
        groupClass: app.models.teacher.TypeOfPrice;
    }

    interface ITeacherPriceValidate {
        privateClassActive: app.core.util.functionsUtil.IValid;
        privateClassPrice: app.core.util.functionsUtil.IValid;
        groupClassActive: app.core.util.functionsUtil.IValid;
        groupClassPrice: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherPriceSectionController implements ITeacherPriceSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherPriceSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherPriceForm;
        validate: ITeacherPriceValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        STEP6_STATE: string;
        FINAL_STEP_STATE: string;
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
            private $scope: ITeacherPriceScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP6_STATE = 'page.createTeacherPage.method';
            this.FINAL_STEP_STATE = 'page.createTeacherPage.final';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
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
                privateClass: new app.models.teacher.TypeOfPrice,
                groupClass: new app.models.teacher.TypeOfPrice
            };

            // Build validate object fields
            this.validate = {
                privateClassPrice: {valid: true, message: ''},
                privateClassActive: {valid: true, message: ''},
                groupClassPrice: {valid: true, message: ''},
                groupClassActive: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherPriceSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * changeStatus
        * @description - change 'Private Class Switch' or 'Group Class Switch' Status
        * @function
        * @return void
        */
        changeStatus(type): void {
            this.form[type].Active = !this.form[type].Active;
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
                this.$state.go(this.FINAL_STEP_STATE, {reload: true});
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
                this.$state.go(this.STEP6_STATE, {reload: true});
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
            const TRUE_ENUM = app.core.util.functionsUtil.Validation.IsTrue;
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate price per hour If user select 'YES' private class option
            if(this.form.privateClass.Active) {

                let privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                if(!this.validate.privateClassPrice.valid) {
                    formValid = this.validate.privateClassPrice.valid;
                }

            }

            //Validate price per hour If user select 'YES' group class option
            if(this.form.groupClass.Active) {

                let groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM];
                this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                if(!this.validate.groupClassPrice.valid) {
                    formValid = this.validate.groupClassPrice.valid;
                }

            }

            //Validate If user selected one Type of Class (private classes)
            let privateClassActive_rules = [TRUE_ENUM];
            this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.groupClass.Active, privateClassActive_rules);
            if(!this.validate.privateClassPrice.valid) {
                formValid = this.validate.privateClassPrice.valid;
            }

            //Validate If user selected one Type of Class (group classes)
            let groupClassActive_rules = [TRUE_ENUM];
            this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);
            if(!this.validate.groupClassActive.valid) {
                formValid = this.validate.groupClassActive.valid;
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (price, immerison)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const PRIVATE_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.private_class.title.text');
            const PRIVATE_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.private_class.description.text');
            const GROUP_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.group_class.title.text');
            const GROUP_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.group_class.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'private_class':
                    this.helpText.title = PRIVATE_CLASS_TITLE;
                    this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                break;

                case 'group_class':
                    this.helpText.title = GROUP_CLASS_TITLE;
                    this.helpText.description = GROUP_CLASS_DESCRIPTION;
                break;
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

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.Price.PrivateClass = this.form.privateClass;
            this.$scope.$parent.vm.teacherData.Price.GroupClass = this.form.groupClass;

        }



        /**
        * _subscribeToEvents
        * @description - this price subscribes Teacher Location Section to Parent Events
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

                self.form.privateClass = args.Price.PrivateClass;
                self.form.groupClass = args.Price.GroupClass;

            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherPriceSectionController.controllerId,
                    TeacherPriceSectionController);

}
