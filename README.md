# Ejemplos de pruebas de servicios

### Cómo empezar

##### Descargá este proyecto

Podés hacer esto abriendo el símbolo del sistema o terminal, entrando a la carpeta en donde guardás tus proyectos y ejecutando:

    git clone https://github.com/llobeto/qat-test-service.git

Esto va a crear una carpeta y descargar este proyecto deentro.

##### Actualizá dependencias

Este proyecto necesita algunas librerías externas que no están inclídas pero están disponibles en Internet.
Para descargarlas volvé al símbolo del sistema o terminal, entrá a la carpeta qat-test-service (que se creó al descargar el proyecto) y ejecutá:

    npm install

##### Para ejecutar los tests de ejemplo

De nuevo por línea de comandos, en la carpeta qat-test-service>

    npm test

### Contenido

En la subcarpeta `test` vas a encontrar varios archivos de Javascript en donde hay ejemplos de tests sobre sitios web y servicios REST. Cada archivo tiene muchos comentarios explicando para qué sirve cada cosa. Se pueden usar de base para construír tus propias pruebas.

### Creá tus propias pruebas

Cualquier archivo de Javascript que crees en la carpeta `test` (o en sus subcarpetas) va a ejecutarse al hacer `npm test`.

### Instalar una nueva librería

Si necesitás instalar una librería nueva ejecutás, siempre en la carpeta de tu proyecto:

    npm install nombre_de_la_librería --save

Podés encontrar miles de librerías útiles en https://www.npmjs.com.