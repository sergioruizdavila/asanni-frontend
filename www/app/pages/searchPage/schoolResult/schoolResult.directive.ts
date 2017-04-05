/**
* MaSchoolResult
* @description - MainApp School Result on SearchPage Directive
* @example - <ma-school-result></ma-school-result>
*/

module app.pages.searchPage {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISchoolResult extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaSchoolResult implements ISchoolResult {

        static directiveId = 'maSchoolResult';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = SchoolResultController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'app/pages/searchPage/schoolResult/schoolResult.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            DEBUG && console.log('maSchoolResult directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            DEBUG && console.log('maSchoolResult link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): ISchoolResult {
            return new MaSchoolResult();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .directive(MaSchoolResult.directiveId, MaSchoolResult.instance);


        /*********************************************************/
        /*                     CONTROLLER                        */
        /*********************************************************/
        /**
        * SchoolResultController
        * @description - School Result Controller
        */

        /**********************************/
        /*           INTERFACES           */
        /**********************************/
        interface ISchoolResultController {
            activate: () => void;
        }

        /****************************************/
        /*           CLASS DEFINITION           */
        /****************************************/
        export class SchoolResultController implements ISchoolResultController {

            static controllerId = 'mainApp.pages.searchPage.SchoolResultController';

            /**********************************/
            /*           PROPERTIES           */
            /**********************************/
            private _hoverDetail: Array<boolean>;
            isAuthenticated: boolean;
            // --------------------------------


            /*-- INJECT DEPENDENCIES --*/
            static $inject = [
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.school.SchoolService',
                'mainApp.auth.AuthService',
                '$uibModal',
                'dataConfig',
                '$filter',
                '$state',
                '$rootScope'
            ];


            /**********************************/
            /*           CONSTRUCTOR          */
            /**********************************/
            constructor(private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
                        private SchoolService: app.models.school.ISchoolService,
                        private AuthService: app.auth.IAuthService,
                        private $uibModal: ng.ui.bootstrap.IModalService,
                        private dataConfig: IDataConfig,
                        private $filter: angular.IFilterService,
                        private $state: ng.ui.IStateService,
                        private $rootScope: angular.IRootScopeService) {
                this.init();
            }


            /*-- INITIALIZE METHOD --*/
            private init() {

                //Init hoverDetail array
                this._hoverDetail = [];

                this.activate();
            }

            /*-- ACTIVATE METHOD --*/
            activate(): void {
                //LOG
                DEBUG && console.log('schoolResult controller actived');
            }


            /**********************************/
            /*            METHODS             */
            /**********************************/


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
            * _chooseMinorPrice
            * @description - take school ranking and calculate the rating average
            * @use - this._chooseMinorPrice(priceSchoolObj);
            * @function
            * @param {any} prices - school's prices
            * @return {number} minor price
            */
            /*NOTE: It's 'any' because the data that I receive is item.price not
            vm.data.Price (A price instance)*/
            private _chooseMinorPrice(prices: any): number {
                let priceInstance = new app.models.school.Price(prices);
                return this.SchoolService.getMinorSchoolPrice(priceInstance);
            }



            /**
            * _ratingFeatureAverage
            * @description - Calculate school rating feature average
            * @use - this._ratingFeatureAverage();
            * @function
            * @return {number} average - average value
            */

            private _ratingFeatureAverage(school): number {
                let schoolInstance = new app.models.school.School(school);
                return this.SchoolService.schoolFeatureRatingAverage(schoolInstance);
            }



            /**
            * goToDetails
            * @description - when user clicked a specific result, go to details
            * @use - this.goToDetails('2');
            * @function
            * @param {string} containerId - entity id (school)
            * @return {void}
            */

            goToDetails(containerId: string): void {
                const GOTO_MIXPANEL = 'Go to School Details: ' + containerId;
                /************************/

                //MIXPANEL
                mixpanel.track(GOTO_MIXPANEL);

                //Validate if user is Authenticated
                this.isAuthenticated = this.AuthService.isAuthenticated();

                //If user is logged, go to createTeacher page
                if(this.isAuthenticated) {
                    var url = this.$state.href('page.schoolProfilePage', {id: containerId});
                    window.open(url,'_blank');
                    return
                } else {
                    this._openSignUpModal();
                }

            }



            /**
            * _hoverEvent
            * @description - this method is launched  when user launchs
            * mouseover/mouseleave event on result container
            * @use - this._hoverEvent('10', true);
            * @function
            * @param {string} id - container result id
            * @param {boolean} status - mouseover = true / mouseleave = false
            */

            private _hoverEvent(id: string, status: boolean): void {
                //CONSTANTS
                const hoverClass = 'ma-box--border-hover';
                //VARIABLES
                let args = {id: id, status: status, typeOfMarker: 'long'};
                this._hoverDetail[id] = status;

                let containers = document.getElementsByClassName(hoverClass);

                for (let i = 0; i < containers.length; i++) {
                    let containerClasses = containers[i].classList;
                    containerClasses.remove(hoverClass);
                }

                /*
                * Send event to child (MapController) in order to It changes icon in
                * specific Marker on the Map
                */
                this.$rootScope.$broadcast('ChangeMarker', args);
            }


        }

        /*-- MODULE DEFINITION --*/
        angular.module('mainApp.pages.searchPage')
            .controller(SchoolResultController.controllerId, SchoolResultController);

}
