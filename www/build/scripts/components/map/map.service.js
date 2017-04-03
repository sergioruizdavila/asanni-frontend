var components;
(function (components) {
    var map;
    (function (map_1) {
        'use strict';
        var MapService = (function () {
            function MapService() {
            }
            MapService.prototype.buildCircle = function (map, circlePosition) {
                var circle_strokeColor = '#ff5a5f';
                var circle_strokeOpacity = 0.8;
                var circle_strokeWeight = 2;
                var circle_fillColor = '#ff5a5f';
                var circle_fillOpacity = 0.35;
                var circle_radius = 140;
                var circle = new google.maps.Circle({
                    strokeColor: circle_strokeColor,
                    strokeOpacity: circle_strokeOpacity,
                    strokeWeight: circle_strokeWeight,
                    fillColor: circle_fillColor,
                    fillOpacity: circle_fillOpacity,
                    map: map,
                    center: new google.maps.LatLng(circlePosition.lat, circlePosition.lng),
                    radius: circle_radius
                });
                return circle;
            };
            MapService.prototype.selectMarker = function (type) {
                var imagePath = 'assets/images/';
                var round = 'round-red-marker.png';
                var roundHover = 'round-green-marker.png';
                var long = 'long-red-marker.png';
                var longHover = 'long-green-marker.png';
                var markerStatus = { normal: '', hover: '' };
                switch (type) {
                    case 'round':
                        markerStatus.normal = imagePath + round;
                        markerStatus.hover = imagePath + roundHover;
                        break;
                    case 'long':
                        markerStatus.normal = imagePath + long;
                        markerStatus.hover = imagePath + longHover;
                        break;
                    default:
                        markerStatus.normal = imagePath + round;
                        markerStatus.hover = imagePath + roundHover;
                        break;
                }
                return markerStatus;
            };
            MapService.serviceId = 'mainApp.components.map.MapService';
            MapService.$inject = [];
            return MapService;
        }());
        map_1.MapService = MapService;
        angular
            .module('mainApp.components.map')
            .service(MapService.serviceId, MapService);
    })(map = components.map || (components.map = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/map/map.service.js.map
