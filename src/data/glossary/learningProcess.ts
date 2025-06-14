
import { GlossaryTerm } from './types';

export const learningProcess: GlossaryTerm[] = [
  {
    term: "バッチ学習 (Batch Learning)",
    definition: "データを一括で学習する手法。大規模データセットの学習に適している"
  },
  {
    term: "オンライン学習 (Online Learning)",
    definition: "データを逐次的に学習する手法。リアルタイムでの学習に適している"
  },
  {
    term: "過学習 (Overfitting)",
    definition: "訓練データに過度に適合し、汎化性能が低下する現象"
  },
  {
    term: "正則化 (Regularization)",
    definition: "過学習を防ぐためのテクニック。モデルの複雑さを制御する"
  }
];
