# gestion_empleados

## Requerimientos: 
- NodeJS 18+
- PHP 8+
- MySQL 8+
- Composer 2.7+
- Angular 17

# Instrucciones 
## Clonar el proyecto:
https://github.com/yaninaolivera/gestion_empleados.git

## Para el Backend:
- Crear la base de datos gestion_empleados
- Configurar la conexion a la Base de datos en la carpeta backend/.env
- Ejecutar en la Shell dentro de la carpeta backend el comando php artisan migrate
- Generar datos de prueba con el comando php artisan db:seed --class=EmpleadoSeeder
- Levantar el servidor del backend con el comando php artisan serve
- 'http://localhost:8000/'


## Para el Frontend:
- Ejecutar en la shell dentro de la carpeta frontend npm install
- Levantar el frontend con el comando ng serve

# Autor: Yanina Lizbeth Olivera Vásquez