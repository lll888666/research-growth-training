<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { riskIdentificationQuestions } from '../../data/levelQuestionBanks'
import { evaluateRiskIdentification } from '../../services/gameEngine'
import { useTrainingStore } from '../../stores/training'

const store = useTrainingStore()
const router = useRouter()
const question = riskIdentificationQuestions[0]

const selectedIndex = ref<number | null>(null)
const result = ref<ReturnType<typeof evaluateRiskIdentification> | null>(null)

const disabledSubmit = computed(() => selectedIndex.value === null)

function submit() {
  if (selectedIndex.value === null) return
  result.value = evaluateRiskIdentification(selectedIndex.value, question)
  store.submitLevelResult('risk-identification', result.value)
}
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">LEVEL EXECUTION</p>
        <h2>关卡 1：风险识别训练</h2>
      </div>
      <span class="badge current">阶段提示：先识别风险再执行任务</span>
    </header>

    <div class="level-target">
      <strong>训练目标</strong>
      <p>识别当前任务中最可能影响结果可信度的关键风险点。</p>
    </div>

    <section class="mission-zone">
      <p class="stage-goal">任务指令：{{ question.prompt }}</p>

      <div class="card-list">
        <button
          v-for="(option, idx) in question.options"
          :key="option"
          class="option-card mission-option"
          :class="{ active: selectedIndex === idx }"
          @click="selectedIndex = idx"
        >
          {{ idx + 1 }}. {{ option }}
        </button>
      </div>

      <div class="action-row">
        <button class="btn-primary" :disabled="disabledSubmit" @click="submit">提交判定</button>
        <button class="btn-secondary" @click="router.push('/map')">返回地图</button>
        <button class="btn-secondary" @click="router.push('/summary')">查看阶段总结</button>
      </div>
    </section>

    <article v-if="result" class="feedback" :class="result.passed ? 'ok' : 'warn'">
      <h4>{{ result.feedbackTitle }}（{{ result.score }}/{{ result.maxScore }}）</h4>
      <p v-for="line in result.feedbackDetails" :key="line" style="margin-top: 6px">{{ line }}</p>
    </article>
  </section>
</template>
