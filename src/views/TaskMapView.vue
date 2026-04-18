<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { stageRouteMap } from '../data/topicMock'
import { useTrainingStore } from '../stores/training'
import type { StageKey } from '../types'

const store = useTrainingStore()
const router = useRouter()

const coreStages: Array<{ key: StageKey; title: string; goal: string }> = [
  { key: 'risk-identification', title: '关卡 1 · 风险识别训练', goal: '识别任务执行中的关键风险点' },
  { key: 'paper-select', title: '关卡 2 · 文献识别训练', goal: '筛选高相关文献并给出依据' },
  { key: 'experiment-design', title: '关卡 3 · 实验设计训练', goal: '构建可复现的实验流程' },
  { key: 'academic-writing', title: '关卡 4 · 学术表达训练', goal: '提升表达规范性与论证清晰度' }
]

const currentStage = computed(() => store.task?.level)
const completedCount = computed(() => store.completedCount)
const progressPercent = computed(() => `${Math.round((completedCount.value / coreStages.length) * 100)}%`)

function statusOf(key: StageKey) {
  if (store.completed[key]) return 'done'
  if (currentStage.value === key) return 'current'
  return 'locked'
}

function statusLabel(key: StageKey) {
  const status = statusOf(key)
  if (status === 'done') return '已完成'
  if (status === 'current') return '当前可训练'
  return '未解锁'
}

function goStage(key: StageKey) {
  if (currentStage.value === key) {
    router.push(stageRouteMap[key])
  }
}
</script>

<template>
  <section class="panel map-panel">
    <div class="map-head">
      <div>
        <h2>任务地图 · 阶段推进</h2>
        <p class="section-desc">当前阶段可进入训练，已完成关卡与未解锁关卡会在此显示状态。</p>
      </div>
      <div class="metric-card slim">
        <span>训练进度</span>
        <strong>{{ completedCount }}/4</strong>
      </div>
    </div>

    <div class="progress-track compact">
      <div class="progress-value" :style="{ width: progressPercent }"></div>
    </div>

    <div class="stage-stack">
      <article
        v-for="stage in coreStages"
        :key="stage.key"
        class="stage-card enhanced"
        :class="statusOf(stage.key)"
      >
        <div class="panel-headline">
          <h3>{{ stage.title }}</h3>
          <span class="badge" :class="statusOf(stage.key)">{{ statusLabel(stage.key) }}</span>
        </div>

        <p class="stage-goal">训练目标：{{ stage.goal }}</p>

        <div class="action-row">
          <button class="btn-secondary" :disabled="statusOf(stage.key) !== 'current'" @click="goStage(stage.key)">
            {{ statusOf(stage.key) === 'current' ? '进入训练' : '暂不可进入' }}
          </button>
        </div>
      </article>
    </div>

    <div class="action-row">
      <button class="btn-primary" @click="router.push('/summary')">查看阶段总结</button>
    </div>
  </section>
</template>
