/**
 * TeacherProfilePageController
 * @description - Teacher Profile Page Controller
 */

module app.pages.teacherProfilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherProfilePageController {
        activate: () => void;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface ITeacherParams extends ng.ui.IStateParamsService {
        id: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherProfilePageController implements ITeacherProfilePageController {

        static controllerId = 'mainApp.pages.teacherProfilePage.TeacherProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        mapConfig: components.map.IMapConfig;
        nativeTooltipOptions: app.core.interfaces.ITooltipOptions;
        isAuthenticated: boolean;
        data: app.models.teacher.Teacher;
        loading: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.teacher.TeacherService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.auth.AuthService',
            '$uibModal',
            '$state',
            '$stateParams',
            'dataConfig',
            '$filter'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private TeacherService: app.models.teacher.ITeacherService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private AuthService: app.auth.IAuthService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $state: ng.ui.IStateService,
            private $stateParams: ITeacherParams,
            private dataConfig: IDataConfig,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init profile teacher data
            this.data = new app.models.teacher.Teacher();

            //Init loading
            this.loading = true;

            //Init native tooltip
            this._initNativeTooltip();

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Teacher Profile Page Id: ' + this.$stateParams.id;
            //VARIABLES
            let self = this;
            //LOG
            DEBUG && console.log('teacherProfilePage controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            // Get Teacher information
            this.TeacherService.getTeacherById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.teacher.Teacher(response);
                    self.mapConfig = self.functionsUtil.buildMapConfig(
                        [
                            {
                                id: self.data.Profile.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Profile.Location.Position.Lat),
                                        lng: parseFloat(self.data.Profile.Location.Position.Lng)
                                    }
                                }
                            }
                        ],
                        'location-circle-map',
                        {lat: parseFloat(self.data.Profile.Location.Position.Lat), lng: parseFloat(self.data.Profile.Location.Position.Lng)},
                        null
                    );
                    self.loading = false;
                }
            );
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _openSignUpModal
        * @description - open Modal in order to sign up current user
        * @use - this._openSignUpModal();
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
                size: 'sm',
                templateUrl: this.dataConfig.modalSignUpTmpl,
                controller: 'mainApp.components.modal.ModalSignUpController as vm',
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

        }



        /**
        * _initNativeTooltip
        * @description - this method create a default Native Tooltip Option.
        * @use - this._initNativeTooltip();
        * @function
        * @return {void}
        */

        private _initNativeTooltip(): void {
            this.nativeTooltipOptions = {
                placement: 'top',
                animation: false,
                class: 'ma-tooltip ma-tooltip--primary ma-tooltip--default'
            };
        }



        /**
        * goToConfirm
        * @description - go to book a class with current teacher
        * @use - this.goToConfirm();
        * @function
        * @return {void}
        */

        goToConfirm(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Book a Class';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL, {
                "teacher_id": this.data.Id,
                "teacher_name": this.data.Profile.FirstName + ' ' + this.data.Profile.LastName
            });

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

            if(this.isAuthenticated) {
                var url = 'https://waysily.typeform.com/to/NDPRAb';
                window.open(url,'_blank');
            } else {
                this._openSignUpModal();
            }


        }



        /**
        * _assignNative
        * @description - this method create a match between native language and
        * teach language in order to mark it as a Native languages
        * @use - this._assignNative(language);
        * @function
        * @param {string} language - current language on the ng-repeat loop
        * @return {boolean} isNativeOfThisLanguage - He/She is native of this
        * language
        */

        private _assignNative(language: string): boolean {
            let native = this.data.Profile.Languages.Native;
            let isNativeOfThisLanguage = false;

            for (let i = 0; i < native.length; i++) {
                if(language === native[i]) {
                    isNativeOfThisLanguage = true;
                    break;
                }
            }

            return isNativeOfThisLanguage;
        }



        /**
        * _assignNativeTooltip
        * @description - this method create a tooltip on teacher native language
        * @use - this._assignNativeTooltip(language);
        * @function
        * @param {string} language - current language on the ng-repeat loop
        * @return {boolean} tooltipText - return tooltip text
        */

        private _assignNativeTooltip(language: string): string {
            //CONSTANTS
            const TOOLTIP_TEXT = this.$filter('translate')('%profile.teacher.native.lang.tooltip.text');
            //VARIABLES
            let firstName = this.data.Profile.FirstName;
            let tooltipText = null;
            let isNative = this._assignNative(language);

            if(isNative) {
                tooltipText = firstName + ' ' + TOOLTIP_TEXT;
            }
            return tooltipText;
        }



        /**
        * _ratingTotalAverage
        * @description - Calculate teacher rating average based on a ratings list given
        * @use - this._ratingTotalAverage(ratingsArray);
        * @function
        * @param {Array<Object>} ratingsArr - list of rating objects
        * @return {number} average - average value
        */

        private _ratingTotalAverage(ratingsArr: Array<Object>): number {
            return this.functionsUtil.teacherRatingAverage(ratingsArr);
        }



        /**
        * _ratingUnitAverage
        * @description - Calculate teacher rating average per each
        * criteria (methodology, communication, teaching)
        * @use - this._ratingUnitAverage(language);
        * @function
        * @param {Array<Object>} ratingsArr - list of rating objects
        * @return {number} average - average of type of criteria
        */

        private _ratingUnitAverage(ratingsArr: Array<Object>, type): number {
            //VARIABLES
            let average = 0;
            let averageArr = [];
            let ratings: Array<app.models.teacher.Rating> = [];

            for (let i = 0; i < ratingsArr.length; i++) {
                ratings.push(new app.models.teacher.Rating(ratingsArr[i]));
                switch(type) {
                    case 'methodology':
                        averageArr.push(ratings[i].MethodologyValue);
                        break;
                    case 'communication':
                        averageArr.push(ratings[i].CommunicationValue);
                        break;
                    case 'teaching':
                        averageArr.push(ratings[i].TeachingValue);
                        break;
                }

            }

            average = this.functionsUtil.averageNumbersArray(averageArr);

            return average;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.teacherProfilePage')
        .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);

}
