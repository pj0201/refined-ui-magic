
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform?embedded=true";
  
  const directFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform";

  const handleShowForm = () => {
    setIsLoading(true);
    setIframeError(false);
    setTimeout(() => {
      setShowForm(true);
      setIsLoading(false);
    }, 500);
  };

  const handleIframeError = () => {
    setIframeError(true);
    toast({
      title: "読み込みエラー",
      description: "フォームの読み込みに失敗しました。再度お試しいただくか、フォームを直接開いてご利用ください。",
      variant: "destructive",
    });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openFormInNewTab = () => {
    const url = `${directFormUrl}?usp=pp_url&entry.1234567890=${encodeURIComponent(subject)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const retryLoadForm = () => {
    setIframeError(false);
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = googleFormUrl;
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (showForm && iframeRef.current) {
      const iframe = iframeRef.current;
      
      const handleError = () => {
        console.log("iframe error event triggered");
        handleIframeError();
      };
      
      const handleLoad = () => {
        console.log("iframe loaded successfully");
        handleIframeLoad();
      };
      
      iframe.addEventListener('error', handleError);
      iframe.addEventListener('load', handleLoad);

      return () => {
        iframe.removeEventListener('error', handleError);
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [showForm]);

  const getIframeHeight = () => {
    // More responsive height calculation
    const width = window.innerWidth;
    if (width < 640) { // mobile
      return "800px";
    } else if (width < 768) { // small tablets
      return "1000px";
    } else if (width < 1024) { // larger tablets
      return "1200px";
    } else { // desktop
      return "900px";
    }
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
                className="w-full md:w-auto bg-white text-red-600 border-red-600 hover:bg-red-50"
                onClick={retryLoadForm}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                再試行する
              </Button>
              <div className="block">
                <Button 
                  variant="outline"
                  className={`w-full md:w-auto bg-white ${buttonColor} ${borderColor} ${hoverColor}`}
                  onClick={openFormInNewTab}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  フォームを新しいタブで開く
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="rounded-md max-h-[600px]">
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
          </ScrollArea>
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
