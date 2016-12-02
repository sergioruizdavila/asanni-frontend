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
        private _draggable: boolean;
        private _infoWindow: google.maps.InfoWindow;
        private _markers: Array<google.maps.Marker>;
        form: IMapForm;
        mapId: string;
        mapConfig: IMapConfig;
        RED_PIN: string;
        POSITION_PIN: string;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope', '$rootScope', '$timeout'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: IMapScope,
                    public $rootScope: app.core.interfaces.IMainAppRootScope,
                    private $timeout: angular.ITimeoutService) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //CONSTANTS
            this.RED_PIN = 'assets/images/red-pin.png';
            this.POSITION_PIN = 'assets/images/red-pin.png';
            /*********************************/
            //VARIABLES
            let self = this;
            /********************/

            //init properties
            this._map;
            this._draggable = false;
            this.mapId = 'ma-map-' + Math.floor((Math.random() * 100) + 1);
            this._infoWindow = null;
            this._markers = [];
            this.$scope.options = null;

            //default map options
            switch(this.mapConfig.type) {
                case 'search-map':
                    this._searchMapBuilder();
                break;
                case 'drag-maker-map':
                    this._dragMarkerMapBuilder();
                break;
            }

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('map controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();
        }


        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _searchMapBuilder
        * @description - this method builds the Map on Search Page
        * @use - this._searchMapBuilder();
        * @function
        * @return {void}
        */
        private _searchMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 16;
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

            // Init map
            if (this._map === void 0) {

                this.$timeout(function() {

                    //Init Map
                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    //Create Filter Buttons
                    self._createFilterButtons();

                    //Set markers
                    for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                        let marker = self.mapConfig.data.markers[i];
                        self._setMarker(marker.id,
                                        new google.maps.LatLng(marker.position.lat, marker.position.lng),
                                        self.RED_PIN);
                    }

                });
            }

        }



        /**
        * _dragMarkerMapBuilder
        * @description - this method builds the draggable marker on Map
        * @use - this._dragMarkerMapBuilder();
        * @function
        * @return {void}
        */
        _dragMarkerMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 17;
            let center = this.mapConfig.data.position;
            this._draggable = true;
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

            // Init map
            if (this._map === void 0) {

                this.$timeout(function() {

                    //Init Map
                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    //set markers
                    for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                        let marker = self.mapConfig.data.markers[i];
                        self._setMarker(marker.id,
                                        new google.maps.LatLng(marker.position.lat, marker.position.lng),
                                        self.POSITION_PIN);
                    }

                });
            }

        }


        /**
        * _setMarker
        * @description - this method assigns every Marker on Map
        * @use - this._setMarker('1',
                                 new google.maps.LatLng(34.98, 12.92),
                                 'assets/images/meeting-point.png');
        * @function
        * @params {string} id - entity id
        * @params {google.maps.LatLng} position google object - position on the map
        * @params {string} icon - icon image route (i.e. 'assets/images/meeting-point.png')
        * @return {void}
        */

        private _setMarker (id: string, position: google.maps.LatLng,
                            icon: string): void {
            // VARIABLES
            let self = this;
            let marker;
            let markerOptions = {
                id: id,
                position: position,
                map: this._map,
                icon: icon,
                draggable: this._draggable
            };
            /********************/

            // create marker object
            marker = new google.maps.Marker(markerOptions);

            // add marker to markers array
            this._markers.push(marker);

            //center map on last marker created on the map
            if (this._map) {
                this._map.setCenter(position);
            }

            // If marker is draggable
            if(this._draggable) {
                // Get position of Marker draggable
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    let position = {
                        lng: this.getPosition().lng(),
                        lat: this.getPosition().lat()
                    };
                    self.$scope.$emit('Position', position);
                });
            }

        }



        /**
        * _removeMarkers
        * @description - this method remove all markers on Map
        * @use - this._removeMarkers();
        * @function
        * @return {void}
        */

        private _removeMarkers(): void {
            for (let i = 0; i < this._markers.length; i++) {
                this._markers[i].setMap(null);
            }
        }


        /**
        * _createFilterButtons
        * @description - this method builds every filter button on the Map
        * @use - this._createFilterButtons();
        * @function
        * @return {void}
        */

        private _createFilterButtons(): void {
            let buttons = ['Students', 'Teachers', 'Schools'];

            for (let i = 0; i < buttons.length; i++) {
                let controlDiv: HTMLDivElement = document.createElement('div');
                let control = this._filterControl(controlDiv, buttons[i]);
                this._map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
            }
        }



        /**
        * _filterControl
        * @description - this method build filters button on Map
        * @use - this._filterControl(document.createElement('div'),
                                    'Stundents');
        * @function
        * @params {HTMLDivElement} controlDiv - html div element
        * @params {string} type - filter button type
        * @return {void}
        */

        private _filterControl(controlDiv: HTMLDivElement, type: string): void {
            // VARIABLES
            let self = this;
            let defaultBtn = 'Students';
            let className = 'filterBtnMap';
            let background_color = 'rgb(255, 255, 255)';
            let background_color_active = '#00B592';
            let border_radius = '3px';
            let box_shadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
            let cursor = 'pointer';
            let margin_top = '10px';
            let margin_bottom = '22px';
            let margin_right = '10px';
            let text_align = 'center';
            let title = 'Click to search' + type;
            let color = '#4E4E4E';
            let color_active = '#FFF';
            let font_family = 'Roboto,Arial,sans-serif';
            let font_size = '15px';
            let line_height = '10px';
            let padding_top = '10px';
            let padding_bottom = '10px';
            let padding_left = '20px';
            let padding_right = '20px';
            let border_bottom = '0 hidden transparent';
            let border_bottom_active = '2px solid #018a6f';
            /********************/

            // Set CSS for the control.
            let controlUI = document.createElement('div');
            controlUI.className = className;
            controlUI.style.borderRadius = border_radius;
            controlUI.style.boxShadow = box_shadow;
            controlUI.style.cursor = cursor;
            controlUI.style.marginTop = margin_top;
            controlUI.style.marginBottom = margin_bottom;
            controlUI.style.marginRight = margin_right;
            controlUI.style.textAlign = text_align;
            controlUI.title = title;
            //Assign Active mode to Button Default
            if(type === defaultBtn){
                controlUI.style.backgroundColor = background_color_active;
                controlUI.style.borderBottom = border_bottom_active;
            } else {
                controlUI.style.backgroundColor = background_color;
            }

            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior.
            let controlText = document.createElement('div');
            controlText.style.fontFamily = font_family;
            controlText.style.fontSize = font_size;
            controlText.style.lineHeight = line_height;
            controlText.style.paddingTop = padding_top;
            controlText.style.paddingBottom = padding_bottom;
            controlText.style.paddingLeft = padding_left;
            controlText.style.paddingRight = padding_right;
            controlText.innerHTML = type;
            // Assign Active mode to Button Default
            if(type === defaultBtn) {
                controlText.style.color = color_active;
            } else {
                controlText.style.color = color;
            }

            controlUI.appendChild(controlText);

            // Click event listener
            controlUI.addEventListener('click', function(e) {
                // VARIABLES
                let element = this;
                let child:any = this.children[0];
                let filterBtn:any = document.getElementsByClassName(className);

                // Clean button state
                for (let i = 0; i < filterBtn.length; i++) {
                    filterBtn[i].style.backgroundColor = background_color;
                    filterBtn[i].style.borderBottom = border_bottom;
                    filterBtn[i].children[0].style.color = color;
                }

                // Active button
                element.style.backgroundColor = background_color_active;
                element.style.borderBottom = border_bottom_active;
                child.style.color = color_active;

                self.$scope.$emit(type);
            });

        }



        /**
        * _codeAddress
        * @description - get position on map (lng, lat) based on Address,
        * Country and zipCode.
        * @use - this._subscribeToEvents();
        * @function
        * @param {google.maps.Geocoder} geocoder - geocoder object
        * @param {string} country - country code
        * @param {string} address - user address
        * @param {string} city - user city
        * @return {void}
        */

        private _codeAddress(geocoder: google.maps.Geocoder,
                             country: string,
                             address: string,
                             city: string): void {

            let self = this;

            //Build Address joining 'Country, City, Address'
            let location = country + ',' + city + ',' + address;

            geocoder.geocode({
              address: location
          }, function(results, status: any) {

              if (status == 'OK') {

                  //self._map.setCenter(results[0].geometry.location);
                  self._removeMarkers();
                  self._setMarker('1',
                                  results[0].geometry.location,
                                  'assets/images/red-pin.png');
                  let position = {
                      lng: results[0].geometry.location.lng(),
                      lat: results[0].geometry.location.lat()
                  };
                  self.$scope.$emit('Position', position);

              } else {

                  console.log(status);

              }
            });
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Map Component to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * BuildMarkers event
            * @parent - SearchPageController
            * @description - Parent send markers list in order to Child draws them on map
            * @event
            */
            this.$scope.$on('BuildMarkers', function(event, args) {
                self.mapConfig = args;
                //remove last markers
                self._removeMarkers();
                //set markers
                for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                    let marker = self.mapConfig.data.markers[i];
                    self._setMarker(marker.id,
                                    new google.maps.LatLng(marker.position.lat, marker.position.lng),
                                    'assets/images/red-pin.png');
                }
            });

            /**
            * CodeAddress event
            * @parent - TeacherLocationSectionController
            * @description - Parent send country, address, zipCode to child
            * in order to get position (lng, lat) on the map.
            * @event
            */
            this.$scope.$on('CodeAddress', function(event, args) {
                //Init geoCode google map in order to get lat & lng base on teacher street
                let geocoder = new google.maps.Geocoder();
                self._codeAddress(geocoder, args.country, args.address, args.city);
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.map')
        .controller(MapController.controllerId, MapController);

}
