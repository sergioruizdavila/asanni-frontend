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
        scope = {
            mapConfig: '='
        };
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
        mapConfig: IMapConfig;
    }

    export interface IMapOptions extends google.maps.MapOptions {
        center: any;
        zoom: number;
        mapTypeControl: boolean;
        zoomControl: boolean;
        zoomControlOptions: any;
        streetViewControl: boolean;
    }

    export interface IMapConfig {
        type: string; //static, dynamic
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
        private _meetingPointDetailsData: any;
        mapConfig: IMapConfig;
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
            switch(this.mapConfig.type) {
                case 'search-map':
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
                break;
                case 'location-map':
                    this.$scope.options = {
                        center: new google.maps.LatLng(6.1739743, -75.5822414),
                        zoom: 16,
                        mapTypeControl: false,
                        zoomControl: true,
                        streetViewControl: false,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        }
                    };
                break;
            }


            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            /* Pantalla meeting Confirmation Page:
               Paso 1: Obtener los datos de todos los puntos de encuentro
               alrededor del usuario.
            */
            var meetingPointData = {
                id: 1,
                position: {
                    lat: 6.175298,
                    lng: -75.582289
                }
            };

            /********************************************/


            // init map
            if (this._map === void 0) {
                this._map = new google.maps.Map(document.getElementById("ma-map"), this.$scope.options);
            }

            if(this.mapConfig.type == 'location-map') {
                var cityCircle = new google.maps.Circle({
                  strokeColor: '#ff5a5f',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#ff5a5f',
                  fillOpacity: 0.35,
                  map: this._map,
                  center: new google.maps.LatLng(6.1739743, -75.5822414),
                  radius: 200
                });

                this.setMarker(meetingPointData.id, new google.maps.LatLng(meetingPointData.position.lat, meetingPointData.position.lng), 'London', 'Just some content');
                this.setMarker(2, new google.maps.LatLng(6.175169, -75.584871), 'Amsterdam', 'More content');
                this.setMarker(3, new google.maps.LatLng(6.175686, -75.584099), 'Paris', 'Text here');
            } else {
                this.setMarker(4, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
                this.setMarker(5, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
                this.setMarker(6, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
            }

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

        setMarker(id, position, title, content): void {
            //VARIABLES
            let self = this;
            let marker;
            let markerOptions = {
                id: id,
                position: position,
                map: this._map,
                title: title,
                icon: 'assets/images/meeting-point.png'
            };

            marker = new google.maps.Marker(markerOptions);
            this._markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function (e) {

                //change icon (actived)
                for (var i = 0; i < self._markers.length; i++) {
                   self._markers[i].setIcon('assets/images/meeting-point.png');
                }
                this.setIcon('assets/images/location.png');

                /* Pantalla meeting Confirmation Page:
                   Paso 2: Activamos el loading (dentro del contenedor que muestra
                   la info del punto de encuentro), y luego llamamos al servicio
                   que nos trae el detalle del puntos de encuentro,
                   para que nos retorne un JSON
                   (TODO: NOTA: Analizar mejor, ya que no puedo aqui prender y apagar
                    el loading de meetingConfirmationPage, ni mostrar ni ocultar
                    el cuadro que muestra la info del punto de encuentro. Eso lo
                    deberia controlar con un broadcast o con un watch, ya que esto
                    es una especie de: master-details)
                */

                self._meetingPointDetailsData = {
                    name: 'Café Vervlet',
                    meetings: 70,
                    category: 'Café',
                    address: 'Trans 32 Diagonal 33A Sur - 20',
                    prices: {
                        min: 130,
                        max: 300
                    },
                    website: 'http://www.place-book.com',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pulvinar magna, et iaculis neque posuere a. Suspendisse sit amet mollis nunc, nec faucibus ipsum. Nunc et nisl eget enim gravida sagittis. Donec massa nulla, tempor eu orci quis, tincidunt tincidunt odio.'
                };

                /* Pantalla meeting Confirmation Page:
                   Paso 3: Llamamos al servicio que nos trae el detalle del puntos
                   de encuentro, para que nos retorne un JSON
                */


                /*
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
                */
            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.map')
        .controller(MapController.controllerId, MapController);

}
