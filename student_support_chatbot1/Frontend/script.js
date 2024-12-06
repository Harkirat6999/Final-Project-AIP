document.getElementById("sendBtn").addEventListener("click", async function() {
    const question = document.getElementById("userInput").value;
    
    // Ensure there's a question to send
    if (question.trim() === "") {
        alert("Please enter a question!");
        return;
    }      

    // Send the question to the backend API
    const response = await fetch('http://127.0.0.1:8000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: question,
        }),
    });

    // Process the response from the API
    const data = await response.json();

    // Show the model's response in the frontend
    document.getElementById("chatbox").innerHTML += `<div class="message bot">${data.answer}</div>`;
});
