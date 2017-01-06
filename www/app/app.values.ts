/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

/*--  INTERFACE --*/
interface IDataConfig {
    currentYear: string;
    baseUrl: string;
    googleMapKey: string;
    mixpanelToken: string;
    modalMeetingPointTmpl: string;
    modalLanguagesTmpl: string;
    modalExperienceTmpl: string;
    modalEducationTmpl: string;
    modalCertificateTmpl: string;
    modalSignUpTmpl: string;
    bucketS3: string;
    regionS3: string;
    accessKeyIdS3: string;
    secretAccessKeyS3: string;
    userId: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    // DEV Fake
    // baseUrl: 'http://localhost:3000/'
    // Use: command - json-server --watch db.json
    // DEV Local
    // baseUrl: 'http://127.0.0.1:8000/api/v1/'
    // bucketS3: 'waysily-img'
    // DEV Heroku
    // baseUrl: 'https://waysily-server-dev.herokuapp.com/api/v1/'
    // bucketS3: 'waysily-img/teachers-avatar-dev'
    // PRD Heroku
    // baseUrl: 'https://waysily-server.herokuapp.com/api/v1/'
    // bucketS3: 'waysily-img/teachers-avatar-prd'
    var dataConfig: IDataConfig = {
        currentYear: '2017',
        baseUrl: 'https://waysily-server-dev.herokuapp.com/api/v1/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        mixpanelToken: '86a48c88274599c662ad64edb74b12da',
        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        modalLanguagesTmpl: 'components/modal/modalLanguages/modalLanguages.html',
        modalExperienceTmpl: 'components/modal/modalExperience/modalExperience.html',
        modalEducationTmpl: 'components/modal/modalEducation/modalEducation.html',
        modalCertificateTmpl: 'components/modal/modalCertificate/modalCertificate.html',
        modalSignUpTmpl: 'components/modal/modalSignUp/modalSignUp.html',
        bucketS3: 'waysily-img/teachers-avatar-dev',
        regionS3: 'us-east-1',
        accessKeyIdS3: 'AKIAIHKBYIUQD4KBIRLQ',
        secretAccessKeyS3: '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',
        userId: ''
    };


    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);

})();
