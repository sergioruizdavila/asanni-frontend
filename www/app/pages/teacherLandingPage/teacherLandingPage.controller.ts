/**
 * TeacherLandingPageController
 * @description - TeacherLanding Page Controller
 */

module app.pages.teacherLandingPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherLandingPageController {
        activate: () => void;
    }

    export interface ITeacherLandingScope extends angular.IScope {

    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ITeacherLandingForm {
        language: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherLandingPageController implements ITeacherLandingPageController {

        static controllerId = 'mainApp.pages.teacherLandingPage.TeacherLandingPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherLandingForm;
        teacherData: Array<app.models.teacher.Teacher>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['mainApp.models.teacher.TeacherService',
                                 '$state',
                                 'dataConfig',
                                 '$translate',
                                 '$uibModal'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private TeacherService: app.models.teacher.ITeacherService,
            private $state: ng.ui.IStateService,
            private dataConfig: IDataConfig,
            private $translate: angular.translate.ITranslateService,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Init form
            this.form = {
                language: this.$translate.use() || 'en'
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;

            // Init teacher Example data
            this.teacherData = [];

            //LOG
            console.log('teacherLandingPage controller actived');

            this.TeacherService.getTeacherById('1').then(
                function(response: app.models.teacher.Teacher) {
                    self.teacherData.push(response);
                }
            );
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        changeLanguage(): void {
             this.$translate.use(this.form.language);
        }

        /**
        * _openSignUpModal
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
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
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            event.preventDefault();
        }


        gotoCreate(): void {
            this.$state.go('page.createTeacherPage', {reload: true});
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.teacherLandingPage')
        .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);

}
