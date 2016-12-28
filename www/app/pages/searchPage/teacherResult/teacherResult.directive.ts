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
        controller = app.pages.searchPage.SearchPageController.controllerId;
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
        
}
