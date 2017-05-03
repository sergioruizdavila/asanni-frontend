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
        private _localTime: string;
        shadowsSchoolLoading: boolean;
        shadowsTeacherLoading: boolean;
        noSchoolResult: boolean;
        noTeacherResult: boolean;
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

            //Init shadows school loading
            this.shadowsSchoolLoading = true;

            //Init shadows teacher loading
            this.shadowsTeacherLoading = true;

            //Init no school result message
            this.noSchoolResult = false;

            //Init no teacher result message
            this.noTeacherResult = false;

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

                    // Get local hour
                    self._getLocalTime(self.data.Zone);

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

        /**
        * _getResultLoading
        * @description - this method return specific loading template
        * based on type result (students, teachers, schools, etc)
        * @use - this._getResultTemplate('student');
        * @function
        * @param {string} type - type of results list (students, teachers, schools, etc)
        * @return {string} result template path
        */
        //TODO: Esta funciona esta repetida en searchPage, deberia crearse un
        // servicio global, donde se encargue de crear este tipo de shadows
        private _getResultLoading(type: string): string {
            //CONSTANTS
            const STUDENT_TYPE = 'student';
            const TEACHER_TYPE = 'teacher';
            const SCHOOL_TYPE = 'school';
            /*********************************/

            switch (type) {
                case STUDENT_TYPE:
                return 'app/pages/searchPage/studentResult/studentResult.html';
                case TEACHER_TYPE:
                return 'app/pages/searchPage/teacherLoading/teacherLoading.html';
                case SCHOOL_TYPE:
                return 'app/pages/searchPage/schoolLoading/schoolLoading.html';
            }
        }



        /**
        * _buildTeacherCards
        * @description - this method build teacher cards associated to country
        * @use - this._buildTeacherCards(country);
        * @function
        * @param {app.models.country.Country} country - country objects
        * @return {void}
        */
        _buildTeacherCards(country: app.models.country.Country): void {
            //VARIABLES
            let self = this;

            this.TeacherService.getAllTeachersByCountry(country.Id).then(
                function(response: ICountryTeachersQueryObject) {
                    if(response.results.length > 0) {
                        self._teachersList = response.results;
                    } else {
                        self.noTeacherResult = true;
                    }
                    self.shadowsTeacherLoading = false;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildTeacherCards ';
                    DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                    self.shadowsTeacherLoading = false;
                }
            );
        }



        /**
        * _buildSchoolCards
        * @description - this method build school cards associated to country
        * @use - this._buildSchoolCards(country);
        * @function
        * @param {app.models.country.Country} country - country objects
        * @return {void}
        */
        _buildSchoolCards(country: app.models.country.Country): void {
            //VARIABLES
            let self = this;

            this.SchoolService.getAllSchoolsByCountry(country.Id).then(
                function(response: ICountrySchoolsQueryObject) {
                    if(response.results.length > 0) {
                        self._schoolsList = response.results;
                    } else {
                        self.noSchoolResult = true;
                    }

                    self.shadowsSchoolLoading = false;
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _buildSchoolCards ';
                    DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                    self.shadowsSchoolLoading = false;
                }
            );
        }



        /**
        * _getCurrencyConverted
        * @description - this method get country currency converted
        * @use - this._getCurrencyConverted(country);
        * @function
        * @param {string} code - country code
        * @return {void}
        */
        _getCurrencyConverted(code: string): void {
            //VARIABLES
            let self = this;

            this.FunctionsUtil.getCurrencyConverted(code).then(
                function(response: number) {
                    if(response > 0) {
                        self._currencyConverted = response.toFixed(2).toString();
                    } else {
                        self._currencyConverted = '-';
                    }
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error countryProfilePage.controller.js method: _getCurrencyConverted ';
                    DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                    self._currencyConverted = '-';
                }
            );
        }



        /**
        * _getLocalTime
        * @description - this method get local time
        * @use - this._getLocalTime(zone);
        * @function
        * @param {string} zone - country zone: e.g. 'America/Argentina/Buenos_Aires'
        * @return {void}
        */
        _getLocalTime(zone: string): void {
            //CONSTANTS
            const FORMAT_TIME = 'LT';
            var today = moment();
            this._localTime = today.tz(zone).format(FORMAT_TIME).toLowerCase();
        }



        /**
        * _recommendTeacher
        * @description - user could recommend a known teacher
        * @use - this._recommendTeacher();
        * @function
        * @return {void}
        */
        _recommendTeacher(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Recommend Teacher from countryProfilePage: ' + this.$stateParams.aliasCountry;
            //VARIABLES
            let url = 'https://waysily.typeform.com/to/iAWFeg';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            window.open(url,'_blank');
        }



        /**
        * _recommendSchool
        * @description - user could recommend a known school
        * @use - this._recommendTeacher();
        * @function
        * @return {void}
        */
        _recommendSchool(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Recommend School from countryProfilePage: ' + this.$stateParams.aliasCountry;
            //VARIABLES
            let url = 'https://waysily.typeform.com/to/q5uT0P';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            window.open(url,'_blank');
        }



        /**
        * _joinAsSchool
        * @description - user could join as a school
        * @use - this._joinAsSchool();
        * @function
        * @return {void}
        */
        _joinAsSchool(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Join as a School from countryProfilePage: ' + this.$stateParams.aliasCountry;
            //VARIABLES
            let url = 'https://form.jotform.co/71177073983868';
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            window.open(url,'_blank');
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.countryProfilePage')
        .controller(CountryProfilePageController.controllerId, CountryProfilePageController);

}
