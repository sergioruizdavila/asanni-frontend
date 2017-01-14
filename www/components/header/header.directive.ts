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
        scope = true;
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
    interface IHeaderController {
        activate: () => void;
        slideNavMenu: () => void;
    }

    interface IHeaderForm {
        language: string;
        whereTo: string;
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
        form: IHeaderForm;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.util.FunctionsUtilService',
            '$uibModal',
            'dataConfig',
            '$filter',
            '$scope',
            '$rootScope',
            '$state'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
                    private $uibModal: ng.ui.bootstrap.IModalService,
                    private dataConfig: IDataConfig,
                    private $filter: angular.IFilterService,
                    private $scope: angular.IScope,
                    private $rootScope: angular.IRootScopeService,
                    private $state: ng.ui.IStateService) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {
            //Init form
            this.form = {
                language: this.functionsUtil.getCurrentLanguage() || 'en',
                whereTo: 'Where to?'
            };

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



        /**
        * changeLanguage
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */

        changeLanguage(): void {
            this.functionsUtil.changeLanguage(this.form.language);
        }



        /**
        * search
        * @description - TODO
        * @use - this.search('Colombia');
        * @function
        * @return {void}
        */

        search(country): void {
            //VARIABLES
            //Get current state
            let currentState = this.$state.current.name;
            this.form.whereTo = country;

            if(currentState !== 'page.searchPage') {
                this.$state.go('page.searchPage', {country: country});
            } else {
                this.$rootScope.$broadcast('SearchCountry', country);
            }

        }


        /**
        * _openSignUpModal
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */

        private _openSignUpModal(): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            event.preventDefault();
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.header')
        .controller(HeaderController.controllerId, HeaderController);

}
