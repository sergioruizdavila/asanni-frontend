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
        private _paymentMethodsList: Array<IPaymentMethodsClass>;
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

            //Build Payment Methods List
            this._paymentMethodsList = this._buildPaymentMethodsClassList();

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
        * @param {string} amenitie - amenitie key value (e.g. '3')
        * @return {void}
        */

        assignAmenitieIconClass (amenitie: string): string {
            //VARIABLES
            let amenitiePrefixClass = 'ma-liner-icons--default--';
            let iconClass = this.functionsUtil.assignAmenitieIconClass(amenitie);

            return amenitiePrefixClass + iconClass;
        }


        /**
        * assignAccomoAmenitieIconClass
        * @description - build accommodation amenities icons class
        * (e.g. ma-liner-icons--default--wifi, ma-liner-icons--default--tv)
        * @use - this.FunctionsUtilService.assignAccomoAmenitieIconClass('2');
        * @function
        * @param {string} amenitie - amenitie key value (e.g. '3')
        * @return {void}
        */

        assignAccomoAmenitieIconClass (amenitie: string): string {
            //VARIABLES
            let amenitiePrefixClass = 'ma-liner-icons--default--';
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
