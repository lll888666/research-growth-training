<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainingStore } from '../stores/training'
import { stageLabels } from '../data/topicMock'

const store = useTrainingStore()
const router = useRouter()

const task = computed(() => store.task)
const completedCount = computed(() => store.completedCount)
const currentScore = computed(() => store.totalScore)
const progressPercent = computed(() => `${Math.round((completedCount.value / 4) * 100)}%`)
</script>

<template>
  <section class="grid-two">
    <article class="panel training-hero">
      <div class="section-head">
        <p class="brand-sub">TASK RECEIVER</p>
        <h2>科研成长任务训练站</h2>
      </div>

      <p class="section-desc">
        本站用于接收智能体平台下发任务，并执行对应训练关卡。本站不负责选题分析、关键词提炼或科研路线决策。
      </p>

      <div class="metric-strip" v-if="task">
        <div class="metric-card">
          <span>当前阶段</span>
          <strong>{{ stageLabels[task.level] }}</strong>
        </div>
        <div class="metric-card">
          <span>当前进度</span>
          <strong>{{ completedCount }}/4</strong>
        </div>
        <div class="metric-card">
          <span>当前得分</span>
          <strong>{{ currentScore }}</strong>
        </div>
      </div>

      <div class="progress-track">
        <div class="progress-value" :style="{ width: progressPercent }"></div>
      </div>

      <div class="action-row">
        <button class="btn-primary" @click="router.push('/map')">开始训练</button>
        <button class="btn-secondary" @click="router.push('/summary')">完成本阶段训练后查看总结</button>
      </div>
    </article>

    <article class="panel mission-panel" v-if="task">
      <div class="panel-headline">
        <h3>任务接收信息</h3>
        <span class="badge current">平台任务已接收</span>
      </div>

      <div class="meta-list compact">
        <div class="meta-item">
          <label>当前主题</label>
          <p>{{ task.topic }}</p>
        </div>
        <div class="meta-item">
          <label>当前阶段</label>
          <p>{{ stageLabels[task.level] }}</p>
        </div>
        <div class="meta-item">
          <label>当前任务名称</label>
          <p>{{ task.taskTitle }}</p>
        </div>
        <div class="meta-item">
          <label>当前关键词</label>
          <div class="keywords">
            <span class="keyword" v-for="word in task.keywords" :key="word">{{ word }}</span>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
