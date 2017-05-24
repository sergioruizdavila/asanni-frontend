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

    export interface IPaymentMethodsClass {
        key: string;
        value: string;
        name: string;
        disabled?: boolean;
    }

    interface ICountryTeachersQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.teacher.Teacher>;
    }

    interface ICountrySchoolsQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.school.School>;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface ISchoolParams extends ng.ui.IStateParamsService {
        aliasSchool: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SchoolProfilePageController implements ISchoolProfilePageController {

        static controllerId = 'mainApp.pages.schoolProfilePage.SchoolProfilePageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        isAuthenticated: boolean;
        mapConfig: components.map.IMapConfig;
        marker: string;
        private _paymentMethodsList: Array<IPaymentMethodsClass>;
        data: app.models.school.School;
        country: app.models.country.Country;
        private _teachersList: Array<app.models.teacher.Teacher>;
        private _schoolsList: Array<app.models.school.School>;
        loading: boolean;
        shadowsSchoolLoading: boolean;
        shadowsTeacherLoading: boolean;
        noTeacherResult: boolean;
        noSchoolResult: boolean;
        SUCCESS_MESSAGE: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            '$rootScope',
            'mainApp.models.country.CountryService',
            'mainApp.models.school.SchoolService',
            'mainApp.models.teacher.TeacherService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.messageUtilService',
            'mainApp.auth.AuthService',
            '$uibModal',
            '$state',
            '$stateParams',
            'screenSize',
            '$filter'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private CountryService: app.models.country.ICountryService,
            private SchoolService: app.models.school.ISchoolService,
            private TeacherService: app.models.teacher.ITeacherService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private AuthService: app.auth.IAuthService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $state: ng.ui.IStateService,
            private $stateParams: ISchoolParams,
            private screenSize: angular.matchmedia.IScreenSize,
            private $filter: angular.IFilterService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init profile school data
            this.data = new app.models.school.School();

            //Init country data
            this.country = new app.models.country.Country();

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

            //Assign marker map
            this.marker = 'long';

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //CONSTANTS
            const ENTER_MIXPANEL = 'Enter: School Profile Page Id: ' + this.$stateParams.aliasSchool;
            const SCROLL_TO_ID = 'schoolProfile-information';
            const AVERAGE_RATING = 'schoolProfile-average-rating';
            //VARIABLES
            let self = this;

            //Build Payment Methods List
            this._paymentMethodsList = this._buildPaymentMethodsClassList();

            //LOG
            DEBUG && console.log('schoolProfilePage controller actived');
            //MIXPANEL
            mixpanel.track(ENTER_MIXPANEL);

            //Assign to rating block the stick effect when is not mobile
            if (!this.screenSize.is('xs, sm')) {
                $(window).scroll(function() {
                    self.functionsUtil.stickContainer(this, SCROLL_TO_ID, AVERAGE_RATING);
                });
            }

            // Get School information
            this.SchoolService.getSchoolByAlias(this.$stateParams.aliasSchool).then(
                function(response) {
                    self.data = new app.models.school.School(response);
                    //Build meta tags
                    self._buildMetaTags(self.data);

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

                    //Build similar schools suggestions
                    self._buildSchoolCards(self.data.Country);

                    //Build teachers suggestions
                    self._buildTeacherCards(self.data.Country);

                    //Get country information
                    self._getCountryInfo(self.data.Country);

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
        //TODO: Esta funciona esta repetida en searchPage, countryPage, deberia
        // crearse un servicio global, donde se encargue de crear este tipo de shadows
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
        * _buildMetaTags
        * @description - this method is launched when user press some url school button
        * @use - this.FunctionsUtilService.goToSite('http://www.school.com');
        * @function
        * @param {string} url - School urls such as: facebook, twitter, instagram,
        * email, website, etc.
        * @return {void}
        */

        private _buildMetaTags (school: app.models.school.School): void {
            //VARIABLES
            let metaTags = this.SchoolService.buildMetaTagValue(school);

            this.$rootScope.title = metaTags.title;
            this.$rootScope.description = metaTags.description;
            this.$rootScope.url = metaTags.url;
            this.$rootScope.robots = metaTags.robots;
            this.$rootScope.image = metaTags.image;
        }



        /**
        * _buildTeacherCards
        * @description - this method build teacher cards associated to country
        * @use - this._buildTeacherCards(country);
        * @function
        * @param {number} countryId - country id
        * @return {void}
        */
        _buildTeacherCards(countryId: number): void {
            //CONSTANTS
            const LIMIT = 3;
            const OFFSET = 0;
            //VARIABLES
            let self = this;

            this.TeacherService.getAllTeachersByCountryAndRange(countryId, LIMIT, OFFSET).then(
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
                    const ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _buildTeacherCards ';
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
        * @param {number} countryId - country id
        * @return {void}
        */
        _buildSchoolCards(countryId: number): void {
            //CONSTANTS
            const LIMIT = 3;
            const OFFSET = 0;
            //VARIABLES
            let self = this;

            this.SchoolService.getAllSchoolsByCountryAndRange(countryId, LIMIT, OFFSET).then(
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
                    const ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _buildSchoolCards ';
                    DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                    self.shadowsSchoolLoading = false;
                }
            );
        }


        /**
        * _getCountryInfo
        * @description - this method build school cards associated to country
        * @use - this._getCountryInfo(countryId);
        * @function
        * @param {number} countryId - country id
        * @return {void}
        */
        _getCountryInfo(countryId: number): void {
            //VARIABLES
            let self = this;

            this.CountryService.getCountryById(countryId).then(
                function(response) {
                    if(response.id) {
                        self.country = new app.models.country.Country(response);
                    }
                },
                function(error) {
                    //CONSTANTS
                    const ERROR_MESSAGE = 'Error schoolProfilePage.controller.js method: _getCountryInfo ';
                    DEBUG && Raven.captureMessage(ERROR_MESSAGE, error);
                    self.shadowsSchoolLoading = false;
                }
            );
        }


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
        * goToConfirm
        * @description - go to book a class with current school
        * @use - this.goToConfirm();
        * @function
        * @return {void}
        */

        goToConfirm(): void {
            //CONSTANTS
            const CLICK_MIXPANEL = 'Click: Book a Class on School:' + this.data.Name;
            this.SUCCESS_MESSAGE = this.$filter('translate')('%%profile.school.get_free_pass.message.text');
            //MIXPANEL
            mixpanel.track(CLICK_MIXPANEL);

            //Validate if user is Authenticated
            this.isAuthenticated = this.AuthService.isAuthenticated();

            if(this.isAuthenticated) {
                this.messageUtil.success(this.SUCCESS_MESSAGE);
            } else {
                this._openSignUpModal();
            }

        }



        /**
        * assignAmenitieIconClass
        * @description - build amenities icons class
        * (e.g. ma-liner-icons--default--wifi, ma-liner-icons--default--tv)
        * @use - this.FunctionsUtilService.assignAmenitieIconClass('2');
        * @function
        * @param {string} amenitie - amenitie key value (e.g. '3')
        * @return {void}
        */

        assignAmenitieIconClass (amenitie: string): string {
            //CONSTANTS
            const size = 'small';
            //VARIABLES
            let amenitiePrefixClass = 'ma-liner-icons--'+ size +'--';
            let iconClass = this.functionsUtil.assignAmenitieIconClass(amenitie);

            return amenitiePrefixClass + iconClass;
        }


        /**
        * assignAccommodationAmenitieIconClass
        * @description - build accommodation amenities icons class
        * (e.g. ma-liner-icons--default--wifi, ma-liner-icons--default--tv)
        * @use - this.FunctionsUtilService.assignAccommodationAmenitieIconClass('2');
        * @function
        * @param {string} amenitie - amenitie key value (e.g. '3')
        * @return {void}
        */

        assignAccommodationAmenitieIconClass (amenitie: string): string {
            //CONSTANTS
            const size = 'small';
            //VARIABLES
            let amenitiePrefixClass = 'ma-liner-icons--'+ size +'--';
            let iconClass = this.functionsUtil.assignAccommodationAmenitieIconClass(amenitie);

            return amenitiePrefixClass + iconClass;
        }



        /**
        * assignPaymentMethodsIconClass
        * @description - build payment methods icons class
        * (e.g. ma-liner-icons--medium--mastercard, ma-liner-icons--medium--visa)
        * @use - this.FunctionsUtilService.assignPaymentMethodsIconClass('4');
        * @function
        * @param {string} method - Payment Method key value (e.g. '2')
        * @return {void}
        */

        assignPaymentMethodsIconClass (method: IPaymentMethodsClass): string {
            //VARIABLES
            let iconClass = 'ma-payment-methods-icons--medium--' + method.value;
            let arr = this.data.PaymentMethod.Methods;

            // Assign disable value to method that's not includes in PaymentMethod
            for (let i = 0; i < arr.length; i++) {
                if(arr[i] == method.key) {
                    method.disabled = false;
                }
            }

            // if method is not included in the PaymentMethod list, disable it
            if(method.disabled) {
                iconClass = iconClass + ' ma-payment-methods-icons--disabled';
            }

            return iconClass;
        }



        /**
        * _ratingFeatureAverage
        * @description - Calculate school rating feature average
        * @use - this._ratingFeatureAverage();
        * @function
        * @return {number} average - average value
        */

        private _ratingFeatureAverage(school): number {
            return this.SchoolService.schoolFeatureRatingAverage(school);
        }



        /**
        * _buildPaymentMethodsClassList
        * @description - build payment methods list to show on view
        * @use - this.FunctionsUtilService._buildPaymentMethodsClassList();
        * @function
        * @return {Array<IPaymentMethodsClass>} options - Payment Methods Options
        */
        //TODO: Mover esta lista de opcion de aqui, y llevar a un archivo global,
        // (almacene variables globales) donde podamos llamar esta lista siempre
        // que la necesite.
        private _buildPaymentMethodsClassList(): Array<IPaymentMethodsClass> {
            //CONSTANTS
            const options = [
                {
                    key: '1',
                    value: 'visa',
                    name: 'Visa',
                    disabled: true
                },
                {
                    key: '2',
                    value: 'mastercard',
                    name: 'MasterCard',
                    disabled: true
                },
                {
                    key: '3',
                    value: 'american-express',
                    name: 'American Express',
                    disabled: true
                },
                {
                    key: '4',
                    value: 'paypal',
                    name: 'Paypal',
                    disabled: true
                },
                {
                    key: '5',
                    value: 'cash',
                    name: 'Cash',
                    disabled: true
                }
            ];

            return options;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.schoolProfilePage')
        .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);

}
