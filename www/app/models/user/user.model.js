var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user) {
            var Status;
            (function (Status) {
                Status[Status["new"] = 0] = "new";
                Status[Status["validated"] = 1] = "validated";
                Status[Status["verified"] = 2] = "verified";
            })(Status = user.Status || (user.Status = {}));
            var Profile = (function () {
                function Profile(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Profile Model instanced');
                    if (obj === null)
                        obj = {};
                    this.userId = obj.userId || '';
                    this.avatar = obj.avatar || '';
                    this.username = obj.username || '';
                    this.email = obj.email || '';
                    this.phoneNumber = obj.phoneNumber || '';
                    this.firstName = obj.firstName || '';
                    this.lastName = obj.lastName || '';
                    this.gender = obj.gender || '';
                    this.birthDate = obj.birthDate || null;
                    this.bornCountry = obj.bornCountry || '';
                    this.bornCity = obj.bornCity || '';
                    this.about = obj.about || '';
                    this.status = obj.status || 'NW';
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(Profile.prototype, "UserId", {
                    get: function () {
                        return this.userId;
                    },
                    set: function (userId) {
                        if (userId === undefined) {
                            throw 'Please supply profile userId';
                        }
                        this.userId = userId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Avatar", {
                    get: function () {
                        return this.avatar;
                    },
                    set: function (avatar) {
                        if (avatar === undefined) {
                            throw 'Please supply profile avatar';
                        }
                        this.avatar = avatar;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Username", {
                    get: function () {
                        return this.username;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Email", {
                    get: function () {
                        return this.email;
                    },
                    set: function (email) {
                        if (email === undefined) {
                            throw 'Please supply profile email';
                        }
                        this.email = email;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "PhoneNumber", {
                    get: function () {
                        return this.phoneNumber;
                    },
                    set: function (phoneNumber) {
                        if (phoneNumber === undefined) {
                            throw 'Please supply profile phone number';
                        }
                        this.phoneNumber = phoneNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "FirstName", {
                    get: function () {
                        return this.firstName;
                    },
                    set: function (firstName) {
                        if (firstName === undefined) {
                            throw 'Please supply profile first name';
                        }
                        this.firstName = firstName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "LastName", {
                    get: function () {
                        return this.lastName;
                    },
                    set: function (lastName) {
                        if (lastName === undefined) {
                            throw 'Please supply profile last name';
                        }
                        this.lastName = lastName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Gender", {
                    get: function () {
                        return this.gender;
                    },
                    set: function (gender) {
                        if (gender === undefined) {
                            throw 'Please supply profile gender';
                        }
                        this.gender = gender;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BirthDate", {
                    get: function () {
                        return this.birthDate;
                    },
                    set: function (birthDate) {
                        if (birthDate === undefined) {
                            throw 'Please supply profile birth date';
                        }
                        this.birthDate = birthDate;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BornCountry", {
                    get: function () {
                        return this.bornCountry;
                    },
                    set: function (bornCountry) {
                        if (bornCountry === undefined) {
                            throw 'Please supply profile born country';
                        }
                        this.bornCountry = bornCountry;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BornCity", {
                    get: function () {
                        return this.bornCity;
                    },
                    set: function (bornCity) {
                        if (bornCity === undefined) {
                            throw 'Please supply profile born city';
                        }
                        this.bornCity = bornCity;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "About", {
                    get: function () {
                        return this.about;
                    },
                    set: function (about) {
                        if (about === undefined) {
                            throw 'Please supply profile location';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Status", {
                    get: function () {
                        return this.status;
                    },
                    set: function (status) {
                        if (status === undefined) {
                            throw 'Please supply profile status value';
                        }
                        this.status = status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Profile;
            }());
            user.Profile = Profile;
            var Location = (function () {
                function Location(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Location Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id || '';
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
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
                Object.defineProperty(Location.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply location uid';
                        }
                        this.uid = uid;
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
                    DEBUG && console.log('Position Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id || '';
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
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
                Object.defineProperty(Position.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply position uid';
                        }
                        this.uid = uid;
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