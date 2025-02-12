document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const exitBtn = document.getElementById('exit-btn');
    const toggleChatbotBtn = document.getElementById('toggle-chatbot');
    const chatContainer = document.querySelector('.chat-container');
    let chatStarted = false;

    function appendMessage(message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function startConversation() {
        if (!chatStarted) {
            appendMessage('¡Hola! Bienvenid@ al hotel Malibu. ¿Cuál es su consulta?');
            appendMessage('Opciones:');
            appendMessage('1. Reservas');
            appendMessage('2. Precios');
            appendMessage('3. Habitaciones');
            chatStarted = true;
        }
    }

    function toggleChatbot() {
        chatContainer.classList.toggle('show-chatbot');
        if (chatContainer.classList.contains('show-chatbot')) {
            startConversation();
        } else {
            chatBox.innerHTML = '';
            chatStarted = false;
        }
    }

    function handleUserMessage(message) {
        switch (message.toLowerCase()) {
            case '1':
            case 'reservas':
                appendMessage('Aquí tienes la información de reservas:');
                appendMessage('Número telefónico para reservas: 983211221');
                appendMessage('Horario de atención: Todos los días de 8:00 AM a 11:00 PM');
                appendMessage('Correo electrónico para reservas: Malibudescansos@hotmail.com');
                appendMessage('Número de WhatsApp: 956843220');
                appendMessage('Horario de atención: Lunes a Sábado de 9:00 AM a 10:00 PM');
                break;
            case '2':
            case 'precios':
                appendMessage('Aquí tienes la lista de precios por noche:');
                appendMessage('Habitación Individual: $100');
                appendMessage('Habitación Doble: $150');
                appendMessage('Suite: $250');
                appendMessage('Promoción: Habitación individual + Internet 5G: $130');
                appendMessage('Promoción: Habitación individual + Cable premium + Internet 5G: $145');
                appendMessage('Habitación Premium: $300');
                appendMessage('Promoción: Habitación doble + Internet 5G: $180');
                break;
            case '3':
            case 'habitaciones':
                appendMessage('Aquí está el estado de las habitaciones:');
                appendMessage('Habitaciones Ocupadas: 1, 2, 4, 5, 9, 21, 27, 32, 45');
                appendMessage('Habitaciones Disponibles: 3, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 28, 29, 30, 31, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49');
                break;
            default:
                appendMessage('Lo siento, no entendí tu consulta. Por favor elige una de las opciones del menú.');
        }
    }

    sendBtn.addEventListener('click', function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            appendMessage('Usuario: ' + userMessage);
            handleUserMessage(userMessage);
            userInput.value = '';
        }
    });

    exitBtn.addEventListener('click', function () {
        chatBox.innerHTML = '';
        chatContainer.classList.remove('show-chatbot');
        chatStarted = false;
    });

    toggleChatbotBtn.addEventListener('click', toggleChatbot);

    // Iniciar la conversación al cargar el chatbot
    startConversation();
});
