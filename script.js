const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");

// Функція для додавання повідомлень
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка до останнього повідомлення
}

// Обробник події для кнопки "Send"
sendBtn.addEventListener("click", function() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    addMessage(message, "user");
    messageInput.value = ""; // Очищаємо поле вводу

    // Симулюємо відповідь від бота
    setTimeout(() => {
      addMessage("Bot: " + message, "bot");
    }, 1000);
  }
});

// Додатково, можна додати підтримку натискання клавіші Enter
messageInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});
