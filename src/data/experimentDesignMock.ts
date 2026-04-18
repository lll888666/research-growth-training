import type { ExperimentDesignQuestion } from '../types'

export const experimentDesignQuestion: ExperimentDesignQuestion = {
  id: 'experiment-design-1',
  scenario:
    '场景：验证“结构化提示模板”是否提升本科生科研摘要写作质量。请选择最合理实验设计。',
  options: [
    {
      id: 'e1',
      title: '只看主观感受',
      design: '招募 20 人使用模板后填写满意度，不设置对照组，不做客观评分。',
      missingItems: ['对照组', '客观评价指标', '基线系统'],
      isBest: false,
      reason: '缺乏可比较性和客观证据，结论不稳健。'
    },
    {
      id: 'e2',
      title: '完整对照实验',
      design:
        '随机分组（模板组/普通提示组），使用统一数据集与评分 rubric，报告平均分、显著性与效应量。',
      missingItems: [],
      isBest: true,
      reason: '包含 baseline、评价指标、数据一致性与统计检验，最可复现。'
    },
    {
      id: 'e3',
      title: '单次演示实验',
      design: '选择 3 个样例展示优化前后文本，不进行规模化采样与统计分析。',
      missingItems: ['足够样本量', '统计检验', '评价标准一致性'],
      isBest: false,
      reason: '案例展示可用于说明，但不足以支撑研究结论。'
    },
    {
      id: 'e4',
      title: '混合多因素但无控制',
      design: '同时更换模型、提示词与评分人，最后比较总分差异。',
      missingItems: ['变量控制', '因果归因', '稳定评价流程'],
      isBest: false,
      reason: '变量过多导致无法确认真实贡献来源。'
    }
  ]
}
