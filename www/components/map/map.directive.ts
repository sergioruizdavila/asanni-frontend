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
        transclude: true;
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

        link($scope: IMapScope, elm: Element, attr: angular.IAttributes): void {
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
    interface IMapController {
        activate: () => void;
        setMarker: (map:google.maps.Map,
                    position: google.maps.LatLng,
                    title: string,
                    content: string) => void;
    }

    interface IMapForm {
        position: IPosition;
    }

    export interface IPosition {
        lat: number;
        lng: number;
    }

    interface IMapScope extends angular.IScope {
        options: IMapOptions;
        modalOptions: IMapOptions;
        mapConfig: IMapConfig;
        mapId: string;
    }

    interface IMapOptions extends google.maps.MapOptions {
        center: any;
        zoom: number;
        mapTypeControl: boolean;
        zoomControl: boolean;
        zoomControlOptions: any;
        streetViewControl: boolean;
    }

    export interface IMapConfig {
        type: string;
        data: IMapDataSet;
    }

    export interface IMapDataSet {
        position: IPosition;
        markers: Array<IMapMarkers>;
    }

    export interface IMapMarkers {
        id: string;
        position: IPosition;
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
        form: IMapForm;
        mapId: string;
        mapConfig: IMapConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope', '$timeout'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: IMapScope, private $timeout) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //VARIABLES
            let self = this;
            /********************/

            //init properties
            this._map;
            this.mapId = 'ma-map-' + Math.floor((Math.random() * 100) + 1);
            this._infoWindow = null;
            this._markers = [];
            this.$scope.options = null;
            //Form init
            this.form = {
                position: {
                    lat: null,
                    lng: null
                }
            };

            //default map options
            switch(this.mapConfig.type) {
                case 'search-map':
                    this._searchMapBuilder();
                break;
                case 'location-map':
                    this._locationMapBuilder();
                break;
                case 'modal-assign-marker-map':
                    this._assignMarkerMapBuilder();
                break;
            }

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

        /*
        * _searchMapBuilder
        * @description - this method builds Search Map
        */
        private _searchMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 12;
            let center = this.mapConfig.data.position;
            /********************/

            //Map options
            this.$scope.options = {
                center: new google.maps.LatLng(center.lat, center.lng),
                zoom: zoom,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                }
            };

            // init map
            if (this._map === void 0) {
                this.$timeout(function(){
                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    //set markers
                    for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                        let marker = self.mapConfig.data.markers[i];
                        self.setMarker( marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), 'London', 'Just some content');
                    }

                });
            }

        }

        /*
        * _locationMapBuilder
        * @description - this method builds Location Map
        */
        private _locationMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 16;
            let center = {
                lat: 6.1739743,
                lng: -75.5822414
            };
            let circle = null;
            let circle_strokeColor = '#ff5a5f';
            let circle_strokeOpacity = 0.8;
            let circle_strokeWeight = 2;
            let circle_fillColor = '#ff5a5f';
            let circle_fillOpacity = 0.35;
            let circle_center = {
                lat: 6.1739743,
                lng: -75.5822414
            };
            let circle_radius = 200;
            /********************/

            this.$scope.options = {
                center: new google.maps.LatLng(center.lat, center.lng),
                zoom: zoom,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                }
            };

            // init map
            if (this._map === void 0) {
                this.$timeout(function() {

                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    // init circle position
                    circle = new google.maps.Circle ({
                      strokeColor: circle_strokeColor,
                      strokeOpacity: circle_strokeOpacity,
                      strokeWeight: circle_strokeWeight,
                      fillColor: circle_fillColor,
                      fillOpacity: circle_fillOpacity,
                      map: self._map,
                      center: new google.maps.LatLng(center.lat, center.lng),
                      radius: circle_radius
                    });

                    //set markers
                    self.setMarker(7, new google.maps.LatLng(center.lat, center.lng), 'London', 'Just some content');
                });
            }
        }

        /*
        * _assignMarkerMapBuilder
        * @description - this method builds Assign Marker Map
        */
        private _assignMarkerMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 16;
            let center = {
                lat: 6.1739743,
                lng: -75.5822414
            };
            /********************/

            this.$scope.options = {
                center: new google.maps.LatLng(center.lat, center.lng),
                zoom: zoom,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT
                }
            };

            // init map
            if (this._map === void 0) {
                this.$timeout(function(){

                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    //set markers
                    self.setMarker(7, new google.maps.LatLng(6.1739743, -75.5822414), 'London', 'Just some content');

                    //When it is a map inside modal, is necessary resize map
                    google.maps.event.trigger(self._map, "resize");

                });
            }

        }


        /*
        * setMarker
        * @description - this method assings every marker on map
        */
        setMarker (id, position, title, content): void {
            //VARIABLES
            let self = this;
            let marker;
            let markerOptions = {
                id: id,
                position: position,
                map: this._map,
                title: title,
                icon: 'assets/images/meeting-point.png',
                draggable: true
            };
            /********************/

            // create marker object
            marker = new google.maps.Marker(markerOptions);

            // Get position of Marker draggable
            google.maps.event.addListener(marker, 'dragend', function (event) {
                self.form.position.lat = this.getPosition().lat();
                self.form.position.lng = this.getPosition().lng();
            });

            // add click event on each marker
            google.maps.event.addListener(marker, 'click', function (event) {

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

            // add marker to markers array
            this._markers.push(marker);

        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.map')
        .controller(MapController.controllerId, MapController);

}
