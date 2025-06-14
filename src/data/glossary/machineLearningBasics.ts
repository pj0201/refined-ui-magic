
import { GlossaryTerm } from './types';

export const machineLearningBasics: GlossaryTerm[] = [
  {
    term: "機械学習 (Machine Learning)",
    definition: "データから規則性やパターンを学習し、新しいデータに対して予測や判断を行うAIの中核技術",
    links: [
      { text: "Googleの機械学習入門", url: "https://developers.google.com/machine-learning/crash-course?hl=ja" }
    ]
  },
  {
    term: "ディープラーニング (Deep Learning)",
    definition: "多層のニューラルネットワークを用いた機械学習手法。画像認識や自然言語処理などで高い性能を発揮",
    links: [
      { text: "Deep Learningの基礎", url: "https://www.tensorflow.org/tutorials/quickstart/beginner?hl=ja" }
    ]
  },
  {
    term: "ニューラルネットワーク (Neural Network)",
    definition: "脳の神経細胞をモデルにした機械学習の基本構造。深層学習の基盤技術"
  }
];
