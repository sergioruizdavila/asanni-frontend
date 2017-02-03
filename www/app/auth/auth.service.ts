/**
 * AuthService
 * @description - AuthService uses `angular-oauth2` module to provide
 * authentication functionality, as well as automatic refresh of access tokens.
 * @function
 */

module app.auth {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAuthService {
        login:(user: app.core.interfaces.IUserDataAuth) => angular.IPromise<any>;
        logout:() => angular.IPromise<any>
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
        constructor(private $q: angular.IQService,
                    private $timeout: angular.ITimeoutService,
                    private $cookies: angular.cookies.ICookiesService,
                    private OAuth: angular.oauth2.IOAuth,
                    private dataConfig: IDataConfig) {
            DEBUG && console.log('auth service called');
            this.autoRefreshTokenInterval = dataConfig.autoRefreshTokenIntervalSeconds * 1000;
            this.refreshNeeded = true;
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
         * isAuthenticated
         * @description - Verifies if user is authenticated or not based
         * on the `token` cookie.
         * @use - this.AuthService.isAuthenticated();
         * @function
         * @return {boolean} boolean - User is authenticated or not
         */

        isAuthenticated(): boolean {
            return this.OAuth.isAuthenticated();
        }



        /**
         * forceLogout
         * @description - If logout cannot be performed (if server is down,
         * for example), force logout by removing the `token` cookie.
         * @use - this.AuthService.isAuthenticated();
         * @function
         * @return {void}
         */

        forceLogout(): void {
          DEBUG && console.log("Forcing logout");
          this.$cookies.remove(this.dataConfig.cookieName);
        }



        /**
         * login
         * @description - Tries to login a user by obtaining access and
         * refresh tokens and stores them in a cookie.
         * @use - this.AuthService.login(user);
         * @function
         * @param  {app.core.IUserDataAuth} user - Object with 'username'
         * and 'password' properties.
         * @return {angular.IPromise<any>} promise - return http response with
         * access token information (access_token, expire_in, refresh_token)
         */

        login(user): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            //NOTE This method can't change to $promise structure, keep this structure
            this.OAuth.getAccessToken(user, {}).then(
                function(response) {
                    DEBUG && console.info("Logged in successfuly!");
                    deferred.resolve(response);
                },
                function(error) {
                    DEBUG && console.error("Error while logging in!");
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }



        /**
         * logout
         * @description - Revokes the 'token' and removes the stored 'token'
         * from cookies.
         * @use - this.AuthService.logout();
         * @function
         * @return {angular.IPromise<any>} promise - return http request with
         * Status Code 200 OK
        */

        logout(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            //NOTE This method can't change to $promise structure, keep this structure
            this.OAuth.revokeToken().then(
                function(response) {
                    DEBUG && console.info("Logged out successfuly!");
                    deferred.resolve(response);
                },
                function(response) {
                    DEBUG && console.error("Error while logging you out!");
                    // Force logout
                    self.forceLogout();
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }



        /**
         * refreshToken
         * @description - Gets a new access token. Should not be called directly,
         * as autoRefreshToken() is used to manage it.
         * @use - this.AuthService.autoRefreshToken();
         * @function
         * @return {angular.IPromise<any>} promise - return http request with
         * Status Code 200 OK
         */

        refreshToken(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            let deferred = this.$q.defer();

            if (!this.isAuthenticated()) {
                DEBUG && console.error('Cannot refresh token if Unauthenticated');
                deferred.reject();
                return deferred.promise;
            }

            //NOTE This method can't change to $promise structure, keep this structure
            this.OAuth.getRefreshToken().then(
                function(response) {
                    // Success
                    DEBUG && console.info("Access token refreshed");
                    deferred.resolve(response);
                },
                function(response) {
                    DEBUG && console.error("Error refreshing token ");
                    DEBUG && console.error(response);
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }



        /**
         * autoRefreshToken
         * @description - A function to automatically refresh the access token as needed.
         * It is called before a route change which requires authentication
         * using ngRoute's resolve property and stalls the initialization
         * of the view until the promise is resolved.
         *
         * Additionally, once called it recursively calls itself every
         * 'autoRefreshTokenInterval' milliseconds to handle situations
         * where an access token might expire and cause a 401, while
         * the route doesn't change.
         * @use - this.autoRefreshToken();
         * @function
         * @return {angular.IPromise<any>} promise
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

            //NOTE This method can't change to $promise structure, keep this structure
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
