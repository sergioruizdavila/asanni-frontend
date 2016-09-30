/**
* MaMap
* @description - MainApp Map Directive
* @example - <ma-search-map></ma-search-map>
*/

module components.map {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMap extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaMap implements IMap {

        static directiveId = 'maMap';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = MapController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'components/map/map.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maMap directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maMap link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IMap {
            return new MaMap();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.map')
        .directive(MaMap.directiveId, MaMap.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * MapController
    * @description - Map Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMapController {
        activate: () => void;
        setMarker: (map:google.maps.Map,
                    position: google.maps.LatLng,
                    title: string,
                    content: string) => void;
    }

    export interface IMapScope extends angular.IScope {
        options: IMapOptions;
    }

    export interface IMapOptions extends google.maps.MapOptions {
        center: any;
        zoom: number;
        mapTypeControl: boolean;
        zoomControl: boolean;
        zoomControlOptions: any;
        streetViewControl: boolean;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MapController implements IMapController {

        static controllerId = 'mainApp.components.map.MapController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        private _map: google.maps.Map;
        private _infoWindow: google.maps.InfoWindow;
        private _markers: Array<any>;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: IMapScope) {

            let self = this;

            this._map;
            this._infoWindow = null;
            this._markers = [];

            //default map options
            this.$scope.options = {
                center: new google.maps.LatLng(50, 2),
                zoom: 4,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                }
            };

            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            // init map
            if (this._map === void 0) {
                this._map = new google.maps.Map(document.getElementById("ma-map"), this.$scope.options);
            }

            this.setMarker(new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
            this.setMarker(new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
            this.setMarker(new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('map controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        setMarker(position, title, content): void {
            //VARIABLES
            let marker;
            let markerOptions = {
                position: position,
                map: this._map,
                title: title,
                icon: 'assets/images/location.png'
            };

            marker = new google.maps.Marker(markerOptions);
            this._markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (this._infoWindow !== void 0) {
                    this._infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                this._infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                this._infoWindow.open(this._map, marker);
            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.map')
        .controller(MapController.controllerId, MapController);

}
