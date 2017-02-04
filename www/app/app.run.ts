/**
 * run() run low-level functionality
 * such as authorization, get user info, roles, etc.
 *
 * @param {scope} $rootScope
 * @param {ICurrentUser} currentUser
 * @return {void}
 */

(function (): void {

    'use strict';

    angular
        .module('mainApp')
        .run(run);

    run.$inject = ['$rootScope',
                   '$state',
                   'dataConfig',
                   'mainApp.auth.AuthService'];

    function run($rootScope: ng.IRootScopeService,
                 $state: ng.ui.IStateService,
                 dataConfig: IDataConfig,
                 AuthService: app.auth.IAuthService): void {

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

        //Validate each state if require login
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            if(toState.data.requireLogin && !AuthService.isAuthenticated()) {
                /* Unauthenticated request to a route requiring auth is
                   redirected to /#/login */
                event.preventDefault();
                $state.go('page');
            }

        });
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
