/******************************************************************\

Testing de páginas web simples
==============================

Para hacer solicitudes HTTP vamos a usar *Axios*, un cliente HTTP
para NodeJs muy fácil de usar.
https://github.com/axios/axios

Para explorar las páginas y extaer contenido vamos a usar la
librería *Cheerio*, que es una implementación de jQuery pensada
para el servidor.
https://github.com/cheeriojs/cheerio

La sintaxis de Cheerio es compatible con jQuery.
https://api.jquery.com/

\******************************************************************/


/** Algunas constantes útiles **/
const SITE_URL = 'https://www.mercadolibre.com.ar/'
const TIMEOUT = 10000 // 10 segundos


// Incluimos Chai, Cheerio y Axios
const { expect } = require('chai')
const cheerio = require('cheerio')
const axios = require('axios')
const http = axios.create({ baseURL: SITE_URL, timeout: TIMEOUT })

// Definiciones auxiliares
const esRespuestaOK = respuesta => respuesta.status >= 200 && respuesta.status < 300

describe('Ejemplos de pruebas contra páginas web', function() {

    this.timeout(TIMEOUT)

    it('La página principal carga correctamente', async function() {

        const respuesta = await http.get('/')

        // "Se espera que el status de la respuesta sea OK"
        expect(esRespuestaOK(respuesta)).to.be.true

        // Cargo en un objeto tipo jQuery el contenido de la página
        // recibida.
        const $ = cheerio.load(respuesta.data)


        /*** Me aseguro que la página tenga la caja de búsqueda ***/

        // "Dame los <input> que estén dentro de un <form>
        //  que tenga el atributo role='search'"
        const busqueda = $('form[role=search] input')

        // `busqueda` es la lista de todos los elementos que cumplen
        // la query. Debería haber uno y solo un cuadro de búsqueda:
        expect(busqueda).to.have.lengthOf(1)



        /***  Me aseguro que aparezcan las categorías populares ***/

        // Busco el panel de categorías: "Dame los <div> con clase='container'
        // que contengan un <h1> con el texto 'Categorías populares'"
        const panelDeCategorías = $('div.container:has(h1:contains("Categorías populares"))')

        // Me aseguro de que se haya encontrado uno y solo un panel
        expect(panelDeCategorías).to.have.lengthOf(1)

        // Compruebo que contenga al menos un enlace a categorías.

        // "Encontrá dentro de `panelDeCategorías` elementos <a> con class='category'
        //  y que tengan definido el atributo `href`"
        const enlaces = panelDeCategorías.find('a.category[href]')

        expect(enlaces).not.to.be.empty



        // Con esto, doy por hecho que la página se cargó bien 👍
    })
})