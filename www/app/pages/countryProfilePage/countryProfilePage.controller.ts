/**
 * CountryProfilePageController
 * @description - Landing Page Controller
 */

module app.pages.countryProfilePage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ICountryProfilePageController {
        activate: () => void;
    }

    export interface ILandingScope extends angular.IScope {

    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface ICountryParams extends ng.ui.IStateParamsService {
        id: string;
        aliasCountry: string;
    }

    interface ICountryQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.country.Country>;
    }

    interface ICountrySchoolsQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.school.School>;
    }

    interface ICountryTeachersQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.teacher.Teacher>;
    }

    export interface ILandingError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class CountryProfilePageController implements ICountryProfilePageController {

        static controllerId = 'mainApp.pages.countryProfilePage.CountryProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        isAuthenticated: boolean;
        isTeacher: boolean;
        data: app.models.country.Country;
        private _slideout: boolean;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        _schoolsList: Array<app.models.school.School>;
        _teachersList: Array<app.models.teacher.Teacher>;
        private _countryContainers: Array<app.models.country.Country>;
        private _currencyConverted: string;
        loading: boolean;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$scope',
                                 '$state',
                                 '$stateParams',
                                 'dataConfig',
                                 'mainApp.auth.AuthService',
                                 'mainApp.models.country.CountryService',
                                 'mainApp.models.school.SchoolService',
                                 'mainApp.models.teacher.TeacherService',
                                 'mainApp.core.util.FunctionsUtilService',
                                 '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $scope: angular.IScope,
            private $state: ng.ui.IStateService,
            private $stateParams: ICountryParams,
            private dataConfig: IDataConfig,
            private AuthService: app.auth.IAuthService,
            private CountryService: app.models.country.ICountryService,
            private SchoolService: app.models.school.ISchoolService,
            private TeacherService: app.models.teacher.ITeacherService,
            private FunctionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init profile school data
            this.data = new app.models.country.Country();

            //Init loading
            this.loading = true;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: Country Profile Page: ' + this.$stateParams.aliasCountry;
            //VARIABLES
            let self = this;
            //LOG
            DEBUG && console.log('countryProfilePage controller actived');

            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            // Get Country information
            this.CountryService.getCountryByAlias(this.$stateParams.aliasCountry).then(
                function(response) {
                    self.data = new app.models.country.Country(response);
                    //Build meta tags
                    //self._buildMetaTags(self.data);

                    // Get currency converted
                    self._getCurrencyConverted(self.data.CurrencyCode);

                    //Build Schools cards associated to this country
                    self._buildSchoolCards(self.data);

                    //Build Teachers cards associated to this country
                    self._buildTeacherCards(self.data);

                    self.loading = false;
                }
            );

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        _buildTeacherCards(country: app.models.country.Country): void {
            //VARIABLES
            let self = this;

            this.TeacherService.getAllTeachersByCountry(country.Id).then(
                function(response: ICountryTeachersQueryObject) {
                    self._teachersList = response.results;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildTeacherCards ';
                    Raven.captureMessage(ERROR_MESSAGE, error);
                }
            );
        }


        _buildSchoolCards(country: app.models.country.Country): void {
            //VARIABLES
            let self = this;

            this.SchoolService.getAllSchoolsByCountry(country.Id).then(
                function(response: ICountrySchoolsQueryObject) {
                    self._schoolsList = response.results;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildSchoolCards ';
                    Raven.captureMessage(ERROR_MESSAGE, error);
                }
            );
        }



        _getCurrencyConverted(code: string) {
            //VARIABLES
            let self = this;

            this.FunctionsUtil.getCurrencyConverted(code).then(
                function(response: string) {
                    self._currencyConverted = response;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _getCurrencyConverted ';
                    Raven.captureMessage(ERROR_MESSAGE, error);
                    self._currencyConverted = '-';
                }
            );
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.countryProfilePage')
        .controller(CountryProfilePageController.controllerId, CountryProfilePageController);

}
