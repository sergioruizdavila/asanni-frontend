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

    var dataConfig: IDataConfig = {
        baseUrl: 'http://localhost:3000/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',

        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        userId: ''
    };

    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);

})();
