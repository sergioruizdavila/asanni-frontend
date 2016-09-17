/**
* MaHeader
* @description - MainApp Header Directive
* @example - <ma-header></ma-header>
*/

module components.header {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IHeader extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaHeader implements IHeader {

        static directiveId = 'maHeader';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = HeaderController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'components/header/header.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maHeader directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maHeader link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IHeader {
            return new MaHeader();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.header')
        .directive(MaHeader.directiveId, MaHeader.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * HeaderController
    * @description - Header Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IHeaderController {
        slideout: boolean;
        activate: () => void;
        navMenu: () => void;
    }

    export interface IHeaderScope extends angular.IScope {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class HeaderController implements IHeaderController {

        static controllerId = 'mainApp.components.header.HeaderController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        slideout: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['$scope', 'finApp.core.util.FunctionsUtilService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this.slideout = false;
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            console.log('header controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * navMenu method
        * @description Show or Hide Nav Menu when user press 'menu' button
        * (small devices)
        */
        navMenu(): void {
            this.slideout = !this.slideout;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.header')
        .controller(HeaderController.controllerId, HeaderController);

}
