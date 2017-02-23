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
        data: app.models.teacher.Teacher;
        loading: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.teacher.TeacherService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$stateParams',
            '$filter'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private TeacherService: app.models.teacher.ITeacherService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $stateParams: ITeacherParams,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init profile teacher data
            this.data = null;

            //Init loading
            this.loading = true;

            //Init native tooltip
            this._initNativeTooltip();

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('teacherProfilePage controller actived');
            //MIXPANEL
            mixpanel.track("Enter: Teacher Profile Details");
            // Get Teacher information
            this.TeacherService.getTeacherById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.teacher.Teacher(response);
                    self.mapConfig = self.functionsUtil.buildMapConfig(
                        [
                            {
                                id: self.data.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Location.Position.Lat),
                                        lng: parseFloat(self.data.Location.Position.Lng)
                                    }
                                }
                            }
                        ],
                        'location-circle-map',
                        {lat: parseFloat(self.data.Location.Position.Lat), lng: parseFloat(self.data.Location.Position.Lng)},
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


        //TODO: Poner descripcion
        goToConfirm (): void {
            //MIXPANEL
            mixpanel.track("Click on book a class", {
                "teacher_id": this.data.Id,
                "teacher_name": this.data.Profile.FirstName + ' ' + this.data.Profile.LastName
            });

            var url = 'https://waysily.typeform.com/to/NDPRAb';
            window.open(url,'_blank');
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


        //TODO: poner description
        private _ratingTotalAverage(ratingsArr: Array<Object>): number {
            return this.functionsUtil.teacherRatingAverage(ratingsArr);
        }


        //TODO: poner description
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
