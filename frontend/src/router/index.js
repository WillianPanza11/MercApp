import { createRouter, createWebHistory } from 'vue-router';

//Importar las vistas
import Home from '../views/Home.vue';

//Lazy loading de las vistas
const ProductDetail = () => import('../views/ProductDetail.vue')
const ProductForm = () => import('../views/ProductForm.vue') 

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, 
    {
        path: '/product/new',
        name: 'ProductNew',
        component: ProductForm
    }
];

//Esto agrega la ruta dinámica para el detalle del producto
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;