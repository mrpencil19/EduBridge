function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    if (chatbot.classList.contains("hidden")) {
      chatbot.classList.remove("hidden");
    } else {
      chatbot.classList.add("hidden");
    }
  }
  
  
  function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message === "") return;
  
    appendMessage("You", message);
    input.value = "";
  
    // Simulated bot response
    setTimeout(() => {
      getBotResponse(message);
    }, 800);
  }
  
  function appendMessage(sender, message) {
    const chatBody = document.getElementById("chat-body");
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function getBotResponse(message) {
    const typing = document.getElementById("typing");
  
    // Get current hour (24-hour format)
    const now = new Date();
    const hour = now.getHours();
  
    // Only respond between 9 AM and 5 PM
    if (hour < 9 || hour >= 17) {
      typing.classList.add("hidden");
      appendMessage("CampusBot", "Hi there! I'm only available during college hours (9 AM – 5 PM). Please come back then 😊");
      return;
    }
  
    // Show typing animation
    typing.classList.remove("hidden");
  
    // Delay bot response to mimic thinking
    setTimeout(() => {
      typing.classList.add("hidden");
  
      let reply = "I'm still learning. Try asking something else!";
      if (message.includes("course")) {
        reply = "You can check your academic courses and attendance in the LMS dashboard.";
      } else if (message.includes("DSA")) {
        reply = "Start the DSA module from the Coding Tracks section.";
      } else if (message.includes("job")) {
        reply = "Our Job Match Recommender helps align your skills with job openings!";
      }
  
      appendMessage("CampusBot", reply);
    }, 1000);
  }
  
// Voice Recognition Function
function startVoice() {
    const recognition = new window.webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("user-input").value = transcript;
      sendMessage(); // Automatically send message
    };
    recognition.start();
  }
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    document.getElementById("mic-btn").style.display = "none";
  }
      
  