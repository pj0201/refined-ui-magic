
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertCircle, ExternalLink } from "lucide-react";

interface ContactFormProps {
  subject?: string;
  buttonColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

export const ContactForm = ({ 
  subject = "お問い合わせ", 
  buttonColor = "text-blue-600", 
  borderColor = "border-blue-600",
  hoverColor = "hover:bg-blue-50"
}: ContactFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  // Google Form URL provided by user
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform?embedded=true";
  
  // 直接アクセス用のURL
  const directFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform";

  const handleShowForm = () => {
    setIsLoading(true);
    setIframeError(false);
    // Simulate loading the form
    setTimeout(() => {
      setShowForm(true);
      setIsLoading(false);
    }, 500);
  };

  // iframeのエラーハンドリング
  const handleIframeError = () => {
    setIframeError(true);
    toast({
      title: "読み込みエラー",
      description: "フォームの読み込みに失敗しました。再度お試しいただくか、フォームを直接開いてご利用ください。",
      variant: "destructive",
    });
  };

  // iframeのロード完了
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // 新しいタブでGoogleフォームを開く
  const openFormInNewTab = () => {
    // クエリパラメータとして件名を渡す（必要に応じて）
    const url = `${directFormUrl}?usp=pp_url&entry.xxx=${encodeURIComponent(subject)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // iframeが表示されている場合のみイベントリスナーを追加
    if (showForm && iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.addEventListener('error', handleIframeError);
      iframe.addEventListener('load', handleIframeLoad);

      return () => {
        iframe.removeEventListener('error', handleIframeError);
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, [showForm]);

  // スクリーンサイズに応じたiframeの高さ調整
  const getIframeHeight = () => {
    // モバイルとデスクトップで高さを変える
    return window.innerWidth < 768 ? "1600px" : "1498px";
  };

  if (showForm) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <span className="ml-3">読み込み中...</span>
          </div>
        )}
        
        {iframeError ? (
          <div className="text-center p-6 border border-red-300 rounded-lg bg-red-50">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
            <h3 className="text-lg font-bold mb-2">フォームの読み込みに失敗しました</h3>
            <p className="mb-4">申し訳ありませんが、フォームの読み込みに問題が発生しました。</p>
            <div className="space-y-3">
              <Button 
                variant="outline"
                className={`bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
                onClick={openFormInNewTab}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                フォームを新しいタブで開く
              </Button>
              <div className="block">
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setIframeError(false);
                    handleShowForm();
                  }}
                >
                  再試行する
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <iframe 
            ref={iframeRef}
            src={googleFormUrl}
            width="100%" 
            height={getIframeHeight()}
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="mt-2 rounded-md shadow-sm"
            onError={handleIframeError}
            onLoad={handleIframeLoad}
          >
            読み込んでいます...
          </iframe>
        )}
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="mb-4">お問い合わせには、セキュアなGoogleフォームを使用しております。</p>
      <Button 
        variant="outline"
        className={`bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
        disabled={isLoading}
        onClick={handleShowForm}
      >
        <Mail className="mr-2 h-4 w-4" />
        {isLoading ? "読み込み中..." : "お問い合わせフォームを表示"}
      </Button>
    </div>
  );
};
