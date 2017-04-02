/**
 * SchoolService
 * @description - Services related on School Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.school {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISchoolService {
        getSchoolById: (id: string) => angular.IPromise<any>;
        getSchoolByUserId: (userId: string) => angular.IPromise<any>;
        getAllSchools: () => angular.IPromise<any>;
        getMinorSchoolPrice: (prices: app.models.school.Price) => number;
        schoolFeatureRatingAverage: (school: app.models.school.School) => number;
    }

    export interface ISchoolQueryObject {
        next: string;
        previous: string;
        count: number;
        results: Array<app.models.school.School>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SchoolService implements ISchoolService {

        static serviceId = 'mainApp.models.school.SchoolService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        SCHOOL_URI: string;
        USER_SCHOOL_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.auth.AuthService',
            '$q'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private restApi: app.core.restApi.IRestApi,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private AuthService: app.auth.IAuthService,
            private $q: angular.IQService) {

            //LOG
            DEBUG && console.log('schools service instanced');

            //CONSTANTS
            this.SCHOOL_URI = 'schools';
            this.USER_SCHOOL_URI = 'schools?userId=';

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * getSchoolById
        * @description - get school by Id
        * @use - this.SchoolService.getSchoolById('98d667ae');
        * @function
        * @params {string} id - user id
        * @return {angular.IPromise<any>} promise - return school by Id
        */
        getSchoolById(id): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.SCHOOL_URI;
            let deferred = this.$q.defer();

            this.restApi.show({url: url, id: id}).$promise
                .then(
                    function(response) {
                        deferred.resolve(response);
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }



        /**
        * getSchoolByUserId
        * @description - get school by user profile id filter value
        * @function
        * @return {angular.IPromise<any>} return a promise with user schools associated data
        */
        getSchoolByUserId(userId): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.USER_SCHOOL_URI + userId;
            let deferred = this.$q.defer();

            this.restApi.queryObject({url: url}).$promise
                .then(
                    function(response) {
                        if(response.results) {
                            let res = response.results[0] ? response.results[0] : '';
                            deferred.resolve(res);
                        } else {
                            DEBUG && console.error(response);
                            deferred.reject(response);
                        }
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }



        /**
        * getAllSchools
        * @description - get all Schools
        * @function
        * @return {angular.IPromise<any>} return a promise with schools list
        */
        getAllSchools(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.SCHOOL_URI;
            let deferred = this.$q.defer();

            this.restApi.queryObject({url: url}).$promise
                .then(
                    function(response) {
                        deferred.resolve(response);
                    },
                    function(error) {
                        DEBUG && console.error(error);
                        if(error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }



        /**
        * getMinorSchoolPrice
        * @description - get the minor price of school
        * @function
        * @return {number} return minor price value
        */
        getMinorSchoolPrice(prices: app.models.school.Price): number {
            //CONSTANTS
            const privateGeneralValue = prices.PrivateClass.GeneralType.Value;
            const privateIntensiveValue = prices.PrivateClass.IntensiveType.Value;
            const groupGeneralValue = prices.GroupClass.GeneralType.Value;
            const groupIntensiveValue = prices.GroupClass.IntensiveType.Value;

            // VARIABLES
            let minorValue = 0;

            if(prices.PrivateClass.Active) {
                if(prices.PrivateClass.GeneralType.Active) {
                    minorValue = privateGeneralValue;
                }

                if(prices.PrivateClass.IntensiveType.Active) {
                    minorValue = privateIntensiveValue < minorValue ? privateIntensiveValue : minorValue;
                }
            }

            if(prices.GroupClass.Active) {
                if(prices.GroupClass.GeneralType.Active) {
                    minorValue = groupGeneralValue < minorValue ? groupGeneralValue : minorValue;
                }

                if(prices.GroupClass.IntensiveType.Active) {
                    minorValue = groupIntensiveValue < minorValue ? groupIntensiveValue : minorValue;
                }
            }


            return minorValue;
        }



        /**
        * schoolFeatureRatingAverage
        * @description - Calculate school feature rating average
        * @function
        * @param {app.models.school.School} school - School Object
        * @return {number} average - return school feature rating average
        */
        schoolFeatureRatingAverage(school: app.models.school.School): number {
            //CONSTANTS
            //NOTE: We added this value if the school not offer some features,
            // in order to not affect so much to global average.
            const middleValue = 2;

            //VARIABLES
            let atmosphere = school.Atmosphere > 0 ? school.Atmosphere : middleValue;
            let immersion = school.Immersion.Rating > 0 ? school.Immersion.Rating : middleValue;
            let volunteering = school.Volunteering.Rating > 0 ? school.Volunteering.Rating : middleValue;
            let amenities = school.Amenities.Rating > 0 ? school.Amenities.Rating : middleValue;
            let accommodation = school.Accommodation.Rating > 0 ? school.Accommodation.Rating : middleValue;

            let average = 0;

            let newArr = [atmosphere, immersion, volunteering, amenities, accommodation];

            average = this.functionsUtil.averageNumbersArray(newArr);

            return average;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.school', [])
        .service(SchoolService.serviceId, SchoolService);

}
