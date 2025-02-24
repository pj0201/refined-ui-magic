
document.addEventListener('DOMContentLoaded', function() {
    // チャットボットの初期化
    initSubsidyChatbot();
});

function initSubsidyChatbot() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'subsidy-chatbot';
    chatbotContainer.className = 'fixed bottom-4 right-4 z-50';
    document.body.appendChild(chatbotContainer);

    // チャットボットのUIを構築
    const chatbotButton = document.createElement('button');
    chatbotButton.className = 'bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-105';
    chatbotButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3z" />
        </svg>
    `;

    const chatWindow = document.createElement('div');
    chatWindow.className = 'hidden absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl';
    chatWindow.innerHTML = `
        <div class="p-4 border-b">
            <h3 class="text-lg font-semibold">補助金チャットボット</h3>
            <p class="text-sm text-gray-600">お気軽にご相談ください</p>
        </div>
        <div class="p-4 h-96 overflow-y-auto" id="chat-messages">
            <div class="mb-4">
                <div class="bg-blue-100 rounded-lg p-3 inline-block">
                    こんにちは！補助金に関するご質問はありますか？
                </div>
            </div>
        </div>
        <div class="p-4 border-t">
            <div class="flex gap-2">
                <input type="text" id="chat-input" class="flex-1 border rounded-lg px-3 py-2" placeholder="メッセージを入力...">
                <button id="send-message" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    送信
                </button>
            </div>
        </div>
    `;

    chatbotContainer.appendChild(chatWindow);
    chatbotContainer.appendChild(chatbotButton);

    // チャットボットの表示/非表示を切り替え
    chatbotButton.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    // メッセージ送信処理
    const sendButton = chatWindow.querySelector('#send-message');
    const chatInput = chatWindow.querySelector('#chat-input');
    const chatMessages = chatWindow.querySelector('#chat-messages');

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            // ユーザーメッセージを表示
            appendMessage(message, 'user');
            chatInput.value = '';

            // 自動応答（実際のAPIコールに置き換えることも可能）
            setTimeout(() => {
                const response = getAutomaticResponse(message);
                appendMessage(response, 'bot');
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}

function appendMessage(message, sender) {
    const chatMessages = document.querySelector('#chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'mb-4 ' + (sender === 'user' ? 'text-right' : '');
    
    const messageContent = document.createElement('div');
    messageContent.className = sender === 'user' 
        ? 'bg-blue-600 text-white rounded-lg p-3 inline-block'
        : 'bg-blue-100 rounded-lg p-3 inline-block';
    messageContent.textContent = message;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAutomaticResponse(message) {
    const responses = {
        '補助金': '現在、さまざまな補助金制度がございます。具体的にどのような事業についてお考えでしょうか？',
        '創業': '創業補助金について詳しくご説明させていただきます。創業の段階や事業内容によって最適な補助金が異なりますが、いかがでしょうか？',
        'AI': 'AI関連の補助金については、特に注目されている分野です。具体的な事業計画に基づいてご提案させていただきます。',
        'DX': 'デジタルトランスフォーメーション推進のための補助金をご紹介できます。予算規模や実施時期について、お聞かせいただけますでしょうか？'
    };

    // メッセージ内のキーワードに基づいて応答を返す
    for (const [keyword, response] of Object.entries(responses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }

    return 'ご質問ありがとうございます。より詳しくお話を伺わせていただけますでしょうか？';
}
