const API_URL = 'http://localhost:3000/api'

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
    }
}