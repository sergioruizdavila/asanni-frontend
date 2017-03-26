/**
 * EditProfileController
 * @description - Edit User Profile Page Controller
 */

module app.pages.editProfile {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditProfileController {
        activate: () => void;
    }

    interface IEditProfileError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditProfileController implements IEditProfileController {

        static controllerId = 'mainApp.pages.editProfile.EditProfileController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        isTeacher: boolean;
        teacherData: app.models.teacher.Teacher;
        progressWidth: string;
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

            if(this.$rootScope.profileData) {
                //Validate if is teacher to change some text on view
                this.isTeacher = this.$rootScope.profileData.IsTeacher;
            }

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Edit Profile Page';
            //VARIABLES
            let self = this;

            //LOG
            DEBUG && console.log('editProfile controller actived');

            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //Charge user profile data
            this.fillFormWithProfileData();

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
            * Save Profile Data event
            * @description - Parent (EditProfileController) receive Child's
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
                                //Fill Form
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                //TODO: Validar si esto es necesario ya que estoy guardando todo en $rootScope
                                // ya deberia poder tener acceso en los hijos
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                self.$scope.$broadcast('Saved');
                            }
                        },
                        function(error) {
                            self.messageUtil.error('');
                            self.$scope.$broadcast('Fill User Profile Form', 'error');
                        }
                    );
                }
            });

        }

    }


    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editProfile')
        .controller(EditProfileController.controllerId,
                    EditProfileController);

}
