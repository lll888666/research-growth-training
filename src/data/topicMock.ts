import type { TrainingTask } from '../types'

export const defaultTask: TrainingTask = {
  topic: '基于大语言模型的本科生科研写作辅助策略',
  keywords: ['LLM', '科研训练', '写作反馈', '本科生', '教育技术'],
  level: 'risk-identification',
  taskTitle: '识别训练任务中的关键风险点',
  taskDesc: '围绕当前主题完成风险识别、文献识别、实验设计与学术表达训练。'
}

export const stageLabels: Record<TrainingTask['level'] | 'summary', string> = {
  'risk-identification': '风险识别训练',
  'paper-select': '文献识别训练',
  'experiment-design': '实验设计训练',
  'academic-writing': '学术表达训练',
  summary: '阶段总结'
}

export const stageRouteMap: Record<TrainingTask['level'], string> = {
  'risk-identification': '/level/risk-identification',
  'paper-select': '/level/paper-select',
  'experiment-design': '/level/experiment-design',
  'academic-writing': '/level/academic-writing'
}
