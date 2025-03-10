
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
// PDFアップロード機能
async function handleFileUpload(file) {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        // ファイルアップロード中のメッセージを表示
        appendMessage('ファイルを処理中です。少々お待ちください...', 'bot');
        
        const processUrl = `${SUPABASE_URL}/functions/v1/process-pdf`;
        const response = await fetch(processUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ANON_KEY}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            appendMessage(`ファイルの処理が完了しました。補助金に関する質問をどうぞ！`, 'bot');
        } else {
            appendMessage(`ファイルの処理中にエラーが発生しました: ${data.error}`, 'bot');
        }
    } catch (error) {
        console.error('ファイル処理エラー:', error);
        appendMessage('ファイルの処理中にエラーが発生しました。時間をおいて再度お試しください。', 'bot');
    }
}
