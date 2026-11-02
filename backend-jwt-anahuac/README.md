# Backend JWT - Ingenieria de Software
API REST con Node.js, Express, MongoDB y autenticacion JWT. Cada usuario solo puede ver, editar y eliminar sus propias tareas.

## Instalacion
1. `npm install`
2. Copia `.env.example` a `.env` y configura `MONGO_URI` (MongoDB Atlas) y un `JWT_SECRET` largo y aleatorio. **Nunca subas `.env` a GitHub.**
3. `npm start` (o `npm run dev`). La API escucha en `http://localhost:5000` por defecto.

## Endpoints
| Metodo | Ruta | JWT | Funcion |
|---|---|---|---|
| POST | `/api/users` | No | Registrar `{ "nombre": "Pedro", "email": "pedro@example.com", "password": "Clave1234" }` |
| POST | `/api/users/login` | No | Iniciar sesion `{ "email": "pedro@example.com", "password": "Clave1234" }` |
| GET | `/api/users/datos` | Si | Datos del usuario |
| GET | `/api/tareas` | Si | Listar mis tareas |
| POST | `/api/tareas` | Si | Crear `{ "titulo": "Estudiar", "descripcion": "Repasar JWT" }` |
| PUT | `/api/tareas/:id` | Si | Modificar `{ "completada": true }` |
| DELETE | `/api/tareas/:id` | Si | Eliminar tarea propia |

## Autenticacion y seguridad
Enviar `Authorization: Bearer TU_TOKEN` en las rutas protegidas. La API extrae el usuario del JWT verificado, nunca de los datos enviados por el cliente. Las busquedas de tareas usan el filtro `usuario: req.user.id`. Las contrasenas se guardan con hash bcrypt.

## Evidencias
Ejecutar las 20 pruebas del documento del profesor en Postman/Insomnia y tomar capturas de respuestas y codigos HTTP reales. Para probar desde Codespaces con un cliente externo, reenviar el puerto 5000 temporalmente y usar su URL HTTPS. No compartas tokens activos en repositorios publicos.
