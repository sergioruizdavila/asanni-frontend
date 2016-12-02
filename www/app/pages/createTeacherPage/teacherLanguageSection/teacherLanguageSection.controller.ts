/**
 * TeacherLanguageSectionController
 * @description - Teacher Location Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherLanguageSectionController {
        form: ITeacherLanguageForm;
        error: ITeacherLanguageError;
        activate: () => void;
    }

    export interface ITeacherLanguageScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ITeacherLanguageForm {
        native: Array<string>;
        learn: Array<string>;
        teach: Array<string>;
    }


    export interface ITeacherLanguageError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherLanguageSectionController implements ITeacherLanguageSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherLanguageForm;
        error: ITeacherLanguageError;
        STEP2_STATE: string;
        STEP4_STATE: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$scope',
            '$timeout'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $scope: ITeacherLanguageScope,
            private $timeout) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;
            //CONSTANTS
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.STEP4_STATE = 'page.createTeacherPage.experience';
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(3, 9);

            //Init form
            this.form = {
                native: [],
                learn: [],
                teach: []
            };

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherLanguageSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {
            //CONSTANTS
            const CURRENT_STEP = 3;
            /*********************************/

            this._setDataModelFromForm();

            this.$scope.$emit('Save Data', CURRENT_STEP);

            // GO TO NEXT STEP
            this.$state.go(this.STEP4_STATE, {reload: true});

        }


        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            this._setDataModelFromForm();
            this.$scope.$emit('Save Data');
            this.$state.go(this.STEP2_STATE, {reload: true});
        }



        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(): void {

            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.Languages.Native = this.form.native;
            this.$scope.$parent.vm.teacherData.Languages.Learn = this.form.learn;
            this.$scope.$parent.vm.teacherData.Languages.Teach = this.form.teach;
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Teacher Location Section to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * Fill Form event
            * @parent - CreateTeacherPageController
            * @description - Parent send markers teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {

                self.form.native = args.Languages.Native;
                self.form.learn = args.Languages.Learn;
                self.form.teach = args.Languages.Teach;

            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherLanguageSectionController.controllerId,
                    TeacherLanguageSectionController);

}
