/**
 * run() run low-level functionality
 * such as authorization, get user info, roles, etc.
 *
 * @return {void}
 */

(function (): void {

    'use strict';

    angular
        .module('mainApp')
        .run(run);

    run.$inject = [
                '$rootScope',
                '$state',
                'dataConfig',
                'mainApp.auth.AuthService',
                'mainApp.models.user.UserService',
                'mainApp.localStorageService'
            ];

    function run($rootScope: app.core.interfaces.IMainAppRootScope,
                 $state: ng.ui.IStateService,
                 dataConfig: IDataConfig,
                 AuthService: app.auth.IAuthService,
                 userService: app.models.user.IUserService,
                 localStorage): void {

        //VARIABLES
        let productionHost = dataConfig.domain;
        let mixpanelTokenDEV = dataConfig.mixpanelTokenDEV;
        let mixpanelTokenPRD = dataConfig.mixpanelTokenPRD;

        //Change MixPanel Environment dynamically
        if (window.location.hostname.toLowerCase().search(productionHost) < 0) {
            mixpanel.init(mixpanelTokenDEV);
        } else {
            mixpanel.init(mixpanelTokenPRD, {
                loaded: function(mixpanel) {
                    let first_visit = mixpanel.get_property("First visit");
                    let current_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    if(first_visit == null) {
                        mixpanel.register_once({ "First visit": current_date });
                        mixpanel.track("Visit");
                    }
                }
            });
        }

        //Get current authenticated user data from localStorage
        if (AuthService.isAuthenticated()) {
            //VARIABLES
            let userAccountInfo = JSON.parse(localStorage.getItem(dataConfig.userDataLocalStorage));

            if(userAccountInfo) {
                $rootScope.userData = userAccountInfo;
                //Get user profile data and save in $rootScope
                userService.getUserProfileById($rootScope.userData.id).then(
                    function(response) {
                        if(response.userId) {
                            $rootScope.profileData = new app.models.user.Profile(response);
                        }
                    }
                );
            } else {
                DEBUG && Raven.captureMessage('Error app.run.js method: userAccountInfo is null');
                AuthService.logout();
            }

        }

        //Validate each state if require login
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {

                if(toState.data.requireLogin && !AuthService.isAuthenticated()) {
                    /* Unauthenticated request to a route requiring auth is
                       redirected to main page (page.landingPage) */
                    event.preventDefault();
                    $state.go('page.landingPage');
                }

        });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $rootScope.title = toParams.title;
    			$rootScope.description = toParams.description;
    			$rootScope.url = toParams.url;
    			$rootScope.robots = toParams.robots;
                $rootScope.image = toParams.image;
            }
        );
    }

})();


/* localStorage Service */

(function (angular) {

  function localStorageServiceFactory($window) {
    if($window.localStorage){
      return $window.localStorage;
    }
    throw new Error('Local storage support is needed');
  }

  // Inject dependencies
  localStorageServiceFactory.$inject = ['$window'];

  // Export
  angular
    .module('mainApp.localStorage', [])
    .factory('mainApp.localStorageService', localStorageServiceFactory);

})(angular);
