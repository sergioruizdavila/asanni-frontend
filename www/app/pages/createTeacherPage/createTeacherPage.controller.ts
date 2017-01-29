/**
 * CreateTeacherPageController
 * @description - Create Teacher Page Controller
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICreateTeacherPageController {
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
        showHeaderFixed: boolean;
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
            '$stateParams',
            '$filter',
            '$scope',
            '$window',
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
            private $stateParams: app.core.interfaces.IStateParamsData,
            private $filter: angular.IFilterService,
            private $scope: ICreateTeacherScope,
            private $window,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //Get current state
            let currentState = this.$state.current.name;

            //Init teacher instance
            //this.teacherData = new app.models.teacher.Teacher();

            // Init header fixed
            //TODO: Remover esto de aqui, y colocarlo en un lugar global, ya que
            // despues de que la App paso por esta pagina, le bindea este evento
            // siempre, entonces cada vez que scrollee en cada pagina, va a entrar
            // por aqui.
            angular.element(this.$window).bind("scroll", function() {
                let floatHeader = document.getElementById('header-float');
                if(floatHeader) {
                    let floatHeaderClasses = floatHeader.classList;
                    if (this.pageYOffset >= 30) {
                        floatHeaderClasses.remove('hidden');
                    } else {
                        floatHeaderClasses.add('hidden');
                    }
                }
        });

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

            //MIXPANEL
            mixpanel.track("Enter: Create Teacher Page");

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            // If come from landing page in order to create a new teacher:
            // remove teacher id on localStorage
            if(this.$stateParams.type === 'new') {
                this.localStorage.setItem(this.dataConfig.teacherIdLocalStorage, '');
            }

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

            this.$rootScope.teacher_id = this.localStorage.getItem(this.dataConfig.teacherIdLocalStorage);

            if(this.$rootScope.teacher_id) {
                // GET TEACHER DATA
                this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                .then(
                    function(response) {
                        if(response.id) {

                            //self.teacherData = new app.models.teacher.Teacher(response);
                            //TEST
                            self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                            self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

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
                const SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                //VARIABLES
                let numStep = args;
                /******************************/

                if(self.$rootScope.teacherData.Id) {
                    // UPDATE EXISTING TEACHER
                    self.teacherService.updateTeacher(self.$rootScope.teacherData)
                    .then(
                        function(response) {
                            if(response.id) {
                                //Go top pages
                                window.scrollTo(0, 0);
                                //Show message
                                self.messageUtil.success(SUCCESS_MESSAGE);
                                //Save teacher id
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem(self.dataConfig.teacherIdLocalStorage, response.id);

                                //Fill Form
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

                            } else {
                                //error
                            }
                        }
                    );
                } else {
                    // CREATE NEW TEACHER
                    self.teacherService.createTeacher(self.$rootScope.teacherData)
                    .then(
                        function(response) {
                            if(response.id) {
                                //Go top pages
                                window.scrollTo(0, 0);
                                //Show message
                                self.messageUtil.success(SUCCESS_MESSAGE);
                                //Save teacher id
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem(self.dataConfig.teacherIdLocalStorage, response.id);

                                //Fill Form
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

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
