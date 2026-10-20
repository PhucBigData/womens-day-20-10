/**
 * 20/10 INTRO EXPERIENCE - LUXURY BOUQUET & CRYSTAL CLEAR TYPOGRAPHY
 * - Features a gorgeous, glowing luxury rose bouquet with realistic 3D fluttering butterflies
 * - Clicking "Nhận Bó Hoa Tình Yêu 💐" bursts into golden stardust & crystal clear "Anh Yêu Em ❤️"
 * - 100% readable, elegant, and breathtaking
 */

(function () {
  let introOverlay, canvas, ctx;
  let width, height;
  let butterflies = [];
  let sparkles = [];
  let currentScene = 1; // 1: Bouquet, 2: "Anh Yêu Em" Text, 3: Entered Site
  let animFrameId = null;

  document.addEventListener('DOMContentLoaded', initIntro);

  function initIntro() {
    introOverlay = document.getElementById('intro-overlay');
    if (!introOverlay) return;

    canvas = document.getElementById('intro-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    const receiveBtn = document.getElementById('receive-flower-btn');
    const enterBtn = document.getElementById('enter-site-btn');
    const skipBtn = document.getElementById('skip-intro-btn');
    const receiverEl = document.getElementById('intro-receiver-name');

    if (receiverEl && typeof CONFIG !== 'undefined' && CONFIG.receiverName) {
      receiverEl.textContent = CONFIG.receiverName;
    }

    resize();
    window.addEventListener('resize', resize);

    // Create 45 delicate, glowing butterflies (perfect balance of beauty & 60fps performance)
    const count = width < 600 ? 35 : 50;
    for (let i = 0; i < count; i++) {
      butterflies.push(new Butterfly(i));
    }

    // Create 50 ambient stardust sparkles
    for (let i = 0; i < 50; i++) {
      sparkles.push(new Sparkle());
    }

    if (receiveBtn) {
      receiveBtn.addEventListener('click', onReceiveFlower);
    }
    if (enterBtn) {
      enterBtn.addEventListener('click', onEnterSite);
    }
    if (skipBtn) {
      skipBtn.addEventListener('click', onEnterSite);
    }

    // Start render loop
    render();
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // Realistic 3D Glowing Butterfly
  class Butterfly {
    constructor(id) {
      this.id = id;
      this.initOrbit();
      this.x = this.orbitCenterX + Math.cos(this.angle) * this.orbitRadius;
      this.y = this.orbitCenterY + Math.sin(this.angle) * (this.orbitRadius * 0.7);
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 5 + (width < 600 ? 6 : 8);
      this.wingSpeed = Math.random() * 0.08 + 0.14;
      this.wingAngle = Math.random() * Math.PI;
      this.colorIndex = Math.floor(Math.random() * 4);
      this.colors = [
        { primary: '#ffd700', glow: 'rgba(255, 215, 0, 1)' },     // 24K Brilliant Gold
        { primary: '#ffea75', glow: 'rgba(255, 234, 117, 0.95)' }, // Light Champagne Gold
        { primary: '#f39c12', glow: 'rgba(243, 156, 18, 0.9)' },   // Warm Amber Gold
        { primary: '#ffeaa7', glow: 'rgba(255, 240, 180, 0.95)' }  // Shimmering Gold Dust
      ];
      this.isBursting = false;
    }

    initOrbit() {
      this.angle = Math.random() * Math.PI * 2;
      this.orbitSpeed = (Math.random() * 0.012 + 0.008) * (Math.random() > 0.5 ? 1 : -1);
      this.orbitRadius = Math.random() * (width < 600 ? 110 : 160) + 40;
      this.orbitCenterX = width / 2;
      this.orbitCenterY = height / 2 - 20;
      this.verticalBob = Math.random() * 20;
    }

    update() {
      this.wingAngle += this.wingSpeed;

      if (this.isBursting) {
        // Spiral explosion effect when "Nhận hoa" clicked
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;

        // Settle into orbit around the text scene
        if (Math.abs(this.vx) < 0.8 && Math.abs(this.vy) < 0.8) {
          this.isBursting = false;
          this.orbitCenterX = width / 2;
          this.orbitCenterY = height / 2;
          this.orbitRadius = Math.random() * (width < 600 ? 140 : 220) + 50;
        }
      } else {
        // Graceful orbit around focal point (bouquet or love text)
        this.angle += this.orbitSpeed;
        const targetX = this.orbitCenterX + Math.cos(this.angle) * this.orbitRadius;
        const targetY = this.orbitCenterY + Math.sin(this.angle) * (this.orbitRadius * 0.6) + Math.sin(Date.now() * 0.003 + this.id) * this.verticalBob;

        this.x += (targetX - this.x) * 0.06;
        this.y += (targetY - this.y) * 0.06;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Facing trajectory angle
      const flyAngle = this.angle + Math.PI / 2;
      ctx.rotate(flyAngle);

      const flap = Math.abs(Math.sin(this.wingAngle));
      const s = this.size;
      const c = this.colors[this.colorIndex];

      // Wing glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = c.glow;
      ctx.fillStyle = c.primary;

      // Left wing
      ctx.beginPath();
      ctx.ellipse(-s * 0.52 * flap, 0, s * 0.68 * flap, s * 0.98, -0.25, 0, Math.PI * 2);
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.ellipse(s * 0.52 * flap, 0, s * 0.68 * flap, s * 0.98, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Wing gold glitter highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-s * 0.45 * flap, -s * 0.3, s * 0.16, 0, Math.PI * 2);
      ctx.arc(s * 0.45 * flap, -s * 0.3, s * 0.16, 0, Math.PI * 2);
      ctx.fill();

      // Delicate gold butterfly body
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#fffbe6';
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.18, s * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Sparkling Stardust
  class Sparkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.speed = Math.random() * 0.02 + 0.012;
      this.vy = -(Math.random() * 0.5 + 0.2); // Gently floating upwards
    }
    update() {
      this.alpha -= this.speed;
      this.y += this.vy;
      if (this.alpha <= 0 || this.y < 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.fillStyle = `rgba(255, 235, 120, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 215, 0, 1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Handle clicking "Nhận Bó Hoa Tình Yêu 💐"
  function onReceiveFlower() {
    if (currentScene !== 1) return;
    currentScene = 2;

    const sceneBouquet = document.getElementById('intro-scene-bouquet');
    const sceneText = document.getElementById('intro-scene-text');

    // Chime sound
    if (typeof playTone === 'function') {
      playTone(523.25, 0.3); // C5
      setTimeout(() => playTone(659.25, 0.4), 180); // E5
      setTimeout(() => playTone(783.99, 0.5), 360); // G5
      setTimeout(() => playTone(1046.50, 0.7), 540); // C6
    }

    // Confetti shower
    if (typeof triggerConfetti === 'function') {
      triggerConfetti();
    }

    // Scatter butterflies in brilliant spiral burst
    butterflies.forEach(b => {
      b.isBursting = true;
      const burstAngle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 8;
      b.vx = Math.cos(burstAngle) * speed;
      b.vy = Math.sin(burstAngle) * speed;
    });

    // Transition from Scene 1 to Scene 2
    if (sceneBouquet) {
      sceneBouquet.classList.remove('active');
    }

    setTimeout(() => {
      if (sceneText) {
        sceneText.classList.add('active');
      }
    }, 400);
  }

  // Handle clicking "Khám Phá Món Quà 20/10 Của Anh 💌"
  function onEnterSite() {
    currentScene = 3;
    if (animFrameId) cancelAnimationFrame(animFrameId);

    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 950);
    }

    // Automatically start background music
    if (typeof startMusic === 'function' && !isPlaying) {
      startMusic();
    }
  }

  // Main Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw sparkles
    sparkles.forEach(s => {
      s.update();
      s.draw();
    });

    // Update & draw butterflies
    butterflies.forEach(b => {
      b.update();
      b.draw();
    });

    if (currentScene !== 3) {
      animFrameId = requestAnimationFrame(render);
    }
  }
})();
