import type { RiskIdentificationQuestion } from '../types'

export const riskIdentificationQuestions: RiskIdentificationQuestion[] = [
  {
    id: 'risk-identification-1',
    prompt: '任务：准备“LLM 辅助本科生科研写作训练”实验，请选择最需要优先规避的关键风险。',
    options: [
      '界面颜色不够科技感。',
      '训练组与对照组评分标准不一致，导致结论不可比。',
      '页面标题长度偏短。',
      '按钮圆角不统一。'
    ],
    correctIndex: 1,
    feedback: [
      '视觉细节重要，但不是当前科研训练任务的核心风险。',
      '正确：评价标准不一致会直接破坏实验有效性和结论可信度。',
      '文案长度影响较小，不构成研究核心风险。',
      '样式一致性属于体验问题，不是科研训练风险核心。'
    ]
  }
]
