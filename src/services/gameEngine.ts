import type {
  ExperimentDesignQuestion,
  LevelResult,
  PaperSelectQuestion,
  RiskIdentificationQuestion,
  WritingCorrectionItem
} from '../types'

export function evaluateRiskIdentification(
  selectedIndex: number,
  question: RiskIdentificationQuestion
): LevelResult {
  const isCorrect = selectedIndex === question.correctIndex
  return {
    score: isCorrect ? 25 : 8,
    maxScore: 25,
    passed: isCorrect,
    feedbackTitle: isCorrect ? '风险识别准确' : '风险识别仍需强化',
    feedbackDetails: [question.feedback[selectedIndex] || '请重新审视研究任务中的关键风险点。']
  }
}

export function evaluatePaperSelection(
  selectedIds: string[],
  question: PaperSelectQuestion
): LevelResult {
  const relevantPapers = question.papers.filter((paper) => paper.isRelevant).map((paper) => paper.id)
  const hitCount = selectedIds.filter((id) => relevantPapers.includes(id)).length
  const exactMatch =
    selectedIds.length === relevantPapers.length && selectedIds.every((id) => relevantPapers.includes(id))

  const baseScore = Math.max(0, hitCount * 12 - (selectedIds.length - hitCount) * 4)
  const score = exactMatch ? 25 : Math.min(20, baseScore)

  const details = question.papers
    .filter((paper) => selectedIds.includes(paper.id))
    .map((paper) => `${paper.title}：${paper.reason}`)

  return {
    score,
    maxScore: 25,
    passed: exactMatch,
    feedbackTitle: exactMatch ? '文献识别精准' : '文献筛选部分正确',
    feedbackDetails: details.length > 0 ? details : ['请先选择文献后再提交。']
  }
}

export function evaluateExperimentDesign(
  selectedId: string,
  question: ExperimentDesignQuestion
): LevelResult {
  const selected = question.options.find((item) => item.id === selectedId)
  if (!selected) {
    return {
      score: 0,
      maxScore: 25,
      passed: false,
      feedbackTitle: '未识别选择项',
      feedbackDetails: ['请重新选择一个实验方案。']
    }
  }

  const missing = selected.missingItems.length
  const score = selected.isBest ? 25 : Math.max(6, 20 - missing * 4)

  return {
    score,
    maxScore: 25,
    passed: selected.isBest,
    feedbackTitle: selected.isBest ? '实验设计合理' : '实验设计存在关键缺失',
    feedbackDetails: selected.isBest
      ? [selected.reason]
      : [selected.reason, `缺失项：${selected.missingItems.join('、')}`]
  }
}

export function evaluateAcademicWriting(selectedIndexes: number[], items: WritingCorrectionItem[]): LevelResult {
  const total = items.length
  const correctCount = items.reduce((count, item, idx) => {
    return count + (item.correctIndex === selectedIndexes[idx] ? 1 : 0)
  }, 0)

  const score = Math.round((correctCount / total) * 25)
  const details = items.map((item, idx) => {
    const ok = item.correctIndex === selectedIndexes[idx]
    return `${ok ? '正确' : '需改进'}：${item.reason}`
  })

  return {
    score,
    maxScore: 25,
    passed: correctCount >= Math.ceil(total * 0.67),
    feedbackTitle: `学术表达命中 ${correctCount}/${total}`,
    feedbackDetails: details
  }
}
