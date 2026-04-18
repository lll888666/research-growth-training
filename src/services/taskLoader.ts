import { defaultTask } from '../data/topicMock'
import type { StageKey, TrainingTask } from '../types'

const stageSet = new Set<StageKey>([
  'risk-identification',
  'paper-select',
  'experiment-design',
  'academic-writing'
])

function normalizeLevel(stageRaw: string | null): StageKey | null {
  if (!stageRaw) {
    return null
  }

  const normalized = stageRaw.trim()

  if (normalized === 'topic-focus') {
    return 'risk-identification'
  }

  return stageSet.has(normalized as StageKey) ? (normalized as StageKey) : null
}

export function loadTaskFromInput(search: string): TrainingTask {
  const params = new URLSearchParams(search)

  const topic = params.get('topic')?.trim()
  const keywordsRaw = params.get('keywords')?.trim()
  const currentStageRaw = params.get('current_stage')?.trim() ?? null
  const legacyLevelRaw = params.get('level')?.trim() ?? null
  const taskTitle = params.get('task_title')?.trim()
  const taskDesc = params.get('task_desc')?.trim()

  const level = normalizeLevel(currentStageRaw || legacyLevelRaw)

  if (!topic && !keywordsRaw && !level && !taskTitle && !taskDesc) {
    return defaultTask
  }

  return {
    topic: topic || defaultTask.topic,
    keywords: keywordsRaw
      ? keywordsRaw
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : defaultTask.keywords,
    level: level || defaultTask.level,
    taskTitle: taskTitle || defaultTask.taskTitle,
    taskDesc: taskDesc || defaultTask.taskDesc
  }
}
