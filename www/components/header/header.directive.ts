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
        activate: () => void;
        slideNavMenu: () => void;
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
        private _slideout: boolean;
        // --------------------------------


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            this._slideout = false;
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('header controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * slideNavMenu method
        * @description Show or Hide Nav Menu when user press 'menu' button
        * (small devices)
        */
        slideNavMenu(): void {
            this._slideout = !this._slideout;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.header')
        .controller(HeaderController.controllerId, HeaderController);

}
