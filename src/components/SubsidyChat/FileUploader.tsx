
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const FileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      // 複数ファイルを順次処理
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.includes('image/png')) {
          errorCount++;
          console.error(`${file.name}はPNGファイルではありません`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const { data, error } = await supabase.functions.invoke('process-pdf', {
          body: formData,
        });

        if (error) {
          errorCount++;
          console.error(`${file.name}のアップロードに失敗:`, error);
        } else {
          successCount++;
        }
      }

      // 結果を表示
      if (successCount > 0) {
        toast({
          title: "アップロード完了",
          description: `${successCount}個のファイルが正常にアップロードされました${errorCount > 0 ? `\n${errorCount}個のファイルでエラーが発生しました` : ''}`,
          variant: errorCount > 0 ? "destructive" : "default"
        });
      } else if (errorCount > 0) {
        toast({
          title: "エラー",
          description: "すべてのファイルのアップロードに失敗しました",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('アップロードエラー:', error);
      toast({
        title: "エラー",
        description: "ファイルのアップロードに失敗しました",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/png"
        onChange={handleFileUpload}
        className="hidden"
        id="pdf-upload"
        disabled={isUploading}
        multiple // 複数ファイルの選択を許可
      />
      <label htmlFor="pdf-upload">
        <Button asChild variant="outline" disabled={isUploading}>
          <span>
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'アップロード中...' : 'PNGをアップロード'}
          </span>
        </Button>
      </label>
    </div>
  );
};
