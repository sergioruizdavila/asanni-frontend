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
            DEBUG && console.log('schoolProfilePage controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            // Get School information
            this.SchoolService.getSchoolById(this.$stateParams.id).then(
                function(response) {
                    self.data = new app.models.school.School(response);
                    //Build location map
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
                        'location-marker-map',
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
        * goToSite
        * @description - this method is launched when user press some url school button
        * @use - this.FunctionsUtilService.goToSite('http://www.school.com');
        * @function
        * @param {string} url - School urls such as: facebook, twitter, instagram,
        * email, website, etc.
        * @return {void}
        */

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



        /**
        * assignAmenitieIconClass
        * @description - build amenities icons class
        * (e.g. ma-liner-icons--default--wifi, ma-liner-icons--default--tv)
        * @use - this.FunctionsUtilService.assignAmenitieIconClass('2');
        * @function
        * @param {string} url - School urls such as: facebook, twitter, instagram,
        * email, website, etc.
        * @return {void}
        */

        assignAmenitieIconClass (amenitie: string): string {
            //VARIABLES
            let amenitiePrefixClass = 'ma-liner-icons--default--';
            let iconClass = this.functionsUtil.assignAmenitieIconClass(amenitie);

            return amenitiePrefixClass + iconClass;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.schoolProfilePage')
        .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);

}
