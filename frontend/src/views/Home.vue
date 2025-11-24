<template>
  <div class="home">
    <h1>Catálogo de Productos</h1>

    <!-- Sección de filtros -->
    <div class="filters">
      <!-- Buscador -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Buscar productos..."
          class="search-input"
        />
      </div>

      <!-- Filtro por categoría -->
      <div class="filter-box">
        <select v-model="selectedCategory" class="category-select">
          <option value="">📂 Todas las categorías</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Contador de resultados -->
      <div class="results-info">
        Mostrando {{ filteredProducts.length }} de
        {{ products.length }} productos
      </div>
    </div>

    <!-- Estados de carga/error -->
    <div v-if="loading" class="loading">
      <p>⏳ Cargando productos...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
      <button @click="loadData" class="btn-retry">Reintentar</button>
    </div>

    <!-- Lista vacía -->
    <div v-else-if="filteredProducts.length === 0" class="empty-state">
      <p>😕 No se encontraron productos</p>
      <button @click="clearFilters" class="btn-clear">Limpiar filtros</button>
    </div>

    <!-- Grid de productos -->
    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @added-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProducts } from "../composables/useProducts";
import ProductCard from "../components/ProductCard.vue";
import { useCart } from "../composables/useCart";

// Composable, esto se obtiene de frontend/src/composables/useProducts.js
const { products, categories, loading, error, fetchProducts, fetchCategories } =
  useProducts();

const { addToCart } = useCart()

// Manejar evento de añadir al carrito (ACTUALIZADO)
const handleAddToCart = (product) => {
  addToCart(product)
  alert(`✅ ${product.name} añadido al carrito`)
}

// Estados reactivos para filtros
const searchQuery = ref("");
const selectedCategory = ref("");

// Propiedad computada para filtrar productos (Tarea 6)
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filtrar por búsqueda (nombre o descripción)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Filtrar por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (product) => product.categoryId === parseInt(selectedCategory.value)
    );
  }

  return filtered;
});

// Cargar datos al montar el componente
const loadData = async () => {
  await fetchProducts();
  await fetchCategories();
};

onMounted(() => {
  loadData();
});

// Limpiar filtros
const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
};

/*

// Manejar evento de añadir al carrito (Tarea 7)
const handleAddToCart = (product) => {
  Obtener carrito actual del localStorage
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  Buscar si el producto ya está en el carrito
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  Guardar en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  Feedback visual
  alert(`✅ ${product.name} añadido al carrito`);
};
*/
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.filters {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.search-box,
.filter-box {
  width: 100%;
}

.search-input,
.category-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus,
.category-select:focus {
  outline: none;
  border-color: #3498db;
}

.results-info {
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading p {
  font-size: 1.2rem;
  color: #3498db;
}

.error p {
  font-size: 1.1rem;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.btn-retry,
.btn-clear {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-retry:hover,
.btn-clear:hover {
  background-color: #2980b9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
