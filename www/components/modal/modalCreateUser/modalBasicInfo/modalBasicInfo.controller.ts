/**
 * ModalBasicInfoController
 * @description - modal get user basic information after the user signed up in Waysily
 * @constructor
 */

module components.modal.modalBasicInfo {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalBasicInfoController {
        close: () => void;
        form: IModalBasicInfoForm;
        validate: IModalBasicValidate;
        activate: () => void;
    }

    interface IModalBasicInfoTooltip {
        phoneNumber: string;
        gender: string;
        about: string;
    }

    interface IModalBasicInfoForm {
        phoneNumber: string;
        gender: string;
        about: string;
    }

    interface IGenderForm {
        gender: app.core.interfaces.IDataFromJsonI18n;
    }

    interface IModalBasicValidate {
        phoneNumber: app.core.util.functionsUtil.IValid;
        gender: app.core.util.functionsUtil.IValid;
        about: app.core.util.functionsUtil.IValid;
    }

    class ModalBasicInfoController implements IModalBasicInfoController {

        static controllerId = 'mainApp.components.modal.ModalBasicInfoController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalBasicInfoForm;
        tooltip: IModalBasicInfoTooltip;
        validate: IModalBasicValidate;
        listGenders: Array<app.core.interfaces.IDataFromJsonI18n>;
        genderObject: IGenderForm;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.models.user.UserService',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$uibModalInstance',
            'dataConfig',
            '$filter',
            '$uibModal',
            '$rootScope'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private userService: app.models.user.IUserService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig,
            private $filter: angular.IFilterService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $rootScope: app.core.interfaces.IMainAppRootScope
        ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            const PHONE_NUMBER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.phone_number.text');
            const GENDER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.gender.text');
            const ABOUT_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.about.text');
            //VARIABLES
            let self = this;

            // Gender Select List Structure
            this.genderObject = {gender: {code:'', value:''}};

            this.listGenders = this.getDataFromJson.getSexi18n();

            //Init tooltip
            this.tooltip = {
                phoneNumber: PHONE_NUMBER_TOOLTIP,
                gender: GENDER_TOOLTIP,
                about: ABOUT_TOOLTIP
            };

            //Init form
            this.form = {
                phoneNumber: '',
                gender: '',
                about: ''
            };

            // Build validate object fields
            this.validate = {
                phoneNumber: {valid: true, message: ''},
                gender: {valid: true, message: ''},
                about: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('modalBasicInfo controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _openFinishModal
        * @description - open Modal in order to show finish message
        * @use - this._openFinishModal();
        * @function
        * @return {void}
        */
        private _openFinishModal(): void {
            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                templateUrl: this.dataConfig.modalFinishTmpl,
                controller: 'mainApp.components.modal.ModalFinishController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            this.$uibModalInstance.close();
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
            const NAN_ENUM = app.core.util.functionsUtil.Validation.IsNotNaN;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;
            const BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Phone Number field
            let phoneNumber_rules = [NUMBER_ENUM];
            let onlyNum: any = this.form.phoneNumber.replace(/\D+/g, "");
            //NOTE: If is empty, replace by NaN since this field is not required
            onlyNum = parseInt(onlyNum) || NaN;
            this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
            if(!this.validate.phoneNumber.valid) {
                formValid = this.validate.phoneNumber.valid;
            }

            //Validate Gender field
            let gender_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.gender = this.functionsUtilService.validator(this.genderObject.gender.code, gender_rules);
            if(!this.validate.gender.valid) {
                formValid = this.validate.gender.valid;
            }

            return formValid;
        }



        /**
        * _parseData
        * @description - parse data in order to send to DB
        * @use - this._parseData();
        * @function
        * @return {void}
        */
        private _parseData(): void {
            //VARIABLES
            let genderCode = this.genderObject.gender.code;
            /*********************************/

            // Prepare data to send to DB
            this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
            this.$rootScope.profileData.Gender = genderCode;
            this.$rootScope.profileData.About = this.form.about;

        }



        /**
        * goToNext
        * @description - go to next step (save user information on DB)
        * @function
        * @return void
        */
        private _goToNext(): void {
            //VARIABLES
            let self = this;

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                this._parseData();
                // UPDATE EXISTING TEACHER
                this.userService.updateUserProfile(this.$rootScope.profileData)
                .then(
                    function(response) {
                        if(response.userId) {
                            //go to next step
                            self._openFinishModal();
                        }
                    }
                );
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
        .controller(ModalBasicInfoController.controllerId,
                    ModalBasicInfoController);

}
