/**
 * RestApiService
 * @description - Rest Api Service
 */

module app.core.restApi {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IRestApi extends ng.resource.IResource<any> {
        show: any;
        query: any;
        queryObject: any;
        create: any;
        update: any;
        remove: any;
    }

    /**********************************/
    /*         CLASS DEFINITION       */
    /**********************************/
    export class RestApiService {

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        static serviceId = 'mainApp.core.restApi.restApiService';


        /*-- INJECT DEPENDENCIES--*/
        static $inject = [
            '$resource',
            'dataConfig'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $resource: ng.resource.IResourceService,
                    dataConfig: IDataConfig) {
        }

        /**********************************/
        /*               API              */
        /**********************************/
        public static Api($resource, dataConfig: IDataConfig): IRestApi {

            var resource = $resource(dataConfig.baseUrl + ':url/:id', { url: '@url'},
            {
                show: { method: 'GET', params: {id: '@id'} },
                query: { method: 'GET', isArray: true },
                queryObject: { method: 'GET', isArray: false },
                create: { method: 'POST' },
                update: { method: 'PUT', params: { id: '@id' } },
                remove: { method: 'DELETE', params: { id: '@id' } }
            });

            return <IRestApi>resource;

        }

    }


    angular
        .module('mainApp.core.restApi')
        .factory(RestApiService.serviceId, RestApiService.Api)
        .factory('customHttpInterceptor', customHttpInterceptor)
        .config(configApi);

        configApi.$inject = ['$httpProvider'];
        customHttpInterceptor.$inject = ['$q', 'mainApp.core.util.messageUtilService'];

        function configApi($httpProvider) {
            $httpProvider.interceptors.push('customHttpInterceptor');
        }

        function customHttpInterceptor(
                    $q: angular.IQService,
                    messageUtil: app.core.util.messageUtil.IMessageUtilService) {

            return {
                request: function(req) {
                    req.url = decodeURIComponent(req.url);
                    return req;
                },
                requestError: function (rejection) {
                    return rejection;
                },
                response: function (res) {
                    return res;
                }
            }

        }


}
