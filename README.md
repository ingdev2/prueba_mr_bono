## Prueba Tecnica Backend

#### Paso 1 = Crear variables de entorno (archivo .env) en la ruta apps/api con la siguiente estructura:

### API PORT

API_PORT=3000

### TYPEORM DEV

TYPEORM_TYPE=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=puerto
TYPEORM_USERNAME=[nombre de usuario]
TYPEORM_PASSWORD=[contraseña]
TYPEORM_DATABASE=mr_bonno

### JWT TOKEN

JWT_CONSTANTS_SECRET=abcde1234
EXPIRES_IN=2h

#### Paso 2 = Instalar dependencia con el comando "npm i" en la ruta apps/api

#### Paso 3 = Correr el proyecto con el comando "npm run dev"
