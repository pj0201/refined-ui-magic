
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
// 省力化投資補助金チャットボットの初期化
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('subsidy-chatbot');
    
    if (!chatbotContainer) return;

    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            display: flex;
            padding: 15px;
        }
        .typing-indicator span {
            height: 10px;
            width: 10px;
            margin: 0 3px;
            background-color: #9E9E9E;
            border-radius: 50%;
            display: block;
            animation: typing 1s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) { animation-delay: 0s; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 初期状態のUIを構築
    chatbotContainer.innerHTML = `
        <div class="flex flex-col items-end gap-2">
            <div class="chatbot-label investment-subsidy-label bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center">
                <span>省力化投資補助金</span>
                <span>一般形の質問はコチラ</span>
            </div>
            <button id="chatbot-toggle" class="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3z" />
                </svg>
            </button>
        </div>

        <div id="chat-window" class="hidden absolute bottom-16 right-0 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-gray-50 rounded-lg shadow-xl flex flex-col">
            <div class="flex items-center justify-between p-4 border-b bg-white rounded-t-lg">
                <h3 class="font-bold text-lg">省力化投資補助金相談Bot</h3>
                <button id="close-chat" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4"></div>

            <div class="p-2 border-t bg-white">
                <label for="file-upload" class="flex items-center justify-center w-full px-3 py-1.5 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    PDFやPNG画像をアップロード
                    <input id="file-upload" type="file" class="hidden" accept=".pdf,.png" />
                </label>
            </div>

            <form id="chat-form" class="p-4 border-t bg-white rounded-b-lg">
                <div class="flex gap-2">
                    <input type="text" id="chat-input" class="flex-1 border rounded-lg px-3 py-2" placeholder="メッセージを入力...">
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    `;

    // 初期メッセージを追加
    appendMessage("補助金に関する質問をお気軽にどうぞ！\n\n【質問例】\n・補助金額はいくらですか？\n・申請期間はいつからですか？\n・どんな企業が対象ですか？\n\nPDFや画像ファイルをアップロードすることもできます。");

    // イベントリスナーを設定
    const chatWindow = document.getElementById('chat-window');
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const fileUpload = document.getElementById('file-upload');

    toggleButton.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('hidden');
    });

    closeButton.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.add('hidden');
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = chatInput.value.trim();
        if (!message || isLoading) return;

        // ユーザーのメッセージを表示
        appendMessage(message, 'user');
        chatInput.value = '';

        // ローディング状態を設定
        isLoading = true;
        chatInput.disabled = true;

        try {
            // AIからの応答を取得
            const response = await generateResponse(message);
            appendMessage(response);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('申し訳ありません。エラーが発生しました。時間をおいて再度お試しください。');
        } finally {
            isLoading = false;
            chatInput.disabled = false;
            chatInput.focus();
        }
    });

    // ファイルアップロード処理
    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
            // ファイル選択をリセット
            fileUpload.value = '';
        }
    });
});
