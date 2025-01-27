# Gestión de CORS en Servidores Express: Tres Enfoques Diferentes

## ¿Qué es el problema de CORS?
Cross-Origin Resource Sharing (CORS) es un mecanismo de seguridad implementado en los navegadores para controlar cómo se permiten las solicitudes entre diferentes orígenes. En este caso, tienes un servidor backend que se ejecuta en `http://localhost:1234/movies` y una web frontend que se ejecuta en `http://127.0.0.1:5500/web/index.html`. Aunque ambos están en localhost, tienen diferentes puertos, lo que los convierte en orígenes diferentes, provocando problemas de CORS.

### Diferentes Orígenes:

- **Servidor Backend:** `http://localhost:1234/movies`
- **Web Frontend:** `http://127.0.0.1:5500/web/index.html`

Esta diferencia en los orígenes provocará que el navegador bloquee las solicitudes entre ellos a menos que el servidor permita explícitamente estas solicitudes mediante configuraciones de CORS.

### Peticiones Simples (Simple Requests)
Las peticiones simples son aquellas que cumplen con ciertos criterios, como usar uno de los métodos HTTP: GET, POST, o HEAD.
**Problema:** Si el servidor backend no incluye el encabezado Access-Control-Allow-Origin en la respuesta, el navegador bloqueará la respuesta, generando un error de CORS. El código del servidor debe incluir:

```javascript
res.header('Access-Control-Allow-Origin', origin);
```

### Peticiones Complejas (Preflighted Requests)
Las peticiones complejas son aquellas que usan métodos como PUT, DELETE, PATCH

**Problema:** El servidor debe manejar la solicitud preflight OPTIONS y responder adecuadamente con los encabezados necesarios:

```javascript
app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.header('Origin'));
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});
```

## Proyecto 1: Servidor Básico con Express y CORS Manual

### Descripción
Este proyecto crea un servidor básico utilizando Express.js. El servidor maneja solicitudes HTTP para recuperar y eliminar películas de un archivo JSON. Además, se configura manualmente el CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde orígenes específicos.

### Tecnologías
- Node.js
- Express.js

### Características
- Middleware CORS configurado manualmente.
- Recuperación y eliminación de películas.
- Uso de archivos JSON como almacenamiento de datos.

### Aprendizajes Clave
- Configuración manual de CORS.
- Creación de un servidor básico con Express.js.
- Manejo de archivos JSON para almacenamiento de datos.

## Proyecto 2: Servidor con Middleware CORS y Callback

### Descripción
Este proyecto expande el servidor básico añadiendo el middleware CORS proporcionado por el paquete `cors`. Utiliza una función de callback para validar dinámicamente los orígenes permitidos.

### Tecnologías
- Node.js
- Express.js
- Cors

### Características
- Middleware CORS utilizando el paquete `cors`.
- Validación dinámica de orígenes permitidos.
- Recuperación y eliminación de películas.

### Aprendizajes Clave
- Uso del middleware cors para gestionar CORS.
- Implementación de funciones de callback para validar orígenes.
- Mejora de la seguridad y flexibilidad en la configuración de CORS.

## Proyecto 3: Servidor con Middleware CORS y Lista de Orígenes

### Descripción
Este proyecto utiliza el middleware `cors` con una configuración simplificada, aceptando una lista de orígenes permitidos. Facilita la gestión de CORS al utilizar una lista estática de orígenes permitidos.

### Tecnologías
- Node.js
- Express.js
- Cors

### Características
- Middleware CORS utilizando el paquete `cors`.
- Lista estática de orígenes permitidos.
- Recuperación y eliminación de películas.

### Conclusión

Espero que encuentres útiles estos proyectos y que te ayuden a entender mejor cómo manejar CORS y crear servidores básicos utilizando Express.js. A través de estos ejemplos, he querido mostrar diferentes enfoques para configurar CORS, desde una configuración manual básica hasta el uso del middleware `cors` con validación dinámica y listas de orígenes permitidos. Cada enfoque tiene sus propias ventajas y puede ser útil en diferentes escenarios.

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o enviar un pull request. Estoy siempre abierto a mejorar y aprender de la comunidad. ¡Gracias por tomarte el tiempo de explorar estos proyectos!
