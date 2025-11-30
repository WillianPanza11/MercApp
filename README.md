# MercApp
LINK GITHUB: https://github.com/WillianPanza11/MercApp.git


# PARA EJECUTAR EL PROYECTO
1. Ingresar a la carpeta: mercAppUnidad3\backend
2. ejecutar: npm run dev
4. Ingresar a la carpeta: mercAppUnidad3\frontend
5. ejecutar: npm run dev
6. probar las funcionalidades desarrolladas

# 🛒 MercApp - Catálogo de Productos SPA

Aplicación web de una sola página (SPA) para gestión de catálogo de productos con carrito de compras, desarrollada como proyecto académico de la asignatura Aplicaciones Web.

---

## 👨‍💻 Información del Estudiante

- **Nombre:** Willian Panza
- **Universidad:** Universidad Politécnica Salesiana
- **Carrera:** Ingeniería en Desarrollo de Software
- **Asignatura:** Aplicaciones Web
- **Proyecto:** Tarea Unidad 3 - Programación del lado del cliente

---

## 📋 Descripción del Proyecto

MercApp es una aplicación web completa que incluye:

- **Backend:** API REST desarrollada con Node.js y Express
- **Frontend:** Single Page Application desarrollada con Vue 3 (Composition API)
- **Persistencia:** Almacenamiento en archivo JSON y localStorage

El proyecto implementa un sistema completo de e-commerce con funcionalidades de catálogo de productos, búsqueda, filtros, gestión de productos (CRUD) y carrito de compras.

---

## 🚀 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- CORS
- File System (fs) para persistencia
- nodemon (desarrollo)

### Frontend
- Vue 3 (Composition API)
- Vue Router 4
- Vite (build tool)
- JavaScript ES6+
- CSS3
- HTML5

### Herramientas
- Git & GitHub
- npm (gestor de paquetes)
- VS Code

---

## ✨ Funcionalidades Implementadas

### 🔹 Backend (API REST)

**Endpoints de Productos:**
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto existente
- `DELETE /api/products/:id` - Eliminar producto

**Endpoints de Categorías:**
- `GET /api/categories` - Listar todas las categorías

**Características:**
- ✅ Validación de datos de entrada
- ✅ Manejo de errores (400/404/500)
- ✅ CORS configurado
- ✅ Persistencia en archivo JSON
- ✅ Datos semilla (8-12 productos, 3-5 categorías)

### 🔹 Frontend (Vue 3 SPA)

**Páginas/Vistas:**
- **Home (/)** - Catálogo de productos con búsqueda y filtros
- **Detalle de Producto (/product/:id)** - Vista detallada del producto
- **Nuevo Producto (/product/new)** - Formulario de creación
- **Editar Producto (/product/:id/edit)** - Formulario de edición
- **Carrito (/cart)** - Gestión del carrito de compras
- **Acerca de (/about)** - Información de la aplicación
- **404** - Página de error para rutas no encontradas

**Características Principales:**

✅ **Sistema de Búsqueda y Filtros**
- Búsqueda por nombre y descripción
- Filtro por categoría
- Contador de resultados
- Propiedades computadas para filtrado reactivo

✅ **Gestión de Productos (CRUD)**
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Validación de formularios completa

✅ **Carrito de Compras**
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia en localStorage
- Contador de items en navbar

✅ **Arquitectura**
- Componentes reutilizables (ProductCard)
- Composables para lógica reutilizable (useProducts, useCart)
- Servicios API centralizados
- Vue Router con lazy loading
- Props y eventos personalizados
- Suspense para estados de carga

✅ **Validaciones**
- Nombre obligatorio (min 3 caracteres)
- Precio > 0
- Stock ≥ 0
- Categoría obligatoria
- URL de imagen válida
- Feedback visual de errores

✅ **Responsive Design**
- Mobile-first approach
- Grid adaptativo
- Navegación responsive

---

## 📦 Estructura del Proyecto