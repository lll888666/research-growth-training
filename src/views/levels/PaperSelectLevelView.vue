<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { paperSelectionQuestion } from '../../data/paperSelectionMock'
import { evaluatePaperSelection } from '../../services/gameEngine'
import { useTrainingStore } from '../../stores/training'

const store = useTrainingStore()
const router = useRouter()

const selectedIds = ref<string[]>([])
const result = ref<ReturnType<typeof evaluatePaperSelection> | null>(null)

const canSubmit = computed(() => selectedIds.value.length === paperSelectionQuestion.requiredCount)

function toggleSelection(id: string) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
    return
  }
  if (selectedIds.value.length < paperSelectionQuestion.requiredCount) {
    selectedIds.value = [...selectedIds.value, id]
  }
}

function submit() {
  result.value = evaluatePaperSelection(selectedIds.value, paperSelectionQuestion)
  store.submitLevelResult('paper-select', result.value)
}
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">LEVEL EXECUTION</p>
        <h2>关卡 2：文献识别</h2>
      </div>
      <span class="badge current">阶段提示：相关性筛选</span>
    </header>

    <div class="level-target">
      <strong>训练目标</strong>
      <p>识别最相关证据文献，建立“主题-方法-结论”的筛选意识。</p>
    </div>

    <section class="mission-zone">
      <p class="stage-goal">任务指令：{{ paperSelectionQuestion.prompt }}</p>

      <div class="card-list">
        <article
          v-for="paper in paperSelectionQuestion.papers"
          :key="paper.id"
          class="option-card mission-option"
          :class="{ active: selectedIds.includes(paper.id) }"
          @click="toggleSelection(paper.id)"
        >
          <h3 style="font-size: 1rem">{{ paper.title }}</h3>
          <p style="margin-top: 8px; color: var(--text-muted); line-height: 1.5">{{ paper.abstract }}</p>
        </article>
      </div>

      <p class="stage-goal">已选择 {{ selectedIds.length }} / {{ paperSelectionQuestion.requiredCount }}</p>

      <div class="action-row">
        <button class="btn-primary" :disabled="!canSubmit" @click="submit">提交判定</button>
        <button class="btn-secondary" @click="router.push('/map')">返回地图</button>
        <button class="btn-secondary" @click="router.push('/summary')">查看阶段总结</button>
      </div>
    </section>

    <article v-if="result" class="feedback" :class="result.passed ? 'ok' : 'warn'">
      <h4>{{ result.feedbackTitle }}（{{ result.score }}/{{ result.maxScore }}）</h4>
      <p v-for="line in result.feedbackDetails" :key="line" style="margin-top: 8px">{{ line }}</p>
    </article>
  </section>
</template>
