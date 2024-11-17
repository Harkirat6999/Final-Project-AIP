// Accessing necessary elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatbotIcon = document.getElementById('chatbotIcon');
const chatContainer = document.getElementById('chatContainer');
const minimizeButton = document.getElementById('minimizeButton');


// Bot responses object
const botResponses = {
    "hi": ["Hello! How can I assist you today?", "Hey! How are you doing today?", "Hi there! What can I help you with?"],
    "how are you": ["I'm just a bot, but I'm doing great! How about you?", "I'm doing well, thank you! What can I do for you today?"],
    "what is your name": ["I am Student Voice, your AI assistant.", "They call me Student Voice! How can I assist you?"],
    "bye": ["Goodbye! Have a great day!", "See you soon! Take care!", "Bye! Don't hesitate to ask more questions!"],
    "what are the opening hours of the library?": ["The library is open from 9 AM to 5 PM, Monday to Friday."],
    "i want to change my password what should i do?": ["Please contact Student Support, or you can change your password through the 'Forgot Password' link."],
    "how can I contact student support?": ["You can contact student support via email at support@college.edu or call (---)------."]
};

// Toggle visibility of chatbot container when clicking the icon
chatbotIcon.addEventListener('click', function() {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatbox.innerHTML = '';
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
});
minimizeButton.addEventListener('click',function(){
    chatContainer.style.display = 'none';
});

// Send button click event
sendBtn.addEventListener('click', function() {
    sendMessage();
});

// Main function to send messages
function sendMessage() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage !== '') {
        addMessage(userMessage, 'user');
        userInput.value = '';

        const typingIndicator = showTyping();

        setTimeout(() => {
            typingIndicator.remove();
            const botMessage = getBotResponse(userMessage);
            addMessage(botMessage, 'bot');
        }, 1000);
    }
}

function showTyping() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = "Student Voice is typing...";
    chatbox.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;
    return typingIndicator;
}


// Function to add messages to chatbox
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const messageText = document.createElement('p');
    messageText.textContent = message;

    messageDiv.appendChild(messageText);
    chatbox.appendChild(messageDiv);

    chatbox.scrollTop = chatbox.scrollHeight;
}

// Get bot response based on user message
function getBotResponse(userMessage) {
    const possibleResponses = botResponses[userMessage];
    if (possibleResponses) {
        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    } else {
        return "Sorry, I didn't understand that. Can you please rephrase?";
    }
}
function clearChat() {
    chatbox.innerHTML = '';
    sessionStorage.removeItem('userName'); // Optional: clear username for new session
    personalizedGreeting(); // Reinitialize greeting if needed
}

function quickReply(text) {
    userInput.value = text;
    sendMessage();
}

