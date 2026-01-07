const enterBtn = document.getElementById("enterBtn");

const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

const streaksCanvas = document.getElementById("streaks");
const streaksCtx = streaksCanvas.getContext("2d");

let w, h;
let stars = [];
let streaks = [];
let hyper = false;

function resize(){
  w = starsCanvas.width = streaksCanvas.width = window.innerWidth;
  h = starsCanvas.height = streaksCanvas.height = window.innerHeight;
  makeStars();
  makeStreaks();
}
window.addEventListener("resize", resize);

function makeStars(){
  const count = Math.floor((w * h) / 16000);
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.2,
    v: Math.random() * 0.55 + 0.12
  }));
}

function makeStreaks(){
  const count = Math.floor((w * h) / 90000);
  streaks = new Array(count).fill(0).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    len: Math.random() * 120 + 40,
    speed: Math.random() * 2 + 1
  }));
}

function drawStars(){
  starsCtx.clearRect(0,0,w,h);

  // soft haze blobs
  starsCtx.globalAlpha = 0.10;
  starsCtx.fillStyle = "#8a2be2";
  starsCtx.beginPath();
  starsCtx.arc(w*0.72, h*0.28, Math.min(w,h)*0.35, 0, Math.PI*2);
  starsCtx.fill();

  starsCtx.globalAlpha = 0.08;
  starsCtx.fillStyle = "#31ffd6";
  starsCtx.beginPath();
  starsCtx.arc(w*0.28, h*0.70, Math.min(w,h)*0.28, 0, Math.PI*2);
  starsCtx.fill();

  starsCtx.globalAlpha = 0.95;
  for(const s of stars){
    s.y += s.v * (hyper ? 8 : 2.0);
    s.x += Math.sin(Date.now()/1300) * 0.06;

    if(s.y > h + 10){
      s.y = -10;
      s.x = Math.random() * w;
    }

    starsCtx.beginPath();
    starsCtx.fillStyle = "white";
    starsCtx.arc(s.x, s.y, s.r * (hyper ? 1.6 : 1), 0, Math.PI*2);
    starsCtx.fill();
  }
}

function drawStreaks(){
  streaksCtx.clearRect(0,0,w,h);

  if(!hyper){
    return; // only show streaks in hyper mode
  }

  streaksCtx.globalAlpha = 0.7;
  for(const st of streaks){
    st.y += st.speed * 18;
    if(st.y > h + st.len){
      st.y = -st.len;
      st.x = Math.random() * w;
    }

    const grad = streaksCtx.createLinearGradient(st.x, st.y, st.x, st.y + st.len);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.7)");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    streaksCtx.strokeStyle = grad;
    streaksCtx.lineWidth = 1.1;
    streaksCtx.beginPath();
    streaksCtx.moveTo(st.x, st.y);
    streaksCtx.lineTo(st.x, st.y + st.len);
    streaksCtx.stroke();
  }
}

function loop(){
  drawStars();
  drawStreaks();
  requestAnimationFrame(loop);
}

enterBtn.addEventListener("click", () => {
  document.body.classList.add("entering");
  setTimeout(() => {
    window.location.href = "hub.html";
  }, 1100);
});

window.addEventListener("keydown", (e) => {
  if(e.code === "Space"){
    e.preventDefault();
    hyper = !hyper;
    document.body.classList.toggle("hyper", hyper);
  }
});

resize();
loop();
