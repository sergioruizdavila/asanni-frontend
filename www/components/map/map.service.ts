/**
 * MapService
 * @description - Services related on Student Landing Page Model.
 * @constructor
 * @param {app.core.restApi.IRestApi} restApi - instance rest Api service.
 */

module components.map {

    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMapService {
        buildCircle:(map: google.maps.Map, circlePosition: IPosition) => google.maps.Circle;
        selectMarker:(type: string) => IMarkerStatus;
    }

    export interface IMarkerStatus {
        normal: string;
        hover: string;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MapService implements IMapService {

        static serviceId = 'mainApp.components.map.MapService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = [];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {}

        /**********************************/
        /*            METHODS             */
        /**********************************/

        buildCircle(map: google.maps.Map, circlePosition: IPosition): google.maps.Circle {
            //VARIABLES
            let circle_strokeColor = '#ff5a5f';
            let circle_strokeOpacity = 0.8;
            let circle_strokeWeight = 2;
            let circle_fillColor = '#ff5a5f';
            let circle_fillOpacity = 0.35;
            let circle_radius = 140;

            //Init Circle
            let circle = new google.maps.Circle ({
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
        }



        selectMarker(type: string): IMarkerStatus {
            //CONSTANTS
            const imagePath = 'assets/images/';
            const round = 'round-red-marker.png';
            const roundHover = 'round-green-marker.png';
            const long = 'long-red-marker.png';
            const longHover = 'long-green-marker.png';

            let markerStatus = {normal: '', hover: ''};

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
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.map')
        .service(MapService.serviceId, MapService);

}
