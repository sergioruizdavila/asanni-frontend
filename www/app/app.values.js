(function () {
    'use strict';
    var dataConfig = {
        currentYear: '2017',
        baseUrl: 'http://127.0.0.1:8000/api/v1/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        mixpanelToken: '86a48c88274599c662ad64edb74b12da',
        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        modalLanguagesTmpl: 'components/modal/modalLanguages/modalLanguages.html',
        modalExperienceTmpl: 'components/modal/modalExperience/modalExperience.html',
        modalEducationTmpl: 'components/modal/modalEducation/modalEducation.html',
        modalCertificateTmpl: 'components/modal/modalCertificate/modalCertificate.html',
        userId: ''
    };
    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);
})();
//# sourceMappingURL=app.values.js.map