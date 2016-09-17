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
        /*TODO: Revisar porque da error si coloco directamente en la url:
                localhost:8080/page se rompe y dice que no puede obtenet /page*/
        $stateProvider
            .state('page', {
                url: '/page',
                cache: false,
                templateUrl: 'app/pages/main/main.html',
                controller: 'mainApp.pages.main.MainController',
                controllerAs: 'vm'
            });

    }
})();
