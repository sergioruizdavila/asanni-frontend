/**
 * FeedbackService
 * @description - Services related on Feedback Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module app.models.feedback {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFeedbackService {
        createFeedback: (feedback: app.models.feedback.Feedback) => angular.IPromise<any>;
        getEarlyById: (id: string) => angular.IPromise<any>;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FeedbackService implements IFeedbackService {

        static serviceId = 'mainApp.models.feedback.FeedbackService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.restApi.restApiService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private restApi: app.core.restApi.IRestApi) {
            //LOG
            console.log('feedback service instanced');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * createFeedback
        * @description - create Feedback entity on DB
        * @function
        * @params {app.models.feedback.Feedback} feedback - feedback Object
        * @return {promise} promise - Return a promise of "Add Feedback Request".
        * @return {object} response - Returns response about If request was success or error.
        */
        createFeedback(feedback): ng.IPromise<any> {
            var promise;
            let url = 'feedbacks';
            promise = this.restApi.create({ url: url }, feedback)
                .$promise.then(
                    function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );

            return promise;
        }



        /**
        * getEarlyById
        * @description - get early adopter by Id
        * @use - this.UserService.getEarlyById('98d667ae');
        * @function
        * @params {string} id - early adopter id
        * @return {angular.IPromise<any>} promise - return early adopter by Id
        */
        getEarlyById(id): angular.IPromise<any> {
            //VARIABLES
            let url = 'early/';

            return this.restApi.show({url: url, id: id}).$promise
                .then(
                    function(data) {
                        return data;
                    }
                ).catch(
                    function(err) {
                        console.log(err);
                        return err;
                    }
                );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.models.feedback', [])
        .service(FeedbackService.serviceId, FeedbackService);

}
