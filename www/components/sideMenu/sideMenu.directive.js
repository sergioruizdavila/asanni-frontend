var components;
(function (components) {
    var sideMenu;
    (function (sideMenu) {
        'use strict';
        var MaSideMenu = (function () {
            function MaSideMenu() {
                this.bindToController = true;
                this.controller = SideMenuController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    type: '@'
                };
                this.templateUrl = 'components/sideMenu/sideMenu.html';
                DEBUG && console.log('maSideMenu directive constructor');
            }
            MaSideMenu.prototype.link = function ($scope, elm, attr) {
                DEBUG && console.log('maSideMenu link function');
            };
            MaSideMenu.instance = function () {
                return new MaSideMenu();
            };
            return MaSideMenu;
        }());
        MaSideMenu.directiveId = 'maSideMenu';
        angular
            .module('mainApp.components.sideMenu')
            .directive(MaSideMenu.directiveId, MaSideMenu.instance);
        var SideMenuController = (function () {
            function SideMenuController($state, $filter) {
                this.$state = $state;
                this.$filter = $filter;
                this.init();
            }
            SideMenuController.prototype.init = function () {
                this.activate();
            };
            SideMenuController.prototype.activate = function () {
                DEBUG && console.log('sideMenu controller actived');
                this._buildSideMenunOptions();
            };
            SideMenuController.prototype._buildSideMenunOptions = function () {
                var type = this.type;
                var TEACH_OPTION = this.$filter('translate')('%modal.recommend.teacher.invitation.message.teach.label.text');
                var EXPERIENCE_OPTION = this.$filter('translate')('%landing.teacher.badge_explanation.get.first_requirement.title.text');
                var EDUCATION_OPTION = this.$filter('translate')('%edit.teacher.education.menu.option.text');
                var METHODOLOGY_OPTION = this.$filter('translate')('%search.container.teacher.methodology.title.text');
                var PRICE_OPTION = this.$filter('translate')('%search.container.teacher.price.title.text');
                switch (type) {
                    case 'edit-teacher':
                        this.optionsList = [
                            {
                                name: TEACH_OPTION,
                                state: 'page.editTeacher.teach'
                            },
                            {
                                name: EXPERIENCE_OPTION,
                                state: 'page.editTeacher.experience'
                            },
                            {
                                name: EDUCATION_OPTION,
                                state: 'page.editTeacher.education'
                            },
                            {
                                name: METHODOLOGY_OPTION,
                                state: 'page.editTeacher.methodology'
                            },
                            {
                                name: PRICE_OPTION,
                                state: 'page.editTeacher.price'
                            }
                        ];
                        break;
                    case 'edit-profile':
                        break;
                }
            };
            SideMenuController.prototype._currentState = function (state) {
                var currentState = this.$state.current.name;
                return state === currentState;
            };
            SideMenuController.prototype._goToSection = function (state) {
                this.$state.go(state, { reload: true });
            };
            SideMenuController.prototype._goToViewProfile = function (id) {
            };
            return SideMenuController;
        }());
        SideMenuController.controllerId = 'mainApp.components.sideMenu.SideMenuController';
        SideMenuController.$inject = ['$state', '$filter'];
        sideMenu.SideMenuController = SideMenuController;
        angular.module('mainApp.components.sideMenu')
            .controller(SideMenuController.controllerId, SideMenuController);
    })(sideMenu = components.sideMenu || (components.sideMenu = {}));
})(components || (components = {}));
//# sourceMappingURL=sideMenu.directive.js.map