
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

export const FileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.includes('image/png')) {
          errorCount++;
          console.error(`${file.name}はPNGファイルではありません`);
          continue;
        }

        try {
          await apiClient.uploadFile(file);
          successCount++;
        } catch (error) {
          errorCount++;
          console.error(`${file.name}のアップロードに失敗:`, error);
        }
      }

      toast.success(`${files.length}個中${successCount}個のファイルの処理が完了しました${errorCount > 0 ? `\n${errorCount}個のファイルでエラーが発生` : ''}`);

    } catch (error) {
      console.error('アップロードエラー:', error);
      toast.error("ファイルの処理中にエラーが発生しました");
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
        multiple
      />
      <label htmlFor="pdf-upload">
        <Button asChild variant="outline" disabled={isUploading}>
          <span>
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? '処理中...' : 'PNGをアップロード'}
          </span>
        </Button>
      </label>
    </div>
  );
};
