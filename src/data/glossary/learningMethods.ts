
import { GlossaryTerm } from './types';

export const learningMethods: GlossaryTerm[] = [
  {
    term: "ファインチューニング",
    definition: "事前学習済みモデルを特定のタスクに適応させるため、追加学習を行うプロセス"
  },
  {
    term: "転移学習 (Transfer Learning)",
    definition: "ある領域で学習したモデルを別の領域に適用する技術。学習効率の向上に貢献"
  },
  {
    term: "強化学習 (Reinforcement Learning)",
    definition: "試行錯誤を通じて最適な行動を学習する手法。ゲームAIや自律型ロボットの開発に活用"
  },
  {
    term: "自己教師あり学習 (Self-supervised Learning)",
    definition: "人間によるラベル付けなしに、データ自体から教師信号を生成して学習を行う手法。大量の未ラベルデータから効率的に知識を獲得できる"
  }
];
