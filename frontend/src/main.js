import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Importar el router
import router from './router'

const app = createApp(App)

// Usar el router en la aplicación
app.use(router)
app.mount('#app')
