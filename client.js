// const API_URL = 'http://localhost:5000/ask_gpt'; // Update with your server's URL
const API_URL = 'https://12054-o.azurewebsites.net/ask_gpt'; // Update with your server's URL

document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('userInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const userInput = document.getElementById('userInput').value.trim();
        if (!userInput) return;

        addMessage(userInput, 'user');
        document.getElementById('userInput').value = '';

        // Fetch bot response from /api/ppt
        fetchBotResponse(userInput);
    }

    function addMessage(content, sender) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', sender);
        messageContainer.innerHTML = sender === 'user' ? `<strong>あなた:</strong> ${content}` : `<strong>Nomura:</strong> ${content}`;
        document.getElementById('messagesContainer').appendChild(messageContainer);
        document.getElementById('messagesContainer').scrollTop = document.getElementById('messagesContainer').scrollHeight;
    }

    async function fetchBotResponse(userInput) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: userInput })
            });
            const data = await response.json();
            addMessage(data.answer || '回答が見つかりませんでした。', 'bot');
        } catch (error) {
            console.error('Error fetching response:', error);
            addMessage('エラーが発生しました。もう一度お試しください。', 'bot');
        }
    }