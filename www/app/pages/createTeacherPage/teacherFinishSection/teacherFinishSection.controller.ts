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
            '$state',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.localStorageService'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: ITeacherFinishScope,
            private $state: ng.ui.IStateService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private localStorage) {
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

        _finishProcess() {
            //Clean teacher id in localStorage
            this.localStorage.setItem('waysily.teacher_id', '');
            //Go to teacher profile in order to show a preview profile
            this.$state.go('page.teacherProfilePage', {id: this.$scope.$parent.vm.teacherData.Id});
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherFinishSectionController.controllerId,
                    TeacherFinishSectionController);

}
