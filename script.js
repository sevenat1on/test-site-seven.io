const users = ["Alice", "Bob", "Charlie", "David"];
const userListContainer = document.getElementById("userList");
const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const chatWithUserElement = document.getElementById("chatWithUser");

let currentUser = "User"; // Користувач, який зараз заходить на сайт
let selectedUser = null;

// Функція для відображення списку користувачів
function renderUserList() {
  userListContainer.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    li.addEventListener('click', () => startChatWithUser(user));
    userListContainer.appendChild(li);
  });
}

// Функція для початку чату з вибраним користувачем
function startChatWithUser(user) {
  selectedUser = user;
  chatContainer.style.display = 'block';
  document.querySelector('.user-list').style.display = 'none';
  chatWithUserElement.textContent = `Chat with ${user}`;
  
  loadMessages();
}

// Функція для додавання повідомлення
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка до останнього повідомлення
}

// Функція для збереження повідомлень у localStorage
function saveMessage(message, sender) {
  const chatKey = `${currentUser}-${selectedUser}`;
  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
  messages.push({ message, sender });
  localStorage.setItem(chatKey, JSON.stringify(messages));
}

// Функція для завантаження повідомлень з localStorage
function loadMessages() {
  const chatKey = `${currentUser}-${selectedUser}`;
  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
  messagesContainer.innerHTML = ''; // Очищаємо контейнер перед відображенням
  messages.forEach(msg => {
    addMessage(msg.message, msg.sender);
  });
}

// Обробник події для кнопки "Send"
sendBtn.addEventListener("click", function() {
  const message = messageInput.value;
  if (message.trim() !== "") {
    addMessage(message, "user");
    saveMessage(message, "user");
    messageInput.value = ""; // Очищаємо поле вводу

    // Симулюємо відповідь іншого користувача
    setTimeout(() => {
      const replyMessage = `${selectedUser}: ${message}`;
      addMessage(replyMessage, "other");
      saveMessage(replyMessage, "other");
    }, 1000);
  }
});

// Показуємо список користувачів
renderUserList();
