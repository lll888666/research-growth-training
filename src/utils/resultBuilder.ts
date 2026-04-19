import { stageLabels } from '../data/topicMock'
import type { StageKey, TrainingResult, TrainingTask } from '../types'

interface BuildTrainingResultInput {
  task: TrainingTask
  totalScore: number
  completed: Record<StageKey, boolean>
  weakPointCounts: Record<StageKey, number>
}

function toAbilityRating(score: number): TrainingResult['ability_rating'] {
  if (score >= 80) return 'advanced'
  if (score >= 50) return 'intermediate'
  return 'beginner'
}

function nextSuggestion(completed: Record<StageKey, boolean>): string {
  const next = (Object.entries(completed) as Array<[StageKey, boolean]>).find(([, done]) => !done)
  if (!next) return '建议回到智能体平台，进入下一阶段科研成长任务。'
  return `建议继续完成：${stageLabels[next[0]]}`
}

export function buildTrainingResult(input: BuildTrainingResultInput): TrainingResult {
  const completedLevels = (Object.entries(input.completed) as Array<[StageKey, boolean]>)
    .filter(([, done]) => done)
    .map(([stage]) => stage)

  const weakPoints = (Object.entries(input.weakPointCounts) as Array<[StageKey, number]>)
    .filter(([, count]) => count > 0)
    .map(([stage]) => stageLabels[stage])

  return {
    topic: input.task.topic,
    finished_stage: input.task.level,
    score: input.totalScore,
    completed_levels: completedLevels,
    weak_points: weakPoints,
    ability_rating: toAbilityRating(input.totalScore),
    next_stage_suggestion: nextSuggestion(input.completed)
  }
}

export function stringifyTrainingResult(result: TrainingResult): string {
  return JSON.stringify(result, null, 2)
}
