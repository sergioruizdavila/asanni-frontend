/**
 * messageUtilService
 * @description - Some description
 * @constructor
 */


module app.core.util.messageUtil {

    'use strict';

    export interface IMessageUtilService {
        //properties

        //methods
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
    }

    class messageUtilService implements IMessageUtilService {

        static serviceId = 'mainApp.core.util.messageUtilService';

        //inject dependencies
        static $inject = ['$filter'];

        constructor(private $filter: angular.IFilterService) {
            toastr.options.positionClass = "toast-top-right";
            toastr.options.showDuration = 300;
            toastr.options.hideDuration = 300;
            toastr.options.timeOut = 2000;
        }

        //methods
        success(message: string): void {
            toastr.success(message);
        }

        error(message: string): void {
            //CONSTANTS
            const ERROR_SERVER_MESSAGE = this.$filter('translate')('%notification.error.server.text');
            /***************************************/
            //default config
            toastr.options.closeButton = true;
            toastr.options.timeOut = 10000;
            if (!message) {
                message = ERROR_SERVER_MESSAGE;
            }
            toastr.error(message);
        }

        info(message: string): void {
            toastr.options.closeButton = true;
            toastr.options.timeOut = 10000;
            toastr.info(message);
        }


        static instance($filter: angular.IFilterService): IMessageUtilService {
            return new messageUtilService($filter);
        }

    }

    angular
        .module('mainApp.core.util')
        .factory(messageUtilService.serviceId, messageUtilService.instance);

}
