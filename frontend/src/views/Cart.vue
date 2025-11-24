<template>
  <div class="cart-container">
    <h1>🛒 Mi Carrito de Compras</h1>

    <!-- Carrito vacío -->
    <div v-if="isEmpty" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Tu carrito está vacío</h2>
      <p>¡Agrega algunos productos para empezar a comprar!</p>
      <router-link to="/" class="btn btn-primary"> Ver Productos </router-link>
    </div>

    <!-- Carrito con productos -->
    <div v-else class="cart-content">
      <!-- Lista de items -->
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <!-- Imagen -->
          <div class="item-image">
            <img :src="item.imageUrl" :alt="item.name" />
          </div>

          <!-- Info del producto -->
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price.toFixed(2) }} c/u</p>
            <p class="item-stock">Stock disponible: {{ item.stock }}</p>
          </div>

          <!-- Controles de cantidad -->
          <div class="item-quantity">
            <button
              @click="decrementQuantity(item.id)"
              class="btn-qty"
              :disabled="item.quantity <= 1"
            >
              -
            </button>

            <input
              type="number"
              :value="item.quantity"
              @input="updateQuantity(item.id, parseInt($event.target.value))"
              min="1"
              :max="item.stock"
              class="qty-input"
            />

            <button
              @click="incrementQuantity(item.id)"
              class="btn-qty"
              :disabled="item.quantity >= item.stock"
            >
              +
            </button>
          </div>

          <!-- Subtotal -->
          <div class="item-subtotal">
            <p class="subtotal-label">Subtotal:</p>
            <p class="subtotal-price">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>

          <!-- Botón eliminar -->
          <button
            @click="confirmRemove(item)"
            class="btn-remove"
            title="Eliminar del carrito"
          >
            🗑️
          </button>
        </div>
      </div>

      <!-- Resumen del pedido -->
      <div class="cart-summary">
        <h2>Resumen del Pedido</h2>

        <div class="summary-row">
          <span>Items totales:</span>
          <span>{{ totalItems }}</span>
        </div>

        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
          <span>Envío:</span>
          <span>$5.00</span>
        </div>

        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ (totalPrice + 5).toFixed(2) }}</span>
        </div>

        <button class="btn btn-checkout">Proceder al Pago 💳</button>

        <button @click="confirmClearCart" class="btn btn-secondary">
          Vaciar Carrito
        </button>

        <router-link to="/" class="btn btn-link">
          ← Continuar Comprando
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from "../composables/useCart";

const {
  cartItems,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  totalItems,
  totalPrice,
  isEmpty,
} = useCart();

// Confirmar eliminación de un item
const confirmRemove = (item) => {
  if (confirm(`¿Seguro que quieres eliminar "${item.name}" del carrito?`)) {
    removeFromCart(item.id);
  }
};

// Confirmar vaciar carrito completo
const confirmClearCart = () => {
  if (confirm("¿Seguro que quieres vaciar todo el carrito?")) {
    clearCart();
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

/* Carrito vacío */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart h2 {
  color: #666;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #999;
  margin-bottom: 2rem;
}

/* Carrito con contenido */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

/* Items del carrito */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.item-price {
  font-size: 1.2rem;
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.item-stock {
  font-size: 0.85rem;
  color: #666;
}

/* Controles de cantidad */
.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-qty {
  width: 35px;
  height: 35px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-qty:hover:not(:disabled) {
  background: #3498db;
  color: white;
}

.btn-qty:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-input {
  width: 60px;
  height: 35px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
}

.qty-input:focus {
  outline: none;
  border-color: #3498db;
}

/* Subtotal */
.item-subtotal {
  text-align: right;
  min-width: 100px;
}

.subtotal-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.subtotal-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
}

/* Botón eliminar */
.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.btn-remove:hover {
  background: #c0392b;
  transform: scale(1.1);
}

/* Resumen del pedido */
.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-summary h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}

.summary-row.total {
  border-top: 2px solid #2c3e50;
  border-bottom: none;
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 1rem;
  padding-top: 1rem;
}

/* Botones */
.btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  text-decoration: none;
  display: block;
  text-align: center;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-checkout {
  background-color: #27ae60;
  color: white;
}

.btn-checkout:hover {
  background-color: #229954;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #e74c3c;
  color: white;
}

.btn-secondary:hover {
  background-color: #c0392b;
}

.btn-link {
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-link:hover {
  background-color: #3498db;
  color: white;
}

/* Responsive */
@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-quantity,
  .item-subtotal,
  .btn-remove {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .item-quantity {
    justify-self: start;
  }

  .item-subtotal {
    justify-self: end;
  }
}
</style>
