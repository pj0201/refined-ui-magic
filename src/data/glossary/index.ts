
import { GlossaryCategory } from './types';
import { basicConcepts } from './basicConcepts';
import { machineLearningBasics } from './machineLearningBasics';
import { languageModels } from './languageModels';
import { technicalImplementation } from './technicalImplementation';
import { promptsAndTokens } from './promptsAndTokens';
import { learningMethods } from './learningMethods';
import { modelComponents } from './modelComponents';
import { learningProcess } from './learningProcess';
import { developmentProcess } from './developmentProcess';

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "basic-concepts",
    title: "基本概念",
    terms: basicConcepts
  },
  {
    id: "machine-learning-basics",
    title: "機械学習の基礎",
    terms: machineLearningBasics
  },
  {
    id: "language-models",
    title: "言語モデル関連",
    terms: languageModels
  },
  {
    id: "technical-implementation",
    title: "技術実装関連",
    terms: technicalImplementation
  },
  {
    id: "prompts-tokens",
    title: "プロンプトとトークン",
    terms: promptsAndTokens
  },
  {
    id: "learning-methods",
    title: "学習手法",
    terms: learningMethods
  },
  {
    id: "model-components",
    title: "モデルの構成要素",
    terms: modelComponents
  },
  {
    id: "learning-process",
    title: "学習プロセス",
    terms: learningProcess
  },
  {
    id: "development-process",
    title: "開発プロセス関連",
    terms: developmentProcess
  }
];

// 型定義もエクスポート
export type { GlossaryTerm, GlossaryCategory } from './types';
