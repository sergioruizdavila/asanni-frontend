/**
 * EditTeacherPriceController
 * @description - Edit Teacher Price Section Controller (edit teacher)
 */

module app.pages.editTeacher {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditTeacherPriceController {
        form: IEditTeacherPriceForm;
        validate: IEditTeacherPriceValidate;
        activate: () => void;
    }

    export interface IEditTeacherPriceForm {
        privateClass: app.models.teacher.TypeOfPrice;
        groupClass: app.models.teacher.TypeOfPrice;
    }

    interface IEditTeacherPriceValidate {
        privateClassActive: app.core.util.functionsUtil.IValid;
        privateClassPrice: app.core.util.functionsUtil.IValid;
        groupClassActive: app.core.util.functionsUtil.IValid;
        groupClassPrice: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditTeacherPriceController implements IEditTeacherPriceController {

        static controllerId = 'mainApp.pages.editTeacher.EditTeacherPriceController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IEditTeacherPriceForm;
        saving: boolean;
        saved: boolean;
        error: boolean;
        validate: IEditTeacherPriceValidate;
        helpText: app.core.interfaces.IHelpTextStep;
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
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
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
                groupClassActive: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('EditTeacherPriceController controller actived');

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
        * @description - change 'Private Class Switch' or 'Group Class Switch' Status
        * @function
        * @return void
        */
        changeStatus(type): void {
            this.form[type].Active = !this.form[type].Active;
        }



        /**
        * savePriceSection
        * @description - save teacher prices (update teacher data on DB)
        * @function
        * @return void
        */
        savePriceSection(): void {
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
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.teacher.Teacher} data - Teacher Data
        * @return {void}
        */
        private _fillForm(data: app.models.teacher.Teacher): void {
            this.form.privateClass = data.Price.PrivateClass;
            this.form.groupClass = data.Price.GroupClass;
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
            const IS_NOT_ZERO_ENUM = app.core.util.functionsUtil.Validation.IsNotZero;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const TRUE_ENUM = app.core.util.functionsUtil.Validation.IsTrue;
            const GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.price.validation.message.text');

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate price per hour If user select 'YES' private class option
            if(this.form.privateClass.Active) {

                let privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                if(!this.validate.privateClassPrice.valid) {
                    formValid = this.validate.privateClassPrice.valid;
                }

            }

            //Validate price per hour If user select 'YES' group class option
            if(this.form.groupClass.Active) {

                let groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                if(!this.validate.groupClassPrice.valid) {
                    formValid = this.validate.groupClassPrice.valid;
                }

            }

            //Validate If user selected one Type of Class (private classes)
            let privateClassActive_rules = [TRUE_ENUM];
            this.validate.privateClassActive = this.functionsUtilService.validator(this.form.privateClass.Active, privateClassActive_rules);

            //Validate If user selected one Type of Class (group classes)
            let groupClassActive_rules = [TRUE_ENUM];
            this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);

            //Charge a global error message if bith switches are FALSE
            if(!this.validate.privateClassActive.valid && !this.validate.groupClassActive.valid) {
                this.validate.globalValidate.valid = false;
                this.validate.globalValidate.message = GLOBAL_MESSAGE;
                formValid = this.validate.globalValidate.valid;
            } else {
                this.validate.globalValidate.valid = true;
                this.validate.globalValidate.message = '';
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

                case 'privateClass':
                    this.helpText.title = PRIVATE_CLASS_TITLE;
                    this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                break;

                case 'groupClass':
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
            this.$rootScope.teacherData.Price.PrivateClass = this.form.privateClass;
            this.$rootScope.teacherData.Price.GroupClass = this.form.groupClass;

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
            * @description - Parent send teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form',
                function(event, args) {
                    self.error = false;
                    if(args !== 'error') {
                        self._fillForm(args);
                    } else {
                        self.error = true;
                    }
                }
            );


            /**
            * Saved event
            * @parent - EditTeacherController
            * @description - Parent notify that data was saved successful
            * @event
            */
            this.$scope.$on('Saved',
                function(event, args) {
                    //loading Off
                    self.saving = false;
                    self.error = false;
                    self.saved = true;

                    self.$timeout(function() {
                        self.saved = false;
                    }, self.TIME_SHOW_MESSAGE);
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editTeacher')
        .controller(EditTeacherPriceController.controllerId,
                    EditTeacherPriceController);

}
