var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditAgendaPage;
        (function (userEditAgendaPage) {
            var UserEditAgendaPageController = (function () {
                function UserEditAgendaPageController($state, $filter, $scope, uiCalendarConfig) {
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.uiCalendarConfig = uiCalendarConfig;
                    this._init();
                }
                UserEditAgendaPageController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        username: '',
                        email: ''
                    };
                    this.error = {
                        message: ''
                    };
                    this.$scope.calendarConfig = {
                        calendar: {
                            editable: true,
                            header: {
                                left: 'prev',
                                center: 'title',
                                right: 'month, agendaDay, next'
                            },
                            slotDuration: '01:00:00',
                            slotLabelFormat: 'h(:mm) a',
                            navLinks: true,
                            allDaySlot: false,
                            events: [
                                {
                                    title: 'Rosa',
                                    start: '2016-10-12T17:00:00',
                                    end: '2016-10-12T18:00:00',
                                    editable: false
                                },
                                {
                                    title: 'Carlos',
                                    start: '2016-10-20T20:00:00',
                                    end: '2016-10-20T21:00:00',
                                    editable: false
                                },
                                {
                                    title: 'Michaelson',
                                    start: '2016-10-23T07:00:00',
                                    end: '2016-10-23T08:00:00',
                                    editable: false
                                }
                            ],
                            timeFormat: 'h:mm a',
                            buttonText: {
                                month: 'view calendar'
                            }
                        }
                    };
                    this.$scope.changeView = function (view, calendar) {
                        self.uiCalendarConfig.calendars['userAgenda'].fullCalendar('changeView', 'agendaDay');
                    };
                    this.$scope.eventSources = [];
                    this.activate();
                };
                UserEditAgendaPageController.prototype.activate = function () {
                    console.log('userEditAgendaPage controller actived');
                };
                UserEditAgendaPageController.prototype.goToEditProfile = function () {
                    this.$state.go('page.userEditProfilePage');
                };
                UserEditAgendaPageController.prototype.goToEditMedia = function () {
                    this.$state.go('page.userEditMediaPage');
                };
                return UserEditAgendaPageController;
            }());
            UserEditAgendaPageController.controllerId = 'mainApp.pages.userEditAgendaPage.UserEditAgendaPageController';
            UserEditAgendaPageController.$inject = [
                '$state',
                '$filter',
                '$scope',
                'uiCalendarConfig'
            ];
            userEditAgendaPage.UserEditAgendaPageController = UserEditAgendaPageController;
            angular
                .module('mainApp.pages.userEditAgendaPage')
                .controller(UserEditAgendaPageController.controllerId, UserEditAgendaPageController);
        })(userEditAgendaPage = pages.userEditAgendaPage || (pages.userEditAgendaPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userEditAgendaPage.controller.js.map