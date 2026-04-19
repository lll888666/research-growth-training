import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useTrainingStore } from './stores/training'
import { loadTaskWithMeta } from './services/taskLoader'
import { stageRouteMap } from './data/topicMock'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const store = useTrainingStore(pinia)
store.restoreState()

const loaded = loadTaskWithMeta(window.location.search)

if (loaded.imported || loaded.hasDataParam || !store.task) {
  store.initializeTask(loaded.task, { resetProgress: loaded.imported || loaded.hasDataParam })
}

store.setImportError(loaded.error)

app.mount('#app')

if (loaded.imported) {
  const targetRoute = stageRouteMap[loaded.task.level]
  if (targetRoute) {
    router.isReady().then(() => {
      router.replace(targetRoute)
    })
  }
}
