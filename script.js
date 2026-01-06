// ====== CONFIG ======
// Set where the portal should send people after the wormhole.
const DESTINATION_URL = "https://funkybunnysmokeclub.com"; // change later if you want a different landing

// ====== CANVAS WORMHOLE ======
const canvas = document.getElementById("wormhole");
const ctx = canvas.getContext("2d", { alpha: true });

let w = 0, h = 0, dpr = 1;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = Math.floor(window.innerWidth * dpr);
  h = Math.floor(window.innerHeight * dpr);
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
}
window.addEventListener("resize", resize);
resize();

// Particles that spiral into the center
const CENTER = { x: () => w * 0.5, y: () => h * 0.55 };

const particles = [];
const STAR_COUNT = 900;

function rand(min, max) { return Math.random() * (max - min) + min; }

function makeParticle() {
  // Start around outer ring
  const angle = rand(0, Math.PI * 2);
  const radius = rand(Math.min(w, h) * 0.25, Math.min(w, h) * 0.60);
  return {
    a: angle,
    r: radius,
    // spiral speed & drift
    va: rand(0.006, 0.02),
    vr: rand(0.25, 1.25),
    // depth & size
    z: rand(0.2, 1),
    size: rand(0.6, 2.2),
    hue: Math.random() < 0.5 ? rand(260, 300) : rand(180, 200),
    alpha: rand(0.2, 0.95),
  };
}

for (let i = 0; i < STAR_COUNT; i++) particles.push(makeParticle());

let warping = false;
let warpPower = 1;

function drawBackgroundGlow() {
  const cx = CENTER.x();
  const cy = CENTER.y();
  const maxR = Math.min(w, h) * 0.55;

  // soft vignette + center glow
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  g.addColorStop(0, `rgba(124,58,237,${0.25 * warpPower})`);
  g.addColorStop(0.25, `rgba(236,72,153,${0.12 * warpPower})`);
  g.addColorStop(0.55, `rgba(34,211,238,${0.08 * warpPower})`);
  g.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // vignette edges
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, w, h);
}

function render() {
  ctx.clearRect(0, 0, w, h);

  // space fade
  ctx.fillStyle = "rgba(5,5,10,0.35)";
  ctx.fillRect(0, 0, w, h);

  drawBackgroundGlow();

  const cx = CENTER.x();
  const cy = CENTER.y();

  // Wormhole ring
  const ringR = Math.min(w, h) * 0.12 * (1 + (warpPower - 1) * 0.18);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${i === 0 ? "124,58,237" : i === 1 ? "236,72,153" : i === 2 ? "34,211,238" : "255,255,255"},${0.11 * warpPower})`;
    ctx.lineWidth = (8 + i * 6) * dpr;
    ctx.arc(cx, cy, ringR + i * 10 * dpr, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Particles
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const p of particles) {
    // spiral inward
    const speedBoost = warping ? 2.8 : 1;
    p.a += p.va * speedBoost * warpPower;
    p.r -= p.vr * speedBoost * warpPower;

    // reset when it reaches center
    if (p.r < ringR * 0.55) {
      Object.assign(p, makeParticle());
      p.r = Math.min(w, h) * 0.62;
    }

    const x = cx + Math.cos(p.a) * p.r;
    const y = cy + Math.sin(p.a) * p.r;

    const s = p.size * dpr * (0.6 + p.z) * (warping ? 1.25 : 1);
    ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${p.alpha})`;

    // streak effect during warp
    if (warping) {
      const streak = 18 * dpr * warpPower;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(p.a) * streak, y + Math.sin(p.a) * streak);
      ctx.strokeStyle = `hsla(${p.hue}, 95%, 65%, ${0.22 * p.alpha})`;
      ctx.lineWidth = Math.max(1, s * 0.5);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  requestAnimationFrame(render);
}
render();

// ====== AUDIO (simple “warp whoosh”) ======
let audioCtx;
function playWhoosh() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 1.8);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 1.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  } catch (e) {
    // If audio is blocked, no problem.
  }
}

// ====== ENTER BUTTON ======
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  if (warping) return;

  warping = true;
  document.body.classList.add("warping");
  playWhoosh();

  // ramp warp power up fast
  const start = performance.now();
  const DURATION = 2200;

  function ramp(t) {
    const p = Math.min(1, (t - start) / DURATION);
    // ease in
    warpPower = 1 + (p ** 1.7) * 5.5;

    if (p < 1) {
      requestAnimationFrame(ramp);
    }
  }
  requestAnimationFrame(ramp);

  // redirect after the animation
  setTimeout(() => {
    window.location.href = DESTINATION_URL;
  }, 2500);
});
