export type StageKey =
  | 'risk-identification'
  | 'paper-select'
  | 'experiment-design'
  | 'academic-writing'

export interface TrainingTask {
  topic: string
  keywords: string[]
  level: StageKey
  taskTitle: string
  taskDesc: string
}

export interface RiskIdentificationQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  feedback: string[]
}

export interface PaperOption {
  id: string
  title: string
  abstract: string
  isRelevant: boolean
  reason: string
}

export interface PaperSelectQuestion {
  id: string
  prompt: string
  requiredCount: number
  papers: PaperOption[]
}

export interface ExperimentDesignOption {
  id: string
  title: string
  design: string
  missingItems: string[]
  isBest: boolean
  reason: string
}

export interface ExperimentDesignQuestion {
  id: string
  scenario: string
  options: ExperimentDesignOption[]
}

export interface WritingCorrectionItem {
  id: string
  raw: string
  options: string[]
  correctIndex: number
  reason: string
}

export interface LevelResult {
  score: number
  maxScore: number
  passed: boolean
  feedbackTitle: string
  feedbackDetails: string[]
}

export interface StageReport {
  topic: string
  currentStage: StageKey
  completedLevels: number
  abilityRating: string
  nextDirection: string
  suggestions: string[]
}

export interface TrainingResult {
  topic: string
  finished_stage: StageKey
  score: number
  completed_levels: StageKey[]
  weak_points: string[]
  ability_rating: 'beginner' | 'intermediate' | 'advanced'
  next_stage_suggestion: string
}
