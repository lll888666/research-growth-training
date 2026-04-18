import type { PaperSelectQuestion } from '../types'

export const paperSelectionQuestion: PaperSelectQuestion = {
  id: 'paper-select-1',
  prompt: '任务：筛选最相关文献。请从 4 篇论文中选出最相关的 2 篇。',
  requiredCount: 2,
  papers: [
    {
      id: 'p1',
      title: 'Prompt Scaffolding for Undergraduate Abstract Writing Support',
      abstract:
        'A controlled study with 126 undergraduates evaluates scaffolded prompts for scientific abstract writing quality and revision depth.',
      isRelevant: true,
      reason: '与“本科生 + 写作辅助 + 可评估结果”高度一致。'
    },
    {
      id: 'p2',
      title: 'A Survey of Multimodal Foundation Models in Autonomous Driving',
      abstract:
        'This survey summarizes perception and planning pipelines for autonomous vehicles with multimodal data fusion.',
      isRelevant: false,
      reason: '研究领域偏离教育训练主题。'
    },
    {
      id: 'p3',
      title: 'Rubric-Aligned LLM Feedback and Student Scientific Writing Outcomes',
      abstract:
        'We compare rubric-aligned LLM feedback with peer feedback and measure gains in clarity, evidence use, and claim structure.',
      isRelevant: true,
      reason: '直接涉及科研写作反馈机制与学习效果。'
    },
    {
      id: 'p4',
      title: 'Campus Wi-Fi Load Forecasting with Temporal Graph Networks',
      abstract:
        'Temporal graph neural networks are used to predict network load for campus infrastructure optimization.',
      isRelevant: false,
      reason: '技术方向与当前训练任务不相关。'
    }
  ]
}
