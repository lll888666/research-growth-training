<script setup lang="ts">
import { ref } from 'vue'
import { copyText } from '../utils/clipboard'

const props = defineProps<{
  resultJson: string
}>()

const copyMessage = ref('')

async function copyResult() {
  if (!props.resultJson) {
    copyMessage.value = '当前暂无可复制的结果 JSON。'
    return
  }

  const result = await copyText(props.resultJson)
  copyMessage.value = result.message
}
</script>

<template>
  <section class="panel export-panel">
    <div class="panel-headline">
      <h3>训练结果 JSON</h3>
      <span class="badge current">可回传智能体</span>
    </div>

    <p class="section-desc">请将以下训练结果 JSON 复制回智能体，以继续下一阶段科研成长训练。</p>

    <textarea class="task-textarea" rows="12" :value="resultJson" readonly />

    <div class="action-row" style="margin-top: 10px">
      <button class="btn-primary" @click="copyResult">复制结果 JSON</button>
    </div>

    <p v-if="copyMessage" class="hint-success">{{ copyMessage }}</p>
  </section>
</template>
