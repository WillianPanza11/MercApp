<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="brand">🛒 MercApp</router-link>
        <div class="nav-links">
          <router-link to="/">Inicio</router-link>
          <router-link to="/product/new">Nuevo Producto</router-link>
          <router-link to="/cart">Carrito 🛒</router-link>
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
// No se necesita lógica adicional aquí por ahora
</script>

<style>

</style>