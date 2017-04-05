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
        isAuthenticated: boolean;
        isTeacher: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.auth.AuthService',
            '$uibModal',
            'dataConfig',
            '$filter',
            '$scope',
            '$rootScope',
            '$state',
            'mainApp.localStorageService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
                    private AuthService: app.auth.IAuthService,
                    private $uibModal: ng.ui.bootstrap.IModalService,
                    private dataConfig: IDataConfig,
                    private $filter: angular.IFilterService,
                    private $scope: angular.IScope,
                    private $rootScope: app.core.interfaces.IMainAppRootScope,
                    private $state: ng.ui.IStateService,
                    private localStorage) {
            this.init();
        }


        /*-- INITIALIZE METHOD --*/
        private init() {

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

            //Validate if user is teacher
            if(this.$rootScope.profileData) {
                this.isTeacher = this.$rootScope.profileData.IsTeacher;
            }

            //Init form
            this.form = {
                whereTo: this.$filter('translate')('%header.search.placeholder.text')
            };

            this._slideout = false;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('header controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();
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
         * logout
         * @description - Log out current logged user (call AuthService to revoke token)
         * @use - this.logout();
         * @function
         * @return {void}
        */

        logout(): void {
            //VARIABLES
            let self = this;

            this.AuthService.logout().then(
                function(response) {
                    // Success
                    window.location.reload();
                },
                function(response) {
                    // Error
                    /* This can occur if connection to server is lost or server is down */
                    DEBUG && console.log('A problem occured while logging you out.');
                }
            );
        }



        /**
        * search
        * @description - TODO
        * @use - this.search('Colombia');
        * @function
        * @return {void}
        */

        search(country): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Search Teacher on SearchBox';
            //VARIABLES
            //Get current state
            let currentState = this.$state.current.name;
            this.form.whereTo = country;
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            if(currentState !== 'page.searchPage') {
                this.$state.go('page.searchPage', {country: country});
            } else {
                this.$rootScope.$broadcast('SearchCountry', country);
            }

        }


        /**
        * _openSignUpModal
        * @description - open Modal in order to sign up current user
        * @use - this._openSignUpModal();
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
                size: 'sm',
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: false
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);
        }



        /**
        * _openLogInModal
        * @description - open Modal in order to Log in action
        * @use - this._openLogInModal();
        * @function
        * @return {void}
        */
        private _openLogInModal(): void {

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                templateUrl: this.dataConfig.modalLogInTmpl,
                controller: 'mainApp.components.modal.ModalLogInController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: false
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            /* When modal is closed,validate if user is Authenticated in order to
            show current avatar user */
            modalInstance.result.then(function () {
                //Validate if user is Authenticated
                self.$rootScope.$broadcast('Is Authenticated');
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes HeaderController to Child's Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */
        private _subscribeToEvents(): void {
            // VARIABLES
            let self = this;

            /**
            * Is Authenticated event
            * @description - Parent (HeaderController) receive Child's
                             event in order to know if user is authenticated
            * @event
            */
            this.$scope.$on('Is Authenticated', function(event, args) {
                //Validate if user is Authenticated
                self.isAuthenticated = self.AuthService.isAuthenticated();
                //Validate if user is teacher
                if(self.$rootScope.profileData) {
                    self.isTeacher = self.$rootScope.profileData.IsTeacher;
                }
            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.header')
        .controller(HeaderController.controllerId, HeaderController);

}
