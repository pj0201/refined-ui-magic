
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
async function generateResponse(question) {
    try {
        if (!CHAT_FUNCTION_URL) {
            throw new Error('Supabase URL が設定されていません');
        }

        // ローディング状態を表示
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'typing-indicator';
        loadingDiv.innerHTML = '<span></span><span></span><span></span>';
        document.querySelector('#chat-messages').appendChild(loadingDiv);

        // Edge Function を呼び出し
        const response = await fetch(CHAT_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ANON_KEY}`
            },
            body: JSON.stringify({ question })
        });

        // ローディング表示を削除
        document.querySelector('.typing-indicator')?.remove();

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from chat function:', errorData);
            return '申し訳ありません。現在システムに問題が発生しています。時間をおいて再度お試しください。';
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error);
        // ローディング表示を削除
        document.querySelector('.typing-indicator')?.remove();
        return '申し訳ありません。現在システムに問題が発生しています。時間をおいて再度お試しください。';
    }
}
