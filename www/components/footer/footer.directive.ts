/**
* MaFooter
* @description - MainApp Footer Directive
* @example - <ma-footer></ma-footer>
*/

module components.footer {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFooter extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaFooter implements IFooter {

        static directiveId = 'maFooter';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = FooterController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'components/footer/footer.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maFooter directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maFooter link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IFooter {
            return new MaFooter();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.footer')
        .directive(MaFooter.directiveId, MaFooter.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * FooterController
    * @description - Footer Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFooterController {
        activate: () => void;
    }

    export interface IFooterScope extends angular.IScope {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FooterController implements IFooterController {

        static controllerId = 'mainApp.components.footer.FooterController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('footer controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.footer')
        .controller(FooterController.controllerId, FooterController);

}
