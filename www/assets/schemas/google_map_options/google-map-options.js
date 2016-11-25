/*
* @description: El plugin de google map se instalado sin ningun wrapper en angular
* u otro framework, lo que se hizo fue crear una directiva propia, y ahi dentro
* invocar el API como sugiere la documentación de Google:
* https://developers.google.com/maps/documentation/javascript/examples/map-simple?hl=es-419
*/

/*USO: Para usar nuestra directiva ma-map es necesario enviar un set de configuración
especificando las siguientes propiedades:
    - type: string - indica que tipo de map es:
                * search-map: mapa completo y editable
                * location-map: mapa que muestra la localizacion dentro de un
                  circulo.
*/

/*--- Opciones de configuración: Google API ---*/

/*
    Center es la propiedad que nos permite centrar el mapa dentro se unas coordenadas
    especificas
*/

center: new google.maps.LatLng(50, 2)

/*
    Zoom nos permite setear un zoom al mapa por defecto, al inicializar el mapa
    este tendra el zoom que hayamos asignado
*/

zoom: 4

/*
    mapTypeControl nos permite ocultar la opción: Map/Satellite
*/

mapTypeControl: false

/*
    zoomControl nos permite activar/desactivar los botones de zoomIn y zoomOut
    (el + y el -)
*/

zoomControl: true

/*
    scrollwheel nos permite activar/desactivar el poder hacer zoom con la rueda
    del mouse.
*/

scrollwheel: false

/*
    streetViewControl nos permite activar/desactivar las opciones de navegar el
    mapa con googleStreetView
*/

streetViewControl: false

/*
    zoomControlOptions tiene un set de propiedades, de las cuales usuariamos:
        * position: es la propiedad que nos permite asignar la posición que
                    deseamos para nuestro control del zoom. (boton + y -). Su
                    forma de implementarlo es de la siguiente forma:
                    google.maps.ControlPosition.TOP_LEFT (cambiando TOP_LEFT por
                    la posicion que deseamos usar: TOP_RIGHT, BOTTOM_LEFT, etc)
*/

zoomControlOptions: {
    position: google.maps.ControlPosition.TOP_RIGHT
}



/*-- Instanciar Circle con sus respectivas configuraciones --*/

var cityCircle = new google.maps.Circle();

/* Configuraciones de Circle */
/*****************************/

/*
    strokeColor: es el color del borde que tendra nuestro circulo,
    strokeOpacity: la opacidad del borde del circulo,
    strokeWeight: el grosor del borde del circulo,
    fillColor: el color de relleno del circulo,
    fillOpacity: opacidad del relleno del circulo,
    map: instancia de nuestro mapa,
    center: centro de nuestro mapa,
    radius: que tan grande queremos que sea el circulo (la unidades son en metros)
*/

{
    strokeColor: '#ff5a5f',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff5a5f',
    fillOpacity: 0.35,
    map: this._map,
    center: new google.maps.LatLng(6.1739743, -75.5822414),
    radius: 200
}


/*-- Instanciar Markers en nuestro mapa --*/
/* @description: Los Markers son los pines que iremos mostrando en nuestro mapa */

marker = new google.maps.Marker(markerOptions);

/* Configuraciones del Marker */
/*****************************/

/*
    position: posicion exacta de donde vamos a colocar nuestro pin,
    map: instancia de nuestro mapa,
    title: titulo de nuestro pin (al dar click en el se vera un popupOver),
    icon: icono personalizado de nuestro pin
*/

var markerOptions = {
    position: new google.maps.LatLng(51.508515, -0.125487),
    map: this._map,
    title: title,
    icon: 'assets/images/location.png'
}
