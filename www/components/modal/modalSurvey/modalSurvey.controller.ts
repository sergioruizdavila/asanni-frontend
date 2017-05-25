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
        activate: () => void;
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
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$rootScope',
            '$filter',
            '$uibModalInstance',
            'dataConfig',
            'mainApp.models.feature.FeatureService',
            'mainApp.models.feedback.FeedbackService',
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

            // show loading
            this.loading = true;

            // Validate if is a selected option or a added option
            if(isOther) {
                click_mixpanel = 'Click: Added new feature option: ' + option;
                feedback.NextOtherFeature = option;
            } else {
                click_mixpanel = 'Click: Selected feature option: ' + option;
                feedback.NextFeature = parseInt(option);
            }

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
