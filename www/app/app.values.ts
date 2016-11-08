/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

/*--  INTERFACE --*/
interface IDataConfig {
    baseUrl: string;
    googleMapKey: string;
    modalMeetingPointTmpl: string;
    userId: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    // DEV Fake
    // baseUrl: 'http://localhost:3000/'
    // DEV BackEnd
    // baseUrl: 'http://127.0.0.1:8000/api/v1/'
    // PRD BackEnd
    // baseUrl: 'https://asanni.herokuapp.com/api/v1/'
    var dataConfig: IDataConfig = {
        baseUrl: 'https://asanni.herokuapp.com/api/v1/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',

        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        userId: ''
    };

    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);

})();
