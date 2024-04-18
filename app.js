const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const req = document.querySelector(".req");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;

  text_speak.pitch = 0.1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let date = new Date();
  let hour = date.getHours();
  if (hour >= 0 && hour < 12) {
    speak("Good morning Sir, how may I help you today?");
  } else if (hour > 12 && hour < 17) {
    speak("Good afternoon Sir, how may I help you today?");
  } else {
    speak("Good evening Sir, how may I help you today?");
  }
}

window.addEventListener("load", () => {
  speak("Initializing Jarvis...");
  wishMe();
});
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (e) => {
  const currentIndex = e.resultIndex;
  const transcript = e.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click",  () => {
  content.textContent = "Listening...";
 recognition.start();
});

async function takeCommand(message) {
  const response = await fetch("https://chat-gpt-scsn.onrender.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: `${message}, (give short answer)` }),
  });
  const data = await response.json();
  console.log(data.res.message.content);

  if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speak(finalText);
  } else if (
    message.includes("tell me about yourself") ||
    message.includes("who are you") ||
    message.includes("what is your function")
  ) {
    speak(
      "I'm a Software program created by Sarvar and i'm here to make your digital experience easier"
    );
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speak(finalText);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speak(finalText);
  } else if (message.includes("open gmail")) {
    speak("Opening gmail");
    window.open("https://gmail.com");
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (message.includes("open instagram")) {
    speak("Opening instagram");
    window.open("https://www.instagram.com");
  } else if (message.includes("open github")) {
    speak("Opening github");
    window.open("https://www.github.com");
  } else if (message.includes("on internet")) {
    if (
      message.includes("what is") ||
      message.includes("who is") ||
      message.includes("what are") ||
      message.includes("when was")
    ) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText = "This is what i found on internet regarding " + message;
      speak(finalText);
    } else if (message.includes("wikipedia")) {
      window.open(
        `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
        "_blank"
      );
      const finalText =
        "This is what i found on wikipedia regarding " + message;
      speak(finalText);
    } else {
      speak(data.res.message.content);
    }
  } else {
    speak(data.res.message.content);
  }
}
