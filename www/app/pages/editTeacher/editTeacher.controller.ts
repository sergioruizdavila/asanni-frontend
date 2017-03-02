/**
 * EditTeacherController
 * @description - Create Teacher Page Controller
 */

module app.pages.editTeacher {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditTeacherController {
        titleSection: string;
        activate: () => void;
    }

    interface ICreateTeacherError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditTeacherController implements IEditTeacherController {

        static controllerId = 'mainApp.pages.editTeacher.EditTeacherController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
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
            private dataConfig: IDataConfig,
            private $state: ng.ui.IStateService,
            private $stateParams: app.core.interfaces.IStateParamsData,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope,
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

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;

            //LOG
            console.log('editTeacher controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

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

                        self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                        self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);

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
            * @description - Parent (EditTeacherController) receive Child's
                             event in order to save user profile data on BD
            * @event
            */
            this.$scope.$on('Save Profile Data', function(event, args){
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
                                //Show message
                                //self.messageUtil.success(SUCCESS_MESSAGE);

                                //Fill Form
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                //TODO: Validar si esto es necesario ya que estoy guardando todo en $rootScope
                                // ya deberia poder tener acceso en los hijos
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        },
                        function(error) {
                            self.messageUtil.error('');
                            self.$scope.$broadcast('Fill User Profile Form', 'error');
                        }
                    );
                }
            });


            /**
            * Save Data event
            * @description - Parent (EditTeacherController) receive Child's
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
                                //Show message
                                //self.messageUtil.success(SUCCESS_MESSAGE);
                                //Fill Form
                                self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                //TODO: Validar si esto es necesario ya que estoy guardando todo en $rootScope
                                // ya deberia poder tener acceso en los hijos
                                self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                            }
                        },
                        function(error) {
                            //Show error
                            self.messageUtil.error('');
                            self.$scope.$broadcast('Fill Form', 'error');
                        }
                    );
                } else {
                    //TODO: Validar cuando no haya un teacherData Id
                    DEBUG && console.log('self.$rootScope.teacherData.Id doesn´t exist');
                }

            });

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editTeacher')
        .controller(EditTeacherController.controllerId,
                    EditTeacherController);

}
