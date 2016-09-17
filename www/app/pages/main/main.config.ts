/**
* config()
* @description - main page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.main', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                cache: false,
                templateUrl: 'app/pages/main/main.html',
                controller: 'mainApp.pages.main.MainController',
                controllerAs: 'vm'
            });

    }
})();
