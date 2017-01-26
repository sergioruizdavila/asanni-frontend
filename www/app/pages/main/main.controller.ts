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
        public static $inject = [
            '$state',
            '$rootScope',
            'mainApp.localStorageService',
            'dataConfig'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $state: ng.ui.IStateService,
                    private $rootScope: app.core.interfaces.IMainAppRootScope,
                    private localStorage,
                    private dataConfig: IDataConfig) {
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
            let earlyId = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
            //Get current state
            let currentState = this.$state.current.name;

            //Show/Hide Float Message Bar
            //TODO: Si estoy en createTeacherPage oculta el float message bar
            // ya que molestaria al usuario si esta por crear su cuenta como profesor.
            // Solucion temporal para no gastar mucho tiempo en este tema.
            //Remover cuando sea necesario.
            if(currentState.indexOf('page.createTeacherPage') !== -1) {
                this.$rootScope.activeMessageBar = false;
            } else {
                this.$rootScope.activeMessageBar = earlyId ? true: false;
            }


            //LOG
            console.log('main controller actived');

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.main')
        .controller(MainController.controllerId, MainController);

}
