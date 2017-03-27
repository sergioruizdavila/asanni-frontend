/**
* functionsUtilService
* @description - Service with util functions used accross the whole application
* @constructor
*/

module app.core.util.functionsUtil {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFunctionsUtilService {
        normalizeString: (value: string) => string;
        splitToColumns: (arr: Array<any>, size: number) => Array<any>;
        buildMapConfig: (dataSet: Array<any>,
                        mapType: string,
                        position: components.map.IPosition,
                        zoom: number) =>  components.map.IMapConfig;
        generateRangesOfNumbers: (from: number, to:number) => Array<number>;
        buildNumberSelectList: (from: number, to:number) => Array<app.core.interfaces.ISelectListElement>;
        dateFormat: (date: string) => string;
        ageFormat: (date: any) => string;
        getCurrentLanguage: () => string;
        generateUsername: (firstName: string, lastName: string) => string;
        changeLanguage: (language: string) => angular.IPromise<string> ;
        joinDate: (day:string, month:string, year:string) => string;
        splitDate: (date:string) => app.core.interfaces.IDateSplitted;
        progress: (currentStep: number, totalSteps: number) => string;
        validator: (value: any, validations: Array<Validation>) => IValid;
        averageNumbersArray: (values: Array<number>) => number;
        teacherRatingAverage: (ratingsArr: Array<Object>) => number;
        addUserIndentifyMixpanel: (userId: string) => void;
        setUserMixpanel: (userData: app.models.user.Profile) => void;
        setPropertyMixpanel: (property: Object) => void;
        assignAmenitieIconClass: (amenitie: string) => string;
    }

    export interface IValid {
        valid: boolean;
        message: string;
    }


    /****************************************/
    /*      ENUM VALIDATION DEFINITION      */
    /****************************************/

    export const enum Validation {
        Email = 0,
        String = 1,
        Null = 2,
        Empty = 3,
        Number = 4,
        IsNotZero = 5,
        Defined = 6,
        IsTrue = 7,
        IsNotNaN = 8
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class FunctionsUtilService implements IFunctionsUtilService {

        static serviceId = 'mainApp.core.util.FunctionsUtilService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$filter',
                                 'dataConfig',
                                 '$translate'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $filter: angular.IFilterService,
                    private dataConfig: IDataConfig,
                    private $translate: angular.translate.ITranslateService) {
            DEBUG && console.log('functionsUtil service called');
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * normalizeString
        * @description - replace special characters from a string
        * @use - this.FunctionsUtilService.normalizeString('Fábula Niño');
        * @function
        * @param {string} str - string to parse
        * @return {string} string parsed (e.g. Fabula Nino)
        */
        normalizeString(str): string {
            //VARIABLES
            let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
            let to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
            let mapping = {};

            for(var i = 0; i < from.length; i++ )
              mapping[ from.charAt(i) ] = to.charAt(i);

            var ret = [];
            for( var i = 0; i < str.length; i++ ) {
                var c = str.charAt(i);
                if(mapping.hasOwnProperty(str.charAt(i)))
                    ret.push(mapping[c]);
                else
                    ret.push(c);
            }

            return ret.join( '' );

        }



        /**
        * generateGuid
        * @description - generate Guid id string
        * @function
        * @return {string} guid - Returns an Guid Id string.
        */
        public static generateGuid(): string {
            var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            var guid = fmt.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
        }


        /**
        * dateFormat
        * @description - format a date to 'YYYY-MM-DD'
        * @use - this.FunctionsUtilService.dateFormat('June 10, 2016');
        * @function
        * @params {string} date - date to format
        * @return {string} dateFormatted - date formatted.
        */
        dateFormat(date: string): string {
            //CONSTANTS
            const DEFAULT_DJANGO_DATE_FORMAT = 'YYYY-MM-DD';
            //Safari issue with 'YYYY-MM-DD' format
            const TEMPORAL_FORMAT = 'MM/DD/YYYY';
            /*****************************/

            let dateTemporalFormatted = moment(date).format(TEMPORAL_FORMAT);
            let dateFormattedSplit = this.splitDate(dateTemporalFormatted);
            let dateFormatted = this.joinDate(dateFormattedSplit.day, dateFormattedSplit.month, dateFormattedSplit.year);

            return dateFormatted;
        }



        /**
        * ageFormat
        * @description - return the current age
        * @use - this.FunctionsUtilService.ageFormat('1987');
        * @function
        * @params {any} year - birth year
        * @return {string} age - age of user.
        */
        ageFormat(year): string {
            //VARIABLES
            let currentYear = parseInt(this.dataConfig.currentYear);
            let birthYear = parseInt(year);
            let age = currentYear - birthYear;

            return age.toString();
        }



        /**
        * getCurrentLanguage
        * @description - get current site language
        * @use - this.FunctionsUtilService.getCurrentLanguage();
        * @function
        * @return {string} currentLanguage - current site language code (e.g. 'es', 'en')
        */
        getCurrentLanguage(): string {
             let currentLanguage = this.$translate.use();
             return currentLanguage;
        }



        /**
        * dateFormat
        * @description - format a date to 'YYYY-MM-DD'
        * @use - this.FunctionsUtilService.dateFormat('June 10, 2016');
        * @function
        * @param {string} firstName - entity first name
        * @param {string} lastName - entity last name
        * @return {string} username - username generated
        */
        generateUsername(firstName, lastName): string {
            //VARIABLES
            let alias = '';
            let username = '';
            let randomCode = '';
            let minLength = this.dataConfig.usernameMinLength;
            let maxLength = this.dataConfig.usernameMaxLength;

            //CONSTANTS
            let ALPHABET = '0123456789';
            let ID_LENGTH = 7;
            let REMAINDER = maxLength - ID_LENGTH;
            let EXTRAS = 2;

            //Replace characters special
            firstName = this.normalizeString(firstName);
            //remove space and other characters to firstName
            firstName = firstName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');

            //Replace characters special
            lastName = this.normalizeString(lastName);
            //remove space and other characters to lastName
            lastName = lastName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');

            /* Validate if firstname is longer than
               REMAINDER - EXTRAS (1 lastName letter + '-' character)*/
            if(firstName.length > REMAINDER - EXTRAS) {
                firstName = firstName.substring(0, REMAINDER - EXTRAS);
            }

            // Create Alias value
            alias = (firstName + lastName.substring(0,1)).toLowerCase();

            //Generate random code
            for (var i = 0; i < ID_LENGTH; i++) {
                randomCode += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
            }

            //build username
            username = alias + '-' + randomCode;

            return username;
        }



        /**
        * changeLanguage
        * @description - change site language
        * @use - this.FunctionsUtilService.changeLanguage('es');
        * @function
        * @params {angular.IPromise<string>} language - language code
        * @return {void}
        */
        changeLanguage(language): angular.IPromise<string> {
            return this.$translate.use(language).then(
                function(data) {
                    return data;
                }
            );
        }



        /**
        * joinDate
        * @description - join separate values (day, month and year) and formatting
        * a date to 'YYYY-MM-DD'
        * @use - this.FunctionsUtilService.joinDate(obj);
        * @function
        * @params {string} day - day value
        * @params {string} month - month value
        * @params {string} year - year value
        * @return {string} dateFormatted - date formatted.
        */
        joinDate(day, month, year): string {
            let newDate = year + '-' + month + '-' + day;
            //let dateFormatted = moment(newDate).format('YYYY-MM-DD');
            return newDate;
        }



        /**
        * splitDate
        * @description - Split Date in 3 parts: day, month and year
        * @use - this.FunctionsUtilService.splitDate(date);
        * @function
        * @params {string} date - date value
        * @return {app.core.interfaces.IDateSplitted} dateFormatted - date formatted.
        */
        splitDate(date): app.core.interfaces.IDateSplitted {
            //CONSTANTS
            //Safari issue with 'YYYY-MM-DD' format
            const TEMPORAL_FORMAT = 'MM/DD/YYYY';
            /*****************************/

            let dateString = moment(date).format(TEMPORAL_FORMAT).split('/');
            //Split date to day, month and year
            let dateFormatted = {
                day: dateString[1],
                month: dateString[0],
                year: dateString[2]
            };

            return dateFormatted;
        }



        /**
        * splitToColumns
        * @description - split an array on one parent array with X arrays
        * @use - this.FunctionsUtilService.splitToColumns(array, 2);
        * @function
        * @params {Array<any>} arr - array
        * @params {number} size - size of new array
        * @return {Array<any>} newArr - parent array with X arrays inside.
        */
        splitToColumns(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }



        /**
        * buildMapConfig
        * @description - build each marker on a specific map (based on a dataSet)
        * @use - this.FunctionsUtilService.buildMapConfig(response,
                                                          'search-map',
                                                          {lat: 6.175434,lng: -75.583329});
        * @function
        * TODO: Asignar un tipo de datos al Array, ya que esta muy complicado entender que es dataSet
        * @param {Array<any>} dataSet - dataSet array
        * @param {string} mapType - map type
        * @param {components.map.IPosition} position - position on map (lat and lng)
        * @param {number} zoom - zoom on the mapa
        * @return {components.map.IMapConfig} mapConfig - google map config.
        */
        buildMapConfig(dataSet, mapType, position, zoom): components.map.IMapConfig {
            //VARIABLES
            let mapConfig = {
                type: mapType,
                data: {
                    position: position || {lat: 6.175434,lng: -75.583329},
                    markers: [],
                    zoom: zoom
                }
            };

            if(dataSet) {
                for (let i = 0; i < dataSet.length; i++) {

                    let markerPosition = null;

                    if(dataSet[i].profile) {
                        markerPosition = new app.models.user.Position(dataSet[i].profile.location.position);
                    } else if(dataSet[i].location) {
                        markerPosition = new app.models.user.Position(dataSet[i].location.position);
                    }

                    mapConfig.data.markers.push({
                        id: dataSet[i].id,
                        position: markerPosition
                    });

                }
            }

            return mapConfig;
        }



        /**
        * generateRangesOfNumbers
        * @description - generate a range of numbers (i.e from 3 until 34)
        * @use - this.FunctionsUtilService.generateRangesOfNumbers(1, 31);
        * @function
        * @params {number} from - start number
        * @params {number} to - finish number
        * @return {Array<number>} array - range of numbers array.
        */
        generateRangesOfNumbers(from, to): Array<number> {
            var array = [];
            for (var i = from; i <= to; i++) {
                array.push(i);
            }
            return array;
        }



        /**
        * buildNumberSelectList
        * @description - buil numbers (days, years, etc) select list
        * @use - this.FunctionsUtilService.buildNumberSelect(1, 31);
        * @function
        * @params {number} from - start number
        * @params {number} to - finish number
        * @return {Array<app.core.interfaces.ISelectList>} list - list format
        * to use on one select list element
        */
        buildNumberSelectList(from, to): Array<app.core.interfaces.ISelectListElement> {
            let dayRange = this.generateRangesOfNumbers(from, to);
            let list = [];
            for (let i = 0; i < dayRange.length; i++) {
                list.push({value: dayRange[i]});
            }

            return list;
        }



        /**
        * progress
        * @description - increase or reduce progress bar width
        * @param {number} currentStep - current step
        * @param {number} totalSteps - total steps
        * @function
        * @return void
        */
        progress(currentStep, totalSteps): string {
            let percent = (100 / totalSteps) * (currentStep);
            return percent + '%';
        }



        /**
        * validator
        * @description - All form's field validate rules
        * @use - this.FunctionsUtilService.validator('sergioruizdavila@gmail.com',
                                                     [Validation.Null, Validation.Email]);
        * @function
        * @param {any} value - value to validate (string, number, object, etc)
        * @param {Array<Validation>} validations - list of validations required:
        * (e.g. Null, String, Email, Number, Empty, etc)
        * @return {IValid} obj - object with validation result: valid and message
        */
        //TODO: Hacer un refactor ya que voy a necesitar validar por min y max,
        // asi que voy a tener que enviar el min y el max para que aqui lo valide.
        validator(value, validations = []): IValid {
            //CONSTANTS
            const NULL_MESSAGE = this.$filter('translate')('%global.validation.null.message.text');
            const EMPTY_MESSAGE = this.$filter('translate')('%global.validation.empty.message.text');
            const DEFINED_MESSAGE = this.$filter('translate')('%global.validation.null.message.text');
            const IS_NOT_ZERO_MESSAGE = this.$filter('translate')('%global.validation.is_not_zero.message.text');
            const STRING_MESSAGE = this.$filter('translate')('%global.validation.string.message.text');
            const NUMBER_MESSAGE = this.$filter('translate')('%global.validation.number.message.text');
            const EMAIL_MESSAGE = this.$filter('translate')('%global.validation.email.message.text');
            const TRUE_MESSAGE = this.$filter('translate')('%global.validation.true.message.text');
            const NAN_MESSAGE = this.$filter('translate')('%global.validation.number.message.text');
            /*******************************/
            //VARIABLES
            let obj = {valid: true, message: 'ok'};
            /*******************************/

            for (let i = 0; i < validations.length; i++) {

                switch (validations[i]) {

                    case Validation.Email:
                        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        obj.valid = pattern.test(value);
                        if(obj.valid == false) {
                            obj.message = EMAIL_MESSAGE;
                        }
                        break;

                    case Validation.String:
                        if(typeof value !== 'string') {
                            obj.message = STRING_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.Null:
                        if(value == null) {
                            obj.message = NULL_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.Empty:
                        if(value == '') {
                            obj.message = EMPTY_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.Number:
                        if(typeof value !== 'number') {
                            obj.message = NUMBER_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.IsNotZero:
                        if(parseInt(value) == 0) {
                            obj.message = IS_NOT_ZERO_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.Defined:
                        if(value === undefined) {
                            obj.message = DEFINED_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.IsTrue:
                        if(value !== true) {
                            obj.message = TRUE_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                    case Validation.IsNotNaN:
                        if(isNaN(value)){
                            obj.message = NAN_MESSAGE;
                            obj.valid = false;
                        }
                        break;

                }

            }

            return obj;

        }



        /**
        * External Function: extractCountriesFromHtml
        * @external
        * @description Get Countries and Codes from HTML (assets/schemas/countries/countries.html)
        * @use 1. You have to paste countries html in one app template (i.e. studentPage.html)
               2. On Dev Console Chrome put:
        * var countriesList = app.core.util.functionsUtil.FunctionsUtilService.extractCountriesFromHtml()
        * return on console: countries list Object formatted to i18n json
        */
        public static extractCountriesFromHtml(): any {
            // VARIABLES
            let countries_json = {};
            let language = 'EN'; //Change to specific language (ES, EN, etc)
            let html:any = document.getElementById("countriesList." + language);


            for (let i = 0; i < html.length; i++) {
                let countryText = html[i].innerText;
                let countryCode = html[i].attributes[0].nodeValue;
                countries_json["%country." + countryCode] = countryText;
            }

            DEBUG && console.log(JSON.stringify(countries_json));
        }



        /**
        * averageNumbersArray
        * @description - Calculate numbers array average
        * @use - this.FunctionsUtilService.averageNumbersArray([1,4,4,5]);
        * @function
        * @param {Array<number>} values - list of numbers
        * @return {number} average - average value
        */
        averageNumbersArray(values): number {
            //VARIABLES
            let total = 0;
            let average = 0;
            let amountValues = values.length;
            /***************************/

            for (let i = 0; i < values.length; i++) {
                total = values[i] + total;
            }

            average = Math.round(total / amountValues);

            return average;
        }



        /**
        * teacherRatingAverage
        * @description - Calculate teacher rating average based on a ratings list given
        * @use - this.FunctionsUtilService.teacherRatingAverage(ratingsArray);
        * @function
        * @param {Array<Object>} ratingsArr - list of rating objects
        * @return {number} average - average value
        */
        //TODO: Analizar por que puse Array<Object> en vez de Array<Rating>
        // y solucionar
        teacherRatingAverage(ratingsArr: Array<Object>): number {
            //VARIABLES
            let average = 0;
            let averageArr = [];
            let ratings: Array<app.models.teacher.Rating> = [];

            for (let i = 0; i < ratingsArr.length; i++) {

                ratings.push(new app.models.teacher.Rating(ratingsArr[i]));

                let newArr = [
                    ratings[i].MethodologyValue,
                    ratings[i].TeachingValue,
                    ratings[i].CommunicationValue
                ];

                averageArr.push(this.averageNumbersArray(newArr));

            }

            average = this.averageNumbersArray(averageArr);

            return average;
        }



        /**
        * addUserIndentifyMixpanel
        * @description - Assign a Identify number to your user on MixPanel
        * @use - this.FunctionsUtilService.addUserIndentifyMixpanel('1');
        * @function
        * @param {app.models.user.Profile} userData - user profile information
        * @return {void}
        */
        addUserIndentifyMixpanel(userId: string): void {
            mixpanel.identify(userId);
        }



        /**
        * setUserMixpanel
        * @description - Set User on MixPanel service in order to track his behavior
        * @use - this.FunctionsUtilService.setUserMixpanel(userObject);
        * @function
        * @param {app.models.user.Profile} userData - user profile information
        * @return {void}
        */
        setUserMixpanel(userData: app.models.user.Profile): void {
            mixpanel.people.set({
                'username': userData.Username,
                '$name': userData.FirstName + ' ' + userData.LastName,
                'gender': userData.Gender,
                '$email': userData.Email,
                '$created': userData.DateJoined,
                '$last_login': new Date()
            });
        }

        /**
        * setPropertyMixpanel
        * @description - Set new property on user's MixPanel service
        * @use - this.FunctionsUtilService.setPropertyMixpanel({key: 'value'});
        * @function
        * @param {Object} property - new property
        * @return {void}
        */
        //TODO: Probar ya que nunca se uso.
        setPropertyMixpanel(property: Object): void {
            let arr = [];
            arr.push(property);
            let setData = {};
            _.mapKeys(arr, function(value, key) {
                setData[key] = value;
            });

            mixpanel.people.set(setData);
        }


        /**
        * assignAmenitieIconClass
        * @description - Assign icon class based on a type of amenities
        * @use - this.FunctionsUtilService.assignAmenitieIconClass('2');
        * @function
        * @param {Object} property - new property
        * @return {void}
        */
        //TODO: Mover esta lista de opcion de aqui, y llevar a un archivo global,
        // (almacene variables globales) donde podamos llamar esta lista siempre
        // que la necesite.
        assignAmenitieIconClass(amenitie: string): string {

            //VARIABLES
            let iconClass = '';
            //CONSTANTS
            const options = [
                {
                    key: '1',
                    value: 'wifi'
                },
                {
                    key: '2',
                    value: 'laptop'
                },
                {
                    key: '3',
                    value: 'air-conditing'
                },
                {
                    key: '4',
                    value: 'heating'
                },
                {
                    key: '5',
                    value: 'breakfast'
                },
                {
                    key: '6',
                    value: 'lunch'
                },
                {
                    key: '7',
                    value: 'dinner'
                },
                {
                    key: '8',
                    value: 'snack'
                },
                {
                    key: '9',
                    value: 'coffee'
                },
                {
                    key: '10',
                    value: 'tea'
                },
                {
                    key: '11',
                    value: 'hammock'
                },
                {
                    key: '12',
                    value: 'class-room'
                },
                {
                    key: '13',
                    value: 'computer'
                },
                {
                    key: '14',
                    value: 'video-projector'
                },
                {
                    key: '15',
                    value: 'lounge'
                }
            ];

            for (let i = 0; i < options.length; i++) {
                if(options[i].key === amenitie) {
                    iconClass = options[i].value;
                    break;
                }
            }

            return iconClass;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('mainApp.core.util', [])
    .service(FunctionsUtilService.serviceId, FunctionsUtilService);


}
