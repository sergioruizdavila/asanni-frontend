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

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        //public static $inject = [];

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
            //VARIABLES
            let self = this;

            //LOG
            console.log('main controller actived');

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.main')
        .controller(MainController.controllerId, MainController);

}
