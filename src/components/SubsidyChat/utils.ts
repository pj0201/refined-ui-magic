
import { SubsidyInfo } from "./types";

type QuestionIntent = "" | "limit_amount" | "basic_amount" | "expense" | "requirement" | "target" | "general";
type KeywordIntent = Exclude<QuestionIntent, "general">;

// 質問の意図を分析する関数
const analyzeQuestionIntent = (question: string): QuestionIntent => {
  // 質問をセンテンスに分割（。や？で区切る）
  const sentences = question.split(/[。？]/).filter(s => s.trim().length > 0);
  
  // センテンスごとにキーワードを分析
  const keywordResults = sentences.map(sentence => {
    const amountKeywords = ['いくら', '金額', '額', '補助金額', '補助額'];
    const limitKeywords = ['上限', '限度', 'まで'];
    const rateKeywords = ['補助率', '割合', 'パーセント', '％'];
    const expenseKeywords = ['経費', '費用', '対象'];
    const requirementKeywords = ['要件', '条件', '基準'];
    const targetKeywords = ['対象者', '企業', '会社'];

    // キーワードごとの重みづけ
    const matches = {
      amount: amountKeywords.some(k => sentence.includes(k)) ? 2 : 0,
      limit: limitKeywords.some(k => sentence.includes(k)) ? 3 : 0,
      rate: rateKeywords.some(k => sentence.includes(k)) ? 2 : 0,
      expense: expenseKeywords.some(k => sentence.includes(k)) ? 1 : 0,
      requirement: requirementKeywords.some(k => sentence.includes(k)) ? 1 : 0,
      target: targetKeywords.some(k => sentence.includes(k)) ? 1 : 0
    };

    // 金額関連の質問を優先的に判定
    if ((matches.amount > 0 && matches.limit > 0) || matches.limit > 0) {
      return 'limit_amount' as KeywordIntent;
    }
    if (matches.amount > 0 || matches.rate > 0) {
      return 'basic_amount' as KeywordIntent;
    }
    if (matches.expense > 0) {
      return 'expense' as KeywordIntent;
    }
    if (matches.requirement > 0) {
      return 'requirement' as KeywordIntent;
    }
    if (matches.target > 0) {
      return 'target' as KeywordIntent;
    }

    return '' as KeywordIntent;
  });

  // 最も関連性の高い意図を返す
  const priorityOrder: KeywordIntent[] = ['limit_amount', 'basic_amount', 'expense', 'requirement', 'target'];
  for (const priority of priorityOrder) {
    if (keywordResults.includes(priority)) {
      return priority;
    }
  }

  return 'general';
};

export const formatSubsidyResponse = (info: SubsidyInfo): string => {
  const { question } = info;
  const intent = analyzeQuestionIntent(question || '');

  switch (intent) {
    case 'limit_amount':
      return `補助金の上限額は従業員規模に応じて設定されています：

【従業員規模別の補助上限額】
■ 5名以下の場合
・通常: 750万円
・大幅賃上げの場合: 1,000万円

■ 6～20名の場合
・通常: 1,500万円
・大幅賃上げの場合: 2,000万円

■ 21～50名の場合
・通常: 3,000万円
・大幅賃上げの場合: 4,000万円

■ 51～100名の場合
・通常: 5,000万円
・大幅賃上げの場合: 6,500万円

■ 101名以上の場合
・通常: 8,000万円
・大幅賃上げの場合: 1億円

※大幅賃上げとは、補助事業期間終了後3～5年で最低賃金を年額45円以上上げる計画の場合です。`;

    case 'basic_amount':
      return `本補助金の基本的な補助内容は以下の通りです：

【補助率】
・中小企業: 事業費の1/2
・小規模事業者: 事業費の2/3
・再生事業者: 事業費の2/3

【補助金額の範囲】
・最小: 100万円から
・最大: 従業員規模により750万円～1億円

より詳しい上限額をお知りになりたい場合は、「補助金の上限額を教えてください」とお尋ねください。`;

    case 'expense':
      return `本補助金の対象となる経費は以下の通りです：

1. 機械装置・システム構築費
   - 専用ソフトウェア購入費
   - 設計・製造・改良・据付工事費
   - オーダーメイド・セミオーダーメイド性の高い設備等

2. 技術導入費
   - 知的財産権導入に要する経費
   - ノウハウ購入費用

3. クラウドサービス利用費（最大2年分）
   - クラウドシステム等の利用料
   - 専用アプリケーションの利用料

4. 専門家経費
   - 謝金
   - 旅費
   - コンサルティング費用等

※補助対象経費は全て税抜きの金額となります
※補助事業の実施期間内に発注、支払いが完了している必要があります`;

    case 'requirement':
      return `申請要件は以下の通りです：

1. 労働生産性の年平均成長率が+4%以上増加

2. 以下のいずれかを満たすこと
   - 1人あたり給与支給総額の年平均成長率が事業実施都道府県の最低賃金の直近5年間の年平均成長率以上
   - 給与支給総額の年平均成長率が+4%以上上昇

3. 事業所内最低賃金が事業実施都道府県の最低賃金+30円以上

4. 従業員数21名以上の場合
   - 次世代育成支援対策推進法に基づく一般事業主行動計画の公表が必要`;

    case 'target':
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

    default:
      return `中小企業省力化投資補助金（一般型）について、具体的な情報をお知りになりたい場合は、以下のような質問をお試しください：

・補助金の上限額はいくらですか？
・従業員規模別の補助金額を教えてください
・補助率はどのくらいですか？
・どのような経費が対象になりますか？
・申請要件を教えてください`;
  }
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
    "上限",
  ];
  
  return keywords.some(keyword => text.includes(keyword));
};
