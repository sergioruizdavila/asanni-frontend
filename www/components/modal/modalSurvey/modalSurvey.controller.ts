/**
 * ModalSurveyController
 * @description - modal Forgot Password controller definition, generic modal
 * in order to show user forgotPassword form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalSurvey {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalSurveyController {
        close: () => void;
        validate: IModalSurveyValidate;
        activate: () => void;
    }

    interface IModalSurveyValidate {
        other: app.core.util.functionsUtil.IValid;
    }


    class ModalSurveyController implements IModalSurveyController {

        static controllerId = 'mainApp.components.modal.ModalSurveyController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        loading: boolean;
        success: boolean;
        optionsList: any;
        addActive: boolean;
        other: string;
        validate: IModalSurveyValidate;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            '$filter',
            '$uibModalInstance',
            'dataConfig',
            'mainApp.models.feature.FeatureService',
            'mainApp.models.feedback.FeedbackService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $filter: angular.IFilterService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataConfig: IDataConfig,
            private FeatureService: app.models.feature.IFeatureService,
            private FeedbackService: app.models.feedback.IFeedbackService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            // Init loading
            this.loading = true;

            // Init success message
            this.success = false;

            // Init options List
            this.optionsList = [];

            // Init Add option active
            this.addActive = false;

            // Init 'other feature' field
            this.other = '';

            // Build validate object fields
            this.validate = {
                other: {valid: true, message: ''}
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Open Survey Modal';
            //VARIABLES
            let self = this;
            //LOG
            DEBUG && console.log('modalSurvey controller actived');
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            // Get Features by Range
            this.FeatureService.getFeaturesByRange(this.dataConfig.featureMinId).then(
                function(response: app.models.teacher.ITeacherQueryObject) {
                    self.optionsList = response.results;
                    self.loading = false;
                }
            );

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
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate 'Other Feature' fields
            let other_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.other = this.functionsUtil.validator(this.other, other_rules);
            if(!this.validate.other.valid) {
                formValid = this.validate.other.valid;
            }

            return formValid;
        }



        /**
        * saveOption
        * @description - when user click select one survey option, send this one
        * to FeatureService in order to save it on database
        * @use - this.saveOption(option);
        * @function
        * @param {string} option - option selected or added
        * @param {boolean} isOther - If is a new option added by the user
        * @return {void}
        */

        saveOption(option: string, isOther: boolean = false): void {
            //CONSTANTS
            let click_mixpanel = '';

            //VARIABLES
            let self = this;
            let feedback = new app.models.feedback.Feedback();
            let formValid = true;

            // Validate if is a selected option or a added option
            if(isOther) {
                click_mixpanel = 'Click: Added new feature option: ' + option;
                //Validate data form
                formValid = this._validateForm();
                feedback.NextOtherFeature = option;
            } else {
                click_mixpanel = 'Click: Selected feature option: ' + option;
                feedback.NextFeature = parseInt(option);
            }

            if (!formValid) { return; }

            // show loading
            this.loading = true;

            // Save new feedback on DB
            this.FeedbackService.createFeedback(feedback).then(
                function(response) {
                    if(response.id) {
                        //Show success message
                        self.success = true;
                        self.loading = false;
                    }
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error modalSurvey.controller.js method: saveOption ';
                    Raven.captureMessage(ERROR_MESSAGE, error);
                }
            );


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
        .controller(ModalSurveyController.controllerId,
                    ModalSurveyController);

}
