/**
* MaSurvey
* @description - MainApp Survey Directive
* @example - <ma-survey></ma-survey>
*/

module components.survey {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISurvey extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaSurvey implements ISurvey {

        static directiveId = 'maSurvey';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = SurveyController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        scope = {
            surveyValue: '=',
            size: '@',
            showLabel: '=',
            showBorder: '='
        };
        templateUrl: string = 'components/survey/survey.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            DEBUG && console.log('maSurvey directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            DEBUG && console.log('maSurvey link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): ISurvey {
            return new MaSurvey();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.survey')
        .directive(MaSurvey.directiveId, MaSurvey.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * SurveyController
    * @description - Survey Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface ISurveyController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SurveyController implements ISurveyController {

        static controllerId = 'mainApp.components.survey.SurveyController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        CIRCLES_AMOUNT: number;
        surveyValue: number;
        size: string;
        showLabel: boolean;
        showBorder: boolean;
        private _title: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$filter',
                          '$uibModal',
                          'dataConfig'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $filter: angular.IFilterService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private dataConfig: IDataConfig) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('survey controller actived');

        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _openSurveyModal
        * @description - open Modal in order to fill a new features survey
        * @use - this._openSurveyModal();
        * @function
        * @return {void}
        */
        private _openSurveyModal(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click on Survey Button';
            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: true,
                size:'sm',
                templateUrl: this.dataConfig.modalSurveyTmpl,
                controller: 'mainApp.components.modal.ModalSurveyController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            mixpanel.track(CLICK_MIXPANEL);
        }



    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.survey')
        .controller(SurveyController.controllerId, SurveyController);

}
