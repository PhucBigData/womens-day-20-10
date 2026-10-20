/**
 * 20/10 BUTTERFLY MORPHING INTRO EXPERIENCE
 * - Swarm of glowing butterflies converges into a sparkling bouquet of flowers
 * - "Nhận hoa 🌸" button triggers dispersal into "Anh Yêu Em ❤️"
 * - Seamless transition to main website
 */

(function () {
  let introOverlay, canvas, ctx;
  let width, height;
  let particles = [];
  let sparkles = [];
  let state = 'SWARMING_TO_FLOWER'; // 'SWARMING_TO_FLOWER' | 'FLOWER_READY' | 'MORPHING_TO_TEXT' | 'TEXT_READY' | 'DONE'
  let flowerPoints = [];
  let textPoints = [];
  let receiveBtn, enterBtn, skipBtn;
  let animFrameId = null;

  document.addEventListener('DOMContentLoaded', initIntro);

  function initIntro() {
    introOverlay = document.getElementById('intro-overlay');
    if (!introOverlay) return;

    canvas = document.getElementById('intro-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    receiveBtn = document.getElementById('receive-flower-btn');
    enterBtn = document.getElementById('enter-site-btn');
    skipBtn = document.getElementById('skip-intro-btn');

    resize();
    window.addEventListener('resize', resize);

    // Create particles (180 for phone, 280 for desktop - optimized for 60fps)
    const particleCount = width < 600 ? 180 : 260;
    flowerPoints = generateFlowerPoints(width, height, particleCount);
    textPoints = generateTextPoints(width, height, particleCount);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Butterfly(i, flowerPoints[i % flowerPoints.length]));
    }

    // Add extra ambient sparkling stardust
    for (let i = 0; i < 40; i++) {
      sparkles.push(new Sparkle());
    }

    // Attach button listeners
    if (receiveBtn) {
      receiveBtn.addEventListener('click', onReceiveFlower);
    }
    if (enterBtn) {
      enterBtn.addEventListener('click', onEnterSite);
    }
    if (skipBtn) {
      skipBtn.addEventListener('click', onEnterSite);
    }

    // Start animation loop
    render();

    // After 2.8 seconds, flower is formed -> reveal "Nhận hoa" button
    setTimeout(() => {
      if (state === 'SWARMING_TO_FLOWER') {
        state = 'FLOWER_READY';
        if (receiveBtn) {
          receiveBtn.classList.add('visible');
        }
      }
    }, 2800);
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    if (particles.length > 0) {
      flowerPoints = generateFlowerPoints(width, height, particles.length);
      textPoints = generateTextPoints(width, height, particles.length);

      particles.forEach((p, i) => {
        if (state === 'SWARMING_TO_FLOWER' || state === 'FLOWER_READY') {
          p.target = flowerPoints[i % flowerPoints.length];
        } else if (state === 'MORPHING_TO_TEXT' || state === 'TEXT_READY') {
          p.target = textPoints[i % textPoints.length];
        }
      });
    }
  }

  // Butterfly Particle class
  class Butterfly {
    constructor(id, initialTarget) {
      this.id = id;
      // Start from random edges of screen
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) { this.x = Math.random() * width; this.y = -50; }
      else if (edge === 1) { this.x = width + 50; this.y = Math.random() * height; }
      else if (edge === 2) { this.x = Math.random() * width; this.y = height + 50; }
      else { this.x = -50; this.y = Math.random() * height; }

      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.target = initialTarget || { x: width / 2, y: height / 2 };
      this.size = Math.random() * 6 + (width < 600 ? 7 : 9);
      this.wingSpeed = Math.random() * 0.08 + 0.12;
      this.wingAngle = Math.random() * Math.PI;
      this.colorIndex = Math.floor(Math.random() * 4);
      this.colors = [
        { primary: '#ff4d6d', glow: 'rgba(255, 77, 109, 0.7)' },
        { primary: '#ffd166', glow: 'rgba(255, 209, 102, 0.7)' },
        { primary: '#ff758f', glow: 'rgba(255, 117, 143, 0.7)' },
        { primary: '#e29578', glow: 'rgba(226, 149, 120, 0.7)' }
      ];
      this.ease = Math.random() * 0.03 + 0.035;
      this.angle = 0;
      this.scatter = false;
    }

    update() {
      this.wingAngle += this.wingSpeed;

      // Attract towards target with gentle organic sway
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (this.scatter) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
      } else {
        // Natural fluttering motion
        const sway = Math.sin(Date.now() * 0.003 + this.id) * (dist > 40 ? 3 : 1.2);
        this.vx = dx * this.ease + sway;
        this.vy = dy * this.ease + Math.cos(Date.now() * 0.003 + this.id) * 1.5;

        this.x += this.vx;
        this.y += this.vy;
      }

      this.angle = Math.atan2(this.vy, this.vx);
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + Math.PI / 2);

      const flap = Math.abs(Math.sin(this.wingAngle));
      const s = this.size;
      const c = this.colors[this.colorIndex];

      // Wing glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = c.glow;
      ctx.fillStyle = c.primary;

      // Left wing
      ctx.beginPath();
      ctx.ellipse(-s * 0.5 * flap, 0, s * 0.6 * flap, s * 0.9, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.ellipse(s * 0.5 * flap, 0, s * 0.6 * flap, s * 0.9, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Delicate body
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.15, s * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Ambient sparkles
  class Sparkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.speed = Math.random() * 0.02 + 0.01;
    }
    update() {
      this.alpha -= this.speed;
      if (this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.fillStyle = `rgba(255, 230, 180, ${this.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 209, 102, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Generate coordinates forming a gorgeous bouquet
  function generateFlowerPoints(w, h, count) {
    const pts = [];
    const cx = w / 2;
    const cy = h / 2 - 30;
    const scale = Math.min(w, h) * (w < 600 ? 0.32 : 0.28);

    // 5 rose blossoms arranged in a heart/bouquet silhouette
    const blossoms = [
      { x: cx, y: cy - scale * 0.45, r: scale * 0.35 },
      { x: cx - scale * 0.36, y: cy - scale * 0.1, r: scale * 0.32 },
      { x: cx + scale * 0.36, y: cy - scale * 0.1, r: scale * 0.32 },
      { x: cx - scale * 0.2, y: cy + scale * 0.25, r: scale * 0.3 },
      { x: cx + scale * 0.2, y: cy + scale * 0.25, r: scale * 0.3 }
    ];

    for (let i = 0; i < count; i++) {
      if (i < count * 0.8) {
        // Blossom spiral distribution
        const b = blossoms[i % blossoms.length];
        const theta = (i * 137.5 * Math.PI) / 180; // Golden angle phyllotaxis
        const r = Math.sqrt(i / (count * 0.8)) * b.r;
        pts.push({
          x: b.x + Math.cos(theta) * r,
          y: b.y + Math.sin(theta) * r
        });
      } else {
        // Bouquet ribbons & stem wrap
        const t = (i - count * 0.8) / (count * 0.2);
        const stemWidth = (1 - t) * scale * 0.35 + scale * 0.08;
        pts.push({
          x: cx + (Math.random() - 0.5) * stemWidth,
          y: cy + scale * 0.45 + t * scale * 0.65
        });
      }
    }
    return pts;
  }

  // Sample exact typographic coordinates for "Anh Yêu Em ❤️"
  function generateTextPoints(w, h, count) {
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const octx = offscreen.getContext('2d');

    const fontSize = Math.min(w * 0.15, 66);
    octx.font = `bold ${fontSize}px "Dancing Script", "Playfair Display", cursive, sans-serif`;
    octx.fillStyle = '#ffffff';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';

    // Top line: Anh Yêu Em
    octx.fillText('Anh Yêu Em', w / 2, h / 2 - fontSize * 0.5);

    // Heart icon below
    octx.font = `${fontSize * 0.85}px sans-serif`;
    octx.fillText('❤️', w / 2, h / 2 + fontSize * 0.65);

    const imgData = octx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const rawPoints = [];
    const step = w < 600 ? 3 : 4;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const alpha = data[(y * w + x) * 4 + 3];
        if (alpha > 120) {
          rawPoints.push({ x, y });
        }
      }
    }

    if (rawPoints.length === 0) {
      // Fallback in case font loading glitch
      for (let i = 0; i < count; i++) {
        rawPoints.push({ x: w / 2 + (Math.random() - 0.5) * 200, y: h / 2 + (Math.random() - 0.5) * 60 });
      }
    }

    // Shuffle and sample exactly count points
    const sampled = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor((i / count) * rawPoints.length);
      sampled.push(rawPoints[idx]);
    }
    return sampled;
  }

  // Click "Nhận hoa 🌸"
  function onReceiveFlower() {
    if (state !== 'FLOWER_READY') return;
    state = 'MORPHING_TO_TEXT';

    if (receiveBtn) {
      receiveBtn.classList.remove('visible');
    }

    // Sound chime if audioContext available
    if (typeof playTone === 'function') {
      playTone(587.33, 0.4); // D5
      setTimeout(() => playTone(880.0, 0.6), 250); // A5
    }

    // Confetti celebration burst
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
    }

    // First: Scatter butterflies slightly with burst velocity
    particles.forEach(p => {
      p.scatter = true;
      p.vx = (Math.random() - 0.5) * 22;
      p.vy = (Math.random() - 0.5) * 22;
    });

    // After 600ms, butterflies seek the letters "Anh Yêu Em ❤️"
    setTimeout(() => {
      particles.forEach((p, i) => {
        p.scatter = false;
        p.target = textPoints[i % textPoints.length];
        p.ease = Math.random() * 0.04 + 0.04;
      });

      // After 2.5s, text is fully formed and glowing -> reveal "Mở bức thư 20/10 💌"
      setTimeout(() => {
        state = 'TEXT_READY';
        if (enterBtn) {
          enterBtn.classList.add('visible');
        }
      }, 2200);
    }, 600);
  }

  // Enter main site
  function onEnterSite() {
    state = 'DONE';
    if (animFrameId) cancelAnimationFrame(animFrameId);

    // Smoothly fade out intro overlay
    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 1000);
    }

    // Auto-trigger music if user hasn't toggled yet
    if (typeof startMusic === 'function' && !isPlaying) {
      startMusic();
    }
  }

  // Animation Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Soft glowing ambient background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.7);
    bgGrad.addColorStop(0, 'rgba(40, 15, 25, 0.95)');
    bgGrad.addColorStop(1, 'rgba(15, 5, 10, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Update & draw sparkles
    sparkles.forEach(s => {
      s.update();
      s.draw();
    });

    // Update & draw butterflies
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (state !== 'DONE') {
      animFrameId = requestAnimationFrame(render);
    }
  }
})();
