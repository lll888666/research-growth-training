<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { writingCorrectionItems } from '../../data/writingCorrectionMock'
import { evaluateAcademicWriting } from '../../services/gameEngine'
import { useTrainingStore } from '../../stores/training'

const store = useTrainingStore()
const router = useRouter()

const selected = ref<number[]>(Array.from({ length: writingCorrectionItems.length }, () => -1))
const result = ref<ReturnType<typeof evaluateAcademicWriting> | null>(null)
const canSubmit = computed(() => selected.value.every((value) => value >= 0))

function selectOption(itemIndex: number, optionIndex: number) {
  selected.value[itemIndex] = optionIndex
}

function submit() {
  if (!canSubmit.value) return
  result.value = evaluateAcademicWriting(selected.value, writingCorrectionItems)
  store.submitLevelResult('academic-writing', result.value)
}
</script>

<template>
  <section class="panel">
    <header class="level-head">
      <div>
        <p class="brand-sub">LEVEL EXECUTION</p>
        <h2>关卡 4：学术表达训练</h2>
      </div>
      <span class="badge current">阶段提示：规范表达</span>
    </header>

    <div class="level-target">
      <strong>训练目标</strong>
      <p>将口语化描述改写为客观、规范、可证据支持的学术表达。</p>
    </div>

    <section class="mission-zone">
      <p class="stage-goal">任务指令：将不规范表达改写为更合适的科研表达。</p>

      <div class="card-list">
        <article v-for="(item, itemIdx) in writingCorrectionItems" :key="item.id" class="option-card mission-option">
          <h3 style="font-size: 1rem">原句：{{ item.raw }}</h3>

          <div class="card-list" style="margin-top: 10px">
            <button
              v-for="(option, optionIdx) in item.options"
              :key="option"
              class="option-card mission-option"
              :class="{ active: selected[itemIdx] === optionIdx }"
              @click="selectOption(itemIdx, optionIdx)"
            >
              {{ option }}
            </button>
          </div>
        </article>
      </div>

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
