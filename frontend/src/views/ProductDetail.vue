<template>
    <div class="product-detail">
        <div v-if="loading" class="loading">Cargando detalles del producto...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="product-info">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-details">
            <h1 class="product-name">{{ product.name }}</h1>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">Precio: ${{ product.price.toFixed(2) }}</p>
            <button @click="addToCart(product)" class="btn btn-primary">
            Agregar al Carrito 🛒
            </button>
        </div>
        </div>
    </div>
</template>

<script setup>

</script>