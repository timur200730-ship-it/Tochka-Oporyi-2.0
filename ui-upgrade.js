(function(){
  const THEMES = ['dark-gold', 'light', 'emerald', 'amber'];
  const icons = { 'dark-gold': '☀️', 'light': '🌿', 'emerald': '🔥', 'amber': '🌙' };
  let currentTheme = localStorage.getItem('global_theme') || 'dark-gold';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const style = document.createElement('style');
  style.textContent = `
      /* Универсальная шапка */
     .unified-header {
      max-width: 768px !important;
      width: calc(100% - 32px) !important;
      margin: 12px auto 24px auto !important;
      background: var(--card) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid var(--stroke) !important;
      border-radius: 20px !important;
      padding: 0 !important;
      position: relative !important;
      top: auto !important;
    }
    .unified-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      gap: 12px;
    }
    .unified-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text);
    }
    .unified-logo-icon {
      width: 36px;
      height: 36px;
      color: var(--accent);
      transition: transform 0.3s;
    }
    .unified-logo:hover .unified-logo-icon {
      transform: rotate(45deg);
    }
    .unified-logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .unified-title {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 16px;
      color: var(--text);
    }
    .unified-sub {
      font-size: 10px;
      color: var(--muted);
    }
    .unified-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .unified-stat {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--bg-2);
      border: 1px solid var(--stroke);
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
    }
    .unified-stat span {
      color: var(--accent);
    }
    /* ===== ПЕРЕМЕННЫЕ ТЕМ ===== */
    :root, [data-theme="dark-gold"] {
      --bg: #0f1115; --bg-2: #161920; --card: rgba(22, 25, 32, 0.88);
      --text: #f3f4f6; --muted: #a1a1b5; --stroke: rgba(255,255,255,0.09);
      --accent: #d4af37; --accent-glow: rgba(212,175,55,0.3);
      --rose: #fb7185;
      /* для breathing.html */
      --accent-2: #d4af37; --accent-3: #f3d266; --mod: #d4af37;
      /* для survive-test.html */
      --accent2: #5c4a10;
    }
    [data-theme="light"] {
      --bg: #F6F4FB; --bg-2: #EDE9F7; --card: rgba(255,255,255,0.9);
      --text: #171233; --muted: #6B6390; --stroke: rgba(20,10,50,0.1);
      --accent: #8B7CF6; --accent-glow: rgba(139,124,246,0.3);
      --rose: #e11d48;
      --accent-2: #8B7CF6; --accent-3: #b8a6ff; --mod: #8B7CF6;
      --accent2: #2D1B69;
    }
    [data-theme="emerald"] {
      --bg: #06100e; --bg-2: #0b1a16; --card: rgba(11, 26, 22, 0.88);
      --text: #e2f1ec; --muted: #7a9c91; --stroke: rgba(52,211,153,0.15);
      --accent: #34d399; --accent-glow: rgba(52,211,153,0.4);
      --rose: #fb7185;
      --accent-2: #34d399; --accent-3: #6ee7b7; --mod: #34d399;
      --accent2: #064e3b;
    }
    [data-theme="amber"] {
      --bg: #120c06; --bg-2: #1c130a; --card: rgba(28, 19, 10, 0.88);
      --text: #fcebd6; --muted: #a68862; --stroke: rgba(245,158,11,0.15);
      --accent: #f59e0b; --accent-glow: rgba(245,158,11,0.4);
      --rose: #fb7185;
      --accent-2: #f59e0b; --accent-3: #fbbf24; --mod: #f59e0b;
      --accent2: #78350f;
    }

    /* ===== БАЗА ===== */
    body, html {
      background-color: var(--bg) !important;
      color: var(--text) !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    body::before { background: none !important; }

    /* ===== ШАПКИ (breathing + survive-test) ===== */
    header, .nav, #nav {
      background: var(--card) !important;
      border-color: var(--stroke) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
    }
    .logo, .brand { color: var(--text) !important; }
    .logo-mark {
      background: linear-gradient(135deg, var(--accent), var(--accent-3)) !important;
      box-shadow: 0 6px 20px var(--accent-glow) !important;
    }
    .brand span { color: var(--accent) !important; }
    .nav-links a { color: var(--muted) !important; }
    .nav-links a:hover, .nav-links a.active {
      color: var(--text) !important;
      background: var(--bg-2) !important;
    }
    .pill, .back-btn {
      background: var(--bg-2) !important;
      border-color: var(--stroke) !important;
      color: var(--text) !important;
    }
    .pill .num { color: var(--accent) !important; }

    /* ===== КАРТОЧКИ И ПАНЕЛИ ===== */
    .glass-card, .tech, .breath-zone, .info-card, .hist-row,
    .option, .step, .phrase, .practice, .note, .rank-row, .mini,
    .hero-result, .card-hero, .module, .lesson, .tcard, .practice-box,
    .quiz-q, .reflect-box, .panel, .stat, .daily-card, .ach-card,
    .tool-card, .near, .quiz, .challenge-card {
      background: var(--card) !important;
      border-color: var(--stroke) !important;
      color: var(--text) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
    }

    /* ===== КНОПКИ ===== */
    .btn-primary, .btn, .link-go, .btn-danger {
      background: var(--accent) !important;
      color: #0f1115 !important;
      border: none !important;
      box-shadow: 0 4px 15px var(--accent-glow) !important;
    }
    .btn-ghost, .ghost, .tech, .option {
      background: var(--bg-2) !important;
      border-color: var(--stroke) !important;
      color: var(--text) !important;
    }
    .tech.active, .option.picked {
      border-color: var(--accent) !important;
      background: color-mix(in srgb, var(--accent) 15%, var(--bg-2)) !important;
      box-shadow: 0 8px 24px var(--accent-glow) !important;
    }
    .tech .pattern, .tech .ico { color: var(--accent) !important; }

    /* ===== ТЕКСТЫ ===== */
    h1, h2, h3, h4, .hero-name, .mini-name, .rank-name {
      color: var(--text) !important;
      font-family: 'Playfair Display', serif !important;
    }
    p, .muted, .sec-sub, .lead, .mini-tag, .rank-pct, .hist-row .tech {
      color: var(--muted) !important;
    }
    .page-head h1 .grad, .intro h1 em {
      background: linear-gradient(135deg, var(--accent), var(--accent-3)) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      color: transparent !important;
    }

    /* ===== ПОЛЯ ВВОДА ===== */
    textarea, input {
      background: var(--bg-2) !important;
      color: var(--text) !important;
      border-color: var(--stroke) !important;
    }

    /* ===== ПРОГРЕСС-БАРЫ ===== */
    .progress-fill, .bar-fill, .fill, .bar i, .rank-bar i {
      background: var(--accent) !important;
    }

    /* ===== КНОПКА ТЕМЫ ===== */
    #globalThemeBtn, .theme-toggle-btn, .theme-toggle {
      width: 36px !important; height: 36px !important;
      border-radius: 50% !important;
      background: var(--bg-2) !important;
      border: 1px solid var(--stroke) !important;
      color: var(--accent) !important;
      display: inline-grid !important;
      place-items: center !important;
      cursor: pointer !important;
      font-size: 16px !important;
      transition: all 0.3s ease !important;
      flex-shrink: 0 !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2) !important;
      padding: 0 !important;
      margin-left: 8px !important;
    }
    #globalThemeBtn:hover, .theme-toggle-btn:hover, .theme-toggle:hover {
      transform: rotate(15deg) scale(1.1) !important;
      border-color: var(--accent) !important;
    }
  `;
  document.head.appendChild(style);

  // ===== КНОПКА ТЕМЫ =====
  function initThemeButton() {
    let btn = document.getElementById('globalThemeBtn');

    // Если есть старая кнопка #themeBtn (survive-test), переименовываем
    if (!btn) {
      const oldBtn = document.getElementById('themeBtn');
      if (oldBtn) {
        oldBtn.id = 'globalThemeBtn';
        oldBtn.onclick = null; // сбрасываем старый обработчик
        oldBtn.className = ''; // убираем старые классы
        btn = oldBtn;
      }
    }

    // Если кнопки нет (breathing), создаём
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'globalThemeBtn';
      btn.title = 'Сменить тему';

      const navUser = document.querySelector('.nav-user');
      const navLinks = document.querySelector('#nav .nav-links');
      const headerNav = document.querySelector('header .nav') || document.querySelector('header');

      if (navUser) {
        navUser.appendChild(btn);
      } else if (navLinks) {
        navLinks.appendChild(btn);
      } else if (headerNav) {
        headerNav.appendChild(btn);
      } else {
        btn.style.position = 'fixed';
        btn.style.top = '16px';
        btn.style.right = '16px';
        btn.style.zIndex = '9999';
        document.body.appendChild(btn);
      }
    }

    // Всегда навешиваем свой обработчик
    btn.innerHTML = icons[currentTheme] || '☀️';
    btn.onclick = (e) => {
      e.preventDefault();
      let idx = THEMES.indexOf(currentTheme);
      currentTheme = THEMES[(idx + 1) % THEMES.length];
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('global_theme', currentTheme);
      btn.innerHTML = icons[currentTheme];
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeButton);
  } else {
    initThemeButton();
  }
    // ===== УНИВЕРСАЛЬНАЯ ШАПКА =====
  function injectUnifiedHeader() {
    // Не трогаем главную — там своя шапка
    if (document.getElementById('tochka-opory-assistant')) return;

    const existingHeader = document.querySelector('header') || document.querySelector('.nav') || document.querySelector('#nav');
    if (!existingHeader) return;

    // Подтягиваем XP и streak из localStorage
    let xp = 0, streak = 1;
    try {
      const store = JSON.parse(localStorage.getItem('tochka_opory_v1') || '{}');
      xp = store.xp || 0;
      streak = store.streak || 1;
    } catch(e) {}

    const headerHTML = `
      <div class="unified-header-inner">
        <a href="index.html" class="unified-logo">
          <svg class="unified-logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="3" stroke-dasharray="10 5"/>
            <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
          </svg>
          <div class="unified-logo-text">
            <div class="unified-title">Точка опоры</div>
            <div class="unified-sub">Твой внутренний компас</div>
          </div>
        </a>
        <div class="unified-actions">
          <div class="unified-stat">🔥 <span id="unified-streak">${streak}</span></div>
          <div class="unified-stat">⭐ <span id="unified-xp">${xp}</span></div>
          <button id="globalThemeBtn" class="theme-toggle-btn">${icons[currentTheme] || '☀️'}</button>
        </div>
      </div>
    `;

    // Если шапка уже в нужном формате — не трогаем
    if (existingHeader.querySelector('.unified-header-inner')) return;

    // Заменяем содержимое
    existingHeader.innerHTML = headerHTML;
    existingHeader.classList.add('unified-header');
    existingHeader.style.cssText = ''; // сбрасываем старые стили

    // Перевешиваем кнопку темы
    const btn = existingHeader.querySelector('#globalThemeBtn');
    if (btn) {
      btn.onclick = (e) => {
        e.preventDefault();
        let idx = THEMES.indexOf(currentTheme);
        currentTheme = THEMES[(idx + 1) % THEMES.length];
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('global_theme', currentTheme);
        btn.innerHTML = icons[currentTheme];
      };
    }
  }

  // Запускаем после DOMContentLoaded (вместе с initThemeButton)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeButton();
      injectUnifiedHeader();
    });
  } else {
    initThemeButton();
    injectUnifiedHeader();
  }
})();
