/**
* MaTeacherResult
* @description - MainApp Teacher Result on SearchPage Directive
* @example - <ma-teacher-result></ma-teacher-result>
*/

module app.pages.searchPage {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherResult extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaTeacherResult implements ITeacherResult {

        static directiveId = 'maTeacherResult';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = TeacherResultController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'app/pages/searchPage/teacherResult/teacherResult.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maTeacherResult directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maTeacherResult link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): ITeacherResult {
            return new MaTeacherResult();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .directive(MaTeacherResult.directiveId, MaTeacherResult.instance);


        /*********************************************************/
        /*                     CONTROLLER                        */
        /*********************************************************/
        /**
        * TeacherResultController
        * @description - Teacher Result Controller
        */

        /**********************************/
        /*           INTERFACES           */
        /**********************************/
        interface ITeacherResultController {
            activate: () => void;
        }

        interface ITeacherResultForm {
        }

        /****************************************/
        /*           CLASS DEFINITION           */
        /****************************************/
        export class TeacherResultController implements ITeacherResultController {

            static controllerId = 'mainApp.pages.searchPage.TeacherResultController';

            /**********************************/
            /*           PROPERTIES           */
            /**********************************/
            form: ITeacherResultForm;
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
                console.log('teacherResult controller actived');
            }


            /**********************************/
            /*            METHODS             */
            /**********************************/

            /**
            * goToDetails
            * @description - when user clicked a specific result, go to details
            * @use - this.goToDetails('2');
            * @function
            * @params {string} containerId - entity id (teacher)
            * @return {void}
            */

            goToDetails(containerId: string): void {
                var url = this.$state.href('page.teacherProfilePage', {id: containerId});
                window.open(url,'_blank');
            }



            /**
            * _assignNativeClass
            * @description - this method return if teacher is native or not
            * result (students, teachers, schools, etc)
            * @use - this._assignNativeClass(languages);
            * @function
            * @param {native Array, learn Array and teach Array} languages
            * teacher languages (native, teach and learn)
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
            * @description - take teacher ranking and calculate the rating average
            * @use - this._ratingAverage(ratingsArray);
            * @function
            * @param {Array<Object>} ratingsArr - list of rating objects
            * @return {number} rating average value
            */
            //TODO: Analizar por que puse Array<Object> en vez de Array<Rating>
            // y solucionar
            private _ratingAverage(ratingsArr: Array<Object>): number {
                return this.functionsUtil.teacherRatingAverage(ratingsArr);
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
            .controller(TeacherResultController.controllerId, TeacherResultController);

}
