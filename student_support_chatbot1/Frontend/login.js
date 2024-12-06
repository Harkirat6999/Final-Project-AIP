
const validUsername = "500223895";
const validPassword = "pass123";


const loginForm = document.getElementById('loginForm');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');


loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        window.location.href = "index.html"; 
    } else {
        alert("Invalid username or password. Please try again.");
    }
});


forgotPasswordBtn.addEventListener('click', function() {
    alert("Reset link has been sent to your email!");
});
