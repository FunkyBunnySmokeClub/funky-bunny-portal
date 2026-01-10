const HUB_URL = "hub.html";

const portal = document.getElementById("portal");
const video = document.getElementById("portalVideo");
const fade = document.getElementById("fade");
const skipBtn = document.getElementById("skipBtn");

// Attempt sound-on autoplay (may be blocked by browser policy)
video.muted = false;
video.volume = 1.0;

video.play().catch(() => {
  // If blocked, fall back to muted autoplay so portal still runs
  video.muted = true;
  video.play().catch(() => {});
});

// On first user interaction anywhere, unmute (best possible “sound on default” behavior)
function unlockAudio() {
  video.muted = false;
  video.volume = 1.0;
  video.play().catch(() => {});
  window.removeEventListener("pointerdown", unlockAudio);
  window.removeEventListener("keydown", unlockAudio);
}
window.addEventListener("pointerdown", unlockAudio, { once: true });
window.addEventListener("keydown", unlockAudio, { once: true });

function goHub() {
  portal.classList.add("is-transitioning");
  setTimeout(() => {
    window.location.href = HUB_URL;
  }, 720);
}

skipBtn.addEventListener("click", goHub);

// If the video ends, go to hub
video.addEventListener("ended", goHub);

// If you want it to loop for vibe while people watch, leave loop on.
// If you want it to end and transition, remove "loop" from the HTML video tag.
