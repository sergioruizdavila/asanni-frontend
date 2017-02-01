var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher) {
            var Teacher = (function (_super) {
                __extends(Teacher, _super);
                function Teacher(obj) {
                    if (obj === void 0) { obj = {}; }
                    var _this;
                    console.log('Teacher Model instanced');
                    _this = _super.call(this, obj) || this;
                    _this.languages = new Language(obj.languages);
                    _this.type = obj.type || '';
                    _this.teacherSince = obj.teacherSince || '';
                    _this.methodology = obj.methodology || '';
                    _this.immersion = new Immersion(obj.immersion);
                    _this.price = new Price(obj.price);
                    if (obj != {}) {
                        _this.experiences = [];
                        for (var key in obj.experiences) {
                            var experienceInstance = new Experience(obj.experiences[key]);
                            _this.addExperience(experienceInstance);
                        }
                        _this.educations = [];
                        for (var key in obj.educations) {
                            var educationInstance = new Education(obj.educations[key]);
                            _this.addEducation(educationInstance);
                        }
                        _this.certificates = [];
                        for (var key in obj.certificates) {
                            var certificateInstance = new Certificate(obj.certificates[key]);
                            _this.addCertificate(certificateInstance);
                        }
                        _this.ratings = [];
                        for (var key in obj.ratings) {
                            var ratingInstance = new Rating(obj.ratings[key]);
                            _this.addRating(ratingInstance);
                        }
                    }
                    else {
                        _this.experiences = [];
                        _this.educations = [];
                        _this.certificates = [];
                        _this.ratings = [];
                    }
                    return _this;
                }
                Object.defineProperty(Teacher.prototype, "Languages", {
                    get: function () {
                        return this.languages;
                    },
                    set: function (languages) {
                        if (languages === undefined) {
                            throw 'Please supply languages';
                        }
                        this.languages = languages;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Type", {
                    get: function () {
                        return this.type;
                    },
                    set: function (type) {
                        if (type === undefined) {
                            throw 'Please supply type of teacher';
                        }
                        this.type = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "TeacherSince", {
                    get: function () {
                        return this.teacherSince;
                    },
                    set: function (teacherSince) {
                        if (teacherSince === undefined) {
                            throw 'Please supply teacher since';
                        }
                        this.teacherSince = teacherSince;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Experiences", {
                    get: function () {
                        return this.experiences;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addExperience = function (experience) {
                    if (experience === undefined) {
                        throw 'Please supply experience value (Add)';
                    }
                    this.experiences.push(experience);
                };
                Teacher.prototype.editExperience = function (experience) {
                    if (experience === undefined) {
                        throw 'Please supply experience value (Edit)';
                    }
                    this.experiences.forEach(function (element, index, array) {
                        if (experience.Id === element.Id) {
                            array[index] = experience;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Educations", {
                    get: function () {
                        return this.educations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addEducation = function (education) {
                    if (education === undefined) {
                        throw 'Please supply education value (Add)';
                    }
                    this.educations.push(education);
                };
                Teacher.prototype.editEducation = function (education) {
                    if (education === undefined) {
                        throw 'Please supply education value (Edit)';
                    }
                    this.educations.forEach(function (element, index, array) {
                        if (education.Id === element.Id) {
                            array[index] = education;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Certificates", {
                    get: function () {
                        return this.certificates;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addCertificate = function (certificate) {
                    if (certificate === undefined) {
                        throw 'Please supply certificate value (Add)';
                    }
                    this.certificates.push(certificate);
                };
                Teacher.prototype.editCertificate = function (certificate) {
                    if (certificate === undefined) {
                        throw 'Please supply certificate value (Edit)';
                    }
                    this.certificates.forEach(function (element, index, array) {
                        if (certificate.Id === element.Id) {
                            array[index] = certificate;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Methodology", {
                    get: function () {
                        return this.methodology;
                    },
                    set: function (methodology) {
                        if (methodology === undefined) {
                            throw 'Please supply methodology';
                        }
                        this.methodology = methodology;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Immersion", {
                    get: function () {
                        return this.immersion;
                    },
                    set: function (immersion) {
                        if (immersion === undefined) {
                            throw 'Please supply immersion';
                        }
                        this.immersion = immersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Ratings", {
                    get: function () {
                        return this.ratings;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addRating = function (rating) {
                    if (rating === undefined) {
                        throw 'Please supply rating value (Add)';
                    }
                    this.ratings.push(rating);
                };
                Teacher.prototype.editRating = function (rating) {
                    if (rating === undefined) {
                        throw 'Please supply rating value (Edit)';
                    }
                    this.ratings.forEach(function (element, index, array) {
                        if (rating.Id === element.Id) {
                            array[index] = rating;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Recommended", {
                    get: function () {
                        return this.recommended;
                    },
                    set: function (recommended) {
                        if (recommended === undefined) {
                            throw 'Please supply recommended early id';
                        }
                        this.recommended = recommended;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Teacher;
            }(app.models.user.User));
            teacher.Teacher = Teacher;
            var Language = (function () {
                function Language(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Languages Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.native = obj.native || [];
                    this.learn = obj.learn || [];
                    this.teach = obj.teach || [];
                }
                Object.defineProperty(Language.prototype, "Id", {
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
                Object.defineProperty(Language.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply language uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Native", {
                    get: function () {
                        return this.native;
                    },
                    set: function (native) {
                        if (native === undefined) {
                            throw 'Please supply native languages';
                        }
                        this.native = native;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Learn", {
                    get: function () {
                        return this.learn;
                    },
                    set: function (learn) {
                        if (learn === undefined) {
                            throw 'Please supply learn languages';
                        }
                        this.learn = learn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Teach", {
                    get: function () {
                        return this.teach;
                    },
                    set: function (teach) {
                        if (teach === undefined) {
                            throw 'Please supply teach languages';
                        }
                        this.teach = teach;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Language;
            }());
            teacher.Language = Language;
            var Experience = (function () {
                function Experience(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Experience Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.position = obj.position || '';
                    this.company = obj.company || '';
                    this.country = obj.country || '';
                    this.city = obj.city || '';
                    this.dateStart = obj.dateStart || '';
                    this.dateFinish = obj.dateFinish || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Experience.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Position", {
                    get: function () {
                        return this.position;
                    },
                    set: function (position) {
                        if (position === undefined) {
                            throw 'Please supply position on company';
                        }
                        this.position = position;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Company", {
                    get: function () {
                        return this.company;
                    },
                    set: function (company) {
                        if (company === undefined) {
                            throw 'Please supply company experience';
                        }
                        this.company = company;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Country", {
                    get: function () {
                        return this.country;
                    },
                    set: function (country) {
                        if (country === undefined) {
                            throw 'Please supply country experience';
                        }
                        this.country = country;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "City", {
                    get: function () {
                        return this.city;
                    },
                    set: function (city) {
                        if (city === undefined) {
                            throw 'Please supply city experience';
                        }
                        this.city = city;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "DateStart", {
                    get: function () {
                        return this.dateStart;
                    },
                    set: function (dateStart) {
                        if (dateStart === undefined) {
                            throw 'Please supply dateStart experience';
                        }
                        this.dateStart = dateStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "DateFinish", {
                    get: function () {
                        return this.dateFinish;
                    },
                    set: function (dateFinish) {
                        if (dateFinish === undefined) {
                            throw 'Please supply dateFinish experience';
                        }
                        this.dateFinish = dateFinish;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description experience';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Experience;
            }());
            teacher.Experience = Experience;
            var Education = (function () {
                function Education(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Education Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.school = obj.school || '';
                    this.degree = obj.degree || '';
                    this.fieldStudy = obj.fieldStudy || '';
                    this.dateStart = obj.dateStart || '';
                    this.dateFinish = obj.dateFinish || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Education.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Uid", {
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
                Object.defineProperty(Education.prototype, "School", {
                    get: function () {
                        return this.school;
                    },
                    set: function (school) {
                        if (school === undefined) {
                            throw 'Please supply school value (teacher education)';
                        }
                        this.school = school;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Degree", {
                    get: function () {
                        return this.degree;
                    },
                    set: function (degree) {
                        if (degree === undefined) {
                            throw 'Please supply degree value (teacher education)';
                        }
                        this.degree = degree;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "FieldStudy", {
                    get: function () {
                        return this.fieldStudy;
                    },
                    set: function (fieldStudy) {
                        if (fieldStudy === undefined) {
                            throw 'Please supply field of study value (teacher education)';
                        }
                        this.fieldStudy = fieldStudy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "DateStart", {
                    get: function () {
                        return this.dateStart;
                    },
                    set: function (dateStart) {
                        if (dateStart === undefined) {
                            throw 'Please supply dateStart experience';
                        }
                        this.dateStart = dateStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "DateFinish", {
                    get: function () {
                        return this.dateFinish;
                    },
                    set: function (dateFinish) {
                        if (dateFinish === undefined) {
                            throw 'Please supply dateFinish experience';
                        }
                        this.dateFinish = dateFinish;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description experience';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Education;
            }());
            teacher.Education = Education;
            var Certificate = (function () {
                function Certificate(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Certificate Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.name = obj.name || '';
                    this.institution = obj.institution || '';
                    this.dateReceived = obj.dateReceived || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Certificate.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Uid", {
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
                Object.defineProperty(Certificate.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply name of certificate';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Institution", {
                    get: function () {
                        return this.institution;
                    },
                    set: function (institution) {
                        if (institution === undefined) {
                            throw 'Please supply institution of certificate';
                        }
                        this.institution = institution;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "DateReceived", {
                    get: function () {
                        return this.dateReceived;
                    },
                    set: function (dateReceived) {
                        if (dateReceived === undefined) {
                            throw 'Please supply dateReceived of certificate';
                        }
                        this.dateReceived = dateReceived;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description of certificate';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Certificate;
            }());
            teacher.Certificate = Certificate;
            var Immersion = (function () {
                function Immersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Certificate Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.active = obj.active || false;
                    this.otherCategory = obj.otherCategory || '';
                    this.category = obj.category || [];
                }
                Object.defineProperty(Immersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
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
                            throw 'Please supply active value of immersion';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category of immersion';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "OtherCategory", {
                    get: function () {
                        return this.otherCategory;
                    },
                    set: function (otherCategory) {
                        if (otherCategory === undefined) {
                            throw 'Please supply other immersion category';
                        }
                        this.otherCategory = otherCategory;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Immersion;
            }());
            teacher.Immersion = Immersion;
            var TypeOfImmersion = (function () {
                function TypeOfImmersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('TypeOfImmersion Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.category = obj.category || '';
                }
                Object.defineProperty(TypeOfImmersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply type of immersion id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfImmersion.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply type of immersion uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfImmersion.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category of immersion';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TypeOfImmersion;
            }());
            teacher.TypeOfImmersion = TypeOfImmersion;
            var Price = (function () {
                function Price(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Price of Teacher Class Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.privateClass = new TypeOfPrice(obj.privateClass);
                    this.groupClass = new TypeOfPrice(obj.groupClass);
                }
                Object.defineProperty(Price.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
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
                            throw 'Please supply privateClass';
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
                            throw 'Please supply groupClass';
                        }
                        this.groupClass = groupClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Price;
            }());
            teacher.Price = Price;
            var TypeOfPrice = (function () {
                function TypeOfPrice(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('TypeOfPrice Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.active = obj.active || false;
                    this.hourPrice = obj.hourPrice || 0;
                }
                Object.defineProperty(TypeOfPrice.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of price';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "HourPrice", {
                    get: function () {
                        return this.hourPrice;
                    },
                    set: function (hourPrice) {
                        if (hourPrice === undefined) {
                            throw 'Please supply hour price value';
                        }
                        this.hourPrice = hourPrice;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TypeOfPrice;
            }());
            teacher.TypeOfPrice = TypeOfPrice;
            var Rating = (function () {
                function Rating(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Rating Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.author = new app.models.student.Student(obj.author);
                    this.methodologyValue = obj.methodologyValue || 0;
                    this.teachingValue = obj.teachingValue || 0;
                    this.communicationValue = obj.communicationValue || 0;
                    this.review = obj.review || '';
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(Rating.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply rating id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply rating uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Author", {
                    get: function () {
                        return this.author;
                    },
                    set: function (author) {
                        if (author === undefined) {
                            throw 'Please supply author';
                        }
                        this.author = author;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "MethodologyValue", {
                    get: function () {
                        return this.methodologyValue;
                    },
                    set: function (methodologyValue) {
                        if (methodologyValue === undefined) {
                            throw 'Please supply methodology value';
                        }
                        this.methodologyValue = methodologyValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "TeachingValue", {
                    get: function () {
                        return this.teachingValue;
                    },
                    set: function (teachingValue) {
                        if (teachingValue === undefined) {
                            throw 'Please supply teaching value';
                        }
                        this.teachingValue = teachingValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "CommunicationValue", {
                    get: function () {
                        return this.communicationValue;
                    },
                    set: function (communicationValue) {
                        if (communicationValue === undefined) {
                            throw 'Please supply communication value';
                        }
                        this.communicationValue = communicationValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Review", {
                    get: function () {
                        return this.review;
                    },
                    set: function (review) {
                        if (review === undefined) {
                            throw 'Please supply review value';
                        }
                        this.review = review;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Rating;
            }());
            teacher.Rating = Rating;
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=teacher.model.js.map