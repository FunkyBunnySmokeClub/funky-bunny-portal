// ====== CONFIG ======
const DESTINATION_URL = "https://funkybunnysmokeclub.com";

// ====== MANTRAS (Funky Bunny vibe) ======
const MANTRAS = [
  "Cosmic Bunny wisdom: reality is elastic — stretch it gently.",
  "If the universe is a beat… we’re just vibin’ between the basslines.",
  "Breathe in… breathe out… now let the funk do the thinking.",
  "Some doors open with keys. This one opens with curiosity.",
  "Not lost — just exploring the weird parts of the map.",
  "You don’t chase the vibe. You become it.",
  "The portal doesn’t judge. It just shows you what you brought with you.",
  "Mushrooms don’t ‘take you’ anywhere… they remind you where you already are."
];

function addMantra() {
  const brandText = document.querySelector(".brandText");
  if (!brandText) return;

  const mantra = document.createElement("div");
  mantra.className = "mantra";
  mantra.innerHTML = `<span class="spark"></span><span id="mantraLine"></span>`;
  brandText.appendChild(mantra);

  const lineEl = mantra.querySelector("#mantraLine");

  function rotate() {
    const text = MANTRAS[Math.floor(Math.random() * MANTRAS.length)];
    lineEl.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0px)" }], { duration: 520, fill: "forwards" });
    lineEl.textContent = text;
    setTimeout(() => {
      lineEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, fill: "forwards" });
    }, 5200);
  }

  rotate();
  setInterval(rotate, 6000);
}
addMantra();

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

const CENTER = { x: () => w * 0.5, y: () => h * 0.56 };

function rand(min, max) { return Math.random() * (max - min) + min; }

let warping = false;
let warpPower = 1;
let hueShift = 0;

// Star/particle field (spiral)
const particles = [];
const STAR_COUNT = 1050;

function makeParticle() {
  const angle = rand(0, Math.PI * 2);
  const radius = rand(Math.min(w, h) * 0.26, Math.min(w, h) * 0.65);
  return {
    a: angle,
    r: radius,
    va: rand(0.007, 0.022),
    vr: rand(0.30, 1.55),
    z: rand(0.2, 1),
    size: rand(0.7, 2.6),
    hue: Math.random() < 0.55 ? rand(265, 305) : rand(175, 205),
    alpha: rand(0.22, 0.95),
  };
}
for (let i = 0; i < STAR_COUNT; i++) particles.push(makeParticle());

// Sparkle dust (magical specks that float)
const dust = [];
const DUST_COUNT = 140;
function makeDust() {
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-0.08, 0.08),
    vy: rand(-0.06, 0.06),
    r: rand(0.8, 2.2) * dpr,
    a: rand(0.05, 0.22),
    hue: Math.random() < 0.5 ? 280 : 190
  };
}
for (let i = 0; i < DUST_COUNT; i++) dust.push(makeDust());

function drawNebula() {
  const cx = CENTER.x(), cy = CENTER.y();
  const maxR = Math.min(w, h) * 0.62;

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  g.addColorStop(0, `hsla(${275 + hueShift}, 90%, 60%, ${0.18 * warpPower})`);
  g.addColorStop(0.22, `hsla(${320 + hueShift}, 90%, 60%, ${0.08 * warpPower})`);
  g.addColorStop(0.45, `hsla(${190 + hueShift}, 90%, 55%, ${0.06 * warpPower})`);
  g.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // vignette
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.fillRect(0, 0, w, h);
}

function drawDust() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const p of dust) {
    p.x += p.vx * dpr * (warping ? 6 : 1);
    p.y += p.vy * dpr * (warping ? 6 : 1);

    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;

    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue + hueShift}, 95%, 70%, ${p.a})`;
    ctx.arc(p.x, p.y, p.r * (warping ? 1.35 : 1), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWormholeRing(ringR) {
  const cx = CENTER.x(), cy = CENTER.y();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (let i = 0; i < 5; i++) {
    const lw = (7 + i * 5) * dpr;
    const alpha = (0.10 - i * 0.012) * warpPower;
    const hue = 275 + hueShift + i * 14;

    ctx.beginPath();
    ctx.strokeStyle = `hsla(${hue}, 92%, 62%, ${Math.max(0.02, alpha)})`;
    ctx.lineWidth = lw;

    // slightly wobbly ring (magic)
    const wobble = (Math.sin((performance.now() / 550) + i) * 6 + Math.cos((performance.now() / 430) + i) * 5) * dpr;
    ctx.arc(cx, cy, ringR + i * 10 * dpr + wobble, 0, Math.PI * 2);
    ctx.stroke();
  }

  // inner “seal”
  ctx.beginPath();
  ctx.strokeStyle = `hsla(${190 + hueShift}, 95%, 65%, ${0.22 * warpPower})`;
  ctx.lineWidth = 2 * dpr;
  ctx.setLineDash([6 * dpr, 10 * dpr]);
  ctx.arc(cx, cy, ringR * 0.72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

function drawStars(ringR) {
  const cx = CENTER.x(), cy = CENTER.y();

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const p of particles) {
    const speedBoost = warping ? 3.2 : 1;
    p.a += p.va * speedBoost * warpPower;
    p.r -= p.vr * speedBoost * warpPower;

    if (p.r < ringR * 0.55) {
      Object.assign(p, makeParticle());
      p.r = Math.min(w, h) * 0.68;
    }

    const x = cx + Math.cos(p.a) * p.r;
    const y = cy + Math.sin(p.a) * p.r;

    const s = p.size * dpr * (0.55 + p.z) * (warping ? 1.35 : 1);
    const hue = p.hue + hueShift;

    if (warping) {
      const streak = 24 * dpr * warpPower;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(p.a) * streak, y + Math.sin(p.a) * streak);
      ctx.strokeStyle = `hsla(${hue}, 95%, 65%, ${0.18 * p.alpha})`;
      ctx.lineWidth = Math.max(1, s * 0.55);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${hue}, 95%, 65%, ${p.alpha})`;
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function render() {
  ctx.clearRect(0, 0, w, h);

  // space fade
  ctx.fillStyle = "rgba(4,4,10,0.35)";
  ctx.fillRect(0, 0, w, h);

  hueShift += warping ? 0.35 : 0.10;

  drawNebula();
  drawDust();

  const ringR = Math.min(w, h) * 0.12 * (1 + (warpPower - 1) * 0.20);
  drawWormholeRing(ringR);
  drawStars(ringR);

  requestAnimationFrame(render);
}
render();

// ====== AUDIO: whoosh + sparkle chime ======
let audioCtx;
function safeAudio() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playWhoosh() {
  try {
    const ac = safeAudio();
    const now = ac.currentTime;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const filter = ac.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 1.9);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(240, now + 1.9);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.30, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + 2.05);
  } catch {}
}

function playChime() {
  try {
    const ac = safeAudio();
    const now = ac.currentTime;

    const freqs = [880, 1174, 1480]; // airy triad
    freqs.forEach((f, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03 + i * 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 + i * 0.06);

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.start(now + i * 0.02);
      osc.stop(now + 0.7 + i * 0.08);
    });
  } catch {}
}

// ====== ENTER BUTTON ======
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  if (warping) return;

  warping = true;
  document.body.classList.add("warping");
  playChime();
  playWhoosh();

  const start = performance.now();
  const DURATION = 2300;

  function ramp(t) {
    const p = Math.min(1, (t - start) / DURATION);
    warpPower = 1 + (p ** 1.55) * 6.2;

    if (p < 1) requestAnimationFrame(ramp);
  }
  requestAnimationFrame(ramp);

  setTimeout(() => {
    window.location.href = DESTINATION_URL;
  }, 2600);
});
