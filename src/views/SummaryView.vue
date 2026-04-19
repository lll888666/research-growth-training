<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { stageLabels } from '../data/topicMock'
import { useTrainingStore } from '../stores/training'
import ResultExportPanel from '../components/ResultExportPanel.vue'
import { navigateByStage } from '../utils/taskImport'

const store = useTrainingStore()
const router = useRouter()

const report = computed(() => store.summary)
const totalScore = computed(() => store.totalScore)
const completedCount = computed(() => store.completedCount)
const resultJson = computed(() => store.resultJson)
const currentStage = computed(() => store.task?.level ?? null)
const isCurrentStageCompleted = computed(() => {
  if (!currentStage.value) return false
  return store.completed[currentStage.value]
})
const summaryHint = computed(() => {
  if (!currentStage.value) {
    return '当前尚未载入训练任务，以下展示的是默认暂存结果。'
  }
  if (!isCurrentStageCompleted.value) {
    return '当前阶段尚未完成，以下为暂存结果。完成关卡后可生成正式阶段总结。'
  }
  return '当前阶段已完成，可导出训练结果 JSON 回传智能体。'
})

function generateReport() {
  store.generateSummary()
}

function goHome() {
  router.push('/')
}

function continueTraining() {
  if (!currentStage.value) {
    goHome()
    return
  }
  navigateByStage(router, currentStage.value)
}

onMounted(() => {
  if (!store.resultJson) {
    store.refreshResultJson()
  }
})
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">STAGE REVIEW</p>
        <h2>阶段总结</h2>
      </div>
      <span class="badge" :class="isCurrentStageCompleted ? 'done' : 'locked'">
        {{ isCurrentStageCompleted ? '阶段已完成' : '阶段进行中' }}
      </span>
    </header>
    <p class="section-desc">{{ summaryHint }}</p>

    <div class="metric-strip summary-strip">
      <div class="metric-card">
        <span>已完成训练</span>
        <strong>{{ completedCount }}/4</strong>
      </div>
      <div class="metric-card">
        <span>得分</span>
        <strong>{{ totalScore }}</strong>
      </div>
    </div>

    <div class="action-row">
      <button class="btn-primary" @click="generateReport">生成阶段总结</button>
      <button class="btn-secondary" @click="continueTraining">继续训练</button>
      <button class="btn-secondary" @click="router.push('/map')">返回任务地图</button>
      <button class="btn-secondary" @click="goHome">返回首页</button>
    </div>

    <article v-if="report" class="feedback" style="margin-top: 18px">
      <h3 style="margin-bottom: 12px">训练阶段报告</h3>
      <div class="meta-list compact">
        <div class="meta-item">
          <label>当前主题</label>
          <p>{{ report.topic }}</p>
        </div>
        <div class="meta-item">
          <label>当前阶段</label>
          <p>{{ stageLabels[report.currentStage] }}</p>
        </div>
        <div class="meta-item">
          <label>已完成训练</label>
          <p>{{ report.completedLevels }} / 4</p>
        </div>
        <div class="meta-item">
          <label>得分</label>
          <p>{{ totalScore }}</p>
        </div>
        <div class="meta-item">
          <label>能力评价</label>
          <p>{{ report.abilityRating }}</p>
        </div>
        <div class="meta-item">
          <label>下一步建议</label>
          <p>{{ report.nextDirection }}</p>
        </div>
        <div class="meta-item">
          <label>训练建议</label>
          <ul style="margin: 8px 0 0 18px; padding: 0; line-height: 1.6">
            <li v-for="tip in report.suggestions" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </article>
  </section>

  <ResultExportPanel :result-json="resultJson" />
</template>
