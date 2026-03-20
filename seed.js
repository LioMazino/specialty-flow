// seed.js
require('dotenv').config();
const { syncDB } = require('./config/db');
const Cafe = require('./models/Cafe');

const importarCafes = async () => {
    try {
        await syncDB(); 
        console.log("🚚 El camión de reparto está en camino a la API...");

        // 1. pido los datos a la API externa (proveedor de café)
        const respuesta = await fetch('https://api.sampleapis.com/coffee/hot');
        const datosAPI = await respuesta.json();

        let nuevosCafes = [];

        // 2. verifico que la API me dio datos válidos
        if (Array.isArray(datosAPI)) {
            console.log("✅ API funcionando. Procesando el cargamento externo...");
            nuevosCafes = datosAPI.slice(0, 15).map(item => {
                const tuestes = ['Claro', 'Medio', 'Oscuro'];
                return {
                    origen: item.title,
                    nivel_tueste: tuestes[Math.floor(Math.random() * tuestes.length)],
                    precio_por_kg: (Math.random() * (40 - 15) + 15).toFixed(2)
                };
            });
        } else {
            console.log("⚠️ El proveedor falló (API caída o inválida). Usando el cargamento de emergencia...");
            nuevosCafes = [
                { origen: "Colombia Supremo (Reserva)", nivel_tueste: "Medio", precio_por_kg: 28.50 },
                { origen: "Etiopía Yirgacheffe (Lavado)", nivel_tueste: "Claro", precio_por_kg: 34.00 },
                { origen: "Sumatra Mandheling (Natural)", nivel_tueste: "Oscuro", precio_por_kg: 26.75 },
                { origen: "Costa Rica Tarrazú", nivel_tueste: "Medio", precio_por_kg: 30.20 },
                { origen: "Kenia AA (Especialidad)", nivel_tueste: "Claro", precio_por_kg: 36.00 }
            ];
        }

        // 4. save los datos en MySQL
        await Cafe.bulkCreate(nuevosCafes);
        
        console.log(`✅ ¡Descarga completa! ${nuevosCafes.length} sacos de café ingresados a MySQL.`);
        process.exit(0); 

    } catch (error) {
        console.error("❌ El camión se estrelló de forma crítica:", error);
        process.exit(1);
    }
};

importarCafes();