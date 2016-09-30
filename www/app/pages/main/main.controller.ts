/**
 * MainController
 * @description - Main Page Controller
 */

module app.pages.main {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMainController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MainController implements IMainController {

        static controllerId = 'mainApp.pages.main.MainController';

        /*-- INJECT DEPENDENCIES --*/
        //public static $inject = ['$scope'];

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
            console.log('main controller actived');
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.main')
        .controller(MainController.controllerId, MainController);

}
