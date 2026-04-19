import { defaultTask } from '../data/topicMock'
import type { StageKey, TrainingTask } from '../types'

export interface TaskParseResult {
  task: TrainingTask | null
  error: string | null
}

const stageSet = new Set<StageKey>([
  'risk-identification',
  'paper-select',
  'experiment-design',
  'academic-writing'
])

function normalizeStage(stageRaw: unknown): StageKey | null {
  if (typeof stageRaw !== 'string') return null
  const normalized = stageRaw.trim()
  if (!normalized) return null

  if (normalized === 'topic-focus') {
    return 'risk-identification'
  }

  return stageSet.has(normalized as StageKey) ? (normalized as StageKey) : null
}

function parseKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

export function normalizeTaskObject(raw: unknown): TaskParseResult {
  if (!raw || typeof raw !== 'object') {
    return { task: null, error: '训练任务 JSON 格式错误，请检查后重试。' }
  }

  const source = raw as Record<string, unknown>

  const topic = typeof source.topic === 'string' ? source.topic.trim() : ''
  const taskTitle = typeof source.task_title === 'string' ? source.task_title.trim() : ''
  const taskDesc = typeof source.task_desc === 'string' ? source.task_desc.trim() : ''
  const level = normalizeStage(source.current_stage)
  const keywords = parseKeywords(source.keywords)

  const task: TrainingTask = {
    topic: topic || defaultTask.topic,
    keywords: keywords.length > 0 ? keywords : defaultTask.keywords,
    level: level || defaultTask.level,
    taskTitle: taskTitle || defaultTask.taskTitle,
    taskDesc: taskDesc || defaultTask.taskDesc
  }

  return { task, error: null }
}

export function parseTaskFromText(text: string): TaskParseResult {
  try {
    const parsed = JSON.parse(text)
    return normalizeTaskObject(parsed)
  } catch {
    return { task: null, error: '训练任务 JSON 格式错误，请检查后重试。' }
  }
}

export function parseTaskFromDataParam(dataRaw: string): TaskParseResult {
  try {
    const decoded = decodeURIComponent(dataRaw)
    const parsed = JSON.parse(decoded)
    return normalizeTaskObject(parsed)
  } catch {
    return { task: null, error: 'URL 中的训练任务解析失败，请检查 data 参数。' }
  }
}

export function normalizeStageFromInput(stageRaw: string | null): StageKey | null {
  return normalizeStage(stageRaw)
}
