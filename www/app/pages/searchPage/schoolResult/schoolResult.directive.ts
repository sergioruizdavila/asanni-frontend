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
        scope: { id: '=' };
        templateUrl: string = 'app/pages/searchPage/schoolResult/schoolResult.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$timeout'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $timeout) {
            DEBUG && console.log('maSchoolResult directive constructor');
        }

        link($scope: angular.IScope, elm: ng.IAugmentedJQuery, attr, ctrl): void {
            DEBUG && console.log('maSchoolResult link function');
            let frontFace: any = '';
            let backFace: any = '';
            this.$timeout(function(){
                frontFace = elm.find('#container-' + attr.id + ' .search-result__school__block__content--front');
                backFace = elm.find('#container-' + attr.id + ' .search-result__school__block__content--back')
            });


            elm.bind('mouseenter', function() {
                frontFace.addClass('hidden');
                backFace.removeClass('hidden');
                ctrl.hoverEvent(parseInt(attr.id), true);
            });
            elm.bind('mouseleave', function() {
                frontFace.removeClass('hidden');
                backFace.addClass('hidden');
                ctrl.hoverEvent(parseInt(attr.id), false);
            });
            elm.bind('click', function() {
                ctrl.goToDetails(attr.alias);
            });

        }

        /*-- INSTANCE FUNCTION --*/
        static instance($timeout): ISchoolResult {
            return new MaSchoolResult($timeout);
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
            hoverEvent: (id: number, status: boolean) => void;
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

                //Hide Loading when modal is rendered
                modalInstance.rendered.then(function() {
                    self.functionsUtil.hideMainLoading();
                });

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
            * @use - this.goToDetails('colombia-immersion-2');
            * @function
            * @param {string} aliasSchool - entity aliasSchool (school)
            * @return {void}
            */

            goToDetails(aliasSchool: string): void {
                const GOTO_MIXPANEL = 'Go to School Details: ' + aliasSchool;
                /************************/

                //MIXPANEL
                mixpanel.track(GOTO_MIXPANEL);

                var url = this.$state.href('page.schoolProfilePage', {aliasSchool: aliasSchool});
                window.open(url,'_blank');

                //Validate if user is Authenticated
                //this.isAuthenticated = this.AuthService.isAuthenticated();

                //If user is logged, go to createTeacher page (LEGACY)
                /*if(this.isAuthenticated) {
                    var url = this.$state.href('page.schoolProfilePage', {aliasSchool: aliasSchool});
                    window.open(url,'_blank');
                    return
                } else {
                    this.functionsUtil.showMainLoading();
                    this._openSignUpModal();
                }*/

            }



            /**
            * hoverEvent
            * @description - this method is launched  when user launchs
            * mouseover/mouseleave event on result container
            * @use - this._hoverEvent('10', true);
            * @function
            * @param {number} id - container result id
            * @param {boolean} status - mouseover = true / mouseleave = false
            */

            hoverEvent(id: number, status: boolean): void {
                //CONSTANTS
                const hoverClass = 'ma-box--border-hover';
                //VARIABLES
                let args = {id: id, status: status, typeOfMarker: 'long'};

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
