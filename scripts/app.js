const openFileBtn = document.getElementById("openFile");
const playPauseBtn = document.getElementById("playPause");
const timeDisplay = document.getElementById("time");

let audio = new Audio();
let isPlaying = false;

openFileBtn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  if (filePath) {
    audio.src = filePath;
    audio.load();
    playPauseBtn.disabled = false;
    timeDisplay.textContent = "00:00 / 00:00";
  }
});

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.textContent = "Pause";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.textContent = "Play";
});

audio.addEventListener("timeupdate", () => {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  timeDisplay.textContent = `${current} / ${duration}`;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
