
import { AlertTriangle } from "lucide-react";

export const NotificationSection = () => {
  return (
    <div className="bg-yellow-50 p-6 rounded-lg mb-8 border-l-4 border-yellow-500">
      <h3 className="font-bold text-lg mb-3 flex items-center">
        <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
        重要なお知らせ
      </h3>
      <p className="mb-2">
        慢性的な赤字、融資の返済や経常的な資金繰りなどにお悩みの経営者様にも該当する場合がございます。
      </p>
      <p>
        一読の上、ぜひご相談ください。
      </p>
    </div>
  );
};
