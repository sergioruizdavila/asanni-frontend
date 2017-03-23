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

        goToSite (url: string): void {
            //CONSTANTS
            const EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

            if(EMAIL_REGEX.test(url)) {
                url = 'mailto:' + url;
                window.open(url);
            }

            if(url) {
                window.open(url,'_blank');
            }
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.schoolProfilePage')
        .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);

}
