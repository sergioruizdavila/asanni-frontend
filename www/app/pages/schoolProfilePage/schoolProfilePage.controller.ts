/**
 * SchoolProfilePageController
 * @description - School Profile Page Controller
 */

module app.pages.schoolProfilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISchoolProfilePageController {
        activate: () => void;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface ISchoolParams extends ng.ui.IStateParamsService {
        id: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SchoolProfilePageController implements ISchoolProfilePageController {

        static controllerId = 'mainApp.pages.schoolProfilePage.SchoolProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        mapConfig: components.map.IMapConfig;
        data: app.models.school.School;
        loading: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.school.SchoolService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$stateParams',
            '$filter'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private SchoolService: app.models.school.ISchoolService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $stateParams: ISchoolParams,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init profile school data
            this.data = new app.models.school.School();

            //Init loading
            this.loading = true;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: School Profile Page';
            //VARIABLES
            let self = this;
            //LOG
            console.log('schoolProfilePage controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            // Get School information
            this.SchoolService.getSchoolById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.school.School(response);
                    self.loading = false;
                }
            );
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.schoolProfilePage')
        .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);

}
