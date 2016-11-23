/* Cuando agregue la configuracion rapida, para que el usuario especifique que
dias del mes y que horas no esta disponible. */

businessHours: {
    dow: [ 0, 6 ], // estoy disponible solo los domingos (0) y los sabados (6) (donde 1 es lunes, 2 martes, 3 miercoles, 4, jueves, 5 viernes)
    start: '10:00', // estoy disponible de 10:00 am
    end: '18:00' // estoy disponible hasta las 6:00 pm
}

/*Una variacion del businessHours es la siguiente:

  start: '2014-12-01T10:00:00',
  end: '2014-12-05T22:00:00'

Con esto lo que hacemos es bloquear un rango de dias. Por ejemplo el usuario
tiene que viajar por unos dias, con esto bloqueamos esos dias.

*/


/* Estructura de los eventos dentro de la agenda, este es el JSON que deberiamos
construir para mostrar cada reunión, la propiedad editable: false hace que el usuario
no pueda estirar el evento */
events: [
    {
        title: 'Rosa',
        start: '2016-10-12T17:00:00',
        end: '2016-10-12T18:00:00',
        editable: false
    },
    {
        title: 'Carlos',
        start: '2016-10-20T20:00:00',
        end: '2016-10-12T21:00:00',
        editable: false
    },
    {
        title: 'Michaelson',
        start: '2016-10-23T07:00:00',
        end: '2016-10-23T08:00:00',
        editable: false
    }
]


/* Esta propiedad es la que me permite solo reservar reuniones por horas, no
cada 30 minutos, esto me sirve para que en la vista: agendaWeek se vean las horas
por 'horas' no por '30 minutos' */

slotDuration: '01:00:00'

/* Esta propiedad me permite cambiar el formato del label en la vista agendaWeek
(las horas que se ven el la primera columna) */

slotLabelFormat: 'h(:mm) a' // 12 pm

/* Estas dos propiedades me van a permitir en la vista: agendaWeek mostrar solo
las horas que el usuario asigno como disponibles, entonces cuando el usuario,
diga de que horas a que horas esta libre, nosotros asignamos eso valores a estos
dos campos, y entonces solo deberia mostrar la agenda unicamente con las horas
que el tiene disponibles */

minTime: '13:00:00',
maxTime: '19:00:00',

/* Esta propiedad me permite cambiar el formato del label del evento que muestra
 en la vista 'month' */

timeFormat: 'h:mm a' // 12:00 pm Carlos

/* Esta propiedad nos permite cambiar el formato del titulo del calendario */

titleFormat: 'MMMM D YYYY' // October 20 2016

/* Esta propiedad me permite cambiar el texto de cada boton en el toolbars del
header */

buttonText: {
    month: 'view calendar'
}
