/**
* MaRating
* @description - MainApp Rating Directive
* @example - <ma-rating></ma-rating>
*/

module components.rating {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IRating extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaRating implements IRating {

        static directiveId = 'maRating';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = RatingController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        scope = {
            ratingValue: '=',
            size: '@'
        };
        templateUrl: string = 'components/rating/rating.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maRating directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maRating link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IRating {
            return new MaRating();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.rating')
        .directive(MaRating.directiveId, MaRating.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * RatingController
    * @description - Rating Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IRatingController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class RatingController implements IRatingController {

        static controllerId = 'mainApp.components.rating.RatingController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        ratingValue: number;
        size: string;
        private _ratingList: Array<string>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        //static $inject = [];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            //init stars list
            this._ratingList = [];
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('rating controller actived');

            //Create stars List
            this._calcuteStars();
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        //TODO: colocar descripcion
        private _calcuteStars(): void {
            let value = this.ratingValue;
            let halfValue = value / 2;

            for (let i = 0; i < 5; i++) {

                if(halfValue >= 1){
                    this._ratingList.push('star');
                } else if (halfValue == 0.5) {
                    this._ratingList.push('star_half');
                } else if (halfValue <= 0) {
                    this._ratingList.push('star_border');
                }

                halfValue = halfValue - 1;
            }
        }


        //TODO: colocar descripcion
        private _assignClass(): string {
            return 'ma-stars__icon--' + this.size;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.rating')
        .controller(RatingController.controllerId, RatingController);

}
