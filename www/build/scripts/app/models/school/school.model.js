var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            var School = (function () {
                function School(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('School Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.user = obj.user || '';
                    this.photo = obj.photo || '';
                    this.name = obj.name || '';
                    this.email = obj.email || '';
                    this.about = obj.about || '';
                    this.website = obj.website || '';
                    this.phoneNumber = obj.phoneNumber || '';
                    this.facebook = obj.facebook || '';
                    this.twitter = obj.twitter || '';
                    this.instagram = obj.instagram || '';
                    this.meetupGroup = obj.meetupGroup || '';
                    this.facebookGroup = obj.facebookGroup || '';
                    this.location = new app.models.user.Location(obj.location);
                    this.languageTeach = obj.languageTeach || [];
                    this.immersion = new Immersion(obj.immersion);
                    this.languageExchange = obj.languageExchange || false;
                    this.workExchange = new WorkExchange(obj.workExchange);
                    this.volunteering = new Volunteering(obj.volunteering);
                    this.tour = new Tour(obj.tour);
                    this.atmosphere = obj.atmosphere || 0;
                    this.amenities = new Amenities(obj.amenities);
                    this.accommodation = new Accommodation(obj.accommodation);
                    this.classesBegin = obj.classesBegin || [];
                    this.price = new Price(obj.price);
                    this.discount = new Discount(obj.discount);
                    this.package = new Package(obj.package);
                    this.paymentMethod = new PaymentMethod(obj.paymentMethod);
                    this.bookingFee = new BookingFee(obj.bookingFee);
                    this.active = obj.active || false;
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(School.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "User", {
                    get: function () {
                        return this.user;
                    },
                    set: function (user) {
                        if (user === undefined) {
                            throw 'Please supply school user id manager';
                        }
                        this.user = user;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Photo", {
                    get: function () {
                        return this.photo;
                    },
                    set: function (photo) {
                        if (photo === undefined) {
                            throw 'Please supply school photo';
                        }
                        this.photo = photo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply school name';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Email", {
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
                Object.defineProperty(School.prototype, "About", {
                    get: function () {
                        return this.about;
                    },
                    set: function (about) {
                        if (about === undefined) {
                            throw 'Please supply school about';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Website", {
                    get: function () {
                        return this.website;
                    },
                    set: function (website) {
                        if (website === undefined) {
                            throw 'Please supply school website';
                        }
                        this.website = website;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "PhoneNumber", {
                    get: function () {
                        return this.phoneNumber;
                    },
                    set: function (phoneNumber) {
                        if (phoneNumber === undefined) {
                            throw 'Please supply school phoneNumber';
                        }
                        this.phoneNumber = phoneNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Facebook", {
                    get: function () {
                        return this.facebook;
                    },
                    set: function (facebook) {
                        if (facebook === undefined) {
                            throw 'Please supply school facebook';
                        }
                        this.facebook = facebook;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Twitter", {
                    get: function () {
                        return this.twitter;
                    },
                    set: function (twitter) {
                        if (twitter === undefined) {
                            throw 'Please supply school twitter';
                        }
                        this.twitter = twitter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Instagram", {
                    get: function () {
                        return this.instagram;
                    },
                    set: function (instagram) {
                        if (instagram === undefined) {
                            throw 'Please supply school instagram';
                        }
                        this.instagram = instagram;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "MeetupGroup", {
                    get: function () {
                        return this.meetupGroup;
                    },
                    set: function (meetupGroup) {
                        if (meetupGroup === undefined) {
                            throw 'Please supply school meetupGroup';
                        }
                        this.meetupGroup = meetupGroup;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "FacebookGroup", {
                    get: function () {
                        return this.facebookGroup;
                    },
                    set: function (facebookGroup) {
                        if (facebookGroup === undefined) {
                            throw 'Please supply school facebookGroup';
                        }
                        this.facebookGroup = facebookGroup;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "LanguageTeach", {
                    get: function () {
                        return this.languageTeach;
                    },
                    set: function (languageTeach) {
                        if (languageTeach === undefined) {
                            throw 'Please supply school language teach';
                        }
                        this.languageTeach = languageTeach;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Immersion", {
                    get: function () {
                        return this.immersion;
                    },
                    set: function (immersion) {
                        if (immersion === undefined) {
                            throw 'Please supply school immersion';
                        }
                        this.immersion = immersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "LanguageExchange", {
                    get: function () {
                        return this.languageExchange;
                    },
                    set: function (languageExchange) {
                        if (languageExchange === undefined) {
                            throw 'Please supply school language exchange';
                        }
                        this.languageExchange = languageExchange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "WorkExchange", {
                    get: function () {
                        return this.workExchange;
                    },
                    set: function (workExchange) {
                        if (workExchange === undefined) {
                            throw 'Please supply school work exchange';
                        }
                        this.workExchange = workExchange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Volunteering", {
                    get: function () {
                        return this.volunteering;
                    },
                    set: function (volunteering) {
                        if (volunteering === undefined) {
                            throw 'Please supply school volunteering';
                        }
                        this.volunteering = volunteering;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Tour", {
                    get: function () {
                        return this.tour;
                    },
                    set: function (tour) {
                        if (tour === undefined) {
                            throw 'Please supply school tour';
                        }
                        this.tour = tour;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Atmosphere", {
                    get: function () {
                        return this.atmosphere;
                    },
                    set: function (atmosphere) {
                        if (atmosphere === undefined) {
                            throw 'Please supply school atmosphere';
                        }
                        this.atmosphere = atmosphere;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Amenities", {
                    get: function () {
                        return this.amenities;
                    },
                    set: function (amenities) {
                        if (amenities === undefined) {
                            throw 'Please supply school amenities';
                        }
                        this.amenities = amenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Accommodation", {
                    get: function () {
                        return this.accommodation;
                    },
                    set: function (accommodation) {
                        if (accommodation === undefined) {
                            throw 'Please supply school accommodation';
                        }
                        this.accommodation = accommodation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "ClassesBegin", {
                    get: function () {
                        return this.classesBegin;
                    },
                    set: function (classesBegin) {
                        if (classesBegin === undefined) {
                            throw 'Please supply school classes begin';
                        }
                        this.classesBegin = classesBegin;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply school price';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Discount", {
                    get: function () {
                        return this.discount;
                    },
                    set: function (discount) {
                        if (discount === undefined) {
                            throw 'Please supply school discount';
                        }
                        this.discount = discount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Package", {
                    get: function () {
                        return this.package;
                    },
                    set: function (value) {
                        if (value === undefined) {
                            throw 'Please supply school package';
                        }
                        this.package = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "PaymentMethod", {
                    get: function () {
                        return this.paymentMethod;
                    },
                    set: function (paymentMethod) {
                        if (paymentMethod === undefined) {
                            throw 'Please supply school payment methods';
                        }
                        this.paymentMethod = paymentMethod;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "BookingFee", {
                    get: function () {
                        return this.bookingFee;
                    },
                    set: function (bookingFee) {
                        if (bookingFee === undefined) {
                            throw 'Please supply school booking fee';
                        }
                        this.bookingFee = bookingFee;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return School;
            }());
            school.School = School;
            var Immersion = (function () {
                function Immersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Immersion Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.otherOption = obj.otherOption || '';
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Immersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "OtherOption", {
                    get: function () {
                        return this.otherOption;
                    },
                    set: function (otherOption) {
                        if (otherOption === undefined) {
                            throw 'Please supply other option value of school';
                        }
                        this.otherOption = otherOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating immersion value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Immersion;
            }());
            school.Immersion = Immersion;
            var Package = (function () {
                function Package(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Package Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.packageOption = new PackageOption(obj.packageOption);
                }
                Object.defineProperty(Package.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of package school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Package.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of package school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Package.prototype, "PackageOption", {
                    get: function () {
                        return this.packageOption;
                    },
                    set: function (packageOption) {
                        if (packageOption === undefined) {
                            throw 'Please supply package option value of package school';
                        }
                        this.packageOption = packageOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Package;
            }());
            school.Package = Package;
            var PackageOption = (function () {
                function PackageOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Package Option Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.name = obj.name || '';
                    this.price = obj.price || 0;
                    this.description = obj.description || '';
                }
                Object.defineProperty(PackageOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of package option school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of package option school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply name value of package option school';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of package option school';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description value of package option school';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PackageOption;
            }());
            school.PackageOption = PackageOption;
            var WorkExchange = (function () {
                function WorkExchange(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Work Exchange Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.workExchangeOption = new WorkExchangeOption(obj.workExchangeOption);
                }
                Object.defineProperty(WorkExchange.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of work exchange';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchange.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of work exchange';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchange.prototype, "WorkExchangeOption", {
                    get: function () {
                        return this.workExchangeOption;
                    },
                    set: function (workExchangeOption) {
                        if (workExchangeOption === undefined) {
                            throw 'Please supply option value of work exchange option';
                        }
                        this.workExchangeOption = workExchangeOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorkExchange;
            }());
            school.WorkExchange = WorkExchange;
            var WorkExchangeOption = (function () {
                function WorkExchangeOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Work Exchange Option Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.category = obj.category || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(WorkExchangeOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of work exchange';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of work exchange';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category value of work exchange';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of work exchange';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorkExchangeOption;
            }());
            school.WorkExchangeOption = WorkExchangeOption;
            var Volunteering = (function () {
                function Volunteering(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Volunteering Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Volunteering.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of volunteering';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of volunteering';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply volunteering option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating volunteering value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Volunteering;
            }());
            school.Volunteering = Volunteering;
            var Tour = (function () {
                function Tour(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Tours Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.cityTour = obj.cityTour || false;
                }
                Object.defineProperty(Tour.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of volunteering';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of volunteering';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply volunteering option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "CityTour", {
                    get: function () {
                        return this.cityTour;
                    },
                    set: function (cityTour) {
                        if (cityTour === undefined) {
                            throw 'Please supply cityTour value of school';
                        }
                        this.cityTour = cityTour;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Tour;
            }());
            school.Tour = Tour;
            var Amenities = (function () {
                function Amenities(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Amenities Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.otherOption = obj.otherOption || '';
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Amenities.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of amenities';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of amenities';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply amenities option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "OtherOption", {
                    get: function () {
                        return this.otherOption;
                    },
                    set: function (otherOption) {
                        if (otherOption === undefined) {
                            throw 'Please supply other amenities options value of school';
                        }
                        this.otherOption = otherOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating amenities value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Amenities;
            }());
            school.Amenities = Amenities;
            var Accommodation = (function () {
                function Accommodation(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Accommodation Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.rating = obj.rating || 0;
                    if (obj != {}) {
                        this.accommodationOption = [];
                        for (var key in obj.accommodationOption) {
                            var accommodationOptionInstance = new AccommodationOption(obj.accommodationOption[key]);
                            this.addAccommodationOption(accommodationOptionInstance);
                        }
                    }
                    else {
                        this.accommodationOption = [];
                    }
                }
                Object.defineProperty(Accommodation.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of Accommodation';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of Accommodation';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating accommodation value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "AccommodationOption", {
                    get: function () {
                        return this.accommodationOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Accommodation.prototype.addAccommodationOption = function (accommodationOption) {
                    if (accommodationOption === undefined) {
                        throw 'Please supply accommodation option value (Add)';
                    }
                    this.accommodationOption.push(accommodationOption);
                };
                Accommodation.prototype.editAccommodationOption = function (accommodationOption) {
                    if (accommodationOption === undefined) {
                        throw 'Please supply Accommodation Option value (Edit)';
                    }
                    this.accommodationOption.forEach(function (element, index, array) {
                        if (accommodationOption.Id === element.Id) {
                            array[index] = accommodationOption;
                        }
                    });
                };
                return Accommodation;
            }());
            school.Accommodation = Accommodation;
            var AccommodationOption = (function () {
                function AccommodationOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Accommodation Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.category = obj.category || 0;
                    this.otherAmenities = obj.otherAmenities || '';
                    this.price = obj.price || 0;
                    this.amenities = obj.amenities || [];
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(AccommodationOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of Accommodation';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of Accommodation';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category value of Accommodation';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "OtherAmenities", {
                    get: function () {
                        return this.otherAmenities;
                    },
                    set: function (otherAmenities) {
                        if (otherAmenities === undefined) {
                            throw 'Please supply other amenities value of Accommodation';
                        }
                        this.otherAmenities = otherAmenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of Accommodation';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Amenities", {
                    get: function () {
                        return this.amenities;
                    },
                    set: function (amenities) {
                        if (amenities === undefined) {
                            throw 'Please supply amenities option value of Accommodation';
                        }
                        this.amenities = amenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of Accommodation';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AccommodationOption;
            }());
            school.AccommodationOption = AccommodationOption;
            var Price = (function () {
                function Price(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Price Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.privateClass = new PrivateClass(obj.privateClass);
                    this.groupClass = new GroupClass(obj.groupClass);
                }
                Object.defineProperty(Price.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Price';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Price';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "PrivateClass", {
                    get: function () {
                        return this.privateClass;
                    },
                    set: function (privateClass) {
                        if (privateClass === undefined) {
                            throw 'Please supply privateClass value of School Price';
                        }
                        this.privateClass = privateClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "GroupClass", {
                    get: function () {
                        return this.groupClass;
                    },
                    set: function (groupClass) {
                        if (groupClass === undefined) {
                            throw 'Please supply groupClass value of School Price';
                        }
                        this.groupClass = groupClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Price;
            }());
            school.Price = Price;
            var PrivateClass = (function () {
                function PrivateClass(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Private classes Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.generalType = new ClassType(obj.generalType);
                    this.intensiveType = new ClassType(obj.intensiveType);
                }
                Object.defineProperty(PrivateClass.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Private classes';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Private classes';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "GeneralType", {
                    get: function () {
                        return this.generalType;
                    },
                    set: function (generalType) {
                        if (generalType === undefined) {
                            throw 'Please supply general type value of School Private classes';
                        }
                        this.generalType = generalType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "IntensiveType", {
                    get: function () {
                        return this.intensiveType;
                    },
                    set: function (intensiveType) {
                        if (intensiveType === undefined) {
                            throw 'Please supply intensive type value of School Private classes';
                        }
                        this.intensiveType = intensiveType;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PrivateClass;
            }());
            school.PrivateClass = PrivateClass;
            var GroupClass = (function () {
                function GroupClass(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Group classes Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.generalType = new GroupType(obj.generalType);
                    this.intensiveType = new GroupType(obj.intensiveType);
                }
                Object.defineProperty(GroupClass.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Group classes';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Group classes';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "GeneralType", {
                    get: function () {
                        return this.generalType;
                    },
                    set: function (generalType) {
                        if (generalType === undefined) {
                            throw 'Please supply general type value of School Group classes';
                        }
                        this.generalType = generalType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "IntensiveType", {
                    get: function () {
                        return this.intensiveType;
                    },
                    set: function (intensiveType) {
                        if (intensiveType === undefined) {
                            throw 'Please supply intensive type value of School Group classes';
                        }
                        this.intensiveType = intensiveType;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GroupClass;
            }());
            school.GroupClass = GroupClass;
            var ClassType = (function () {
                function ClassType(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School classes Type Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.value = obj.value || 0;
                    this.hour = obj.hour || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(ClassType.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School classes type';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School classes type';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Value", {
                    get: function () {
                        return this.value;
                    },
                    set: function (value) {
                        if (value === undefined) {
                            throw 'Please supply price value of School classes type';
                        }
                        this.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Hour", {
                    get: function () {
                        return this.hour;
                    },
                    set: function (hour) {
                        if (hour === undefined) {
                            throw 'Please supply hour value of School classes type';
                        }
                        this.hour = hour;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of School classes type';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ClassType;
            }());
            school.ClassType = ClassType;
            var GroupType = (function (_super) {
                __extends(GroupType, _super);
                function GroupType(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School group classes Type Model instanced');
                    if (obj === null)
                        obj = {};
                    _super.call(this, obj);
                    this.students = obj.students || [];
                }
                Object.defineProperty(GroupType.prototype, "Students", {
                    get: function () {
                        return this.students;
                    },
                    set: function (students) {
                        if (students === undefined) {
                            throw 'Please supply students value of School group classes type';
                        }
                        this.students = students;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GroupType;
            }(ClassType));
            school.GroupType = GroupType;
            var Discount = (function () {
                function Discount(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Discount Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                }
                Object.defineProperty(Discount.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School discount';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Discount.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School discount';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Discount.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply option value of School discount';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Discount;
            }());
            school.Discount = Discount;
            var PaymentMethod = (function () {
                function PaymentMethod(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Payment Methods Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.methods = obj.methods || [];
                    this.other = obj.other || [];
                }
                Object.defineProperty(PaymentMethod.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School payment methods';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School payment methods';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Methods", {
                    get: function () {
                        return this.methods;
                    },
                    set: function (methods) {
                        if (methods === undefined) {
                            throw 'Please supply methods value of School payment methods';
                        }
                        this.methods = methods;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Other", {
                    get: function () {
                        return this.other;
                    },
                    set: function (other) {
                        if (other === undefined) {
                            throw 'Please supply other value of School payment methods';
                        }
                        this.other = other;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PaymentMethod;
            }());
            school.PaymentMethod = PaymentMethod;
            var BookingFee = (function () {
                function BookingFee(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Booking Fee Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.price = obj.price || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(BookingFee.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School booking fee';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BookingFee.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School booking fee';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BookingFee.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of School booking fee';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BookingFee;
            }());
            school.BookingFee = BookingFee;
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/school/school.model.js.map
