/**
 * CreateTeacherPageController
 * @description - Create Teacher Page Controller
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICreateTeacherPageController {
        teacherData: app.models.teacher.Teacher;
        progressWidth: string;
        titleSection: string;
        form: ICreateTeacherForm;
        error: ICreateTeacherError;
        activate: () => void;
    }

    interface ICreateTeacherScope extends angular.IScope {

    }

    interface ICreateTeacherForm {
    }

    interface ICreateTeacherError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CreateTeacherPageController implements ICreateTeacherPageController {

        static controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ICreateTeacherForm;
        error: ICreateTeacherError;
        teacherData: app.models.teacher.Teacher;
        progressWidth: string;
        titleSection: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.models.teacher.TeacherService',
            'mainApp.core.util.messageUtilService',
            'mainApp.localStorageService',
            'dataConfig',
            '$state',
            '$filter',
            '$scope',
            '$rootScope',
            '$uibModal'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private teacherService: app.models.teacher.ITeacherService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private localStorage,
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ICreateTeacherScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Get current state
            let currentState = this.$state.current.name;

            //Init teacher instance
            this.teacherData = new app.models.teacher.Teacher();

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;

            //LOG
            console.log('createTeacherPage controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //Charge teacher data if teacher entity exist on DB
            this.fillFormWithTeacherData();
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * fillFormWithTeacherData
        * @description - get teacher data from DB, and fill each field on form.
        * @function
        * @return void
        */
        fillFormWithTeacherData(): void {
            // VARIABLES
            let self = this;

            this.$rootScope.teacher_id = this.localStorage.getItem('waysily.teacher_id');

            if(this.$rootScope.teacher_id) {
                // GET TEACHER DATA
                this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                .then(
                    function(response) {
                        if(response.id) {

                            self.teacherData = new app.models.teacher.Teacher(response);
                            self.$scope.$broadcast('Fill Form', self.teacherData);

                        } else {
                            //error
                        }
                    }
                );
            }
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Create Teacher Page to Child's Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            // VARIABLES
            let self = this;

            /**
            * Save Data event
            * @description - Parent (CreateTeacherPageController) receive Child's
                             event in order to save teacher data on BD
            * @event
            */
            this.$scope.$on('Save Data', function(event, args) {
                //CONSTANTS
                let SUCCESS_MESSAGE = 'Successfully saved!';
                //VARIABLES
                let numStep = args;
                /******************************/

                if(self.teacherData.Id) {
                    // UPDATE EXISTING TEACHER
                    self.teacherService.updateTeacher(self.teacherData)
                    .then(
                        function(response) {
                            if(response.id) {
                                //Show message
                                self.messageUtil.success(SUCCESS_MESSAGE);
                                //Save teacher id
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);

                                //Fill Form
                                self.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.teacherData);

                            } else {
                                //error
                            }
                        }
                    );
                } else {
                    // CREATE NEW TEACHER
                    self.teacherService.createTeacher(self.teacherData)
                    .then(
                        function(response) {
                            if(response.id) {
                                //Show message
                                self.messageUtil.success(SUCCESS_MESSAGE);
                                //Save teacher id
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);

                                //Fill Form
                                self.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.teacherData);

                            } else {
                                //error
                            }
                        }
                    );
                }

            });

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(CreateTeacherPageController.controllerId,
                    CreateTeacherPageController);

}
