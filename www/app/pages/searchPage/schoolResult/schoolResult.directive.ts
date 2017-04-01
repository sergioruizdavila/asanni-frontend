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

        interface ISchoolResultForm {
        }

        /****************************************/
        /*           CLASS DEFINITION           */
        /****************************************/
        export class SchoolResultController implements ISchoolResultController {

            static controllerId = 'mainApp.pages.searchPage.SchoolResultController';

            /**********************************/
            /*           PROPERTIES           */
            /**********************************/
            form: ISchoolResultForm;
            private _hoverDetail: Array<boolean>;
            // --------------------------------


            /*-- INJECT DEPENDENCIES --*/
            static $inject = [
                'mainApp.core.util.FunctionsUtilService',
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
                        private $uibModal: ng.ui.bootstrap.IModalService,
                        private dataConfig: IDataConfig,
                        private $filter: angular.IFilterService,
                        private $state: ng.ui.IStateService,
                        private $rootScope: angular.IRootScopeService) {
                this.init();
            }


            /*-- INITIALIZE METHOD --*/
            private init() {

                //Init form
                this.form = {

                };

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
            * goToDetails
            * @description - when user clicked a specific result, go to details
            * @use - this.goToDetails('2');
            * @function
            * @params {string} containerId - entity id (school)
            * @return {void}
            */

            goToDetails(containerId: string): void {
                var url = this.$state.href('page.schoolProfilePage', {id: containerId});
                window.open(url,'_blank');
            }



            /**
            * _assignNativeClass
            * @description - this method return if school is native or not
            * result (students, schools, schools, etc)
            * @use - this._assignNativeClass(languages);
            * @function
            * @param {native Array, learn Array and teach Array} languages
            * school languages (native, teach and learn)
            * @return {boolean} isNative
            */

            private _assignNativeClass(languages): boolean {
                let native = languages.native;
                let teach = languages.teach;
                let isNative = false;

                for (let i = 0; i < native.length; i++) {
                    for (let j = 0; j < teach.length; j++) {
                        if(teach[j] === native[i]) {
                            isNative = true;
                        }
                    }
                }

                return isNative;
            }



            /**
            * _ratingAverage
            * @description - take school ranking and calculate the rating average
            * @use - this._ratingAverage(ratingsArray);
            * @function
            * @param {Array<Object>} ratingsArr - list of rating objects
            * @return {number} rating average value
            */
            //TODO: Analizar por que puse Array<Object> en vez de Array<Rating>
            // y solucionar
            /*private _ratingAverage(ratingsArr: Array<Object>): number {
                return this.functionsUtil.schoolRatingAverage(ratingsArr);
            }*/



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
                //VARIABLES
                let args = {id: id, status: status};
                this._hoverDetail[id] = status;
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
