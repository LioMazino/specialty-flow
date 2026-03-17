// 1. IMPORTACIONES: Trae las herramientas que instalamos con npm
const express = require('express');
const app = express();
// dotenv carga las variables secretas desde el archivo .env
require('dotenv').config(); 

// 2. CONFIGURACIÓN DEL MOTOR DE VISTAS (EJS)
// para renderizar el frontend, usa EJS
app.set('view engine', 'ejs');
// indica en qué carpeta están esos archivos visuales
app.set('views', './views');

// 3. MIDDLEWARES GLOBALES
// permite  nuestra app entienda los datos que llegan en formato JSON (como desde Postman)
app.use(express.json());
// Esto permite entender los datos que vienen de un formulario HTML normal
app.use(express.urlencoded({ extended: true }));

// 4. RUTAS 
// Por ahora creare una ruta de prueba. 
app.get('/', (req, res) => {
    // En lugar de enviar un JSON, voy a "renderizar" una vista EJS
    // Buscó un archivo llamado 'index.ejs' en la carpeta views
    res.render('index', { mensaje: '¡Bienvenido a SpecialtyFlow Barista Pro!' });
});

// 5. INICIO DEL SERVIDOR
// Busca  el puerto en las variables de entorno, o usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`☕ El molino está encendido y el servidor corriendo en http://localhost:${PORT}`);
    await syncDB(); // Sincroniza la base de datos al iniciar el servidor
    
});