import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useTrainingStore } from './stores/training'
import { loadTaskFromInput } from './services/taskLoader'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const store = useTrainingStore(pinia)
store.initializeTask(loadTaskFromInput(window.location.search))

app.mount('#app')
