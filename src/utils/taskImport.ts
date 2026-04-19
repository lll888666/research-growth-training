import type { Router } from 'vue-router'
import { stageRouteMap } from '../data/topicMock'
import type { StageKey, TrainingTask } from '../types'
import { parseTaskFromDataParam, parseTaskFromText } from './taskParser'

export type TaskImportSource = 'url' | 'manual'

interface TrainingStoreLike {
  initializeTask: (task: TrainingTask, options?: { resetProgress?: boolean }) => void
  setImportError: (error: string | null) => void
}

export function parseTrainingTask(raw: string, source: TaskImportSource) {
  if (source === 'url') {
    return parseTaskFromDataParam(raw)
  }
  return parseTaskFromText(raw)
}

export function applyTrainingTask(store: TrainingStoreLike, task: TrainingTask) {
  store.initializeTask(task, { resetProgress: true })
  store.setImportError(null)
}

export function navigateByStage(router: Router, stage: StageKey | 'topic-focus') {
  const normalizedStage: StageKey = stage === 'topic-focus' ? 'risk-identification' : stage
  const targetRoute = stageRouteMap[normalizedStage]
  if (targetRoute) {
    return router.replace(targetRoute)
  }
  return Promise.resolve()
}
