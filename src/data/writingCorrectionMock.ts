import type { WritingCorrectionItem } from '../types'

export const writingCorrectionItems: WritingCorrectionItem[] = [
  {
    id: 'w1',
    raw: '我们的方法超级厉害，效果非常炸裂。',
    options: [
      '我们的方法在多个指标上取得了显著提升，显示出较强有效性。',
      '我们的方法无敌。',
      '这个结果很牛。'
    ],
    correctIndex: 0,
    reason: '科研表达应客观、可证据化，避免口语化夸张词汇。'
  },
  {
    id: 'w2',
    raw: '这个实验应该还行，感觉不错。',
    options: [
      '实验结果表明该方案在准确率和一致性上均有提升。',
      '实验看起来挺好。',
      '实验可能是成功的。'
    ],
    correctIndex: 0,
    reason: '应基于可观察结果陈述，而非“感觉”。'
  },
  {
    id: 'w3',
    raw: '相关工作很多，这里就不说了。',
    options: [
      '相关研究主要集中在提示工程与反馈机制两条路径，本文重点比较其在本科生写作训练中的适配性。',
      '相关工作太多，略。',
      '大家都知道这些工作。'
    ],
    correctIndex: 0,
    reason: '学术写作需要结构化概括并说明与本文关系。'
  }
]
