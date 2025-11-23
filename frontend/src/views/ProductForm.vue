<template>
  <div class="product-form-container">
    <div class="form-card">
      <h1>{{ isEditMode ? "Editar Producto" : "Nuevo Producto" }}</h1>

      <!-- Mensaje de loading -->
      <div v-if="loading" class="loading">
        <p>⏳ {{ isEditMode ? "Cargando producto..." : "Guardando..." }}</p>
      </div>

      <!-- Mensaje de error -->
      <div v-if="error" class="error-message">❌ {{ error }}</div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="product-form">
        <!-- Nombre del producto -->
        <div class="form-group">
          <label for="name" class="required">Nombre del Producto</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Ej: Laptop HP Pavilion"
            class="form-input"
            :class="{ error: errors.name }"
            @blur="validateField('name')"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea
            id="description"
            v-model="formData.description"
            placeholder="Describe el producto..."
            rows="4"
            class="form-input"
          ></textarea>
        </div>

        <!-- Precio -->
        <div class="form-group">
          <label for="price" class="required">Precio (USD)</label>
          <input
            id="price"
            v-model.number="formData.price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            class="form-input"
            :class="{ error: errors.price }"
            @blur="validateField('price')"
          />
          <span v-if="errors.price" class="error-text">{{ errors.price }}</span>
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="category" class="required">Categoría</label>
          <select
            id="category"
            v-model="formData.categoryId"
            class="form-input"
            :class="{ error: errors.categoryId }"
            @blur="validateField('categoryId')"
          >
            <option value="">-- Selecciona una categoría --</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span v-if="errors.categoryId" class="error-text">{{
            errors.categoryId
          }}</span>
        </div>

        <!-- Stock -->
        <div class="form-group">
          <label for="stock" class="required">Stock Disponible</label>
          <input
            id="stock"
            v-model.number="formData.stock"
            type="number"
            min="0"
            placeholder="0"
            class="form-input"
            :class="{ error: errors.stock }"
            @blur="validateField('stock')"
          />
          <span v-if="errors.stock" class="error-text">{{ errors.stock }}</span>
        </div>

        <!-- URL de imagen -->
        <div class="form-group">
          <label for="imageUrl">URL de la Imagen</label>
          <input
            id="imageUrl"
            v-model="formData.imageUrl"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            class="form-input"
            :class="{ error: errors.imageUrl }"
            @blur="validateField('imageUrl')"
          />
          <span v-if="errors.imageUrl" class="error-text">{{
            errors.imageUrl
          }}</span>

          <!-- Preview de imagen -->
          <div v-if="formData.imageUrl" class="image-preview">
            <img
              :src="formData.imageUrl"
              alt="Preview"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="form-actions">
          <button type="button" @click="goBack" class="btn btn-secondary">
            ← Cancelar
          </button>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ isEditMode ? "💾 Actualizar" : "➕ Crear Producto" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProducts } from "../composables/useProducts";

const router = useRouter();
const route = useRoute();

const {
  categories,
  loading,
  error,
  fetchCategories,
  fetchProduct,
  createProduct,
  updateProduct,
} = useProducts();

// Determinar si es modo edición o creación
const isEditMode = computed(() => !!route.params.id);
const productId = computed(() => route.params.id);

// Datos del formulario
const formData = reactive({
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  stock: 0,
  imageUrl: "",
});

// Errores de validación
const errors = reactive({
  name: "",
  price: "",
  categoryId: "",
  stock: "",
  imageUrl: "",
});

// Validar campo individual
const validateField = (field) => {
  // Limpiar error anterior
  errors[field] = "";

  switch (field) {
    case "name":
      if (!formData.name.trim()) {
        errors.name = "El nombre es obligatorio";
      } else if (formData.name.length < 3) {
        errors.name = "El nombre debe tener al menos 3 caracteres";
      }
      break;

    case "price":
      if (
        formData.price === null ||
        formData.price === undefined ||
        formData.price === ""
      ) {
        errors.price = "El precio es obligatorio";
      } else if (formData.price <= 0) {
        errors.price = "El precio debe ser mayor a 0";
      }
      break;

    case "categoryId":
      if (!formData.categoryId) {
        errors.categoryId = "Debes seleccionar una categoría";
      }
      break;

    case "stock":
      if (
        formData.stock === null ||
        formData.stock === undefined ||
        formData.stock === ""
      ) {
        errors.stock = "El stock es obligatorio";
      } else if (formData.stock < 0) {
        errors.stock = "El stock no puede ser negativo";
      }
      break;

    case "imageUrl":
      if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
        errors.imageUrl = "Debes ingresar una URL válida";
      }
      break;
  }
};

// Validar URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validar todo el formulario
const validateForm = () => {
  validateField("name");
  validateField("price");
  validateField("categoryId");
  validateField("stock");
  if (formData.imageUrl) {
    validateField("imageUrl");
  }

  // Verificar si hay algún error
  return !Object.values(errors).some((error) => error !== "");
};

// Manejar error de carga de imagen
const handleImageError = (e) => {
  e.target.src =
    "https://via.placeholder.com/300x200?text=Error+al+cargar+imagen";
};

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) {
    alert("⚠️ Por favor corrige los errores en el formulario");
    return;
  }

  try {
    // Si no hay imagen, usar placeholder
    if (!formData.imageUrl) {
      formData.imageUrl = "https://via.placeholder.com/300x200?text=Producto";
    }

    if (isEditMode.value) {
      // Actualizar producto existente
      await updateProduct(productId.value, formData);
      alert("✅ Producto actualizado correctamente");
    } else {
      // Crear nuevo producto
      await createProduct(formData);
      alert("✅ Producto creado correctamente");
    }

    // Redirigir al home
    router.push("/");
  } catch (err) {
    alert("❌ Error al guardar el producto: " + err.message);
  }
};

// Volver atrás
const goBack = () => {
  router.push("/");
};

// Cargar datos al montar
onMounted(async () => {
  // Cargar categorías
  await fetchCategories();

  // Si es modo edición, cargar el producto
  if (isEditMode.value) {
    const product = await fetchProduct(productId.value);
    if (product) {
      formData.name = product.name;
      formData.description = product.description;
      formData.price = product.price;
      formData.categoryId = product.categoryId;
      formData.stock = product.stock;
      formData.imageUrl = product.imageUrl;
    } else {
      alert("❌ Producto no encontrado");
      router.push("/");
    }
  }
});
</script>

<style scoped>
.product-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #3498db;
  font-size: 1.1rem;
}

.error-message {
  background: #fee;
  color: #c00;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

label.required::after {
  content: " *";
  color: #e74c3c;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.form-input.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 300px;
  max-height: 200px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .form-card {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
