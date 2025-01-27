# Proyecto 1: Servidor Básico con Express y CORS Manual

## Descripción
Este proyecto crea un servidor básico utilizando Express.js. El servidor maneja solicitudes HTTP para recuperar y eliminar películas de un archivo JSON. Además, se configura manualmente el CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde orígenes específicos.

## Tecnologías
- Node.js
- Express.js

## Características
- Middleware CORS configurado manualmente.
- Recuperación y eliminación de películas.
- Uso de archivos JSON como almacenamiento de datos.

## Aprendizajes Clave
- Configuración manual de CORS.
- Creación de un servidor básico con Express.js.
- Manejo de archivos JSON para almacenamiento de datos.

# Proyecto 2: Servidor con Middleware CORS y Callback

## Descripción
Este proyecto expande el servidor básico añadiendo el middleware CORS proporcionado por el paquete `cors`. Utiliza una función de callback para validar dinámicamente los orígenes permitidos.

## Tecnologías
- Node.js
- Express.js
- Cors

## Características
- Middleware CORS utilizando el paquete `cors`.
- Validación dinámica de orígenes permitidos.
- Recuperación y eliminación de películas.

## Aprendizajes Clave
- Uso del middleware cors para gestionar CORS.
- Implementación de funciones de callback para validar orígenes.
- Mejora de la seguridad y flexibilidad en la configuración de CORS.

### Proyecto 3: Servidor con Middleware CORS y Lista de Orígenes

## Descripción
Este proyecto utiliza el middleware `cors` con una configuración simplificada, aceptando una lista de orígenes permitidos. Facilita la gestión de CORS al utilizar una lista estática de orígenes permitidos.

## Tecnologías
- Node.js
- Express.js
- Cors

## Características
- Middleware CORS utilizando el paquete `cors`.
- Lista estática de orígenes permitidos.
- Recuperación y eliminación de películas.

## Conclusión

Espero que encuentres útiles estos proyectos y que te ayuden a entender mejor cómo manejar CORS y crear servidores básicos utilizando Express.js. A través de estos ejemplos, he querido mostrar diferentes enfoques para configurar CORS, desde una configuración manual básica hasta el uso del middleware `cors` con validación dinámica y listas de orígenes permitidos. Cada enfoque tiene sus propias ventajas y puede ser útil en diferentes escenarios.

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o enviar un pull request. Estoy siempre abierto a mejorar y aprender de la comunidad. ¡Gracias por tomarte el tiempo de explorar estos proyectos!
