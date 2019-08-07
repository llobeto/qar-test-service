/******************************************************************\

Testing de servicios REST
=========================

Para hacer solicitudes HTTP vamos a usar *Axios*, un cliente HTTP
para NodeJs muy fácil de usar.
https://github.com/axios/axios

\******************************************************************/


/** Algunas constantes útiles **/

// Dirección base del servicio que queremos probar
const SERVICE_URL = 'https://rocky-hollows-48010.herokuapp.com/'
// Límite de tiempo sin respuesta antes de considerar que hubo un fallo
const TIMEOUT = 10000 // 10 segundos

// Status de HTTP
const OK = 200
const CREADO = 201


// Incluimos Chai para verificar
const { expect } = require('chai')

// Incluimos Axios para hacer solicitudes HTTP
const axios = require('axios')
const http = axios.create({ baseURL: SERVICE_URL, timeout: TIMEOUT })


describe('Ejemplos de pruebas contra servicios REST', function() {

    // Por defecto, Mocha espera que los tests no tarden más de
    // 2 segundos para terminar. Si se cumple ese tiempo, se
    // considera fallido. Cuando nuestro test depende de servicios
    // externos puede tardar más en terminar, así que le damos un
    // poco más de tiempo. Esta línea aplica a todos los test de
    // esta sección.
    this.timeout(TIMEOUT)


    // Esta notación con `async function` es necesaria cuando
    // nuestros tests son llamadas asincrónicas. Esto es cuando
    // incluyen operaciones como: acceso a archivos, conexiones
    // a servidores o a bases de datos, etc. Esto nos permite
    // usar la palabra clave `await`.
    it('El servicio GET /personas devuelve una lista con 0 o más personas', async function() {

        // ⚠️ `await` es imprescindible acá para esperar la respuesta
        // del servicio  👇👇
        const respuesta = await http.get('/personas')

        // "Se espera que el status de la respuesta sea OK"
        expect(respuesta.status).to.be.equal(OK)

        const personas = respuesta.data

        // "Se espera que `personas` sea un arreglo"
        expect(personas).to.be.an('array')

        //  "Se espera que cada elemento de `persona` tenga las propiedades `nombre`, `apellido` y `id`"
        personas.every(element =>
            expect(element).to.have.property('nombre') &&
            expect(element).to.have.property('apellido') &&
            expect(element).to.have.property('id')
        )
    })

    it('El servicio POST /personas agrega una persona nueva', async function() {

        const martina = {
            nombre: 'Martina',
            apellido: 'Ricci',
            edad: 27
        }

        const respuesta = await http.post('/personas', martina)

        // "Se espera que el status de la respuesta sea CREADO"
        expect(respuesta.status).to.be.equal(CREADO)

        // La solicitud salió bien. Chequeo que la lista de personas tenga
        // a Martina.
        const respuesta2 = await http.get('/personas')

        expect(respuesta2.status).to.be.equal(OK)

        const personas = respuesta2.data

        expect(personas).to.be.an('array')

        const esMartina = persona =>
            persona.nombre === 'Martina' &&
            persona.apellido === 'Ricci' &&
            persona.edad === 27


        const algunaPersonaEsMartina = personas.some(persona => esMartina(persona))
        expect(algunaPersonaEsMartina).to.be.true
    })
})