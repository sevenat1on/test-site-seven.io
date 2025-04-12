// Функції для роботи з локальним зберіганням (localStorage)
function saveUser(username) {
  localStorage.setItem('currentUser', username);
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function saveUserList(users) {
  localStorage.setItem('userList', JSON.stringify(users));
}

function getUserList() {
  return JSON.parse(localStorage.getItem('userList')) || [];
}

// Перевірка чи є користувач в локальному сховищі
const currentUser = getCurrentUser();

// Функція для відображення списку користувачів
function renderUserList() {
  const userListContainer = document.getElementById("userList");
  userListContainer.innerHTML = '';

  const users = getUserList();
  
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    li.addEventListener('click', () => startChatWithUser(user));
    userListContainer.appendChild(li);
  });
}

// Функція для відображення чату з вибраним користувачем
function startChatWithUser(user) {
  const chatContainer = document.getElementById("chatContainer");
  const userListContainer = document.getElementById("userListContainer");

  chatContainer.style.display = 'block';
  userListContainer.style.display = 'none';
  document.getElementById("chatWithUser").textContent = `Chat with ${user}`;

  // Завантажуємо повідомлення з localStorage
  loadMessages(user);
}

// Функція для додавання повідомлення в chat
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  document.getElementById("messages").appendChild(messageElement);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

// Функція для збереження повідомлень у localStorage
function saveMessage(message, sender, user) {
  const chatKey = `${getCurrentUser()}-${user}`;
  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
  messages.push({ message, sender });
  localStorage.setItem(chatKey, JSON.stringify(messages));
}

// Функція для завантаження повідомлень з localStorage
function loadMessages(user) {
  const chatKey = `${getCurrentUser()}-${user}`;
  const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = '';  // Очистка контейнера перед завантаженням нових повідомлень
  messages.forEach(msg => {
    addMessage(msg.message, msg.sender);
  });
}

// Подія для кнопки "Set Name"
document.getElementById("setUsernameBtn").addEventListener("click", () => {
  const usernameInput = document.getElementById("usernameInput").value.trim();
  if (usernameInput) {
    saveUser(usernameInput);

    // Додаємо користувача до списку користувачів в localStorage
    const users = getUserList();
    if (!users.includes(usernameInput)) {
      users.push(usernameInput);
      saveUserList(users);
    }

    // Перехід до списку користувачів
    document.getElementById("usernameForm").style.display = 'none';
    document.getElementById("userListContainer").style.display = 'block';
    renderUserList();
  }
});

// Подія для кнопки "Send"
document.getElementById("sendBtn").addEventListener("click", function() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  const selectedUser = document.getElementById("chatWithUser").textContent.replace('Chat with ', '');

  if (message) {
    addMessage(message, "user");
    saveMessage(message, "user", selectedUser);

    // Симулюємо відповідь
    setTimeout(() => {
      const replyMessage = `${selectedUser}: ${message}`;
      addMessage(replyMessage, "other");
      saveMessage(replyMessage, "other", selectedUser);
    }, 1000);

    messageInput.value = '';
  }
});

// Якщо користувач уже авторизований, показуємо список користувачів
if (currentUser) {
  document.getElementById("usernameForm").style.display = 'none';
  document.getElementById("userListContainer").style.display = 'block';
  renderUserList();
}
