/**
 * 20/10 SPECIAL WEBSITE - CORE INTERACTIVITY & EFFECTS
 */

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initStorageOverride();
  renderContent();
  initPetalsCanvas();
  initLoveTimer();
  initEnvelopeInteraction();
  initGiftBox();
  initAudioPlayer();
  initCustomizerModal();
});

// Allow localStorage overrides for quick real-time testing
function initStorageOverride() {
  const saved = localStorage.getItem('womens_day_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.loveStartDate === "2023-10-20T00:00:00") {
        delete parsed.loveStartDate;
      }
      Object.assign(CONFIG, parsed);
    } catch (e) {
      console.error('Lỗi nạp config lưu trữ:', e);
    }
  }
}

// Render dynamic content from CONFIG
function renderContent() {
  // Hero & Header
  document.getElementById('receiver-name').textContent = CONFIG.receiverName || "Em Yêu";
  document.getElementById('nickname-badge').textContent = `Dành riêng cho: ${CONFIG.nickname || "Công Chúa Nhỏ"} 💖`;
  document.getElementById('hero-subtitle').textContent = CONFIG.heroSubtitle;

  const distanceQuoteEl = document.getElementById('distance-quote');
  if (distanceQuoteEl && CONFIG.longDistanceMessage && CONFIG.longDistanceMessage.quote) {
    distanceQuoteEl.textContent = `"${CONFIG.longDistanceMessage.quote}"`;
  }

  // Letter
  document.getElementById('letter-title').textContent = CONFIG.letter.title;
  document.getElementById('letter-date').textContent = CONFIG.letter.date;
  document.getElementById('sender-signature').textContent = `Thương em, ${CONFIG.senderName || "Anh"}`;

  // Reasons Grid
  const reasonsContainer = document.getElementById('reasons-container');
  if (reasonsContainer && CONFIG.reasons) {
    reasonsContainer.innerHTML = CONFIG.reasons.map(r => `
      <div class="reason-card">
        <div class="reason-icon">${r.icon}</div>
        <div class="reason-info">
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Memories Gallery
  const galleryContainer = document.getElementById('gallery-container');
  if (galleryContainer && CONFIG.memories) {
    galleryContainer.innerHTML = CONFIG.memories.map((m, idx) => `
      <div class="polaroid-card" onclick="openPhotoLightbox(${idx})">
        <div class="polaroid-img-box">
          <img src="${m.image}" alt="${m.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="polaroid-caption">
          <div class="polaroid-title">${m.title}</div>
          <div class="polaroid-sub">${m.date}</div>
        </div>
      </div>
    `).join('');
  }

  // Vouchers
  const vouchersContainer = document.getElementById('vouchers-container');
  if (vouchersContainer && CONFIG.vouchers) {
    vouchersContainer.innerHTML = CONFIG.vouchers.map(v => `
      <div class="voucher-card">
        <div class="voucher-badge">VOUCHER ĐẶC QUYỀN</div>
        <div class="voucher-title">${v.title}</div>
        <div class="voucher-desc">${v.desc}</div>
        <div class="voucher-code">
          <span>Mã: ${v.code}</span>
          <button class="redeem-btn" id="redeem-btn-${v.id}" onclick="redeemVoucher('${v.title}', '${v.code}', ${v.id})">Đổi thưởng</button>
        </div>
      </div>
    `).join('');
  }
}

// --------------------------------------------------------------------------
// 1. FLOATING PETALS & HEARTS CANVAS ENGINE
// --------------------------------------------------------------------------
function initPetalsCanvas() {
  const canvas = document.getElementById('effects-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 40 : 25, 50);

  // Types: 'petal' and 'heart'
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height * 0.5;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.5 + 0.8;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = Math.random() * 0.6 + 0.3;
      this.type = Math.random() > 0.4 ? 'petal' : 'heart';
      this.color = this.type === 'petal'
        ? (Math.random() > 0.5 ? 'rgba(255, 117, 143, ' : 'rgba(255, 77, 109, ')
        : 'rgba(230, 57, 70, ';
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.8 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'petal') {
        // Draw delicate rose petal
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
        ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
        ctx.fill();
      } else {
        // Draw cute floating heart
        const hSize = this.size * 0.7;
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        const topCurveHeight = hSize * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -hSize / 2, 0, -hSize / 2, topCurveHeight);
        ctx.bezierCurveTo(-hSize / 2, (hSize + topCurveHeight) / 2, 0, (hSize + topCurveHeight) / 1.4, 0, hSize);
        ctx.bezierCurveTo(0, (hSize + topCurveHeight) / 1.4, hSize / 2, (hSize + topCurveHeight) / 2, hSize / 2, topCurveHeight);
        ctx.bezierCurveTo(hSize / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// --------------------------------------------------------------------------
// 2. LOVE DAYS TIMER
// --------------------------------------------------------------------------
function initLoveTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  if (!daysEl) return;

  const startDate = new Date(CONFIG.loveStartDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = Math.max(0, now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days.toLocaleString('vi-VN');
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  update();
  setInterval(update, 1000);
}

// --------------------------------------------------------------------------
// 3. ENVELOPE & TYPEWRITER EFFECT
// --------------------------------------------------------------------------
let letterOpened = false;

function initEnvelopeInteraction() {
  const envelope = document.getElementById('envelope');
  const paper = document.getElementById('letter-paper');
  if (!envelope || !paper) return;

  envelope.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;

    envelope.classList.add('opened');
    playTone(523.25, 0.4); // C5 chime

    setTimeout(() => {
      paper.classList.add('show');
      paper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      typewriterLetter();
    }, 600);
  });
}

function typewriterLetter() {
  const bodyEl = document.getElementById('letter-content');
  if (!bodyEl) return;

  const paragraphs = CONFIG.letter.content || [];
  bodyEl.innerHTML = '';

  let pIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (pIndex >= paragraphs.length) return;

    if (charIndex === 0) {
      const p = document.createElement('p');
      p.id = `para-${pIndex}`;
      bodyEl.appendChild(p);
    }

    const currentP = document.getElementById(`para-${pIndex}`);
    currentP.textContent += paragraphs[pIndex].charAt(charIndex);
    charIndex++;

    if (charIndex < paragraphs[pIndex].length) {
      setTimeout(typeChar, 18);
    } else {
      pIndex++;
      charIndex = 0;
      setTimeout(typeChar, 250);
    }
  }

  typeChar();
}

// --------------------------------------------------------------------------
// 4. GIFT BOX & CONFETTI SHOWER
// --------------------------------------------------------------------------
let giftOpened = false;

function initGiftBox() {
  const giftBox = document.getElementById('gift-box');
  const vouchers = document.getElementById('vouchers-section');
  if (!giftBox) return;

  giftBox.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;

    giftBox.classList.add('opened');
    triggerConfetti();
    playTone(659.25, 0.5); // E5

    setTimeout(() => {
      if (vouchers) {
        vouchers.style.display = 'block';
        vouchers.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  });
}

function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ['#ff4d6d', '#ffd166', '#06d6a0', '#118ab2', '#ff758f', '#ffffff'];

  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      opacity: 1
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames++;

    let alive = false;
    for (let c of confettiPieces) {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.vRot;
      c.vx *= 0.98;

      if (frames > 50) {
        c.opacity -= 0.015;
      }

      if (c.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, c.opacity);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        ctx.restore();
      }
    }

    if (alive && frames < 140) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  animate();
}

async function redeemVoucher(title, code, id) {
  triggerConfetti();
  playTone(659.25, 0.4);

  const btn = document.getElementById(`redeem-btn-${id}`);
  if (btn) {
    btn.textContent = 'Đang gửi... ✨';
    btn.disabled = true;
  }

  const endpoint = (CONFIG.notification && CONFIG.notification.formspreeEndpoint) ? CONFIG.notification.formspreeEndpoint.trim() : '';

  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🎁 [20/10] Bé yêu vừa chọn: ${title}`,
          mon_qua: title,
          ma_voucher: code,
          nguoi_chon: CONFIG.receiverName || "Em Yêu",
          biet_danh: CONFIG.nickname || "Công Chúa Nhỏ",
          thoi_gian: new Date().toLocaleString('vi-VN'),
          loi_nhan: "Anh nhớ chuẩn bị thực hiện cho bé yêu nhé! ❤️"
        })
      });
      alert(`🎉 Bé yêu đã kích hoạt thành công: "${title}"!\nThông báo đã được gửi trực tiếp đến hộp thư của anh. Anh sẽ chuẩn bị thực hiện ngay cho em! ❤️`);
    } catch (err) {
      console.error('Lỗi gửi webhook thông báo:', err);
      alert(`🎉 Bé yêu đã kích hoạt thành công: "${title}"!\nAnh đã ghi nhận phiếu quà tặng này rồi nhé! ❤️`);
    }
  } else {
    alert(`🎉 Bé yêu đã kích hoạt thành công: "${title}"!\n(Mã: ${code})\nAnh đã nhận được lựa chọn của em và sẽ thực hiện sớm nhất! ❤️`);
  }

  if (btn) {
    btn.textContent = 'Đã chọn ❤️';
    btn.style.background = '#48bb78';
  }
}

// --------------------------------------------------------------------------
// 5. PHOTO LIGHTBOX
// --------------------------------------------------------------------------
function openPhotoLightbox(index) {
  const item = CONFIG.memories[index];
  if (!item) return;

  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');

  if (modal && img && title && desc) {
    img.src = item.image;
    title.textContent = `${item.title} (${item.date})`;
    desc.textContent = item.caption;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
}

// --------------------------------------------------------------------------
// 6. ROMANTIC AUDIO SYNTHESIZER & MUSIC PLAYER
// --------------------------------------------------------------------------
let audioContext = null;
let isPlaying = false;
let audioMelodyTimer = null;
let customAudioEl = null;

function initAudioPlayer() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}

function startMusic() {
  isPlaying = true;
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.classList.add('playing');
    musicBtn.title = "Tắt nhạc nền";
  }

  // If user provided a custom mp3
  if (CONFIG.audio && CONFIG.audio.customAudioUrl) {
    if (!customAudioEl) {
      customAudioEl = new Audio(CONFIG.audio.customAudioUrl);
      customAudioEl.loop = true;
    }
    customAudioEl.play().catch(e => console.log('Autoplay error', e));
    return;
  }

  // Procedural Romantic Music Box (Canon in D / Soft Gentle Notes)
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // Romantic Pentatonic/Arpeggio Sequence
  const notes = [
    261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
    220.00, 261.63, 329.63, 440.00, // A3, C4, E4, A4
    174.61, 220.00, 261.63, 349.23, // F3, A3, C4, F4
    196.00, 246.94, 293.66, 392.00  // G3, B3, D4, G4
  ];

  let step = 0;
  function playNextNote() {
    if (!isPlaying) return;

    const freq = notes[step % notes.length];
    playTone(freq, 0.9, 0.12);

    step++;
    audioMelodyTimer = setTimeout(playNextNote, 480);
  }

  playNextNote();
}

function stopMusic() {
  isPlaying = false;
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.classList.remove('playing');
    musicBtn.title = "Bật nhạc nền lãng mạn";
  }

  if (customAudioEl) {
    customAudioEl.pause();
  }
  if (audioMelodyTimer) {
    clearTimeout(audioMelodyTimer);
  }
}

// Clean gentle sine tone generator
function playTone(freq, duration = 0.5, volume = 0.15) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    // Audio context not allowed without gesture
  }
}

// --------------------------------------------------------------------------
// 7. IN-BROWSER QUICK CUSTOMIZER (BẢNG CÁ NHÂN HÓA NHANH)
// --------------------------------------------------------------------------
function initCustomizerModal() {
  const openBtn = document.getElementById('open-customizer-btn');
  const modal = document.getElementById('customizer-modal');
  const closeBtn = document.getElementById('close-customizer-btn');
  const saveBtn = document.getElementById('save-customizer-btn');
  const exportBtn = document.getElementById('export-config-btn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      document.getElementById('edit-receiver-name').value = CONFIG.receiverName || '';
      document.getElementById('edit-nickname').value = CONFIG.nickname || '';
      document.getElementById('edit-sender-name').value = CONFIG.senderName || '';
      document.getElementById('edit-start-date').value = (CONFIG.loveStartDate || '').substring(0, 10);
      const fsInput = document.getElementById('edit-formspree-endpoint');
      if (fsInput) {
        fsInput.value = (CONFIG.notification && CONFIG.notification.formspreeEndpoint) ? CONFIG.notification.formspreeEndpoint : '';
      }
      modal.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      CONFIG.receiverName = document.getElementById('edit-receiver-name').value.trim() || CONFIG.receiverName;
      CONFIG.nickname = document.getElementById('edit-nickname').value.trim() || CONFIG.nickname;
      CONFIG.senderName = document.getElementById('edit-sender-name').value.trim() || CONFIG.senderName;
      
      const dateVal = document.getElementById('edit-start-date').value;
      if (dateVal) {
        CONFIG.loveStartDate = `${dateVal}T00:00:00`;
      }

      const fsInput = document.getElementById('edit-formspree-endpoint');
      if (fsInput) {
        if (!CONFIG.notification) CONFIG.notification = {};
        CONFIG.notification.formspreeEndpoint = fsInput.value.trim();
      }

      localStorage.setItem('womens_day_config', JSON.stringify(CONFIG));
      renderContent();
      modal.classList.remove('active');
      triggerConfetti();
      alert('Đã cập nhật thông tin thành công! 🎉');
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "const CONFIG = " + JSON.stringify(CONFIG, null, 2) + ";";
      const blob = new Blob([dataStr], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "config.js";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
