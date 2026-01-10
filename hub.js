/* ================================
   FUNKY BUNNYVERSE HUB LOGIC
   "Slow down. Observe. Don't let 
   the world program you."
   ================================ */

// =========================================
// PHILOSOPHY WHISPERS
// Random thoughts that appear occasionally
// =========================================
const thoughts = [
  "slow down. the rush isn't real.",
  "you're not behind. there is no race.",
  "breathe. you're exactly where you need to be.",
  "the bunnies are watching. gently.",
  "nature doesn't hurry, yet everything is accomplished.",
  "observe. don't absorb.",
  "your mind is yours. guard it.",
  "the cosmos doesn't keep score.",
  "stillness is rebellion.",
  "you found this place for a reason.",
  "nothing to prove. nothing to fix.",
  "the mushrooms remember what we forgot.",
  "time is weird here. that's the point.",
  "welcome back, bunny.",
  "don't let them rush you.",
  "the algorithm can't reach you here."
];

// =========================================
// DOM ELEMENTS
// =========================================
const enterOverlay = document.getElementById('enterOverlay');
const enterBtn = document.getElementById('enterBtn');
const mainContent = document.getElementById('mainContent');
const ambientToggle = document.getElementById('ambientToggle');
const ambientAudio = document.getElementById('ambientAudio');
const floatingThought = document.getElementById('floatingThought');
const thoughtText = document.getElementById('thoughtText');
const sporeField = document.getElementById('sporeField');
const overlay = document.getElementById('pageTransition');

// Parallax layers
const back = document.querySelector('.layerBack');
const mid = document.querySelector('.layerMid');
const front = document.querySelector('.layerFront');

// State
let isEntered = false;
let isAmbientPlaying = false;
let thoughtTimeout = null;
let thoughtInterval = null;

// =========================================
// ENTER GATE
// "You're here. Sit down. Breathe."
// =========================================
function enterTheBunnyverse() {
  if (isEntered) return;
  isEntered = true;
  
  // Hide enter overlay
  enterOverlay.classList.add('hidden');
  
  // Reveal main content
  setTimeout(() => {
    mainContent.classList.add('revealed');
  }, 300);
  
  // Show ambient toggle
  setTimeout(() => {
    ambientToggle.classList.add('visible');
  }, 800);
  
  // Start floating thoughts
  setTimeout(() => {
    showRandomThought();
    thoughtInterval = setInterval(showRandomThought, 25000 + Math.random() * 15000);
  }, 5000);
  
  // Generate spores
  generateSpores();
  
  // Try to play ambient (may be blocked by browser)
  tryPlayAmbient();
  
  // Save state
  sessionStorage.setItem('entered', 'true');
}

// Check if already entered this session
if (sessionStorage.getItem('entered') === 'true') {
  enterOverlay.classList.add('hidden');
  mainContent.classList.add('revealed');
  ambientToggle.classList.add('visible');
  isEntered = true;
  generateSpores();
  
  // Start thoughts after a bit
  setTimeout(() => {
    showRandomThought();
    thoughtInterval = setInterval(showRandomThought, 25000 + Math.random() * 15000);
  }, 8000);
}

enterBtn?.addEventListener('click', enterTheBunnyverse);

// Also allow Enter key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isEntered) {
    enterTheBunnyverse();
  }
});

// =========================================
// FLOATING THOUGHTS
// Philosophy whispers
// =========================================
function showRandomThought() {
  const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
  
  if (thoughtText) {
    thoughtText.textContent = thought;
  }
  
  floatingThought?.classList.add('visible');
  
  // Hide after a while
  if (thoughtTimeout) clearTimeout(thoughtTimeout);
  thoughtTimeout = setTimeout(() => {
    floatingThought?.classList.remove('visible');
  }, 8000);
}

// =========================================
// AMBIENT AUDIO
// =========================================
function tryPlayAmbient() {
  if (!ambientAudio) return;
  
  ambientAudio.volume = 0.3;
  
  const playPromise = ambientAudio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isAmbientPlaying = true;
        ambientToggle?.classList.add('playing');
      })
      .catch(() => {
        // Autoplay blocked - user needs to click toggle
        isAmbientPlaying = false;
      });
  }
}

ambientToggle?.addEventListener('click', () => {
  if (!ambientAudio) return;
  
  if (isAmbientPlaying) {
    ambientAudio.pause();
    isAmbientPlaying = false;
    ambientToggle.classList.remove('playing');
  } else {
    ambientAudio.volume = 0.3;
    ambientAudio.play()
      .then(() => {
        isAmbientPlaying = true;
        ambientToggle.classList.add('playing');
      })
      .catch((e) => {
        console.log('Audio playback failed:', e);
      });
  }
});

// =========================================
// SPORE GENERATION
// Nature reclaiming the digital
// =========================================
function generateSpores() {
  if (!sporeField) return;
  
  const sporeCount = Math.min(30, Math.floor(window.innerWidth / 50));
  
  for (let i = 0; i < sporeCount; i++) {
    createSpore();
  }
}

function createSpore() {
  const spore = document.createElement('div');
  spore.className = 'spore';
  
  // Random properties
  const size = 2 + Math.random() * 4;
  const startX = Math.random() * 100;
  const startY = 70 + Math.random() * 30; // Start from bottom area
  const driftX = -50 + Math.random() * 100;
  const driftY = -(200 + Math.random() * 300);
  const duration = 12 + Math.random() * 18;
  const delay = Math.random() * 15;
  const opacity = 0.2 + Math.random() * 0.3;
  
  spore.style.cssText = `
    left: ${startX}%;
    top: ${startY}%;
    --size: ${size}px;
    --drift-x: ${driftX}px;
    --drift-y: ${driftY}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --opacity: ${opacity};
  `;
  
  sporeField.appendChild(spore);
  
  // Regenerate when animation completes
  spore.addEventListener('animationiteration', () => {
    // Randomize position for next loop
    spore.style.left = `${Math.random() * 100}%`;
    spore.style.top = `${70 + Math.random() * 30}%`;
  });
}

// =========================================
// PARALLAX
// =========================================
let tx = 0, ty = 0, x = 0, y = 0;

window.addEventListener('mousemove', (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 2;
  ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

function parallax() {
  x += (tx - x) * 0.04;
  y += (ty - y) * 0.04;
  
  if (back) back.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
  if (mid) mid.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
  if (front) front.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
  
  requestAnimationFrame(parallax);
}

parallax();

// =========================================
// LENS DISTORTION TRACKING
// =========================================
document.querySelectorAll('.door').forEach((door) => {
  const core = door.querySelector('.doorCore');
  if (!core) return;
  
  door.addEventListener('mousemove', (e) => {
    const rect = core.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    core.style.setProperty('--mx', `${mx}%`);
    core.style.setProperty('--my', `${my}%`);
  });
  
  door.addEventListener('mouseleave', () => {
    core.style.setProperty('--mx', '50%');
    core.style.setProperty('--my', '45%');
  });
});

// =========================================
// PAGE TRANSITIONS
// =========================================
document.querySelectorAll('.door').forEach((door) => {
  let particleInterval = null;
  
  door.addEventListener('click', (e) => {
    // Allow modifier keys for new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    
    const href = door.getAttribute('href');
    if (!href) return;
    
    // Clear particles
    if (particleInterval) clearInterval(particleInterval);
    
    // Trigger transition
    door.classList.add('is-charging');
    document.body.classList.add('portal-exit');
    if (overlay) overlay.classList.add('active');
    
    // Fade out audio
    if (ambientAudio && isAmbientPlaying) {
      fadeOutAudio(ambientAudio, 400);
    }
    
    setTimeout(() => {
      window.location.href = href;
    }, 520);
  });
  
  // Particles on hover
  door.addEventListener('mouseenter', () => {
    for (let i = 0; i < 6; i++) spawnParticle(door);
    particleInterval = setInterval(() => spawnParticle(door), 140);
  });
  
  door.addEventListener('mouseleave', () => {
    if (particleInterval) {
      clearInterval(particleInterval);
      particleInterval = null;
    }
  });
});

// =========================================
// PARTICLE SYSTEM
// =========================================
function spawnParticle(door) {
  const core = door.querySelector('.doorCore');
  if (!core) return;
  
  const p = document.createElement('div');
  p.className = 'suckParticle';
  
  const r = core.getBoundingClientRect();
  const sx = Math.random() * r.width;
  const sy = Math.random() * r.height;
  
  p.style.left = `${sx}px`;
  p.style.top = `${sy}px`;
  core.appendChild(p);
  
  const animation = p.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${r.width / 2 - sx}px, ${r.height / 2 - sy}px) scale(0.1)`, opacity: 0 }
    ],
    { duration: 600, easing: 'cubic-bezier(.2, .9, .2, 1)' }
  );
  
  animation.onfinish = () => p.remove();
}

// =========================================
// AUDIO UTILITIES
// =========================================
function fadeOutAudio(audio, duration) {
  const startVolume = audio.volume;
  const steps = 20;
  const stepDuration = duration / steps;
  const volumeStep = startVolume / steps;
  
  let currentStep = 0;
  
  const fadeInterval = setInterval(() => {
    currentStep++;
    audio.volume = Math.max(0, startVolume - (volumeStep * currentStep));
    
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      audio.pause();
    }
  }, stepDuration);
}

// =========================================
// EASTER EGG: KONAMI CODE
// Up Up Down Down Left Right Left Right B A
// =========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateSecretMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateSecretMode() {
  document.body.style.filter = 'hue-rotate(180deg)';
  showSecretThought();
  
  setTimeout(() => {
    document.body.style.filter = '';
  }, 5000);
}

function showSecretThought() {
  const secretThoughts = [
    "🐰 you found the secret. the bunnies approve.",
    "the matrix has you... but not here.",
    "reality.exe has stopped responding.",
    "consciousness level: unlocked.",
    "you're one of us now."
  ];
  
  if (thoughtText) {
    thoughtText.textContent = secretThoughts[Math.floor(Math.random() * secretThoughts.length)];
  }
  floatingThought?.classList.add('visible');
  
  if (thoughtTimeout) clearTimeout(thoughtTimeout);
  thoughtTimeout = setTimeout(() => {
    floatingThought?.classList.remove('visible');
  }, 5000);
}

// =========================================
// VISIBILITY API
// Pause animations when tab not visible
// =========================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (ambientAudio && isAmbientPlaying) {
      ambientAudio.pause();
    }
  } else {
    if (ambientAudio && isAmbientPlaying) {
      ambientAudio.play().catch(() => {});
    }
  }
});

// =========================================
// CONSOLE EASTER EGG
// =========================================
console.log(`
%c🐰 FUNKY BUNNYVERSE 🐰
%c"slow down. observe. don't let the world program you."

You found the console. The bunnies see you.
Type %cfunkyBunny()%c for a surprise.

`, 
  'color: #a855f7; font-size: 24px; font-weight: bold;',
  'color: #33d6ff; font-size: 12px;',
  'color: #7CFF6B; font-weight: bold;',
  'color: #33d6ff;'
);

window.funkyBunny = function() {
  activateSecretMode();
  return "🐰✨ Welcome to the inner circle, bunny. ✨🐰";
};

// =========================================
// THE WARREN (Hidden Room Access)
// Click the neon sign 7 times
// =========================================
const neonSign = document.querySelector('.neonSign');
let neonClicks = 0;
let neonClickTimeout = null;

if (neonSign) {
  neonSign.style.cursor = 'pointer';
  
  neonSign.addEventListener('click', () => {
    neonClicks++;
    
    // Reset after 3 seconds of no clicks
    if (neonClickTimeout) clearTimeout(neonClickTimeout);
    neonClickTimeout = setTimeout(() => {
      neonClicks = 0;
    }, 3000);
    
    // Visual feedback
    neonSign.style.transform = `scale(${1 + neonClicks * 0.02})`;
    setTimeout(() => {
      neonSign.style.transform = '';
    }, 150);
    
    // At 7 clicks, reveal the warren
    if (neonClicks === 7) {
      neonClicks = 0;
      
      // Dramatic effect
      document.body.style.transition = 'filter 0.5s ease';
      document.body.style.filter = 'brightness(0)';
      
      setTimeout(() => {
        window.location.href = './pages/warren.html';
      }, 800);
    }
  });
}