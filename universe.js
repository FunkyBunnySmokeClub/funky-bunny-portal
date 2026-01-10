// Funky Bunnyverse Universe Shell: parallax + spores (lightweight)

const u = document.querySelector(".universe");
if (u) {
  const back  = u.querySelector(".uBack");
  const stars = u.querySelector(".uStars");
  const haze  = u.querySelector(".uHaze");
  const front = u.querySelector(".uFront");

  // Parallax (subtle)
  let tx=0, ty=0, x=0, y=0;
  window.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    tx = (e.clientX - cx) / cx;
    ty = (e.clientY - cy) / cy;
  });

  function tick(){
    x += (tx - x) * 0.05;
    y += (ty - y) * 0.05;
    if (back)  back.style.transform  = `translate3d(${x*8}px, ${y*8}px, 0)`;
    if (stars) stars.style.transform = `translate3d(${x*14}px,${y*14}px,0)`;
    if (haze)  haze.style.transform  = `translate3d(${x*18}px,${y*18}px,0)`;
    if (front) front.style.transform = `translate3d(${x*24}px,${y*24}px,0)`;
    requestAnimationFrame(tick);
  }
  tick();

  // Spores
  const layer = u.querySelector("#uSporeLayer");
  const rand = (a,b)=>Math.random()*(b-a)+a;

  const SPORE_DESKTOP = 36;
  const SPORE_MOBILE  = 18;

  function spawnSpores(){
    if (!layer) return;
    layer.innerHTML = "";
    const count = window.matchMedia("(max-width: 720px)").matches ? SPORE_MOBILE : SPORE_DESKTOP;
    const w = window.innerWidth;

    for (let i=0;i<count;i++){
      const s = document.createElement("div");
      s.className = "uSpore";
      const dur = rand(16, 34);
      const x0 = rand(-40, w+40);
      const x1 = x0 + rand(-140, 140);
      const scale = rand(0.7, 1.9);
      const px = rand(3, 7);
      const delay = -rand(0, dur);

      s.style.width = `${px}px`;
      s.style.height = `${px}px`;
      s.style.opacity = String(rand(0.18, 0.78));
      s.style.setProperty("--dur", `${dur}s`);
      s.style.setProperty("--x0", `${x0}px`);
      s.style.setProperty("--x1", `${x1}px`);
      s.style.setProperty("--s", scale);
      s.style.animationDelay = `${delay}s`;

      layer.appendChild(s);
    }
  }

  spawnSpores();
  window.addEventListener("resize", spawnSpores);
}
