/**
* MaFloatMessageBar
* @description - MainApp FloatMessageBar Directive
* @example - <ma-float-message-bar></ma-float-message-bar>
*/

module components.floatMessageBar {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFloatMessageBar extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaFloatMessageBar implements IFloatMessageBar {

        static directiveId = 'maFloatMessageBar';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = FloatMessageBarController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        scope = true;
        templateUrl: string = 'components/floatMessageBar/floatMessageBar.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maFloatMessageBar directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maFloatMessageBar link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IFloatMessageBar {
            return new MaFloatMessageBar();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.floatMessageBar')
        .directive(MaFloatMessageBar.directiveId, MaFloatMessageBar.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/

    /**
    * FloatMessageBarController
    * @description - FloatMessageBar Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IFloatMessageBarController {
        activate: () => void;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FloatMessageBarController implements IFloatMessageBarController {

        static controllerId = 'mainApp.components.floatMessageBar.FloatMessageBarController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'dataConfig',
            '$filter',
            '$scope',
            '$rootScope',
            '$state'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private dataConfig: IDataConfig,
                    private $filter: angular.IFilterService,
                    private $scope: angular.IScope,
                    private $rootScope: angular.IRootScopeService,
                    private $state: ng.ui.IStateService) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('floatMessageBar controller actived');
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/

        //TODO: Poner descripcion
        _join(): void {
            //CONSTANTS
            const CREATE_TEACHER = 'page.createTeacherPage.start';
            const CLICK_MIXPANEL = 'Click: Join as a teacher from floatMessageBar';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);
            // GO TO NEXT STEP
            this.$state.go(CREATE_TEACHER, {reload: true});
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.floatMessageBar')
        .controller(FloatMessageBarController.controllerId, FloatMessageBarController);

}
