let inputBuffer = "";
let timer = null;

document.addEventListener("keydown", (e) => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) || 
      document.activeElement.isContentEditable) return;

  const key = e.key.toLowerCase();

  if (['s', 'b', 'g'].includes(key)) {
    inputBuffer = key;
    resetTimer();
    e.preventDefault();
    return;
  }

  if (inputBuffer.length > 0 && /^[0-9]$/.test(key)) {
    inputBuffer += key;
    resetTimer();
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(executeAction, 300);
}

function executeAction() {
  if (inputBuffer.length < 2) {
    inputBuffer = "";
    return;
  }

  const action = inputBuffer[0];
  const valueStr = inputBuffer.slice(1);
  const video = document.querySelector("video");

  if (video) {
    if (action === 'g') {
      video.currentTime = parseTimestamp(valueStr);
    } else {
      const seconds = parseInt(valueStr);
      if (!isNaN(seconds)) {
        video.currentTime += (action === 's' ? seconds : -seconds);
      }
    }
  }
  inputBuffer = ""; 
}

function parseTimestamp(str) {
  if (str.length <= 2) return parseInt(str);  

  const seconds = parseInt(str.slice(-2));
  const minutes = parseInt(str.slice(0, -2)) || 0;
  return (minutes * 60) + seconds;
}
