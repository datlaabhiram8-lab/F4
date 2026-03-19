const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

chat.innerHTML = localStorage.getItem("chat") || "";

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function saveChat() {
    localStorage.setItem("chat", chat.innerHTML);
}

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    chat.innerHTML += `<div class="message user">${text}</div>`;
    input.value = "";

    getAIResponse(text);
}

async function getAIResponse(message) {
    const reply = "🤖 AI: " + message;

    chat.innerHTML += `<div class="message bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
    saveChat();
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function(event) {
        input.value = event.results[0][0].transcript;
        sendMessage();
    };
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
