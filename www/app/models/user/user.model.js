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
                    this.location = new Location(obj.location);
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
                            throw 'Please supply location';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Location", {
                    get: function () {
                        return this.location;
                    },
                    set: function (location) {
                        if (location === undefined) {
                            throw 'Please supply location';
                        }
                        this.location = location;
                    },
                    enumerable: true,
                    configurable: true
                });
                return User;
            }());
            user.User = User;
            var Location = (function () {
                function Location(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('User Model instanced');
                    this.id = obj.id;
                    this.country = obj.country || '';
                    this.address = obj.address || '';
                    this.position = new Position(obj.position);
                    this.city = obj.city || '';
                    this.state = obj.state || '';
                    this.zipCode = obj.zipCode || '';
                }
                Object.defineProperty(Location.prototype, "Id", {
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
                Object.defineProperty(Location.prototype, "Country", {
                    get: function () {
                        return this.country;
                    },
                    set: function (country) {
                        if (country === undefined) {
                            throw 'Please supply country location';
                        }
                        this.country = country;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Address", {
                    get: function () {
                        return this.address;
                    },
                    set: function (address) {
                        if (address === undefined) {
                            throw 'Please supply address location';
                        }
                        this.address = address;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Position", {
                    get: function () {
                        return this.position;
                    },
                    set: function (position) {
                        if (position === undefined) {
                            throw 'Please supply address location';
                        }
                        this.position = position;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "City", {
                    get: function () {
                        return this.city;
                    },
                    set: function (city) {
                        if (city === undefined) {
                            throw 'Please supply city location';
                        }
                        this.city = city;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "State", {
                    get: function () {
                        return this.state;
                    },
                    set: function (state) {
                        if (state === undefined) {
                            throw 'Please supply state location';
                        }
                        this.state = state;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "ZipCode", {
                    get: function () {
                        return this.zipCode;
                    },
                    set: function (zipCode) {
                        if (zipCode === undefined) {
                            throw 'Please supply zip code location';
                        }
                        this.zipCode = zipCode;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Location;
            }());
            user.Location = Location;
            var Position = (function () {
                function Position(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('User Model instanced');
                    this.id = obj.id;
                    this.lng = obj.lng || '';
                    this.lat = obj.lat || '';
                }
                Object.defineProperty(Position.prototype, "Id", {
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
                Object.defineProperty(Position.prototype, "Lng", {
                    get: function () {
                        return this.lng;
                    },
                    set: function (lng) {
                        if (lng === undefined) {
                            throw 'Please supply lng position';
                        }
                        this.lng = lng;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Lat", {
                    get: function () {
                        return this.lat;
                    },
                    set: function (lat) {
                        if (lat === undefined) {
                            throw 'Please supply lat position';
                        }
                        this.lat = lat;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Position;
            }());
            user.Position = Position;
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=user.model.js.map