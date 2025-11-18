
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middlewares esto permite que el servidor acepte solicitudes de diferentes orígenes
app.use(cors());
app.use(express.json());

// Importar rutas 
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

// Usar rutas
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// Rutas de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente',
        endpoints: {
            productos: '/api/products',
            categorias: '/api/categories'
        }
    });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


//Inicar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});