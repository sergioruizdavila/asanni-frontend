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
        static $inject = [''];

        constructor() {
            toastr.options.positionClass = "toast-top-right";
            toastr.options.showDuration = 300;
            toastr.options.hideDuration = 300;
            toastr.options.timeOut = 2000;
        }

        //methods
        success(message: any): void {
            toastr.success(message);
        }

        error(message: string): void {
            //default config
            toastr.options.closeButton = true;
            toastr.options.timeOut = 100000;
            if (!message) {
                message = 'Server error occurred, try again';
            }
            toastr.error(message);
        }

        info(message: any): void {
            toastr.info(message);
        }


        static instance(): IMessageUtilService {
            return new messageUtilService();
        }

    }

    angular
        .module('mainApp.core.util')
        .factory(messageUtilService.serviceId, messageUtilService.instance);

}
