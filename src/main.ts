import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useTrainingStore } from './stores/training'
import { loadTaskWithMeta } from './services/taskLoader'
import { applyTrainingTask, navigateByStage } from './utils/taskImport'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const store = useTrainingStore(pinia)
store.restoreState()

const loaded = loadTaskWithMeta(window.location.search)

if (loaded.imported || loaded.hasDataParam || !store.task) {
  applyTrainingTask(store, loaded.task)
}

store.setImportError(loaded.error)

app.mount('#app')

if (loaded.imported) {
  router.isReady().then(() => navigateByStage(router, loaded.task.level))
}
