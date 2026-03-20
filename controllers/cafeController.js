const { Op } = require('sequelize'); 
const Cafe = require('../models/Cafe');

// 1. OBT Y FILT CAFÉS (GET)
const obtenerCafes = async (req, res) => {
    try {
        // req.query captura los datos enviados por el panel de filtros en la URL
        const { busqueda, tueste, ordenPrecio } = req.query; 

        //  reglas de búsqueda para la db
        let condiciones = {};

        if (busqueda) {
            condiciones.origen = { [Op.like]: `%${busqueda}%` }; 
        }

        if (tueste && tueste !== 'Todos') {
            condiciones.nivel_tueste = tueste;
        }

        
        let ordenamiento = [];
        if (ordenPrecio === 'asc') {
            ordenamiento = [['precio_por_kg', 'ASC']];
        } else if (ordenPrecio === 'desc') {
            ordenamiento = [['precio_por_kg', 'DESC']];
        }

        
        const listaDeCafes = await Cafe.findAll({
            where: condiciones,
            order: ordenamiento
        }); 

        // Render view con los datos obtenidos
        res.render('index', { 
            mensaje: 'Nuestro Menú de Especialidad',
            cafes: listaDeCafes 
        });

    } catch (error) {
        console.error("Error al obtener los cafés:", error);
        res.status(500).send("Error interno del servidor al obtener datos.");
    }
};

// 2. crear un nuevo café (POST)
const crearCafe = async (req, res) => {
    try {
        // req.body 
        const { origen, nivel_tueste, precio_por_kg } = req.body; 

        await Cafe.create({
            origen: origen,
            nivel_tueste: nivel_tueste,
            precio_por_kg: precio_por_kg
        });

        res.redirect('/');

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).send("Error al guardar el café en la base de datos.");
    }
};

// 3. delete un café (POST)
const eliminarCafe = async (req, res) => {
    try {
        // req.params
        const idDelCafe = req.params.id; 

        await Cafe.destroy({
            where: { id: idDelCafe }
        });

        res.redirect('/');

    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).send("Error al intentar eliminar el registro.");
    }
};

module.exports = { obtenerCafes, crearCafe, eliminarCafe };