require('dotenv').config();
const express = require('express');

const { syncDB } = require('./config/db');
require('./models/Cafe'); 

const { obtenerCafes, crearCafe } = require('./controllers/cafeController');

// 2. CONFIGURACIÓN DEL SERVIDOR
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 3. RUTAS 

app.get('/', obtenerCafes);
app.post('/cafes', crearCafe);

// 4. INICIO DEL SERVIDOR

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`☕ El molino está encendido y el servidor corriendo en http://localhost:${PORT}`);
    
    
    await syncDB(); 
}); 