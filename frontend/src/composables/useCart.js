import { ref, computed } from 'vue'

export function useCart() {
    // Estado del carrito
    const cartItems = ref([])

    // Cargar carrito desde localStorage al iniciar
    const loadCart = () => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            cartItems.value = JSON.parse(saved)
        }
    }

    // Guardar carrito en localStorage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }

    // Agregar producto al carrito
    const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id)

        if (existingItem) {
            // Si ya existe, incrementar cantidad
            existingItem.quantity += 1
        } else {
            // Si no existe, agregar nuevo item
            cartItems.value.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                stock: product.stock,
                quantity: 1
            })
        }

        saveCart()
    }

    // Quitar producto del carrito
    const removeFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
        saveCart()
    }

    // Actualizar cantidad de un producto
    const updateQuantity = (productId, quantity) => {
        const item = cartItems.value.find(item => item.id === productId)

        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else if (quantity <= item.stock) {
                item.quantity = quantity
                saveCart()
            } else {
                alert(`⚠️ Solo hay ${item.stock} unidades disponibles`)
            }
        }
    }

    // Incrementar cantidad
    const incrementQuantity = (productId) => {
        const item = cartItems.value.find(item => item.id === productId)
        if (item && item.quantity < item.stock) {
            item.quantity += 1
            saveCart()
        } else {
            alert('⚠️ No hay más stock disponible')
        }
    }

    // Decrementar cantidad
    const decrementQuantity = (productId) => {
        const item = cartItems.value.find(item => item.id === productId)
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1
                saveCart()
            } else {
                removeFromCart(productId)
            }
        }
    }

    // Limpiar carrito completo
    const clearCart = () => {
        cartItems.value = []
        saveCart()
    }

    // Total de items (computed)
    const totalItems = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Total en dinero (computed)
    const totalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    })

    // Verificar si el carrito está vacío (computed)
    const isEmpty = computed(() => cartItems.value.length === 0)

    // Cargar carrito al crear el composable
    loadCart()

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isEmpty,
        loadCart
    }
}