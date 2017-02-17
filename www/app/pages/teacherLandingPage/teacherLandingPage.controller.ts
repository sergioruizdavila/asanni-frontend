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
        profileFake: app.models.user.Profile;
        teacherFake: app.models.teacher.Teacher;
        isAuthenticated: boolean;
        TEACHER_FAKE_TMPL: string;
        private _hoverDetail: Array<boolean>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$scope',
                                 'mainApp.core.util.FunctionsUtilService',
                                 'mainApp.auth.AuthService',
                                 '$state',
                                 'dataConfig',
                                 '$uibModal',
                                 '$rootScope',
                                 'mainApp.localStorageService'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: angular.IScope,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private AuthService: app.auth.IAuthService,
            private $state: ng.ui.IStateService,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private localStorage) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

            //Init form
            this.form = {
                language: this.functionsUtil.getCurrentLanguage() || 'en'
            };

            //Init hoverDetail array
            this._hoverDetail = [];

            // Init teacher fake data
            this._buildFakeTeacher();

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            this.TEACHER_FAKE_TMPL = 'app/pages/teacherLandingPage/teacherContainerExample/teacherContainerExample.html';
            //VARIABLES
            let self = this;

            //LOG
            console.log('teacherLandingPage controller actived');

            //MIXPANEL
            mixpanel.track("Enter: Teacher Landing Page");

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * changeLanguage
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */

        changeLanguage(): void {
             this.functionsUtil.changeLanguage(this.form.language);
             mixpanel.track("Change Language on teacherLandingPage");
        }



        /**
        * _openSignUpModal
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @param {ng.IAngularEvent} event - to identify if click come from hero and bottom button page
        * @return {void}
        */

        private _openSignUpModal(event): void {
            let self = this;
            let hasNextStep = false;

            //If user is logged, go to createTeacher page
            if(this.isAuthenticated){
                this.goToCreate();
                return
            }

            // get if come from create teacher button
            if(event.target.id === 'hero-go-to-button') {
                hasNextStep = true;
            }
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: hasNextStep
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //MIXPANEL
            mixpanel.track("Click on 'Join as Student' teacher landing page header");

        }



        /**
        * _openLogInModal
        * @description - open Modal in order to Log in action
        * @use - this._openLogInModal();
        * @function
        * @return {void}
        */

        private _openLogInModal(): void {
            //MIXPANEL
            mixpanel.track("Click on 'Log in' from teacher landing page");

            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                templateUrl: this.dataConfig.modalLogInTmpl,
                controller: 'mainApp.components.modal.ModalLogInController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            hasNextStep: false
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            /* When modal is closed,validate if user is Authenticated in order to
            show current avatar user */
            modalInstance.result.then(function () {
                //Validate if user is Authenticated
                self.$rootScope.$broadcast('Is Authenticated', false);
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

        }



        /**
         * logout
         * @description - Log out current logged user (call AuthService to revoke token)
         * @use - this.logout();
         * @function
         * @return {void}
        */

        logout(): void {
            //VARIABLES
            let self = this;

            this.AuthService.logout().then(
                function(response) {
                    // Success
                    window.location.reload();
                },
                function(response) {
                    // Error
                    /* This can occur if connection to server is lost or server is down */
                    DEBUG && console.log('A problem occured while logging you out.');
                }
            );
        }



        /**
        * _buildFakeTeacher
        * @description - this method build fake teacher container example
        * @use - this._buildFakeTeacher();
        * @function
        * @return {void}
        */

        private _buildFakeTeacher(): void {

            this.profileFake = new app.models.user.Profile();
            this.teacherFake = new app.models.teacher.Teacher();

            this.profileFake.UserId = '1';
            this.profileFake.FirstName = 'Dianne';
            this.profileFake.BornCity = 'New York';
            this.profileFake.BornCountry = 'United States';
            this.profileFake.Avatar = 'https://waysily-img.s3.amazonaws.com/b3605bad-0924-4bc1-98c8-676c664acd9d-example.jpeg';
            this.teacherFake.Methodology = 'I can customize the lessons to fit your needs. I teach conversational English to intermediate and advanced students with a focus on grammar, pronunciation, vocabulary and clear fluency and Business English with a focus on formal English in a business setting (role-play), business journal articles, and technical, industry based vocabulary';
            this.teacherFake.TeacherSince = '2013';
            this.teacherFake.Type = 'H';
            this.teacherFake.Languages.Native = ['6'];
            this.teacherFake.Languages.Teach = ['6', '8'];
            this.teacherFake.Languages.Learn = ['8','7'];
            this.teacherFake.Immersion.Active = true;
            this.teacherFake.Price.PrivateClass.Active = true;
            this.teacherFake.Price.PrivateClass.HourPrice = 20.00;
            this.teacherFake.Price.GroupClass.Active = true;
            this.teacherFake.Price.GroupClass.HourPrice = 15.00;

        }



        /**
        * _hoverEvent
        * @description - this method is launched  when user launchs
        * mouseover/mouseleave event on teacher fake container
        * @use - this._hoverEvent('1', true);
        * @function
        * @param {string} id - container result id
        * @param {boolean} status - mouseover = true / mouseleave = false
        */

        private _hoverEvent(id: string, status: boolean): void {
            //VARIABLES
            let args = {id: id, status: status};
            this._hoverDetail[id] = status;
        }



        /**
        * _assignNativeClass
        * @description - this method return if teacher is native or not
        * result (students, teachers, schools, etc)
        * @use - this._assignNativeClass(languages);
        * @function
        * @param {native Array, learn Array and teach Array} languages
        * teacher languages (native, teach and learn)
        * @return {boolean} isNative
        */

        private _assignNativeClass(languages): boolean {
            let native = languages.native;
            let teach = languages.teach;
            let isNative = false;

            for (let i = 0; i < native.length; i++) {
                for (let j = 0; j < teach.length; j++) {
                    if(teach[j] === native[i]) {
                        isNative = true;
                    }
                }
            }

            return isNative;
        }



        /**
        * goToCreate
        * @description - go to add/create new teacher
        * @use - this._buildFakeTeacher();
        * @function
        * @return {void}
        */

        goToCreate(): void {
            //VARIABLES
            // params object
            let params = {
                type: 'new'
            };
            this.$state.go('page.createTeacherPage.start',  params, {reload: true});
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Landing Page to Child's Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            // VARIABLES
            let self = this;

            /**
            * Is Authenticated event
            * @description - Parent (LandingPageController) receive Child's
                             event in order to know if user is authenticated
            * @event
            */
            this.$scope.$on('Is Authenticated', function(event, args) {
                //Validate if user is Authenticated
                self.isAuthenticated = self.AuthService.isAuthenticated();
                // If user is authenticated, go to create teacher process
                if(self.isAuthenticated && args) {
                    self.goToCreate();
                }
            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.teacherLandingPage')
        .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);

}
