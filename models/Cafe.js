// models/Cafe.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Traemos la conexión a la base de datos

// Defino el "Plano" de la tabla para MySQL
const Cafe = sequelize.define('Cafe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  origen: {
    type: DataTypes.STRING, // Para textos como "Colombia" o "Etiopía"
    allowNull: false 
  },
  nivel_tueste: {
    type: DataTypes.STRING, // Para "Claro", "Medio", "Oscuro"
    allowNull: false
  },
  precio_por_kg: {
    type: DataTypes.DECIMAL(10, 2), // 
    allowNull: false
  }
}, {
  tableName: 'cafes', // Nombre explícito de la tabla
  timestamps: true // Crea createdAt y updatedAt mágicamente
});

module.exports = Cafe; // Exportamos el modelo para usarlo en el resto de la app