/**
 * SearchPageController
 * @description - Search Page Controller
 */

module app.pages.searchPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISearchPageController {
        error: ISearchPageError;
        activate: () => void;
    }

    export interface ISearchPageError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SearchPageController implements ISearchPageController {

        static controllerId = 'mainApp.pages.searchPage.SearchPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        error: ISearchPageError;
        mapConfig: components.map.IMapConfig;
        data: Array<app.models.user.Student>;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.user.UserService',
            '$state',
            '$filter',
            '$scope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private UserService: app.models.user.IUserService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init users list
            this.data = [];

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('searchPage controller actived');

            //Get All User of this zone
            this.UserService.getAllUsers().then(
                function(response: Array<app.models.user.Student>) {
                    self.mapConfig = self._buildMarkers(response);
                    self.data = self._chunk(response, 2);
                }
            );
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/
        //TODO: Esta funcion se encarga de dividir el array en 2 columnas, ya que
        //      era necesario crear dos ng-repeat, uno para generar los rows
        //      dinamicamente, y otro para cada uno de los contenedores con la
        //      info de cada usuario.
        private _chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }

        private _buildMarkers(userData): components.map.IMapConfig {
            //VARIABLES
            let mapConfig: components.map.IMapConfig = {
                type: 'search-map',
                data: {
                    position: {
                        lat: 30,
                        lng: 3
                    },
                    markers: []
                }
            };

            for (let i = 0; i < userData.length; i++) {
                mapConfig.data.markers.push({
                    id: userData[i].id,
                    position: userData[i].location.position
                });
            }

            return mapConfig;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .controller(SearchPageController.controllerId, SearchPageController);

}
