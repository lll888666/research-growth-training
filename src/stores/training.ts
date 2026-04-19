import { defineStore } from 'pinia'
import { stageLabels } from '../data/topicMock'
import { buildStageReport } from '../services/reportBuilder'
import { buildTrainingResult, stringifyTrainingResult } from '../utils/resultBuilder'
import type { LevelResult, StageKey, StageReport, TrainingTask } from '../types'

interface TrainingState {
  task: TrainingTask | null
  completed: Record<StageKey, boolean>
  scoreByLevel: Record<StageKey, number>
  weakPointCounts: Record<StageKey, number>
  abilityRating: 'beginner' | 'intermediate' | 'advanced'
  summary: StageReport | null
  resultJson: string
  importError: string | null
}

interface InitializeOptions {
  resetProgress?: boolean
}

const STORAGE_KEY = 'research-growth-training-state'

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

const defaultWeakPointCounts: Record<StageKey, number> = {
  'risk-identification': 0,
  'paper-select': 0,
  'experiment-design': 0,
  'academic-writing': 0
}

function cloneRecord<T extends Record<string, number | boolean>>(target: T): T {
  return { ...target }
}

function toAbilityRating(score: number): 'beginner' | 'intermediate' | 'advanced' {
  if (score >= 80) return 'advanced'
  if (score >= 50) return 'intermediate'
  return 'beginner'
}

export const useTrainingStore = defineStore('training', {
  state: (): TrainingState => ({
    task: null,
    completed: cloneRecord(defaultCompleted),
    scoreByLevel: cloneRecord(defaultScoreByLevel),
    weakPointCounts: cloneRecord(defaultWeakPointCounts),
    abilityRating: 'beginner',
    summary: null,
    resultJson: '',
    importError: null
  }),
  getters: {
    totalScore: (state) => Object.values(state.scoreByLevel).reduce((sum, value) => sum + value, 0),
    completedCount: (state) => Object.values(state.completed).filter(Boolean).length,
    weakPoints: (state) =>
      (Object.entries(state.weakPointCounts) as Array<[StageKey, number]>)
        .filter(([, count]) => count > 0)
        .map(([stage]) => stageLabels[stage])
  },
  actions: {
    initializeTask(task: TrainingTask, options: InitializeOptions = {}) {
      const { resetProgress = false } = options
      this.task = task
      this.importError = null

      if (resetProgress) {
        this.completed = cloneRecord(defaultCompleted)
        this.scoreByLevel = cloneRecord(defaultScoreByLevel)
        this.weakPointCounts = cloneRecord(defaultWeakPointCounts)
        this.summary = null
        this.resultJson = ''
      }

      this.abilityRating = toAbilityRating(this.totalScore)
      this.persistState()
    },
    setImportError(error: string | null) {
      this.importError = error
    },
    submitLevelResult(stage: StageKey, result: LevelResult) {
      this.completed[stage] = result.passed
      this.scoreByLevel[stage] = Math.max(this.scoreByLevel[stage], result.score)

      if (!result.passed) {
        this.weakPointCounts[stage] += 1
      }

      this.abilityRating = toAbilityRating(this.totalScore)
      this.refreshResultJson()
      this.persistState()
    },
    refreshResultJson() {
      if (!this.task) return

      const result = buildTrainingResult({
        task: this.task,
        totalScore: this.totalScore,
        completed: this.completed,
        weakPointCounts: this.weakPointCounts
      })

      this.resultJson = stringifyTrainingResult(result)
    },
    generateSummary() {
      if (!this.task) return null
      this.summary = buildStageReport(this.task, this.completedCount, this.totalScore, this.completed)
      this.refreshResultJson()
      this.persistState()
      return this.summary
    },
    persistState() {
      const payload = {
        task: this.task,
        completed: this.completed,
        scoreByLevel: this.scoreByLevel,
        weakPointCounts: this.weakPointCounts,
        abilityRating: this.abilityRating,
        summary: this.summary,
        resultJson: this.resultJson
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    },
    restoreState() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      try {
        const parsed = JSON.parse(raw) as Partial<TrainingState>

        if (parsed.task) this.task = parsed.task
        if (parsed.completed) this.completed = { ...defaultCompleted, ...parsed.completed }
        if (parsed.scoreByLevel) this.scoreByLevel = { ...defaultScoreByLevel, ...parsed.scoreByLevel }
        if (parsed.weakPointCounts) this.weakPointCounts = { ...defaultWeakPointCounts, ...parsed.weakPointCounts }
        if (parsed.abilityRating) this.abilityRating = parsed.abilityRating
        if (parsed.summary) this.summary = parsed.summary
        if (typeof parsed.resultJson === 'string') this.resultJson = parsed.resultJson
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }
})
