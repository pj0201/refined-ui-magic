
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const FileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "エラー",
        description: "PDFファイルのみアップロード可能です",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data, error } = await supabase.functions.invoke('process-pdf', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "成功",
        description: "ファイルが正常にアップロードされました",
      });

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
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="pdf-upload"
        disabled={isUploading}
      />
      <label htmlFor="pdf-upload">
        <Button asChild variant="outline" disabled={isUploading}>
          <span>
            <Upload className="w-4 h-4 mr-2" />
            PDFをアップロード
          </span>
        </Button>
      </label>
    </div>
  );
};
