
import { SubsidyInfo } from "./types";

export const formatSubsidyResponse = (info: SubsidyInfo): string => {
  const { question } = info;
  
  // キーワードの組み合わせによる判定
  const keywordSets = {
    company: ['企業', '会社', 'だれ', 'どんな', '誰'],
    expense: ['経費', '費用', '金'],
    target: ['対象', '該当'],
    requirements: ['要件', '条件', '基準'],
    amount: ['補助率', '金額', 'いくら', '上限', '額'],
  };

  // 対象企業に関する質問
  if (hasKeywords(question, keywordSets.company) || 
      (hasKeywords(question, keywordSets.target) && !hasKeywords(question, keywordSets.expense))) {
    return `本補助金の対象となる企業は以下の通りです：

1. 中小企業者（中小企業基本法に定める中小企業者）
  ・製造業、建設業、運輸業その他：資本金3億円以下 または 従業員300人以下
  ・卸売業：資本金1億円以下 または 従業員100人以下
  ・小売業：資本金5千万円以下 または 従業員50人以下
  ・サービス業：資本金5千万円以下 または 従業員100人以下

2. 小規模事業者
  ・製造業その他：従業員20人以下
  ・商業・サービス業：従業員5人以下

※ただし、以下の企業は対象外です：
・発行済株式の総数又は出資価格の総額の2分の1以上を同一の大企業が所有している中小企業者
・発行済株式の総数又は出資価格の総額の3分の2以上を大企業が所有している中小企業者
・大企業の役員又は職員を兼ねている者が、役員総数の2分の1以上を占めている中小企業者`;
  }
  
  // 補助対象経費に関する質問
  if (hasKeywords(question, keywordSets.expense) || 
      (hasKeywords(question, keywordSets.target) && hasKeywords(question, ['経費', '費用', '金']))) {
    return `補助対象となる経費は以下の通りです：

1. 機械装置・システム構築費
   - 専用ソフトウェア購入費
   - 設計・製造・改良・据付工事費

2. 技術導入費
   - 知的財産権導入費
   - ノウハウ購入費

3. クラウドサービス利用費
   - クラウドシステム利用料（最大2年分）

4. 専門家経費
   - 謝金、旅費等

※補助対象経費は税抜きの金額となります`;
  }
  
  // 補助金額・補助率に関する質問
  if (hasKeywords(question, keywordSets.amount)) {
    return `補助金の支援内容は以下の通りです：

【補助率】
・中小企業：1/2
・小規模事業者・再生事業者：2/3

【従業員規模別の補助上限額】
・5名以下：750万円（大幅賃上げの場合1,000万円）
・6～20名：1,500万円（同2,000万円）
・21～50名：3,000万円（同4,000万円）
・51～100名：5,000万円（同6,500万円）
・101名以上：8,000万円（同1億円）`;
  }

  // 申請要件に関する質問
  if (hasKeywords(question, keywordSets.requirements)) {
    return `申請要件は以下の通りです：

1. 労働生産性の年平均成長率が+4%以上増加

2. 以下のいずれかを満たすこと
   - 1人あたり給与支給総額の年平均成長率が事業実施都道府県の最低賃金の直近5年間の年平均成長率以上
   - 給与支給総額の年平均成長率が+4%以上上昇

3. 事業所内最低賃金が事業実施都道府県の最低賃金+30円以上

4. 従業員数21名以上の場合
   - 次世代育成支援対策推進法に基づく一般事業主行動計画の公表が必要`;
  }

  // デフォルトの応答
  return `中小企業省力化投資補助金（一般型）は、人手不足に直面する中小企業の生産性向上を支援する制度です。

主な特徴：
・省力化効果のある設備・システムの導入を支援
・労働生産性の向上を目指す事業が対象
・補助率1/2～2/3
・従業員規模に応じた補助上限額の設定

詳しい情報が必要な場合は、以下のような質問をお試しください：
・どんな企業が対象ですか？
・補助対象となる経費は？
・補助金額はいくらですか？
・申請要件を教えてください`;
};

// キーワードの組み合わせをチェックする関数
const hasKeywords = (text: string, keywords: string[]): boolean => {
  return keywords.some(keyword => text.includes(keyword));
};

export const isSubsidyRelatedQuestion = (text: string): boolean => {
  const keywords = [
    "補助",
    "助成",
    "経費",
    "要件",
    "条件",
    "金額",
    "対象",
    "申請",
    "いくら",
    "省力化",
    "生産性",
    "企業",
    "会社",
    "費用",
  ];
  
  return keywords.some(keyword => text.includes(keyword));
};
