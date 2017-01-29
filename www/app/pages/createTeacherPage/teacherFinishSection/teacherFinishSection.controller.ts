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
            '$rootScope',
            '$state',
            'dataConfig',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.localStorageService'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: ITeacherFinishScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $state: ng.ui.IStateService,
            private dataConfig: IDataConfig,
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

            //MIXPANEL
            mixpanel.track("Enter: Finish Create Teacher Process");

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        _finishProcess() {
            //Clean teacher id in localStorage
            this.localStorage.setItem(this.dataConfig.teacherIdLocalStorage, '');
            //Clean early adopter id in localStorage
            this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, '');

            //Go to teacher profile in order to show a preview profile
            //this.$state.go('page.teacherProfilePage', {id: this.$scope.$parent.vm.teacherData.Id});
            //MIXPANEL
            mixpanel.track("Finish Process: Create Teacher", {
                "id": this.$rootScope.teacherData.Id,
                "name": this.$rootScope.teacherData.FirstName + ' ' + this.$rootScope.teacherData.LastName,
                "email": this.$rootScope.teacherData.Email
            });

            this.$state.go('page.landingPage');
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherFinishSectionController.controllerId,
                    TeacherFinishSectionController);

}
