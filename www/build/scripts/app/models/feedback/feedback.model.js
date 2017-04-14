var app;
(function (app) {
    var models;
    (function (models) {
        var feedback;
        (function (feedback) {
            var Feedback = (function () {
                function Feedback(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Feedback Model instanced');
                    this.id = obj.id;
                    this.nextCountry = obj.nextCountry || '';
                    this.nextFeature = obj.nextFeature || 0;
                }
                Object.defineProperty(Feedback.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feedback.prototype, "NextCountry", {
                    get: function () {
                        return this.nextCountry;
                    },
                    set: function (nextCountry) {
                        if (nextCountry === undefined) {
                            throw 'Please supply next country';
                        }
                        this.nextCountry = nextCountry;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feedback.prototype, "NextFeature", {
                    get: function () {
                        return this.nextFeature;
                    },
                    set: function (nextFeature) {
                        if (nextFeature === undefined) {
                            throw 'Please supply next feature';
                        }
                        this.nextFeature = nextFeature;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Feedback;
            }());
            feedback.Feedback = Feedback;
        })(feedback = models.feedback || (models.feedback = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feedback/feedback.model.js.map
