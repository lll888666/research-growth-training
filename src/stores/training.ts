import { defineStore } from 'pinia'
import { buildStageReport } from '../services/reportBuilder'
import type { LevelResult, StageKey, StageReport, TrainingTask } from '../types'

interface TrainingState {
  task: TrainingTask | null
  completed: Record<StageKey, boolean>
  scoreByLevel: Record<StageKey, number>
  summary: StageReport | null
}

const defaultCompleted: Record<StageKey, boolean> = {
  'risk-identification': false,
  'paper-select': false,
  'experiment-design': false,
  'academic-writing': false
}

const defaultScoreByLevel: Record<StageKey, number> = {
  'risk-identification': 0,
  'paper-select': 0,
  'experiment-design': 0,
  'academic-writing': 0
}

export const useTrainingStore = defineStore('training', {
  state: (): TrainingState => ({
    task: null,
    completed: { ...defaultCompleted },
    scoreByLevel: { ...defaultScoreByLevel },
    summary: null
  }),
  getters: {
    totalScore: (state) => Object.values(state.scoreByLevel).reduce((sum, value) => sum + value, 0),
    completedCount: (state) => Object.values(state.completed).filter(Boolean).length
  },
  actions: {
    initializeTask(task: TrainingTask) {
      this.task = task
    },
    submitLevelResult(stage: StageKey, result: LevelResult) {
      this.completed[stage] = result.passed
      this.scoreByLevel[stage] = Math.max(this.scoreByLevel[stage], result.score)
    },
    generateSummary() {
      if (!this.task) return null
      this.summary = buildStageReport(this.task, this.completedCount, this.totalScore, this.completed)
      return this.summary
    }
  }
})
