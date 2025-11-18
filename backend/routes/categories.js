const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

// GET - Obtener todas las categorías
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data.categories);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});

module.exports = router; // Esto es necesario para exportar el router y usarlo en server.js