/**
 * TeacherWelcomeSectionController
 * @description - Teacher Welcome Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherWelcomeSectionController {
        activate: () => void;
    }

    export interface ITeacherWelcomeScope extends angular.IScope {
        $parent: IParentScope;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherWelcomeSectionController implements ITeacherWelcomeSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherWelcomeSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        STEP1_STATE: string;
        INITIAL_PROGRESS_WIDTH: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            '$state',
            '$scope',
            'mainApp.core.util.FunctionsUtilService'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $scope: ITeacherWelcomeScope,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
            this.INITIAL_PROGRESS_WIDTH = '2%';

            // Update progress bar width
            this.$scope.$parent.vm.progressWidth = this.INITIAL_PROGRESS_WIDTH;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherWelcomeSectionController controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * goToStart
        * @description - go to first step
        * @function
        * @return void
        */

        goToStart(): void {
            this.$state.go(this.STEP1_STATE, {reload: true});
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherWelcomeSectionController.controllerId,
                    TeacherWelcomeSectionController);

}
