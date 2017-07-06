/**
* config()
* @description - teacher landing page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.teacherLandingPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        const CLIENT_URL = 'http://www.waysily.com';

        $stateProvider
            .state('page.teacherLandingPage', {
                url: '/main/teacher',
                views: {
                    'container': {
                        templateUrl: 'app/pages/teacherLandingPage/teacherLandingPage.html',
                        controller: 'mainApp.pages.teacherLandingPage.TeacherLandingPageController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    id: null,
                    title: 'Join as a language teacher, and teach to travelers in your area',
                    description: 'Build a reputation, become visible and earn 340 USD on average doing what you most passionate about.',
                    url: CLIENT_URL + '/page/main/teacher',
                    image: CLIENT_URL + '/assets/images/waysily-shared.png',
                    robots: 'follow,index'
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
            });
            
    }
})();
