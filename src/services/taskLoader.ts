import { defaultTask } from '../data/topicMock'
import type { TrainingTask } from '../types'
import {
  normalizeStageFromInput,
  parseTaskFromDataParam,
  type TaskParseResult
} from '../utils/taskParser'

export interface TaskLoadResult {
  task: TrainingTask
  error: string | null
  imported: boolean
  hasDataParam: boolean
}

function buildTaskFromQuery(search: string): TaskParseResult {
  const params = new URLSearchParams(search)

  const topic = params.get('topic')?.trim()
  const keywordsRaw = params.get('keywords')?.trim()
  const currentStageRaw = params.get('current_stage')?.trim() ?? null
  const legacyLevelRaw = params.get('level')?.trim() ?? null
  const taskTitle = params.get('task_title')?.trim()
  const taskDesc = params.get('task_desc')?.trim()

  const level = normalizeStageFromInput(currentStageRaw || legacyLevelRaw)

  if (!topic && !keywordsRaw && !level && !taskTitle && !taskDesc) {
    return { task: null, error: null }
  }

  return {
    task: {
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
    },
    error: null
  }
}

export function loadTaskWithMeta(search: string): TaskLoadResult {
  const params = new URLSearchParams(search)
  const data = params.get('data')

  if (data) {
    const parsed = parseTaskFromDataParam(data)
    return {
      task: parsed.task || defaultTask,
      error: parsed.error,
      imported: !!parsed.task,
      hasDataParam: true
    }
  }

  const queryTask = buildTaskFromQuery(search)

  if (queryTask.task) {
    return { task: queryTask.task, error: null, imported: true, hasDataParam: false }
  }

  return {
    task: defaultTask,
    error: null,
    imported: false,
    hasDataParam: false
  }
}

export function loadTaskFromInput(search: string): TrainingTask {
  return loadTaskWithMeta(search).task
}
