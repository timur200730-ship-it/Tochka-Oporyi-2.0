(function(){
  const THEMES = ['dark-gold', 'light', 'emerald', 'amber'];
  const icons = { 'dark-gold': '🌙', 'light': '☀️', 'emerald': '🌿', 'amber': '🔥' };
  let currentTheme = localStorage.getItem('global_theme') || 'dark-gold';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const style = document.createElement('style');
  style.textContent = `
    /* ===== ПЕРЕМЕННЫЕ ТЕМ ===== */
    :root, [data-theme="dark-gold"] {
      --bg: #0f1115; --bg-2: #161920; --card: rgba(22, 25, 32, 0.88);
      --text: #f3f4f6; --muted: #a1a1b5; --stroke: rgba(255,255,255,0.09);
      --accent: #d4af37; --accent-glow: rgba(212,175,55,0.3);
    }
    [data-theme="light"] {
      --bg: #F6F4FB; --bg-2: #ffffff; --card: #ffffff;
      --text: #171233; --muted: #4A4266; --stroke: rgba(20,10,50,0.12);
      --accent: #8B7CF6; --accent-glow: rgba(139,124,246,0.3);
    }
    [data-theme="emerald"] {
      --bg: #06100e; --bg-2: #0b1a16; --card: rgba(11, 26, 22, 0.88);
      --text: #e2f1ec; --muted: #7a9c91; --stroke: rgba(52,211,153,0.15);
      --accent: #34d399; --accent-glow: rgba(52,211,153,0.4);
    }
    [data-theme="amber"] {
      --bg: #120c06; --bg-2: #1c130a; --card: rgba(28, 19, 10, 0.88);
      --text: #fcebd6; --muted: #a68862; --stroke: rgba(245,158,11,0.15);
      --accent: #f59e0b; --accent-glow: rgba(245,158,11,0.4);
    }

  /* ===== УНИВЕРСАЛЬНЫЕ ПЕРЕОПРЕДЕЛЕНИЯ (ДЛЯ ВСЕХ ТЕМ) ===== */
    body, html {
      background-color: var(--bg) !important;
      color: var(--text) !important;
    }
    
    /* Адаптивный градиент фона (подстраивается под цвет темы) */
    body {
      background-image: 
        radial-gradient(circle at 15% 10%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 45%),
        radial-gradient(circle at 85% 85%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 45%) !important;
    }
    /* В светлой теме убираем свечение, чтобы было чисто */
    [data-theme="light"] body {
      background-image: none !important;
    }

    /* Карточки и панели */
    .glass-card, .glass-card-gold, header, .bottom-nav, .mood-btn, [class*="bg-bgDeep"], [class*="bg-bgCard"] {
      background-color: var(--card) !important;
      border-color: var(--stroke) !important;
    }

    /* Тексты */
    .text-white, .text-gray-100, .text-gray-200 { color: var(--text) !important; }
    .text-gray-300, .text-gray-400, .text-gray-500 { color: var(--muted) !important; }

    /* Инпуты */
    input, textarea {
      background-color: var(--bg-2) !important;
      color: var(--text) !important;
      border-color: var(--stroke) !important;
    }

    /* ===== КНОПКА ТЕМЫ ===== */
    #globalThemeBtn, .theme-toggle-btn {
      width: 36px !important; height: 36px !important;
      border-radius: 50% !important;
      background: var(--bg-2) !important;
      border: 1px solid var(--stroke) !important;
      color: var(--accent) !important;
      display: grid !important; place-items: center !important;
      cursor: pointer !important; font-size: 16px !important;
      transition: all 0.3s ease !important;
      padding: 0 !important;
    }
    #globalThemeBtn:hover, .theme-toggle-btn:hover {
      transform: rotate(15deg) scale(1.1) !important;
      border-color: var(--accent) !important;
    }
  `;
  document.head.appendChild(style);

  // ===== ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ =====
  window.toggleTheme = function() {
    let idx = THEMES.indexOf(currentTheme);
    currentTheme = THEMES[(idx + 1) % THEMES.length];
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('global_theme', currentTheme);
    
    // Обновляем иконку на всех возможных кнопках
    const btns = document.querySelectorAll('#globalThemeBtn, .theme-toggle-btn');
    btns.forEach(b => b.innerHTML = icons[currentTheme]);
  };

  // ===== ИНИЦИАЛИЗАЦИЯ ШАПКИ =====
  function initHeader() {
    // 1. Если мы на ГЛАВНОЙ странице (там своя красивая шапка)
    if (document.getElementById('tochka-opory-assistant')) {
      const btn = document.getElementById('globalThemeBtn');
      if (btn) {
        btn.innerHTML = icons[currentTheme];
        btn.onclick = window.toggleTheme;
      }
      return;
    }

    // 2. Если мы на ДРУГОЙ странице (инструменты, уроки, магия слов)
    const oldHeader = document.querySelector('header');
    if (oldHeader) oldHeader.style.display = 'none';

    // Создаем шапку со встроенными стилями, чтобы она НИКОГДА не ломалась
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      max-width: 768px; width: calc(100% - 32px); margin: 12px auto 24px auto;
      background: var(--card); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--stroke); border-radius: 20px; padding: 10px 16px;
      display: flex; align-items: center; justify-content: space-between;
      box-sizing: border-box; position: relative; z-index: 10;
    `;

    let xp = 0, streak = 1;
    try {
      const store = JSON.parse(localStorage.getItem('tochka_opory_v1') || '{}');
      xp = store.xp || 0; streak = store.streak || 1;
    } catch(e) {}

    wrap.innerHTML = `
      <a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
        <svg style="width: 36px; height: 36px; color: var(--accent); flex-shrink: 0;" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="3" stroke-dasharray="10 5"/>
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
        </svg>
        <div style="display: flex; flex-direction: column; line-height: 1.2;">
          <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; color: var(--text);">Точка опоры</div>
          <div style="font-size: 10px; color: var(--muted);">Твой внутренний компас</div>
        </div>
      </a>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 4px; background: var(--bg-2); border: 1px solid var(--stroke); border-radius: 10px; padding: 4px 8px; font-size: 12px; font-weight: 600; color: var(--text);">🔥 <span style="color: var(--accent);">${streak}</span></div>
        <div style="display: flex; align-items: center; gap: 4px; background: var(--bg-2); border: 1px solid var(--stroke); border-radius: 10px; padding: 4px 8px; font-size: 12px; font-weight: 600; color: var(--text);">⭐ <span style="color: var(--accent);">${xp}</span></div>
        <button id="globalThemeBtn" style="width: 36px; height: 36px; border-radius: 50%; background: var(--bg-2); border: 1px solid var(--stroke); color: var(--accent); display: grid; place-items: center; cursor: pointer; font-size: 16px; padding: 0;">${icons[currentTheme]}</button>
      </div>
    `;

    document.body.insertBefore(wrap, document.body.firstChild);
    document.getElementById('globalThemeBtn').onclick = window.toggleTheme;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
