var app;
(function (app) {
    var models;
    (function (models) {
        var feature;
        (function (feature) {
            var Feature = (function () {
                function Feature(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Feature Model instanced');
                    this.id = obj.id;
                    this.featureEn = obj.featureEn || '';
                    this.featureEs = obj.featureEs || '';
                    this.descriptionEn = obj.descriptionEn || '';
                    this.descriptionEs = obj.descriptionEs || '';
                }
                Object.defineProperty(Feature.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feature.prototype, "FeatureEn", {
                    get: function () {
                        return this.featureEn;
                    },
                    set: function (featureEn) {
                        if (featureEn === undefined) {
                            throw 'Please supply feature en value';
                        }
                        this.featureEn = featureEn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feature.prototype, "FeatureEs", {
                    get: function () {
                        return this.featureEs;
                    },
                    set: function (featureEs) {
                        if (featureEs === undefined) {
                            throw 'Please supply feature es value';
                        }
                        this.featureEs = featureEs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feature.prototype, "DescriptionEn", {
                    get: function () {
                        return this.descriptionEn;
                    },
                    set: function (descriptionEn) {
                        if (descriptionEn === undefined) {
                            throw 'Please supply description en value';
                        }
                        this.descriptionEn = descriptionEn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feature.prototype, "DescriptionEs", {
                    get: function () {
                        return this.descriptionEs;
                    },
                    set: function (descriptionEs) {
                        if (descriptionEs === undefined) {
                            throw 'Please supply description es value';
                        }
                        this.descriptionEs = descriptionEs;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Feature;
            }());
            feature.Feature = Feature;
        })(feature = models.feature || (models.feature = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feature/feature.model.js.map
