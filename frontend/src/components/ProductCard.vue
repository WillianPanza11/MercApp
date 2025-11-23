<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>

      <div class="product-details">
        <span class="product-price">${{ product.price.toFixed(2) }}</span>
        <span
          class="product-stock"
          :class="{ 'low-stock': product.stock < 10 }"
        >
          Stock: {{ product.stock }}
        </span>
      </div>

      <div class="product-actions">
        <router-link :to="`/product/${product.id}`" class="btn btn-primary">
          Ver Detalle
        </router-link>

        <button
          @click="addToCart"
          class="btn btn-success"
          :disabled="product.stock === 0"
        >
          {{ product.stock === 0 ? "Sin Stock" : "Añadir 🛒" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import './ProductCard.css'
// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Emits (evento personalizado)
const emit = defineEmits(["added-to-cart"]);

// Método para añadir al carrito
const addToCart = () => {
  emit("added-to-cart", props.product);
};
</script>
