/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

 declare var DEBUG: boolean;
 /* This must be false in production */
 DEBUG = true;
 /************************************/


/*--  INTERFACE --*/
interface IDataConfig {
    currentYear: string;
    baseUrl: string;
    domain: string;
    https: boolean;
    autoRefreshTokenIntervalSeconds: number;
    localOAuth2Key: string;
    googleMapKey: string;
    mixpanelTokenPRD: string;
    mixpanelTokenDEV: string;
    modalMeetingPointTmpl: string;
    modalLanguagesTmpl: string;
    modalExperienceTmpl: string;
    modalEducationTmpl: string;
    modalCertificateTmpl: string;
    modalSignUpTmpl: string;
    modalLogInTmpl: string;
    modalRecommendTeacherTmpl: string;
    bucketS3: string;
    regionS3: string;
    accessKeyIdS3: string;
    secretAccessKeyS3: string;
    userId: string;
    teacherIdLocalStorage: string;
    earlyIdLocalStorage: string;
    cookieName: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    let BASE_URL = 'https://waysily-server.herokuapp.com/api/v1/';
    let BUCKETS3 = 'waysily-img/teachers-avatar-prd';

    /* Assign Environment values */
    if(DEBUG) {
        BASE_URL = 'http://127.0.0.1:8000/api/v1/';
        BUCKETS3 = 'waysily-img/teachers-avatar-dev';
    }

    // DEV Fake
    // baseUrl: 'http://localhost:3000/'
    // Use: command - json-server --watch db.json
    // DEV Local
    // baseUrl: 'http://127.0.0.1:8000/api/v1/'
    // bucketS3: 'waysily-img/teachers-avatar-dev'
    // DEV Heroku
    // baseUrl: 'https://waysily-server-dev.herokuapp.com/api/v1/'
    // bucketS3: 'waysily-img/teachers-avatar-dev'
    // PRD Heroku
    // baseUrl: 'https://waysily-server.herokuapp.com/api/v1/'
    // bucketS3: 'waysily-img/teachers-avatar-prd'
    var dataConfig: IDataConfig = {
        currentYear: '2017',
        baseUrl: BASE_URL,
        domain: 'www.waysily.com',
        https: false,
        autoRefreshTokenIntervalSeconds: 300,
        localOAuth2Key: 'fCY4EWQIPuixOGhA9xRIxzVLNgKJVmG1CVnwXssq',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        mixpanelTokenPRD: '86a48c88274599c662ad64edb74b12da',
        mixpanelTokenDEV: 'eda475bf46e7f01e417a4ed1d9cc3e58',
        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        modalLanguagesTmpl: 'components/modal/modalLanguages/modalLanguages.html',
        modalExperienceTmpl: 'components/modal/modalExperience/modalExperience.html',
        modalEducationTmpl: 'components/modal/modalEducation/modalEducation.html',
        modalCertificateTmpl: 'components/modal/modalCertificate/modalCertificate.html',
        modalSignUpTmpl: 'components/modal/modalSignUp/modalSignUp.html',
        modalLogInTmpl: 'components/modal/modalLogIn/modalLogIn.html',
        modalRecommendTeacherTmpl: 'components/modal/modalRecommendTeacher/modalRecommendTeacher.html',
        bucketS3: BUCKETS3,
        regionS3: 'us-east-1',
        accessKeyIdS3: 'AKIAIHKBYIUQD4KBIRLQ',
        secretAccessKeyS3: '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',
        userId: '',
        teacherIdLocalStorage: 'waysily.teacher_id',
        earlyIdLocalStorage: 'waysily.early_id',
        cookieName: 'token'
    };


    angular
        .module('mainApp')
        .constant('dataConfig', dataConfig);

})();
