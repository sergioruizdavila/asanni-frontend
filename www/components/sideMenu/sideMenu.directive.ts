/**
* MaSideMenu
* @description - MainApp SideMenu Directive
* @example - <ma-side-menu></ma-side-menu>
*/

module components.sideMenu {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISideMenu extends angular.IDirective {}

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaSideMenu implements ISideMenu {

        static directiveId = 'maSideMenu';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = SideMenuController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        scope = {
            type: '@'
        };
        templateUrl: string = 'components/sideMenu/sideMenu.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            DEBUG && console.log('maSideMenu directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            DEBUG && console.log('maSideMenu link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): ISideMenu {
            return new MaSideMenu();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.sideMenu')
        .directive(MaSideMenu.directiveId, MaSideMenu.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * SideMenuController
    * @description - SideMenu Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface ISideMenuController {
        activate: () => void;
    }

    interface IOption {
        name: string;
        state: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SideMenuController implements ISideMenuController {

        static controllerId = 'mainApp.components.sideMenu.SideMenuController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        type: string;
        optionsList: Array<IOption>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$state', '$filter'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('sideMenu controller actived');

            //Create side menu options
            this._buildSideMenunOptions();
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _buildSideMenunOptions
        * @description - build options list button
        * @function
        * @return void
        */
        private _buildSideMenunOptions(): void {
            //VARIABLES
            let type = this.type;
            //CONSTANTS
            const TEACH_OPTION = this.$filter('translate')('%modal.recommend.teacher.invitation.message.teach.label.text');
            const EXPERIENCE_OPTION = this.$filter('translate')('%landing.teacher.badge_explanation.get.first_requirement.title.text');
            const EDUCATION_OPTION = this.$filter('translate')('%edit.teacher.education.menu.option.text');
            const METHODOLOGY_OPTION = this.$filter('translate')('%search.container.teacher.methodology.title.text');

            switch (type) {
                case 'edit-teacher':
                    this.optionsList = [
                        {
                            name: TEACH_OPTION,
                            state: 'page.editTeacher.teach'
                        },
                        {
                            name: EXPERIENCE_OPTION,
                            state: 'page.editTeacher.experience'
                        },
                        {
                            name: EDUCATION_OPTION,
                            state: 'page.editTeacher.education'
                        },
                        {
                            name: METHODOLOGY_OPTION,
                            state: 'page.editTeacher.methodology'
                        }

                    ];
                break;
                case 'edit-profile':

                break;
            }
        }


        /**
        * _currentState
        * @description - actived option based on current state
        * @function
        * @param state - state associated to option button
        * @return void
        */
        private _currentState(state) {
            //VARIABLES
            let currentState = this.$state.current.name;
            return state === currentState;
        }


        /**
        * _goToSection
        * @description - go to specific section
        * @function
        * @param state - state associated to option button
        * @return void
        */
        private _goToSection(state) {
            this.$state.go(state, {reload: true});
        }


        /**
        * _goToViewProfile
        * @description - go to user teacher profile
        * @function
        * @return void
        */
        private _goToViewProfile(id) {
            //this.$state.go(id, {reload: true});
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.sideMenu')
        .controller(SideMenuController.controllerId, SideMenuController);

}
