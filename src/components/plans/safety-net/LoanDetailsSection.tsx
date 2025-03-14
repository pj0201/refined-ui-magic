
export const LoanDetailsSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">融資の概要</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/3">資金のお使いみち</th>
              <td className="border border-gray-300 px-4 py-2">既往債務の返済負担軽減のために必要とする運転資金</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">融資限度額</th>
              <td className="border border-gray-300 px-4 py-2">7,200万円（別枠）</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">利率（年）</th>
              <td className="border border-gray-300 px-4 py-2">基準利率</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">ご返済期間</th>
              <td className="border border-gray-300 px-4 py-2">20年以内（うち据置期間2年以内）</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">担保・保証人</th>
              <td className="border border-gray-300 px-4 py-2">お客さまのご希望を伺いながらご相談</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">併用できる特例制度</th>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc pl-6">
                  <li>経営者保証免除特例制度</li>
                  <li>賃上げ貸付利率特例制度</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-lg mb-3">注意事項</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>お使いみち、ご返済期間、担保の有無などによって異なる利率が適用されます。</li>
          <li>利率は金融情勢によって変動いたしますので、お借入金利（固定）は、記載されている利率とは異なる場合がございます。</li>
          <li>審査の結果、お客さまのご希望に沿えないことがございます。</li>
        </ul>
      </div>
    </>
  );
};
