/******************************************************************\

Conceptos básicos de tests con Mocha y Chai
===========================================

Las herramientas usadas para escribir estos tests son:

Mocha
-----
Es el framework que ejecuta estos tests. Nos da los métodos it,
describe, before, beforeEach,after, afterEach. Ejecuta todos los
tests que están en la carpeta /test y nos da un reporte de los
resultados. Invocamos estos tests por línea de comando, desde la
carpeta raíz del proyecto, ejecutando:

    npm test

Más info en https://mochajs.org/

Chai
----
Es un framework para verificar afirmaciones que ofrece una sintaxis
que se lee con facilidad como una frase en inglés.
Mas información en https://www.chaijs.com/guide/styles/


\******************************************************************/

// Incluimos la herramienta *expect* de Chai
const { expect } = require('chai')

// Un bloque de código definido con la función describe() sirve
// simplemente para agrupar varios tests en secciones.
// El primer parámetro es el título de la sección.
// Agrupar en secciones no es obligatorio, pero hace más fácil leer
// el reporte final.
describe('Conceptos básicos de test con Mocha y Chai', () => {

    // Un bloque de código definido con la función before() se va a
    // ejecutar por única vez antes de lanzar todos los tests
    // definidos en la misma sección. Puede usarse before() en cualquier
    // parte de la sección. No hace falta que esté al principio.
    // Esto se usa para crear las condiciones que los tests necesitan.
    // No es obligatorio definir un before si no se lo necesita.
    before(() => {
        // console.log('Ante todo, buenos días!')
    })

    // Un bloque de código definido con la función after() se va a
    // ejecutar por única vez después que hayan terminado todos los
    // tests definidos en la misma sección. Puede usarse after() en
    // cualquier parte de la sección.
    // Esto se usa para liberar los recursos que se hayan tomado o hacer
    // limpieza de la basura que los tests generaron.
    // No es obligatorio definir un after si no se lo necesita.
    after(() => {
        // console.log('Eso fue todo!')
    })

    // El método it se usa para definir un test particular.
    // El primer parámetro es una descripción de lo que se quiere probar
    // y el segundo parámetro es un bloque de código ejecutable que tiene
    // una o más verificaciones.
    it('Multiplicar 3 por 4 es igual a sumar 4 veces 3', () => {

        const producto = 3 * 4
        const suma = 3 + 3 + 3 + 3

        // 👇 Esta sintaxis es de Chai 👇
        expect(producto).to.be.equal(suma)
        // "Se espera que `producto` sea igual a `suma`"
    })

    // Otro test.
    it('4 elevado al cubo es lo mismo que multiplicar tres veces 4', () => {

        const potencia = 4 ** 3
        const multiplicacion = 4 * 4 * 4

        expect(potencia).to.be.equal(multiplicacion)
    })

    // Se pueden hacer tantas secciones y subsecciones como se quiera
    // con describe.
    describe('Tests con arreglos', () => {

        describe('Método reverse', () => {

            it('El método .reverse() da vuelta un arreglo', () => {

                const arreglo = [ 'Hugo', 'Paco', 'Luis' ]
                const resultadoEsperado = [ 'Luis', 'Paco', 'Hugo' ]

                // En Chai se usa deep.equal (o igualdad profunda) para
                // comparar arrays u objetos basándose en su contenido.
                // Si usáramos equal normal, se chequeará que ambas variables
                // son exactamente el mismo arreglo, lo que no es el caso en
                // nuestro test. Acá tenemos que validar que el arreglo reversado
                // y el resultado esperado tienen los mismos elementos.
                expect( arreglo.reverse() ).to.be.deep.equal( resultadoEsperado )

            })

        }) // Fin de la sección Método reverse()

    }) // Fin de la sección Tests con arreglos

    it('Algunas expresiones comunes en Chai', () => {

        expect(1 + 1).not.to.be.equal(3) // "Se espera que 1 + 1 no sea igual a 3"

        expect('Cristobal').to.have.a.lengthOf(9) // "Se espera que 'Cristobal' tenga longitud de 9 caracteres"

        expect( [1, 2, 3] ).not.to.have.a.lengthOf(7) // "Se espera que el arreglo [1, 2, 3] no tenga
                                                      // una longitud de 7 elementos"

        expect('Cristobal').to.include('toba') // "Se espera que 'Cristobal' incluya la palabra 'toba'

        expect( ['blanco', 'negro'] ).not.to.include('verde') // "Se espera que el arreglo ['blanco', 'negro']
                                                              //  no incluya el elemento 'verde'

        expect( ['blanco', 'negro'] ).to.be.an('array').that.is.not.empty // "Se espera que ['blanco', 'negro']
                                                                          // sea un arreglo no vacío"

        expect( 5 < 7 ).to.be.true // "Se espera que 5 < 7 sea verdadero"
        expect( 10/3 ).to.be.greaterThan(3) // "Se espera que 10/3 sea mayor que 3"
        expect( 10/3 ).to.be.greaterThan(3).but.lessThan(4) // "Se espera que 10/3 sea mayor que 3 pero menor que 4"
        expect( 10/3 ).to.be.approximately(3, 0.5) // "Se espera que 10/3 sea aproximadamente 3, con una
                                                   //  diferencia de, a lo sumo, 0.5"
        expect( 1/0 ).not.to.be.finite // "Se espera que 1/0 no sea finito"
    })

    // Agregando x adelante de un test lo desactiva.
    xit('Test desactivado', () => {
        'esto no se ejecutará'
    })

    // Agregando .skip a un describe se desactiva toda la sección.
    describe.skip('Sección desactivada', () => {
        it('Test desactivado por estar en una sección desactivada', () => {
            'esto tampoco se ejecutará'
        })
    })

    // Un método definido con beforeEach se va a ejecutar antes que cada
    // uno de los tests definidos en esta sección. O sea, si hay 10 tests,
    // va a ejecutarse 10 veces. Puede usarse en cualquier parte de la
    // sección.
    // Al igual que el before, beforeEach sirve para crear las condiciones
    // que los tests necesitan.
    beforeEach(() => {
        // console.log('A punto de hacer un test.')
    })

    // Un bloque de código definido en un afterEach se va a ejecutar después de
    // cada uno de los tests de la sección. Puede usarse afterEach en cualquier
    // parte de la sección.
    // Al igual que el método after, afterEach sirve para liberar recursos y hacer
    // limpieza.
    afterEach(() => {
        // console.log('Terminado un test')
    })

})// Fin de la sección Conceptos básicos de test con Mocha y Chai