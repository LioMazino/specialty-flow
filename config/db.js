const { Sequelize } = require('sequelize');
require('dotenv').config(); // Trae las variables secretas

// 1. Creo la instancia de Sequelize 
// Sequelize recibe: Nombre de la DB, Usuario, Contraseña, y un objeto de configuración
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', //  dice qué motor estamos usando
    port: process.env.DB_PORT || 3306,
    logging: false // Apaga el log para que no ensucie la consola con comandos SQL crudos
  }
);

// 2. Crea la función  syncDB
const syncDB = async () => {
  try {
    // .authenticate() solo prueba si las credenciales son correctas
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida con éxito.');

    // .sync() sincroniza los modelos con las tablas reales
    // ¡CUIDADO! Nunca usar { force: true } en producción, o se borrará toda la base de datos
    await sequelize.sync({ alter: true }); 
    console.log('✅ Base de datos sincronizada.');

  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
};

// 3. Exportar la instancia y la función para usarlas en el resto de la app
module.exports = { sequelize, syncDB };