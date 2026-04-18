<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useTrainingStore } from './stores/training'
import { stageLabels } from './data/topicMock'

const route = useRoute()
const store = useTrainingStore()

const currentStageLabel = computed(() => {
  const level = store.task?.level
  return level ? stageLabels[level] : '-'
})

const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <header class="top-nav">
      <div>
        <p class="brand-sub">AGENT-INVOKED TRAINING MODULE</p>
        <h1>research-growth-training</h1>
      </div>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/map">任务地图</RouterLink>
        <RouterLink to="/summary">阶段总结</RouterLink>
      </nav>
    </header>

    <main class="page-wrap">
      <section v-if="!isHome" class="task-chip">
        <span>当前阶段</span>
        <strong>{{ currentStageLabel }}</strong>
      </section>
      <RouterView />
    </main>
  </div>
</template>
