# Meme App - Backend

Este proyecto es la parte del backend de una aplicación de memes desarrollada con JSON Server.

## Cómo Iniciar el Servidor

Para iniciar el servidor, sigue los siguientes pasos:

1. **Instalar Dependencias**: Si aún no lo has hecho, instala las dependencias necesarias ejecutando el siguiente comando:

   ```bash
   npm install
   ```

2. **Iniciar el Servidor JSON**: Una vez instaladas las dependencias, puedes iniciar el servidor JSON ejecutando el siguiente comando:

   ```bash
   node server.js
   ```

Esto iniciará el servidor JSON y cargará los datos del archivo `memes.json`.

## APIs Disponibles

- **GET /memes**: Obtiene la lista de memes.
- **GET /memes/:id**: Obtiene un meme específico por su ID.
- **POST /memes**: Crea un nuevo meme.
- **GET /users**: Obtiene la lista de usuarios.
- **GET /users/:id**: Obtiene un usuario específico por su ID.
- **POST /login**: Inicia sesión con un usuario existente.

## Autenticación

Puedes utilizar el siguiente usuario de ejemplo para autenticarte:

- **Nombre de usuario**: admin
- **Contraseña**: 12345678\_

Para realizar peticiones que requieren autenticación, incluye las credenciales en las cabeceras de la solicitud, ya sea en forma de cookies o de un token de autenticación.
