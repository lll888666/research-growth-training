<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { stageLabels } from '../data/topicMock'
import { useTrainingStore } from '../stores/training'

const store = useTrainingStore()
const router = useRouter()

const report = computed(() => store.summary)
const totalScore = computed(() => store.totalScore)
const completedCount = computed(() => store.completedCount)

function generateReport() {
  store.generateSummary()
}
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">STAGE REVIEW</p>
        <h2>阶段总结</h2>
      </div>
      <span class="badge current">完成本阶段训练</span>
    </header>

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
      <button class="btn-secondary" @click="router.push('/map')">返回任务地图</button>
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
</template>
