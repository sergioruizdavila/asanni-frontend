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
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $stateParams: ITeacherParams,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init teacher data
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
            // Get Teacher information
            this.TeacherService.getTeacherById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.teacher.Teacher(response);
                    self.mapConfig = self.functionsUtilService.buildMapConfig(
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
                        {lat: parseFloat(self.data.Location.Position.Lat), lng: parseFloat(self.data.Location.Position.Lng)}
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



        goToConfirm (): void {
            //TODO: Ir a googleDoc Form o a Typeform con el fin de obtener todos
            // los datos necesarios del estudiante interesado.
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
            let native = this.data.Languages.Native;
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
            let firstName = this.data.FirstName;
            let tooltipText = null;
            let isNative = this._assignNative(language);

            if(isNative) {
                tooltipText = firstName + ' ' + TOOLTIP_TEXT;
            }
            return tooltipText;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.teacherProfilePage')
        .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);

}
