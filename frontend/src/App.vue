<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="brand">🛒 MercApp</router-link>
        <div class="nav-links">
          <router-link to="/">Inicio</router-link>
          <router-link to="/product/new">Nuevo Producto</router-link>
          <router-link to="/cart" class="cart-link">
            Carrito 🛒
            <span v-if="totalItems > 0" class="cart-badge">{{
              totalItems
            }}</span>
          </router-link>
          <router-link to="/about">Acerca de</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div class="loading">Cargando...</div>
        </template>
      </Suspense>
    </main>

    <footer class="footer">
      <p>&copy; 2024 MercApp - Tu tienda en línea</p>
    </footer>
  </div>
</template>

<script setup>
import { useCart } from "./composables/useCart";

const { totalItems } = useCart();
</script>

<style>
.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}
</style>
