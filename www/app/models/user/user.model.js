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
                    this.phone_number = obj.phone_number || '';
                    this.first_name = obj.first_name || '';
                    this.last_name = obj.last_name || '';
                    this.sex = obj.sex || '';
                    this.birth_date = obj.birth_date || '';
                    this.born = obj.born || '';
                    this.about = obj.about || '';
                    this.location = obj.location || '';
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
                        return this.phone_number;
                    },
                    set: function (phone_number) {
                        if (phone_number === undefined) {
                            throw 'Please supply phone number';
                        }
                        this.phone_number = phone_number;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "First_name", {
                    get: function () {
                        return this.first_name;
                    },
                    set: function (first_name) {
                        if (first_name === undefined) {
                            throw 'Please supply first name';
                        }
                        this.first_name = first_name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "Last_name", {
                    get: function () {
                        return this.last_name;
                    },
                    set: function (last_name) {
                        if (last_name === undefined) {
                            throw 'Please supply last name';
                        }
                        this.last_name = last_name;
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
                Object.defineProperty(User.prototype, "Birth_date", {
                    get: function () {
                        return this.birth_date;
                    },
                    set: function (birth_date) {
                        if (birth_date === undefined) {
                            throw 'Please supply sex';
                        }
                        this.birth_date = birth_date;
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
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=user.model.js.map