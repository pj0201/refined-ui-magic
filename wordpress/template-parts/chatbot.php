
<div id="subsidy-chatbot" class="fixed bottom-4 right-4 z-50">
    <!-- チャットボットのUIはJavaScriptで動的に生成されます -->
</div>

<script>
const OPENAI_API_KEY = '<?php echo getenv("OPENAI_API_KEY"); ?>';

async function generateResponse(question) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: '中小企業診断士として、補助金に関する質問に専門的に回答してください。'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error);
        return '申し訳ありません。現在システムに問題が発生しています。時間をおいて再度お試しください。';
    }
}

// チャットボットの状態管理
let isOpen = false;
let messages = [];
let isLoading = false;

// メッセージを追加する関数
function appendMessage(content, type = 'bot') {
    const message = {
        content,
        type,
        timestamp: new Date()
    };
    messages.push(message);
    renderMessages();
}

// メッセージを表示する関数
function renderMessages() {
    const chatMessages = document.querySelector('#chat-messages');
    if (!chatMessages) return;

    chatMessages.innerHTML = messages.map(message => `
        <div class="mb-4 ${message.type === 'user' ? 'text-right' : ''}">
            <div class="${
                message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
            } rounded-lg p-3 inline-block">
                <div class="whitespace-pre-wrap break-words">${message.content}</div>
            </div>
        </div>
    `).join('');

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// チャットボットの初期化
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('subsidy-chatbot');
    
    if (!chatbotContainer) return;

    // 初期状態のUIを構築
    chatbotContainer.innerHTML = `
        <div class="flex flex-col items-end gap-2">
            <div class="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center">
                <span>省力化投資補助金</span>
                <span>一般形の質問はコチラ</span>
            </div>
            <button id="chatbot-toggle" class="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3z" />
                </svg>
            </button>
        </div>

        <div id="chat-window" class="hidden absolute bottom-16 right-0 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] bg-white rounded-lg shadow-xl flex flex-col">
            <div class="flex items-center justify-between p-4 border-b">
                <h3 class="font-bold text-lg">補助金相談Bot</h3>
                <button id="close-chat" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4"></div>

            <form id="chat-form" class="p-4 border-t">
                <div class="flex gap-2">
                    <input type="text" id="chat-input" class="flex-1 border rounded-lg px-3 py-2" placeholder="メッセージを入力...">
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        送信
                    </button>
                </div>
            </form>
        </div>
    `;

    // 初期メッセージを追加
    appendMessage("補助金に関する質問をお気軽にどうぞ！\n\n【質問例】\n・補助金額はいくらですか？\n・申請期間はいつからですか？\n・どんな企業が対象ですか？");

    // イベントリスナーを設定
    const chatWindow = document.getElementById('chat-window');
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

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
});
</script>
