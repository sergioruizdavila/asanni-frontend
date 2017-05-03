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
        getSchoolByAlias: (aliasSchool: string) => angular.IPromise<any>;
        getSchoolByUserId: (userId: string) => angular.IPromise<any>;
        getAllSchools: () => angular.IPromise<any>;
        getAllSchoolsByStatus: (status) => angular.IPromise<any>;
        getAllSchoolsByCountry: (countryId) => angular.IPromise<any>;
        getMinorSchoolPrice: (prices: app.models.school.Price) => number;
        schoolFeatureRatingAverage: (school: app.models.school.School) => number;
        buildMetaTagValue: (school: app.models.school.School) => app.core.interfaces.IMetaTag;
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
        STATUS_SCHOOL_URI: string;
        COUNTRY_SCHOOL_URI: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.auth.AuthService',
            'dataConfig',
            '$q'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private restApi: app.core.restApi.IRestApi,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private AuthService: app.auth.IAuthService,
            private dataConfig: IDataConfig,
            private $q: angular.IQService) {

            //LOG
            DEBUG && console.log('schools service instanced');

            //CONSTANTS
            this.SCHOOL_URI = 'schools';
            this.USER_SCHOOL_URI = 'schools?userId=';
            this.STATUS_SCHOOL_URI = 'schools?status=';
            this.COUNTRY_SCHOOL_URI = 'schools?country=';

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
        * getSchoolByAlias
        * @description - get school by Alias School
        * @use - this.SchoolService.getSchoolByAlias('colombia-immersion-2');
        * @function
        * @param {string} aliasSchool - alias school value
        * @return {angular.IPromise<any>} promise - return school by Alias
        */
        getSchoolByAlias(aliasSchool: string): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.SCHOOL_URI + '/' + aliasSchool;
            let deferred = this.$q.defer();

            this.restApi.show({url: url}).$promise
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
        * getAllSchoolsByStatus
        * @description - get all Schools by status filter value
        * @function
        * @param {string} status - status school
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllSchoolsByStatus(status: string): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.STATUS_SCHOOL_URI + status;
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
        * getAllSchoolsByCountry
        * @description - get all Schools by status filter value
        * @function
        * @param {number} countryId - country id
        * @return {angular.IPromise<any>} return a promise with teachers list
        */
        getAllSchoolsByCountry(countryId: number): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let url = this.COUNTRY_SCHOOL_URI + countryId;
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
                    if(minorValue > 0) {
                        minorValue = privateIntensiveValue < minorValue ? privateIntensiveValue : minorValue;
                    } else {
                        minorValue = privateIntensiveValue;
                    }
                }
            }

            if(prices.GroupClass.Active) {
                if(prices.GroupClass.GeneralType.Active) {
                    if(minorValue > 0) {
                        minorValue = groupGeneralValue < minorValue ? groupGeneralValue : minorValue;
                    } else {
                        minorValue = groupGeneralValue;
                    }
                }

                if(prices.GroupClass.IntensiveType.Active) {
                    if(minorValue > 0){
                        minorValue = groupIntensiveValue < minorValue ? groupIntensiveValue : minorValue;
                    } else {
                        minorValue = groupIntensiveValue;
                    }
                }
            }


            return minorValue;
        }



        /**
        * getMinorSchoolPackagePrice
        * @description - get the minor package price of school
        * @function
        * @param {app.models.school.Package} pkg - school's package object
        * @return {number} return minor package price value
        */
        getMinorSchoolPackagePrice(pkg: app.models.school.Package): number {
            // VARIABLES
            let minorValue = null;
            let price = 0;

            if(pkg.Active) {
                for (let i = 0; i < pkg.PackageOption.length; i++) {

                    if(pkg.PackageOption[i].Active) {
                        price = pkg.PackageOption[i].Price;
                        if(minorValue) {
                            minorValue = price < minorValue ? price : minorValue;
                        } else {
                            minorValue = price;
                        }
                    }

                }
            } else {
                minorValue = 0;
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



        /**
        * buildMetaTagValue
        * @description - Build meta tags on school entity
        * @function
        * @param {app.models.school.School} school - School Object
        * @return {app.core.interfaces.IMetaTag} metaTags - meta tags object
        */

        buildMetaTagValue (school: app.models.school.School): app.core.interfaces.IMetaTag {
            //CONSTANTS
            const imageUrl = 'https://www.waysily.com/assets/images/waysily-shared.png';
            //VARIABLES
            let metaTags: app.core.interfaces.IMetaTag = {title:'',description:'',image:'',robots:'', url:''};

            //Build Title
            metaTags.title = school.Name;

            //Build description
            if(school.Price.Active) {
                let minorPrice = this.getMinorSchoolPrice(school.Price);
                metaTags.description = 'Classes from $' + minorPrice + ' per week. ';
            } else {
                let packageMinorPrice = this.getMinorSchoolPackagePrice(school.Package);
                metaTags.description = 'Package from $' + packageMinorPrice + '. ';
            }

            if(school.Immersion.Active) {
                metaTags.description += 'Offers immersion, language exchange';
            }

            if(school.Accommodation.Active) {
                metaTags.description += ', accomodation';
            }

            if(school.Volunteering.Active) {
                metaTags.description += ', volunteering';
            }

            if(school.Tour.Active) {
                let city = school.Location.City;
                metaTags.description += ', tour in the city of ' + city + '. ';
            } else {
                metaTags.description += '. ';
            }

            metaTags.description += 'Find everything ' + school.Name + ' offers to learn a language.';

            //Build image url
            metaTags.image = imageUrl;

            //Build robots
            metaTags.robots = 'follow,index';

            //Build canonical url
            metaTags.url = 'https://' + this.dataConfig.domain + '/page/school/' + school.AliasSchool;

            return metaTags;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.school', [])
        .service(SchoolService.serviceId, SchoolService);

}
