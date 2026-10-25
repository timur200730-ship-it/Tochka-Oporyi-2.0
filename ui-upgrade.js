(function(){
  // Темы: Золотая (база), Светлая, Изумрудная, Янтарная
  const THEMES = ['dark-gold', 'light', 'emerald', 'amber'];
  const icons = { 'dark-gold': '☀️', 'light': '🌿', 'emerald': '🔥', 'amber': '🌙' };
  let currentTheme = localStorage.getItem('global_theme') || 'dark-gold';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const style = document.createElement('style');
  style.textContent = `
    /* ПЕРЕМЕННЫЕ ТЕМ */
    :root, [data-theme="dark-gold"] {
      --bg: #0f1115; --bg-2: #161920; --card: rgba(22, 25, 32, 0.85);
      --text: #f3f4f6; --muted: #a1a1b5; --stroke: rgba(255,255,255,0.08);
      --accent: #d4af37; --accent-glow: rgba(212,175,55,0.3);
      --rose: #fb7185;
    }
    [data-theme="light"] {
      --bg: #F6F4FB; --bg-2: #EDE9F7; --card: rgba(255,255,255,0.85);
      --text: #171233; --muted: #6B6390; --stroke: rgba(20,10,50,0.1);
      --accent: #8B7CF6; --accent-glow: rgba(139,124,246,0.3);
      --rose: #e11d48;
    }
    [data-theme="emerald"] {
      --bg: #06100e; --bg-2: #0b1a16; --card: rgba(11, 26, 22, 0.85);
      --text: #e2f1ec; --muted: #7a9c91; --stroke: rgba(52,211,153,0.15);
      --accent: #34d399; --accent-glow: rgba(52,211,153,0.4);
      --rose: #fb7185;
    }
    [data-theme="amber"] {
      --bg: #120c06; --bg-2: #1c130a; --card: rgba(28, 19, 10, 0.85);
      --text: #fcebd6; --muted: #a68862; --stroke: rgba(245,158,11,0.15);
      --accent: #f59e0b; --accent-glow: rgba(245,158,11,0.4);
      --rose: #fb7185;
    }

    /* ГЛОБАЛЬНЫЕ ПЕРЕОПРЕДЕЛЕНИЯ (Стираем старые цвета) */
    body, html { 
      background-color: var(--bg) !important; 
      color: var(--text) !important; 
      background-image: none !important; 
      font-family: 'Montserrat', sans-serif !important; 
    }
    
    /* Карточки, модули, уроки, панели (принудительный glassmorphism) */
    .module, .lesson, .tcard, .practice-box, .quiz-q, .reflect-box, .panel, .stat, .daily-card, .tree-card, .ach-card, .tool-card, .near, .quiz, .step, .glass-card, .mini, .card-hero, .hero-result, .challenge-card {
      background: var(--card) !important; 
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid var(--stroke) !important; 
      color: var(--text) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
    }
    
    /* Тексты */
    h1, h2, h3, h4, .logo, .tcard b, .hero-name { 
      color: var(--text) !important; 
      font-family: 'Playfair Display', serif !important; 
    }
    p, .muted, .block-sub, .tcard p, .tcard ul li, .hero-tag { 
      color: var(--muted) !important; 
      font-family: 'Montserrat', sans-serif !important; 
    }
    
    /* Кнопки */
    .btn-primary, .btn-danger, .link-go { 
      background: var(--accent) !important; 
      color: #0f1115 !important; 
      border: none !important;
      box-shadow: 0 4px 15px var(--accent-glow) !important; 
    }
    .btn-ghost, .pill, .step-pill { 
      background: var(--bg-2) !important; 
      border-color: var(--stroke) !important; 
      color: var(--text) !important; 
    }
    
    /* Поля ввода */
    textarea, input { 
      background: var(--bg-2) !important; 
      color: var(--text) !important; 
      border-color: var(--stroke) !important; 
    }
    
    /* Прогресс-бары */
    .progress-fill, .bar-fill, .fill { background: var(--accent) !important; }

    /* Кнопка переключения темы */
    .theme-toggle-btn {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--bg-2); border: 1px solid var(--stroke);
      color: var(--accent); display: grid; place-items: center;
      cursor: pointer; font-size: 16px; transition: all 0.3s ease;
      flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .theme-toggle-btn:hover { transform: rotate(15deg) scale(1.1); border-color: var(--accent); }

    /* Универсальная шапка (если нет Tailwind) */
    .unified-header {
      max-width: 768px; margin: 0 auto 24px auto;
      background: var(--card); backdrop-filter: blur(16px);
      border: 1px solid var(--stroke); border-radius: 20px;
      padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;
    }
  `;
  document.head.appendChild(style);

  // ИНИЦИАЛИЗАЦИЯ КНОПКИ И НАВЕШИВАНИЕ СОБЫТИЙ
  document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('globalThemeBtn');
    
    // Если кнопки нет (например, на старых страницах), создаем её
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'globalThemeBtn';
      btn.className = 'theme-toggle-btn';
      btn.title = 'Сменить тему';
      
      // Пытаемся найти шапку, чтобы вставить туда, либо просто фиксируем в углу
      const headerNav = document.querySelector('.nav-user') || document.querySelector('.nav') || document.querySelector('header .container') || document.querySelector('.unified-header');
      
      if (headerNav) {
        if (headerNav.classList.contains('nav-user')) {
          headerNav.appendChild(btn);
        } else {
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex'; wrapper.style.alignItems = 'center'; wrapper.style.marginLeft = 'auto';
          wrapper.appendChild(btn); 
          headerNav.appendChild(wrapper);
        }
      } else {
        // Фолбэк: фиксируем в правом верхнем углу
        btn.style.position = 'fixed'; btn.style.top = '16px'; btn.style.right = '16px'; btn.style.zIndex = '9999';
        document.body.appendChild(btn);
      }
    }

    // Навешиваем событие клика ВСЕГДА (даже если кнопка была в HTML изначально)
    btn.innerHTML = icons[currentTheme] || '☀️';
    btn.onclick = (e) => {
      e.preventDefault();
      let idx = THEMES.indexOf(currentTheme);
      currentTheme = THEMES[(idx + 1) % THEMES.length];
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('global_theme', currentTheme);
      btn.innerHTML = icons[currentTheme];
    };
  });
})();
