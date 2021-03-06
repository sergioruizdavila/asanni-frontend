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
            'mainApp.models.user.UserService',
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
            '$uibModal',
            'waitForAuth'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private userService: app.models.user.IUserService,
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
            private $uibModal: ng.ui.bootstrap.IModalService,
            waitForAuth) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;
            let loggedUserId = this.$rootScope.userData.id;

            //Get current state
            let currentState = this.$state.current.name;

            //Init teacher instance
            this.$rootScope.teacherData = new app.models.teacher.Teacher();
            //Connect with user logged
            this.$rootScope.teacherData.Profile.UserId = loggedUserId;

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
            //CONSTANTS
            const ENTER_MIXPANEL = "Enter: Create Teacher Page";

            //LOG
            console.log('createTeacherPage controller actived');

            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            // If come from landing page in order to create a new teacher:
            // remove teacher id on localStorage
            if(this.$stateParams.type === 'new') {
                //TODO: testear muy bien el proceso de recomendar un profesor, ya que cambio mucho todo.
                this.localStorage.removeItem(this.dataConfig.teacherDataLocalStorage);
            }

            //Charge user profile data
            this.fillFormWithProfileData();

            //Charge teacher data if teacher entity exist on DB
            this.fillFormWithTeacherData();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * fillFormWithProfileData
        * @description - get user profile data from DB, and fill each field on form.
        * @function
        * @return void
        */
        fillFormWithProfileData(): void {
            // VARIABLES
            let self = this;
            let userId = this.$rootScope.userData.id;

            if(userId) {
                // GET USER PROFILE DATA
                this.userService.getUserProfileById(userId)
                .then(
                    function(response) {

                        if(response.userId) {
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                        }

                    }
                );
            }
        }


        /**
        * fillFormWithTeacherData
        * @description - get teacher data from DB, and fill each field on form.
        * @function
        * @return void
        */
        fillFormWithTeacherData(): void {
            // VARIABLES
            let self = this;
            let userId = this.$rootScope.userData.id;

            //Get teacher info by user logged Id
            this.teacherService.getTeacherByProfileId(userId).then(

                function(response) {

                    if(response.id) {

                        self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));
                        self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                        self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

                    } else {
                        //Remove teacherData in localStorage in order to be sure it's not junk data
                        self.localStorage.removeItem(self.dataConfig.teacherDataLocalStorage);
                    }

                }

            );

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
            * Save User Profile Data event
            * @description - Parent (CreateTeacherPageController) receive Child's
                             event in order to save user profile data on BD
            * @event
            */
            this.$scope.$on('Save Profile Data', function(event, args) {
                //CONSTANTS
                const SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                //VARIABLES
                let userId = self.$rootScope.profileData.UserId;
                /**************************************************************/

                if(userId) {
                    self.userService.updateUserProfile(self.$rootScope.profileData)
                    .then(
                        function(response) {
                            if(response.userId) {
                                //Go top pages
                                window.scrollTo(0, 0);
                                //Show message
                                self.messageUtil.success(SUCCESS_MESSAGE);

                                //Fill Form
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        },
                        function(error) {
                            DEBUG && console.error(error);
                        }
                    );
                }
            });


            /**
            * Save Data event
            * @description - Parent (CreateTeacherPageController) receive Child's
                             event in order to save teacher data on BD
            * @event
            */
            this.$scope.$on('Save Data', function(event, args) {
                //CONSTANTS
                const SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
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
                                //Save teacher data in localStorage
                                self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));

                                //Fill Form
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

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
                                //Save teacher data in localStorage
                                self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));
                                //Fill Form
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                // set isTeacher in true
                                self.$rootScope.profileData.IsTeacher = response.profile.isTeacher;
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
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
