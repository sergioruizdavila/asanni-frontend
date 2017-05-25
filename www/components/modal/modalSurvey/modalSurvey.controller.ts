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

    interface IModalSurveyScope extends ng.IScope {

    }

    interface IModalSurveyForm {
        option: string;
    }


    class ModalSurveyController implements IModalSurveyController {

        static controllerId = 'mainApp.components.modal.ModalSurveyController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalSurveyForm;
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

            //Init form
            this.form = {
                option: ''
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
        * saveOption
        * @description - when user click select one survey option, send this one
        * to FeatureService in order to save it on database
        * @use - this.saveOption(option);
        * @function
        * @return {void}
        */

        saveOption(option): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Selected feature option ' + option.id;
            //VARIABLES
            let self = this;
            let feedback = new app.models.feedback.Feedback();
            feedback.NextFeature = option.id;

            this.loading = true;

            this.FeedbackService.createFeedback(feedback).then(
                function(response) {
                    if(response.id) {
                        //Show success message
                        self.success = true;
                        self.loading = false;
                    }
                },
                function(error) {
                    //Show error
                    self.messageUtil.error('');
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
