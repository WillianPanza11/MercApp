const express = require('express'); //Esto es necesario para usar el router de express
const router = express.Router(); //Crear una instancia del router
const fs = require('fs'); // esto es necesario para trabajar con el sistema de archivos
const path = require('path'); // esto es necesario para trabajar con rutas de archivos

// Ruta de archivo datos JSON
const dataPath = path.join(__dirname, '../data.json');

// Función para leer datos del archivo JSON
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

// funcion para escribir datos en el archivo JSON
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Obtener todos los productos - GET /products
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data.products);
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los productos' });

    }
});

// Obtener un producto por ID - GET /products/:id
router.get('/:id', (req, res) => {
    try {
        const data = readData();
        const productId = data.products.find(p => p.id === parseInt(req.params.id));
        if (!productId) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(productId);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

//Crear un nuevo producto - POST /products
router.post('/', (req, res) => {

    try {
        const { name, description, price, imageUrl, categoryId, stock } = req.body;

        // Validar datos
        if (!name || !description || !price || !imageUrl || !categoryId || !stock) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (price <= 0 || stock < 0) {
            return res.status(400).json({ message: 'El precio debe ser mayor que 0 y el stock no puede ser negativo' });
        }

        const data = readData();
        const newId = Math.max(...data.products.map(p => p.id)) + 1;

        const newProduct = {
            id: newId,
            name,
            description: description || '',
            price: parseFloat(price),
            imageUrl: imageUrl || '',
            categoryId: parseInt(categoryId),
            stock: parseInt(stock) || 0
        };

        data.products.push(newProduct);
        writeData(data);

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

//Actualizar un producto - PUT /products/:id
router.put('/:id', (req, res) => {
    try {
        const data = readData();
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));

        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const { name, description, price, imageUrl, categoryId, stock } = req.body;

        // Validar datos
        if (!name || !description || !price || !imageUrl || !categoryId || !stock) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        if (price <= 0 || stock < 0) {
            return res.status(400).json({ message: 'El precio debe ser mayor que 0 y el stock no puede ser negativo' });
        }

        data.products[index] = {
            ...data.products[index],
            name: name || data.products[index].name,
            description: description || data.products[index].description,
            price: price ? parseFloat(price) : data.products[index].price,
            imageUrl: imageUrl || data.products[index].imageUrl,
            categoryId: categoryId ? parseInt(categoryId) : data.products[index].categoryId,
            stock: stock ? parseInt(stock) : data.products[index].stock
        };

        writeData(data);
        res.json(data.products[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});

//Eliminar un producto - DELETE /products/:id
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const index = data.products.findIndex(p => p.id === parseInt(req.params.id));

        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const deletedProduct = data.products.splice(index, 1);
        writeData(data);
        res.json({ message: 'Producto eliminado', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

module.exports = router; // Esto es necesario para exportar el router y usarlo en server.js