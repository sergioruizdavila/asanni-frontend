/**
 * TeacherFinishSectionController
 * @description - Teacher Finish Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherFinishSectionController {
        activate: () => void;
    }

    export interface ITeacherFinishScope extends angular.IScope {
        $parent: IParentScope;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherFinishSectionController implements ITeacherFinishSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$scope',
            'mainApp.core.util.FunctionsUtilService'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: ITeacherFinishScope,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            // Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherFinishSectionController controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherFinishSectionController.controllerId,
                    TeacherFinishSectionController);

}
