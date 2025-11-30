//const API_URL = 'http://localhost:3000/api'
const API_URL = import.meta.env.VITE_API_URL;
export const api = {

    // Función para obtener la lista de productos
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Error al obtener los productos');
        return response.json();
    },

    //Categorias
    async getCategories() {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Error al obtener las categorías');
        return response.json();
    },

    // POST - Crear nuevo producto
    async createProduct(product) {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Error al crear producto')
        }
        return response.json()
    },
}