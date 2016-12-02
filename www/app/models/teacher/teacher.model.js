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
                return Teacher;
            }(app.models.user.User));
            teacher.Teacher = Teacher;
            var Language = (function () {
                function Language(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Languages Model instanced');
                    this.id = obj.id;
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
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=teacher.model.js.map