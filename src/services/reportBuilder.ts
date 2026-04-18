import type { StageKey, StageReport, TrainingTask } from '../types'

const stageLabelMap: Record<StageKey, string> = {
  'risk-identification': '风险识别训练',
  'paper-select': '文献识别训练',
  'experiment-design': '实验设计训练',
  'academic-writing': '学术表达训练'
}

function rateAbility(score: number): string {
  if (score >= 85) return '优秀：具备较强任务执行与科研训练能力'
  if (score >= 65) return '良好：具备阶段性训练完成能力'
  if (score >= 45) return '合格：训练能力形成中，建议继续强化'
  return '起步：建议先巩固任务理解与风险识别能力'
}

export function buildStageReport(
  task: TrainingTask,
  completedLevels: number,
  totalScore: number,
  completedMap: Record<StageKey, boolean>
): StageReport {
  const averageScore = completedLevels > 0 ? Math.round(totalScore / completedLevels) : 0

  const unfinished = Object.entries(completedMap).find(([, value]) => !value)
  const nextDirection = unfinished
    ? `建议进入下一训练模块：${stageLabelMap[unfinished[0] as StageKey]}`
    : '当前阶段训练已完成，可进入下一轮任务训练'

  const suggestions = [
    '每次完成训练后记录 1 条“本阶段风险点”，形成个人训练清单。',
    '固定复盘“任务目标-执行过程-结果证据”，提升任务完成质量。',
    averageScore >= 65
      ? '可尝试进入更高难度任务，强化跨阶段综合能力。'
      : '建议优先重做低分关卡，重点修正反馈中指出的问题。'
  ]

  return {
    topic: task.topic,
    currentStage: task.level,
    completedLevels,
    abilityRating: rateAbility(averageScore),
    nextDirection,
    suggestions
  }
}
