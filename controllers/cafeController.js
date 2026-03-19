// controllers/cafeController.js
const Cafe = require('../models/Cafe');

// 1. get
const obtenerCafes = async (req, res) => {
    try {
        const listaDeCafes = await Cafe.findAll(); 

        res.render('index', { 
            mensaje: 'Nuestro Menú de Especialidad',
            cafes: listaDeCafes 
        });

    } catch (error) {
        console.error("Error al obtener los cafés:", error);
        res.status(500).send("El molino se atascó. Error interno del servidor.");
    }
};

// 2. post
const crearCafe = async (req, res) => {
    try {
        const { origen, nivel_tueste, precio_por_kg } = req.body; 

        await Cafe.create({
            origen: origen,
            nivel_tueste: nivel_tueste,
            precio_por_kg: precio_por_kg
        });

        res.redirect('/');

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).send("Se nos cayó el café al suelo.");
    }
};

module.exports = { obtenerCafes, crearCafe };