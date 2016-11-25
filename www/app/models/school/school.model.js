var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            var School = (function () {
                function School(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Model instanced');
                }
                return School;
            }());
            school.School = School;
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=school.model.js.map