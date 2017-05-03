var app;
(function (app) {
    var models;
    (function (models) {
        var country;
        (function (country) {
            var Country = (function () {
                function Country(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Country Model instanced');
                    this.id = obj.id;
                    this.aliasCountry = obj.aliasCountry || '';
                    this.nameEn = obj.nameEn || '';
                    this.nameEs = obj.nameEs || '';
                    this.descriptionEn = obj.descriptionEn || '';
                    this.descriptionEs = obj.descriptionEs || '';
                    this.recommend = obj.recommend || 0;
                    this.code = obj.code || '';
                    this.currencyCode = obj.currencyCode || '';
                    this.currencyName = obj.currencyName || '';
                    this.capital = obj.capital || '';
                    this.zone = obj.zone || '';
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
                Object.defineProperty(Country.prototype, "DescriptionEn", {
                    get: function () {
                        return this.descriptionEn;
                    },
                    set: function (descriptionEn) {
                        if (descriptionEn === undefined) {
                            throw 'Please supply country description EN value';
                        }
                        this.descriptionEn = descriptionEn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "DescriptionEs", {
                    get: function () {
                        return this.descriptionEs;
                    },
                    set: function (descriptionEs) {
                        if (descriptionEs === undefined) {
                            throw 'Please supply country description ES value';
                        }
                        this.descriptionEs = descriptionEs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Recommend", {
                    get: function () {
                        return this.recommend;
                    },
                    set: function (recommend) {
                        if (recommend === undefined) {
                            throw 'Please supply country recommend value';
                        }
                        this.recommend = recommend;
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
                Object.defineProperty(Country.prototype, "CurrencyCode", {
                    get: function () {
                        return this.currencyCode;
                    },
                    set: function (currencyCode) {
                        if (currencyCode === undefined) {
                            throw 'Please supply country currency code value';
                        }
                        this.currencyCode = currencyCode;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "CurrencyName", {
                    get: function () {
                        return this.currencyName;
                    },
                    set: function (currencyName) {
                        if (currencyName === undefined) {
                            throw 'Please supply country currency name value';
                        }
                        this.currencyName = currencyName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Capital", {
                    get: function () {
                        return this.capital;
                    },
                    set: function (capital) {
                        if (capital === undefined) {
                            throw 'Please supply country capital name value';
                        }
                        this.capital = capital;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Country.prototype, "Zone", {
                    get: function () {
                        return this.zone;
                    },
                    set: function (zone) {
                        if (zone === undefined) {
                            throw 'Please supply country zone code value';
                        }
                        this.zone = zone;
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
