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

        goToConfirm (): void {
            //TODO: Ir a googleDoc Form o a Typeform con el fin de obtener todos
            // los datos necesarios del estudiante interesado.
        }


        /**
        * _assignNative
        * @description - this method create a match between native language and
        * teach language in order to mark it as a Native languages
        * @use - this._assignNative(languages);
        * @function
        * @param {native Array, learn Array and teach Array} languages
        * teacher languages (native, teach and learn)
        * @return {boolean} isNative
        */

        private _assignNative(language: any): boolean {
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

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.teacherProfilePage')
        .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);

}
