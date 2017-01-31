/**
 * AuthService
 * @description - AuthService uses `angular-oauth2` module to provide
 * authentication functionality, as well as automatic refresh of access tokens.
 * @function
 * @param {app.core.firebase.FirebaseFactory} FirebaseFactory - Firebase connections.
 * @param {AngularFireAuthService} $firebaseAuth - AngularFire methods.
 */

module app.auth {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAuthService {

    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AuthService implements IAuthService {

        static serviceId = 'mainApp.auth.AuthService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        autoRefreshTokenInterval: number;
        refreshNeeded: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$q',
                          '$timeout',
                          '$cookies',
                          'OAuth',
                          'dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        //TODO: Colocar tipos (remove any)
        constructor(private $q: any,
                    private $timeout: angular.ITimeoutService,
                    private $cookies: any,
                    private OAuth: any,
                    private dataConfig: IDataConfig) {
            this.dataConfig.debug && console.log('auth service called');
            this.autoRefreshTokenInterval = dataConfig.autoRefreshTokenIntervalSeconds * 1000;
            this.refreshNeeded = true;
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
         *    Verifies if user is authenticated or not based on the `token` cookie.
         *
         *    @return {Boolean}
         */

        isAuthenticated(): any {
            return this.OAuth.isAuthenticated();
        }



        /**
         *    If logout cannot be performed (if server is down, for example),
         *    force logout by removing the `token` cookie.
         */

        forceLogout(): void {
          this.dataConfig.debug && console.log("Forcing logout");
          this.$cookies.remove(this.dataConfig.cookieName);
        }



        /**
         *    Tries to login a user by by obtaining access and refresh tokens
         *    and stores them in a cookie.
         *
         *    @param  {object} user - Object with `username` and `password` properties.
         *    @return {promise}       A response promise
         */
        login(user): any {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            this.OAuth.getAccessToken(user, {}).then(
                function(response) {
                    self.dataConfig.debug && console.info("Logged in successfuly!");
                    deferred.resolve(response);
                },
                function(response) {
                    self.dataConfig.debug && console.error("Error while logging in!");
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }



        /**
         *    Revokes the `token` and removes the stored `token` from cookies
         *
         *    @return {promise} A response promise.
         */
        logout(): any {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            this.OAuth.revokeToken().then(
                function(response) {
                    self.dataConfig.debug && console.info("Logged out successfuly!");
                    deferred.resolve(response);
                },
                function(response) {
                    self.dataConfig.debug && console.error("Error while logging you out!");
                    // Force logout
                    self.forceLogout();
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }



        /**
         *    Gets a new access token.
         *    Should not be called directly, as autoRefreshToken() is used to manage it.
         *
         *    @return {promise} A response promise.
         */

        refreshToken(): any {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            if (!this.isAuthenticated()) {
                this.dataConfig.debug && console.error('Cannot refresh token if Unauthenticated');
                deferred.reject();
                return deferred.promise;
            }

            this.OAuth.getRefreshToken().then(
                function(response) {
                    // Success
                    self.dataConfig.debug && console.info("Access token refreshed");
                    deferred.resolve(response);
                },
                function(response) {
                    self.dataConfig.debug && console.error("Error refreshing token ");
                    self.dataConfig.debug && console.error(response);
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }



        /**
         *    A function to automatically refresh the access token as needed.
         *    It is called before a route change which requires authentication
         *    using ngRoute's resolve property and stalls the initialization
         *    of the view until the promise is resolved.
         *
         *    Additionally, once called it recursively calls itself every
         *    `autoRefreshTokenInterval` milliseconds to handle situations
         *    where an access token might expire and cause a 401, while
         *    the route doesn't change.
         *
         *    @return {promise} A response promise.
         */
        autoRefreshToken(): any {
            //VARIABLES
            let self = this;
            var deferred = this.$q.defer();

            // If we don't have to refresh the access token, simply resolve the promise
            if (!this.refreshNeeded) {
                deferred.resolve();
                return deferred.promise;
            }

            this.refreshToken().then(
                function(response) {
                    self.refreshNeeded = false;
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            this.$timeout(function() {
                /* Since autoRefreshTokenInterval milliseconds have passed
                   since we refreshed the access token, we need to refresh
                   it again. */
                if (self.isAuthenticated()) {
                    self.refreshNeeded = true;
                    self.autoRefreshToken();
                }
            }, self.autoRefreshTokenInterval);

            return deferred.promise;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
    .module('mainApp.auth', [])
    .service(AuthService.serviceId, AuthService);

}
