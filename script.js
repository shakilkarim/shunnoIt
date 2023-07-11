const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const apiKey = 'YOUR_API_KEY';

const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

async function sendMessage() {
  const userMessage = messageInput.value;
  messageInput.value = '';

  appendMessage('user', userMessage);

  const response = await generateResponse(userMessage);
  appendMessage('assistant', response);
}

async function generateResponse(userMessage) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 50,
        n: 1,
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, something went wrong.';
  }
}

function appendMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  messageElement.textContent = content;

  chatArea.appendChild(messageElement);
  chatArea.scrollTop = chatArea.scrollHeight;
}
