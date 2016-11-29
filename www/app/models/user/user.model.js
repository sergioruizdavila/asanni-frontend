var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user) {
            var User = (function () {
                function User(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('User Model instanced');
                    this.id = obj.id;
                    this.avatar = obj.avatar;
                    this.username = obj.username || '';
                    this.email = obj.email || '';
                    this.phoneNumber = obj.phoneNumber || '';
                    this.firstName = obj.firstName || '';
                    this.lastName = obj.lastName || '';
                    this.sex = obj.sex || '';
                    this.birthDate = obj.birthDate || '';
                    this.born = obj.born || '';
                    this.about = obj.about || '';
                    this.countryLocation = obj.countryLocation || '';
                    this.addressLocation = obj.addressLocation || '';
                    this.cityLocation = obj.cityLocation || '';
                    this.stateLocation = obj.stateLocation || '';
                    this.zipCodeLocation = obj.zipCodeLocation || '';
                }
                Object.defineProperty(User.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Avatar", {
                    get: function () {
                        return this.avatar;
                    },
                    set: function (avatar) {
                        if (avatar === undefined) {
                            throw 'Please supply avatar';
                        }
                        this.avatar = avatar;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Username", {
                    get: function () {
                        return this.username;
                    },
                    set: function (username) {
                        if (username === undefined) {
                            throw 'Please supply username';
                        }
                        this.username = username;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Email", {
                    get: function () {
                        return this.email;
                    },
                    set: function (email) {
                        if (email === undefined) {
                            throw 'Please supply email';
                        }
                        this.email = email;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "PhoneNumber", {
                    get: function () {
                        return this.phoneNumber;
                    },
                    set: function (phoneNumber) {
                        if (phoneNumber === undefined) {
                            throw 'Please supply phone number';
                        }
                        this.phoneNumber = phoneNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "FirstName", {
                    get: function () {
                        return this.firstName;
                    },
                    set: function (firstName) {
                        if (firstName === undefined) {
                            throw 'Please supply first name';
                        }
                        this.firstName = firstName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "LastName", {
                    get: function () {
                        return this.lastName;
                    },
                    set: function (lastName) {
                        if (lastName === undefined) {
                            throw 'Please supply last name';
                        }
                        this.lastName = lastName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Sex", {
                    get: function () {
                        return this.sex;
                    },
                    set: function (sex) {
                        if (sex === undefined) {
                            throw 'Please supply sex';
                        }
                        this.sex = sex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "BirthDate", {
                    get: function () {
                        return this.birthDate;
                    },
                    set: function (birthDate) {
                        if (birthDate === undefined) {
                            throw 'Please supply birth date';
                        }
                        this.birthDate = birthDate;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Born", {
                    get: function () {
                        return this.born;
                    },
                    set: function (born) {
                        if (born === undefined) {
                            throw 'Please supply born';
                        }
                        this.born = born;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "About", {
                    get: function () {
                        return this.about;
                    },
                    set: function (about) {
                        if (about === undefined) {
                            throw 'Please supply about';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "CountryLocation", {
                    get: function () {
                        return this.addressLocation;
                    },
                    set: function (countryLocation) {
                        if (countryLocation === undefined) {
                            throw 'Please supply country location';
                        }
                        this.countryLocation = countryLocation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "AddressLocation", {
                    get: function () {
                        return this.addressLocation;
                    },
                    set: function (addressLocation) {
                        if (addressLocation === undefined) {
                            throw 'Please supply address location';
                        }
                        this.addressLocation = addressLocation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "CityLocation", {
                    get: function () {
                        return this.cityLocation;
                    },
                    set: function (cityLocation) {
                        if (cityLocation === undefined) {
                            throw 'Please supply city location';
                        }
                        this.cityLocation = cityLocation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "StateLocation", {
                    get: function () {
                        return this.stateLocation;
                    },
                    set: function (stateLocation) {
                        if (stateLocation === undefined) {
                            throw 'Please supply state location';
                        }
                        this.stateLocation = stateLocation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "ZipCodeLocation", {
                    get: function () {
                        return this.zipCodeLocation;
                    },
                    set: function (zipCodeLocation) {
                        if (zipCodeLocation === undefined) {
                            throw 'Please supply zip code location';
                        }
                        this.zipCodeLocation = zipCodeLocation;
                    },
                    enumerable: true,
                    configurable: true
                });
                return User;
            }());
            user.User = User;
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=user.model.js.map