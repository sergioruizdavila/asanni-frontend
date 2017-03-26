var app;
(function (app) {
    var models;
    (function (models) {
        var feedback;
        (function (feedback_1) {
            'use strict';
            var FeedbackService = (function () {
                function FeedbackService(restApi) {
                    this.restApi = restApi;
                    console.log('feedback service instanced');
                }
                FeedbackService.prototype.createFeedback = function (feedback) {
                    var promise;
                    var url = 'feedbacks';
                    promise = this.restApi.create({ url: url }, feedback)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                FeedbackService.prototype.getEarlyById = function (id) {
                    var url = 'early/';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                FeedbackService.serviceId = 'mainApp.models.feedback.FeedbackService';
                FeedbackService.$inject = [
                    'mainApp.core.restApi.restApiService'
                ];
                return FeedbackService;
            }());
            feedback_1.FeedbackService = FeedbackService;
            angular
                .module('mainApp.models.feedback', [])
                .service(FeedbackService.serviceId, FeedbackService);
        })(feedback = models.feedback || (models.feedback = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feedback/feedback.service.js.map
