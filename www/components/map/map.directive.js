var components;
(function (components) {
    var map;
    (function (map_1) {
        'use strict';
        var MaMap = (function () {
            function MaMap() {
                this.bindToController = true;
                this.controller = MapController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    mapConfig: '='
                };
                this.templateUrl = 'components/map/map.html';
                console.log('maMap directive constructor');
            }
            MaMap.prototype.link = function ($scope, elm, attr) {
                console.log('maMap link function');
            };
            MaMap.instance = function () {
                return new MaMap();
            };
            return MaMap;
        }());
        MaMap.directiveId = 'maMap';
        angular
            .module('mainApp.components.map')
            .directive(MaMap.directiveId, MaMap.instance);
        var MapController = (function () {
            function MapController($scope, $rootScope, $timeout) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.init();
            }
            MapController.prototype.init = function () {
                var self = this;
                this._map;
                this.mapId = 'ma-map-' + Math.floor((Math.random() * 100) + 1);
                this._infoWindow = null;
                this._markers = [];
                this.$scope.options = null;
                this.form = {
                    position: {
                        lat: null,
                        lng: null
                    }
                };
                switch (this.mapConfig.type) {
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
                var meetingPointData = {
                    id: 1,
                    position: {
                        lat: 6.175298,
                        lng: -75.582289
                    }
                };
                this.activate();
            };
            MapController.prototype.activate = function () {
                console.log('map controller actived');
            };
            MapController.prototype._searchMapBuilder = function () {
                var self = this;
                var zoom = 16;
                var center = this.mapConfig.data.position;
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
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        var buttons = ['Students', 'Teachers', 'Schools'];
                        for (var i = 0; i < buttons.length; i++) {
                            var controlDiv = document.createElement('div');
                            var control = self.filterControl(controlDiv, buttons[i]);
                            self._map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
                        }
                        for (var i = 0; i < self.mapConfig.data.markers.length; i++) {
                            var marker = self.mapConfig.data.markers[i];
                            self.setMarker(marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), 'London', 'Just some content', 'assets/images/meeting-point.png');
                        }
                    });
                }
            };
            MapController.prototype._locationMapBuilder = function () {
                var self = this;
                var zoom = 16;
                var center = {
                    lat: 6.1739743,
                    lng: -75.5822414
                };
                var circle = null;
                var circle_strokeColor = '#ff5a5f';
                var circle_strokeOpacity = 0.8;
                var circle_strokeWeight = 2;
                var circle_fillColor = '#ff5a5f';
                var circle_fillOpacity = 0.35;
                var circle_center = {
                    lat: 6.1739743,
                    lng: -75.5822414
                };
                var circle_radius = 200;
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
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        circle = new google.maps.Circle({
                            strokeColor: circle_strokeColor,
                            strokeOpacity: circle_strokeOpacity,
                            strokeWeight: circle_strokeWeight,
                            fillColor: circle_fillColor,
                            fillOpacity: circle_fillOpacity,
                            map: self._map,
                            center: new google.maps.LatLng(center.lat, center.lng),
                            radius: circle_radius
                        });
                        self.setMarker(7, new google.maps.LatLng(6.1739743, -75.5822614), 'London', 'Just some content', 'assets/images/location.png');
                        self.setMarker(8, new google.maps.LatLng(6.174486, -75.582846), 'London', 'Just some content', 'assets/images/location.png');
                        self.setMarker(9, new google.maps.LatLng(6.173066, -75.583090), 'London', 'Just some content', 'assets/images/location.png');
                    });
                }
            };
            MapController.prototype._assignMarkerMapBuilder = function () {
                var self = this;
                var zoom = 16;
                var center = {
                    lat: 6.1739743,
                    lng: -75.5822414
                };
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
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        self.setMarker(7, new google.maps.LatLng(6.1739743, -75.5822414), 'London', 'Just some content', 'assets/images/location.png');
                        google.maps.event.trigger(self._map, "resize");
                    });
                }
            };
            MapController.prototype.setMarker = function (id, position, title, content, icon) {
                var self = this;
                var marker;
                var markerOptions = {
                    id: id,
                    position: position,
                    map: this._map,
                    title: title,
                    icon: icon,
                    draggable: true
                };
                marker = new google.maps.Marker(markerOptions);
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    self.form.position.lat = this.getPosition().lat();
                    self.form.position.lng = this.getPosition().lng();
                });
                google.maps.event.addListener(marker, 'click', function (event) {
                    for (var i = 0; i < self._markers.length; i++) {
                        self._markers[i].setIcon('assets/images/meeting-point.png');
                    }
                    this.setIcon('assets/images/location.png');
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
                });
                this._markers.push(marker);
            };
            MapController.prototype.filterControl = function (controlDiv, type) {
                var self = this;
                var className = 'filterBtnMap';
                var background_color = 'rgb(255, 255, 255)';
                var background_color_active = '#00B592';
                var border_radius = '3px';
                var box_shadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
                var cursor = 'pointer';
                var margin_top = '10px';
                var margin_bottom = '22px';
                var margin_right = '10px';
                var text_align = 'center';
                var title = 'Click to search' + type;
                var color = '#4E4E4E';
                var color_active = '#FFF';
                var font_family = 'Roboto,Arial,sans-serif';
                var font_size = '15px';
                var line_height = '10px';
                var padding_top = '10px';
                var padding_bottom = '10px';
                var padding_left = '20px';
                var padding_right = '20px';
                var border_bottom = '0 hidden transparent';
                var border_bottom_active = '2px solid #018a6f';
                var controlUI = document.createElement('div');
                controlUI.className = className;
                controlUI.style.backgroundColor = background_color;
                controlUI.style.borderRadius = border_radius;
                controlUI.style.boxShadow = box_shadow;
                controlUI.style.cursor = cursor;
                controlUI.style.marginTop = margin_top;
                controlUI.style.marginBottom = margin_bottom;
                controlUI.style.marginRight = margin_right;
                controlUI.style.textAlign = text_align;
                controlUI.title = title;
                controlDiv.appendChild(controlUI);
                var controlText = document.createElement('div');
                controlText.style.color = color;
                controlText.style.fontFamily = font_family;
                controlText.style.fontSize = font_size;
                controlText.style.lineHeight = line_height;
                controlText.style.paddingTop = padding_top;
                controlText.style.paddingBottom = padding_bottom;
                controlText.style.paddingLeft = padding_left;
                controlText.style.paddingRight = padding_right;
                controlText.innerHTML = type;
                controlUI.appendChild(controlText);
                controlUI.addEventListener('click', function (e) {
                    var element = this;
                    var child = this.children[0];
                    var filterBtn = document.getElementsByClassName('filterBtnMap');
                    for (var i = 0; i < filterBtn.length; i++) {
                        filterBtn[i].style.backgroundColor = background_color;
                        filterBtn[i].style.borderBottom = border_bottom;
                        filterBtn[i].children[0].style.color = color;
                    }
                    element.style.backgroundColor = background_color_active;
                    element.style.borderBottom = border_bottom_active;
                    child.style.color = color_active;
                    self._removeMarkers();
                    self.$rootScope.$broadcast(type);
                });
            };
            MapController.prototype._removeMarkers = function () {
                for (var i = 0; i < this._markers.length; i++) {
                    this._markers[i].setMap(null);
                }
            };
            return MapController;
        }());
        MapController.controllerId = 'mainApp.components.map.MapController';
        MapController.$inject = ['$scope', '$rootScope', '$timeout'];
        map_1.MapController = MapController;
        angular.module('mainApp.components.map')
            .controller(MapController.controllerId, MapController);
    })(map = components.map || (components.map = {}));
})(components || (components = {}));
//# sourceMappingURL=map.directive.js.map