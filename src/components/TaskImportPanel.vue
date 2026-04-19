<script setup lang="ts">
import { ref } from 'vue'
import type { TrainingTask } from '../types'
import { parseTrainingTask } from '../utils/taskImport'

const emit = defineEmits<{
  imported: [task: TrainingTask]
}>()

const jsonInput = ref('')
const error = ref('')
const success = ref('')

function parseTask() {
  const result = parseTrainingTask(jsonInput.value, 'manual')

  if (!result.task || result.error) {
    error.value = result.error || '任务 JSON 格式错误，请检查后重试。'
    success.value = ''
    return
  }

  emit('imported', result.task)
  error.value = ''
  success.value = '训练任务解析成功，已导入当前训练站。'
}

function clearInput() {
  jsonInput.value = ''
  error.value = ''
  success.value = ''
}
</script>

<template>
  <section class="panel import-panel">
    <div class="panel-headline">
      <h3>手动导入训练任务</h3>
      <span class="badge">JSON 导入</span>
    </div>
    <p class="section-desc">若你是从智能体进入训练站，也可以将任务 JSON 粘贴到此处手动开始训练。</p>

    <textarea
      v-model="jsonInput"
      class="task-textarea"
      rows="8"
      placeholder='{
  "topic": "",
  "keywords": [""],
  "current_stage": "risk-identification",
  "task_title": "",
  "task_desc": ""
}'
    />

    <div class="action-row" style="margin-top: 10px">
      <button class="btn-primary" @click="parseTask">开始训练</button>
      <button class="btn-secondary" @click="clearInput">清空</button>
    </div>

    <p v-if="error" class="hint-error">{{ error }}</p>
    <p v-if="success" class="hint-success">{{ success }}</p>
  </section>
</template>
