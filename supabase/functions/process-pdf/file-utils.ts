
export function validateFile(file: File | null) {
  if (!file) {
    return { valid: false, error: 'ファイルがアップロードされていません' }
  }
  
  // ファイル名から拡張子を取得
  const fileName = file.name
  const fileExt = fileName.split('.').pop()?.toLowerCase()
  
  // PDFとPNGの両方をサポート
  if (fileExt !== 'png' && fileExt !== 'pdf') {
    return { 
      valid: false, 
      error: 'PNGまたはPDFファイルのみアップロード可能です' 
    }
  }
  
  return { 
    valid: true, 
    fileName, 
    fileExt,
    filePath: `${crypto.randomUUID()}.${fileExt}`
  }
}
