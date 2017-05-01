var app;
(function (app) {
    var models;
    (function (models) {
        var country;
        (function (country) {
            var Country = (function () {
                function Country(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Country Model instanced');
                    this.id = obj.id;
                    this.nameEn = obj.nameEn || '';
                    this.nameEs = obj.nameEs || '';
                    this.aliasCountry = obj.aliasCountry || '';
                    this.code = obj.code || '';
                    this.photo = obj.photo || '';
                    this.thumbnail = obj.thumbnail || '';
                }
                Object.defineProperty(Country.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "NameEn", {
                    get: function () {
                        return this.nameEn;
                    },
                    set: function (nameEn) {
                        if (nameEn === undefined) {
                            throw 'Please supply country EN value';
                        }
                        this.nameEn = nameEn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "NameEs", {
                    get: function () {
                        return this.nameEs;
                    },
                    set: function (nameEs) {
                        if (nameEs === undefined) {
                            throw 'Please supply name ES value';
                        }
                        this.nameEs = nameEs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "AliasCountry", {
                    get: function () {
                        return this.aliasCountry;
                    },
                    set: function (aliasCountry) {
                        if (aliasCountry === undefined) {
                            throw 'Please supply Country Alias value';
                        }
                        this.aliasCountry = aliasCountry;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Code", {
                    get: function () {
                        return this.code;
                    },
                    set: function (code) {
                        if (code === undefined) {
                            throw 'Please supply country code value';
                        }
                        this.code = code;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Photo", {
                    get: function () {
                        return this.photo;
                    },
                    set: function (photo) {
                        if (photo === undefined) {
                            throw 'Please supply country photo value';
                        }
                        this.photo = photo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Thumbnail", {
                    get: function () {
                        return this.thumbnail;
                    },
                    set: function (thumbnail) {
                        if (thumbnail === undefined) {
                            throw 'Please supply country thumbnail value';
                        }
                        this.thumbnail = thumbnail;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Country;
            }());
            country.Country = Country;
        })(country = models.country || (models.country = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/country/country.model.js.map
