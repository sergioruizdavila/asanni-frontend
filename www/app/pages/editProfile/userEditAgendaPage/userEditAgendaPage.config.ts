/**
* config()
* @description - user edit agenda page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userEditAgendaPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userEditAgendaPage', {
                url: '/users/edit/:id/agenda',
                views: {
                    'container': {
                        templateUrl: 'app/pages/userEditAgendaPage/userEditAgendaPage.html',
                        controller: 'mainApp.pages.userEditAgendaPage.UserEditAgendaPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page'
            });
    }
})();
