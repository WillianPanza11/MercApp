// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Puerto desde variable de entorno (Railway lo asigna automáticamente)
const PORT = process.env.PORT || 3000;

// Configuración de CORS para producción
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Importar rutas 
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

// Usar rutas
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// Endpoint de salud (IMPORTANTE para Railway)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Ruta raíz con información de la API
app.get('/', (req, res) => {
    res.json({
        mensaje: 'MercApp API funcionando correctamente 🚀',
        version: '1.0.0',
        endpoints: {
            productos: '/api/products',
            categorias: '/api/categories',
            salud: '/health'
        }
    });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor MercApp escuchando en puerto ${PORT}`);
    console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});