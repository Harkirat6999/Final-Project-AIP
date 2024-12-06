const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatContainer = document.getElementById('chatContainer');
const minimizeButton = document.getElementById('minimizeButton');

// Toggle visibility of chatbot container when clicking the icon
document.getElementById('chatbotIcon').addEventListener('click', function () {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatbox.innerHTML = '';
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
});

// Minimize chat container
minimizeButton.addEventListener('click', function () {
    chatContainer.style.display = 'none';
});

// Send button click event
sendBtn.addEventListener('click', function () {
    sendMessage();
});

// Main function to send messages
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        addMessage(userMessage, 'user');
        userInput.value = '';

        const typingIndicator = showTyping();

        // Send message to the backend API
        fetch('http://127.0.0.1:8080/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userMessage })
        })
        .then((response) => response.json())
        .then((data) => {
            typingIndicator.remove();
            if (data.answer) {
                addMessage(data.answer, 'bot');
            } else {
                addMessage("Sorry, I couldn't process that. Please try again.", 'bot');
            }
        })
        .catch((error) => {
            typingIndicator.remove();
            addMessage("Sorry, there was an error processing your request.", 'bot');
            console.error("Error:", error);
        });
    }
}

// Show typing indicator while waiting for response
function showTyping() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Student Voice is typing...";
    chatbox.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;
    return typingIndicator;
}

// Add messages to chatbox
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const messageText = document.createElement('p');
    messageText.textContent = message;

    messageDiv.appendChild(messageText);
    chatbox.appendChild(messageDiv);

    chatbox.scrollTop = chatbox.scrollHeight;
}
