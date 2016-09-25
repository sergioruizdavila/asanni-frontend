/**
 * SearchPageController
 * @description - Search Page Controller
 */

module app.pages.searchPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISearchPageController {
        error: ISearchPageError;
        activate: () => void;
    }

    export interface ISearchPageError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SearchPageController implements ISearchPageController {

        static controllerId = 'mainApp.pages.searchPage.SearchPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        error: ISearchPageError;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$filter',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('searchPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/



    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .controller(SearchPageController.controllerId, SearchPageController);

}
