
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
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
                    : 'bg-white text-gray-900 border border-gray-200'
            } rounded-lg p-3 inline-block shadow-sm">
                <div class="whitespace-pre-wrap break-words">${message.content}</div>
            </div>
        </div>
    `).join('');

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
