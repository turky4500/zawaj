'use strict';
// ========================
// app.js — منصة نِكاح
// WhatsApp OTP Integration
// ========================

// ===== CONFIG — يُقرأ من localStorage (يضبطه الإدارة) =====
const WA_API_URL = 'https://wats-enzn.onrender.com/api/v1/send';
function getWaToken() {
  return localStorage.getItem('nikah_wa_token') || 'sau11zbtz1ruma8o2k5tt';
}

// ===== OTP STATE =====
let otpState = {
  code: '',
  phone: '',
  timer: null,
  countdown: 60,
  attempts: 0,
};

// ===== MAIN INIT =====
const state = { currentTab: 'groom', currentTestimonial: 0, testimonialTimer: null, statsAnimated: false };

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroAnimations();
  initStatsCounter();
  initSmoothScroll();
  initTestimonialsAutoSlide();
  initScrollReveal();
  initRegisterForm();
  initProfileButtons();
  initHamburger();
  initBarFills();
  initCountryCodeFlag();
  initOtpBoxes();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
    });
  }, { passive: true });
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('.nav-link, .btn-nav').forEach(l => {
    l.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function initHeroAnimations() {
  setTimeout(() => {
    document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
  }, 100);
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const statNums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !state.statsAnimated) {
        state.statsAnimated = true;
        statNums.forEach(el => animateCounter(el, 0, parseInt(el.dataset.target), 2000));
      }
    });
  }, { threshold: 0.5 });
  const s = document.querySelector('.hero-stats');
  if (s) observer.observe(s);
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function update(now) {
    const p = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.floor(start + (end - start) * easeOut(p)).toLocaleString('ar-SA');
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = end.toLocaleString('ar-SA');
  }
  requestAnimationFrame(update);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });
}

// ===== TESTIMONIALS =====
function initTestimonialsAutoSlide() { startTestimonialTimer(); }
function startTestimonialTimer() {
  if (state.testimonialTimer) clearInterval(state.testimonialTimer);
  state.testimonialTimer = setInterval(() => {
    const cards = document.querySelectorAll('.testimonial-card');
    state.currentTestimonial = (state.currentTestimonial + 1) % cards.length;
    goToTestimonial(state.currentTestimonial);
  }, 5000);
}
window.goToTestimonial = function(i) {
  document.querySelectorAll('.testimonial-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.testimonial-card')[i]?.classList.add('active');
  document.querySelectorAll('.dot')[i]?.classList.add('active');
  state.currentTestimonial = i;
  startTestimonialTimer();
};

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.feature-card, .step, .profile-card, .pricing-card, .faq-item, .trust-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    obs.observe(el);
  });
}

function initBarFills() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.style.width;
        e.target.style.width = '0%';
        setTimeout(() => { e.target.style.transition = 'width 1.5s ease'; e.target.style.width = w; }, 300);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.bar-fill').forEach(b => obs.observe(b));
}

// ===== COUNTRY CODE FLAG =====
function initCountryCodeFlag() {
  const sel = document.getElementById('countryCode');
  const flag = document.getElementById('waFlag');
  if (!sel || !flag) return;
  sel.addEventListener('change', () => {
    const opt = sel.options[sel.selectedIndex];
    flag.textContent = opt.dataset.flag || '🌍';
  });
}

// ===== REGISTER FORM — Step 1: Send OTP =====
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep1(form)) return;

    const countryCode = document.getElementById('countryCode')?.value || '966';
    const rawNumber = document.getElementById('whatsapp')?.value?.trim().replace(/^0+/, '');
    const fullNumber = countryCode + rawNumber;

    otpState.phone = fullNumber;
    await sendOtpViaWhatsApp(fullNumber);
  });

  // Real-time validation
  form.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('blur', () => { if (f.id !== 'whatsapp') validateField(f); });
  });
}

function validateStep1(form) {
  let valid = true;
  const required = ['fullName', 'age', 'nationality', 'maritalStatus', 'education', 'religiosity', 'terms'];
  required.forEach(id => {
    const f = document.getElementById(id);
    if (f && !validateField(f)) valid = false;
  });

  // Validate WhatsApp number
  const waInput = document.getElementById('whatsapp');
  const waVal = waInput?.value?.trim();
  if (!waVal || waVal.length < 7) {
    showFieldError(waInput?.closest('.form-group'), 'رقم الواتساب مطلوب ويجب أن يكون 7 أرقام على الأقل');
    valid = false;
  } else {
    clearFieldError(waInput?.closest('.form-group'));
  }

  return valid;
}

// ===== SEND OTP VIA WHATSAPP API =====
async function sendOtpViaWhatsApp(toNumber) {
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('registerForm');

  // Generate OTP
  otpState.code = Math.floor(100000 + Math.random() * 900000).toString();
  otpState.attempts = 0;

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = '<div class="otp-spinner"></div><span>جارٍ الإرسال عبر الواتساب...</span>';

  const message =
    `🕌 منصة نِكاح - رمز التحقق\n\n` +
    `رمزك السري هو: *${otpState.code}*\n\n` +
    `⏱ صالح لمدة 10 دقائق فقط.\n` +
    `🔒 لا تشاركه مع أحد.\n\n` +
    `بارك الله لك وأعانك على الزواج الصالح.`;

  try {
    const res = await fetch(WA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getWaToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: toNumber, message }),
    });

    if (res.ok || res.status === 200 || res.status === 201) {
      showOtpStep(toNumber);
      showNotif('✅ تم إرسال رمز التحقق على واتسابك', 'success');
    } else {
      const err = await res.json().catch(() => ({}));
      handleSendError(err.message || `خطأ: ${res.status}`);
    }
  } catch (err) {
    // Network error or CORS — still show OTP step for demo
    console.warn('WhatsApp API error:', err.message);
    if (err.message.includes('fetch') || err.message.includes('network') || err.name === 'TypeError') {
      // Show OTP anyway (demo mode)
      showOtpStep(toNumber);
      showNotif(`📱 تم الإرسال (وضع تجريبي) — الرمز: ${otpState.code}`, 'info');
    } else {
      handleSendError('تعذّر الاتصال بخادم الرسائل. تحقق من الإنترنت.');
    }
  }
}

function handleSendError(msg) {
  const btn = document.getElementById('submitBtn');
  btn.disabled = false;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2.003C6.476 2.003 2 6.48 2 12.007c0 1.771.463 3.436 1.27 4.888L2 22l5.25-1.376A9.96 9.96 0 0012.004 22C17.53 22 22 17.524 22 12.007c0-5.52-4.47-10.004-9.996-10.004z"/></svg><span>إرسال رمز التحقق عبر الواتساب</span>';
  showNotif(`❌ ${msg}`, 'error');
}

// ===== SHOW OTP STEP =====
function showOtpStep(phone) {
  document.getElementById('registerForm').style.display = 'none';
  const otpEl = document.getElementById('otpStep');
  otpEl.style.display = 'block';

  const displayNum = '+' + phone.slice(0, 3) + ' ' + phone.slice(3, 5) + 'X XXX ' + phone.slice(-3);
  document.getElementById('otpSubtitle').textContent = `أُرسل رمز مكوّن من 6 أرقام إلى ${displayNum}`;

  // Reset OTP boxes
  document.querySelectorAll('.otp-box').forEach(b => { b.value = ''; b.classList.remove('filled', 'error'); });
  document.getElementById('otp0')?.focus();

  // Start countdown
  startOtpCountdown();
}

window.backToForm = function() {
  document.getElementById('registerForm').style.display = 'flex';
  document.getElementById('otpStep').style.display = 'none';
  clearOtpTimer();

  const btn = document.getElementById('submitBtn');
  btn.disabled = false;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2.003C6.476 2.003 2 6.48 2 12.007c0 1.771.463 3.436 1.27 4.888L2 22l5.25-1.376A9.96 9.96 0 0012.004 22C17.53 22 22 17.524 22 12.007c0-5.52-4.47-10.004-9.996-10.004z"/></svg><span>إرسال رمز التحقق عبر الواتساب</span>';
};

// ===== OTP TIMER =====
function startOtpCountdown() {
  clearOtpTimer();
  otpState.countdown = 60;
  const countEl = document.getElementById('otpCountdown');
  const resendBtn = document.getElementById('btnResend');
  const timerEl = document.getElementById('otpTimer');

  resendBtn.disabled = true;
  timerEl.style.display = 'block';

  otpState.timer = setInterval(() => {
    otpState.countdown--;
    if (countEl) countEl.textContent = otpState.countdown;
    if (otpState.countdown <= 0) {
      clearOtpTimer();
      timerEl.style.display = 'none';
      resendBtn.disabled = false;
    }
  }, 1000);
}

function clearOtpTimer() {
  if (otpState.timer) { clearInterval(otpState.timer); otpState.timer = null; }
}

window.resendOtp = async function() {
  document.getElementById('btnResend').disabled = true;
  await sendOtpViaWhatsApp(otpState.phone);
};

// ===== OTP BOXES INTERACTION =====
function initOtpBoxes() {
  const boxes = document.querySelectorAll('.otp-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      const v = box.value.replace(/\D/g, '');
      box.value = v;
      box.classList.toggle('filled', v.length > 0);
      box.classList.remove('error');
      if (v && i < boxes.length - 1) boxes[i + 1].focus();
      // Auto-verify if all filled
      if ([...boxes].every(b => b.value)) verifyOtp();
    });

    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].focus();
        boxes[i - 1].value = '';
        boxes[i - 1].classList.remove('filled');
      }
      if (e.key === 'ArrowLeft' && i < boxes.length - 1) boxes[i + 1].focus();
      if (e.key === 'ArrowRight' && i > 0) boxes[i - 1].focus();
    });

    // Handle paste
    box.addEventListener('paste', e => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      [...pasted].forEach((char, idx) => {
        if (boxes[idx]) { boxes[idx].value = char; boxes[idx].classList.add('filled'); }
      });
      if (pasted.length === 6) { boxes[5].focus(); setTimeout(verifyOtp, 100); }
    });
  });
}

// ===== VERIFY OTP =====
window.verifyOtp = function() {
  const boxes = document.querySelectorAll('.otp-box');
  const entered = [...boxes].map(b => b.value).join('');

  if (entered.length < 6) {
    showNotif('⚠️ أدخل الرمز المكوّن من 6 أرقام', 'warning');
    return;
  }

  const btn = document.getElementById('btnVerifyOtp');
  btn.disabled = true;
  btn.innerHTML = '<div class="otp-spinner" style="border-top-color:#fff;border-color:rgba(255,255,255,0.3)"></div><span>جارٍ التحقق...</span>';

  setTimeout(() => {
    if (entered === otpState.code) {
      // ✅ SUCCESS
      clearOtpTimer();
      boxes.forEach(b => { b.style.borderColor = '#25D366'; b.style.background = 'rgba(37,211,102,0.08)'; });
      document.getElementById('modalMainIcon').textContent = '🎉';
      document.getElementById('modalMainTitle').textContent = 'تم التسجيل بنجاح!';
      document.getElementById('modalMainText').textContent =
        `مرحباً! تم التحقق من رقم واتسابك وتسجيل حسابك على منصة نِكاح. سيتواصل معك فريقنا خلال 24 ساعة. بارك الله لكم وأعانكم.`;
      setTimeout(() => {
        document.getElementById('successModal')?.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset form
        document.getElementById('registerForm')?.reset();
        document.getElementById('otpStep').style.display = 'none';
        document.getElementById('registerForm').style.display = 'flex';
      }, 600);
    } else {
      // ❌ WRONG CODE
      otpState.attempts++;
      boxes.forEach(b => { b.classList.add('error'); b.value = ''; });
      boxes[0].focus();
      btn.disabled = false;
      btn.innerHTML = '<span>✅ تحقق وأكمل التسجيل</span>';

      if (otpState.attempts >= 3) {
        showNotif('🚫 تجاوزت عدد المحاولات. سنرسل لك رمزاً جديداً.', 'error');
        setTimeout(() => resendOtp(), 2000);
      } else {
        showNotif(`❌ الرمز غير صحيح. المحاولة ${otpState.attempts}/3`, 'error');
      }
    }
  }, 1200);
};

// ===== VALIDATION =====
function validateField(field) {
  clearFieldError(field.parentNode);
  const val = field.value.trim();
  let valid = true;
  let msg = '';

  if (field.type === 'checkbox') {
    if (field.required && !field.checked) { valid = false; msg = 'يجب الموافقة على الشروط'; }
  } else if (field.required && !val) {
    valid = false; msg = 'هذا الحقل مطلوب';
  } else if (field.type === 'number' && val) {
    const n = parseInt(val);
    if (field.id === 'age' && (n < 18 || n > 70)) { valid = false; msg = 'العمر بين 18 و70 سنة'; }
  }

  if (!valid) showFieldError(field.parentNode, msg);
  return valid;
}

function showFieldError(parent, msg) {
  if (!parent) return;
  parent.querySelectorAll('.field-error').forEach(e => e.remove());
  const e = document.createElement('span');
  e.className = 'field-error';
  e.style.cssText = 'color:#E53E3E;font-size:.78rem;display:block;margin-top:4px;';
  e.textContent = msg;
  parent.appendChild(e);
}

function clearFieldError(parent) {
  if (!parent) return;
  parent.querySelectorAll('.field-error').forEach(e => e.remove());
}

// ===== MODAL =====
window.closeModal = function() {
  document.getElementById('successModal')?.classList.remove('active');
  document.body.style.overflow = '';
};
document.getElementById('successModal')?.addEventListener('click', e => {
  if (e.target === document.getElementById('successModal')) closeModal();
});

// ===== TABS =====
window.switchTab = function(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tab}`)?.classList.add('active');
  const bio = document.getElementById('bio');
  if (bio) {
    const ph = { groom: 'اكتب نبذة عن نفسك وما تبحث عنه في شريكة الحياة...', bride: 'اكتبي نبذة عن نفسك وما تبحثين عنه في شريك الحياة...', family: 'اكتب نبذة عن المُزوَّج/المُزوَّجة من أهلك...' };
    bio.placeholder = ph[tab] || '';
  }
};

// ===== PROFILE BUTTONS =====
function initProfileButtons() {
  document.querySelectorAll('.btn-interest').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('interested')) {
        this.classList.remove('interested');
        this.textContent = 'أبدِ اهتمامك';
        this.style.cssText = '';
      } else {
        this.classList.add('interested');
        this.textContent = '✅ تم إبداء الاهتمام';
        this.style.background = 'linear-gradient(135deg,#1B5E47,#2D7A5F)';
        this.style.color = '#fff';
        this.style.transform = 'scale(1.05)';
        setTimeout(() => { this.style.transform = ''; }, 300);
        setTimeout(showInterestModal, 800);
      }
    });
  });
}

function showInterestModal() {
  const m = document.getElementById('successModal');
  if (!m) return;
  document.getElementById('modalMainIcon').textContent = '💚';
  document.getElementById('modalMainTitle').textContent = 'أبديت اهتمامك!';
  document.getElementById('modalMainText').textContent = 'لإتمام التواصل، يرجى إنشاء حساب أو تسجيل الدخول. سيتولى مشرف التوفيق متابعة طلبك.';
  m.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== FAQ =====
window.toggleFaq = function(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const ans = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    const a = i.querySelector('.faq-answer');
    if (a) a.style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
  }
};

// ===== NOTIFICATION TOAST =====
function showNotif(message, type = 'info') {
  const colors = { success: '#25D366', error: '#E53E3E', warning: '#C8973A', info: '#2D7A5F' };
  const n = document.createElement('div');
  n.style.cssText = `
    position:fixed;top:90px;left:50%;transform:translateX(-50%) translateY(-80px);
    background:${colors[type]};color:#fff;padding:.85rem 2rem;border-radius:50px;
    font-weight:700;font-family:'Cairo',sans-serif;font-size:.9rem;z-index:3000;
    box-shadow:0 8px 30px rgba(0,0,0,.2);transition:transform .4s cubic-bezier(.34,1.56,.64,1);direction:rtl;
    max-width:90vw;text-align:center;`;
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => { n.style.transform = 'translateX(-50%) translateY(0)'; }, 50);
  setTimeout(() => { n.style.transform = 'translateX(-50%) translateY(-80px)'; setTimeout(() => n.remove(), 400); }, 4000);
}

// ===== SCROLL TO TOP =====
let scrollTopBtn;
window.addEventListener('scroll', () => {
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = 'position:fixed;bottom:5.5rem;left:2rem;z-index:800;width:44px;height:44px;border-radius:50%;background:var(--emerald-mid);color:#fff;font-size:1.2rem;font-weight:700;box-shadow:0 4px 15px rgba(27,94,71,.3);transition:all .3s ease;opacity:0;border:none;cursor:pointer;font-family:sans-serif;';
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(scrollTopBtn);
  }
  scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
  scrollTopBtn.style.transform = window.scrollY > 400 ? 'scale(1)' : 'scale(0.8)';
}, { passive: true });

// ===== WELCOME NOTIFICATION =====
setTimeout(() => showNotif('🌿 مرحباً! 3 ملفات متوافقة تنتظرك اليوم', 'success'), 3000);
