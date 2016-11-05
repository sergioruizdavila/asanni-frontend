(function () {
    'use strict';
    var dataConfig = {
        baseUrl: 'http://localhost:3000/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        userId: ''
    };
    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);
})();
//# sourceMappingURL=app.values.js.map