import { ref, computed } from "vue";
import { api } from "../services/api";

export function useProducts() {
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(false);
    const error = ref(null);

    //Obtener productos
    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            products.value = await api.getProducts();
        } catch (error) {
            error.value = error.message;

            //Reintentar obtener productos después de un error
            try {
                products.value = await api.getProducts();
                error.value = null;
            } catch (error) {
                error.value = "Error al obtener los productos después de reintentar";
            }
        } finally {
            loading.value = false;
        }
    };

    // Obtener categorías
    const fetchCategories = async () => {
        try {
            categories.value = await api.getCategories();
        } catch (err) {
            console.error("Error al cargar categorías:", err);
        }
    };

    // Crear producto
  const createProduct = async (productData) => {
    loading.value = true
    error.value = null
    try {
      const newProduct = await api.createProduct(productData)
      products.value.push(newProduct)
      return newProduct
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

    return {
        products,
        categories,
        loading,
        error,
        createProduct, 
        fetchProducts,
        fetchCategories
    };
}
