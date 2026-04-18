<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { experimentDesignQuestion } from '../../data/experimentDesignMock'
import { evaluateExperimentDesign } from '../../services/gameEngine'
import { useTrainingStore } from '../../stores/training'

const store = useTrainingStore()
const router = useRouter()

const selectedId = ref<string>('')
const result = ref<ReturnType<typeof evaluateExperimentDesign> | null>(null)

function submit() {
  if (!selectedId.value) return
  result.value = evaluateExperimentDesign(selectedId.value, experimentDesignQuestion)
  store.submitLevelResult('experiment-design', result.value)
}
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">LEVEL EXECUTION</p>
        <h2>关卡 3：实验设计</h2>
      </div>
      <span class="badge current">阶段提示：可复现设计</span>
    </header>

    <div class="level-target">
      <strong>训练目标</strong>
      <p>确保实验包含 baseline、评价指标、控制变量和可解释结论。</p>
    </div>

    <section class="mission-zone">
      <p class="stage-goal">任务指令：{{ experimentDesignQuestion.scenario }}</p>

      <div class="card-list">
        <article
          v-for="option in experimentDesignQuestion.options"
          :key="option.id"
          class="option-card mission-option"
          :class="{ active: selectedId === option.id }"
          @click="selectedId = option.id"
        >
          <h3 style="font-size: 1rem">{{ option.title }}</h3>
          <p style="margin-top: 8px; color: var(--text-muted); line-height: 1.5">{{ option.design }}</p>
        </article>
      </div>

      <div class="action-row">
        <button class="btn-primary" :disabled="!selectedId" @click="submit">提交判定</button>
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
