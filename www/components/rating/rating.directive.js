var components;
(function (components) {
    var rating;
    (function (rating) {
        'use strict';
        var MaRating = (function () {
            function MaRating() {
                this.bindToController = true;
                this.controller = RatingController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    ratingValue: '=',
                    size: '@'
                };
                this.templateUrl = 'components/rating/rating.html';
                console.log('maRating directive constructor');
            }
            MaRating.prototype.link = function ($scope, elm, attr) {
                console.log('maRating link function');
            };
            MaRating.instance = function () {
                return new MaRating();
            };
            return MaRating;
        }());
        MaRating.directiveId = 'maRating';
        angular
            .module('mainApp.components.rating')
            .directive(MaRating.directiveId, MaRating.instance);
        var RatingController = (function () {
            function RatingController() {
                this.init();
            }
            RatingController.prototype.init = function () {
                this._ratingList = [];
                this.activate();
            };
            RatingController.prototype.activate = function () {
                console.log('rating controller actived');
                this._calcuteStars();
            };
            RatingController.prototype._calcuteStars = function () {
                var value = this.ratingValue;
                var halfValue = value / 2;
                for (var i = 0; i < 5; i++) {
                    if (halfValue >= 1) {
                        this._ratingList.push('star');
                    }
                    else if (halfValue == 0.5) {
                        this._ratingList.push('star_half');
                    }
                    else if (halfValue <= 0) {
                        this._ratingList.push('star_border');
                    }
                    halfValue = halfValue - 1;
                }
            };
            RatingController.prototype._assignClass = function () {
                return 'ma-stars__icon--' + this.size;
            };
            return RatingController;
        }());
        RatingController.controllerId = 'mainApp.components.rating.RatingController';
        rating.RatingController = RatingController;
        angular.module('mainApp.components.rating')
            .controller(RatingController.controllerId, RatingController);
    })(rating = components.rating || (components.rating = {}));
})(components || (components = {}));
//# sourceMappingURL=rating.directive.js.map