/**
* MaMeter
* @description - MainApp Meter Directive
* @example - <ma-meter></ma-meter>
*/

module components.meter {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMeter extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaMeter implements IMeter {

        static directiveId = 'maMeter';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = MeterController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        scope = {
            meterValue: '=',
            size: '@',
            showLabel: '=',
            showBorder: '='
        };
        templateUrl: string = 'components/meter/meter.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            DEBUG && console.log('maMeter directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            DEBUG && console.log('maMeter link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IMeter {
            return new MaMeter();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.meter')
        .directive(MaMeter.directiveId, MaMeter.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * MeterController
    * @description - Meter Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IMeterController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MeterController implements IMeterController {

        static controllerId = 'mainApp.components.meter.MeterController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        CIRCLES_AMOUNT: number;
        meterValue: number;
        size: string;
        showLabel: boolean;
        showBorder: boolean;
        private _title: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$filter'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $filter: angular.IFilterService) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            //CONSTANTS
            this.CIRCLES_AMOUNT = 5;

            // init label title
            this._title = '';
            if(this.showLabel) {
                this._assignTitle();
            }

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('meter controller actived');

        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _assignMeterClass
        * @description - this method assign the specific class to meter block
        * (e.g. size class and rating class)
        * @use - this._assignMeterClass();
        * @function
        * @return {string} - meter style classes
        */

        private _assignMeterClass(): string {
            let ratingClass = 'ma-meter--rating-' + this.meterValue;
            let meterClass = 'ma-meter--' + this.size;
            let borderClass = 'ma-meter--border ma-meter--border-1';
            let joinedClass = '';

            if(this.showBorder) {
                joinedClass = ratingClass + ' ' + meterClass + ' ' + borderClass;

            } else {
                joinedClass = ratingClass;
            }

            return joinedClass;
        }



        /**
        * _assignTitle
        * @description - this method assign the specific title (bad, good, great, etc)
        * to meter component
        * @use - this._assignTitle();
        * @function
        * @return {void}
        */

        private _assignTitle(): void {

            //CONSTANTS
            const BAD_TEXT = this.$filter('translate')('%global.rating.bad.label.text');
            const REGULAR_TEXT = this.$filter('translate')('%global.rating.regular.label.text');
            const OKAY_TEXT = this.$filter('translate')('%global.rating.okay.label.text');
            const GOOD_TEXT = this.$filter('translate')('%global.rating.good.label.text');
            const GREAT_TEXT = this.$filter('translate')('%global.rating.great.label.text');

            let title = '';

            switch (this.meterValue) {
                case 1:
                    title = BAD_TEXT;
                break;
                case 2:
                    title = REGULAR_TEXT;
                break;
                case 3:
                    title = OKAY_TEXT;
                break;
                case 4:
                    title = GOOD_TEXT;
                break;
                case 5:
                    title = GREAT_TEXT;
                break;
                default:
                    title = GOOD_TEXT;
                break;
            }

            this._title = title;
        }



        /**
        * _assignCircleClass
        * @description - this method assign the specific class to each circle
        * @use - this._assignCircleClass();
        * @function
        * @return {string} circle style class
        */

        private _assignCircleClass(): string {
            return 'circle--' + this.size;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.meter')
        .controller(MeterController.controllerId, MeterController);

}
