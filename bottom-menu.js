(function(){
  const style = document.createElement('style');
  style.textContent = `
    body { padding-bottom: calc(90px + env(safe-area-inset-bottom)) !important; }
    
    .bottom-nav { 
      position: fixed; bottom: 0; left: 0; right: 0; 
      background: #161920;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      display: flex; justify-content: space-around; align-items: center; 
      padding: 8px 0 calc(8px + env(safe-area-inset-bottom)); 
      z-index: 9999; font-family: 'Montserrat', sans-serif; 
    }
    
    .nav-item { 
      display: flex; flex-direction: column; align-items: center; gap: 4px; 
      color: #a1a1b5; 
      text-decoration: none; font-size: 10px; font-weight: 600; 
      transition: .2s; background: none; border: none; cursor: pointer; 
      flex: 1; padding: 0; 
    }
    .nav-item .icon { 
      display: flex; align-items: center; justify-content: center; 
      height: 22px; width: 22px; transition: .3s; 
    }
    .nav-item .icon svg { width: 22px; height: 22px; display: block; }
    .nav-item.active { color: #d4af37; }
    .nav-item.active .icon { transform: translateY(-2px); filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)); }
    .nav-item.help-btn { color: #fb7185; }
    .nav-item.help-btn .icon { filter: drop-shadow(0 0 8px rgba(251, 113, 133, 0.5)); }
    
    .tools-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 9997; opacity: 0; pointer-events: none; transition: .3s; }
    .tools-backdrop.show { opacity: 1; pointer-events: auto; }
    
    .tools-popup { 
      position: fixed; bottom: calc(80px + env(safe-area-inset-bottom)); left: 50%; 
      transform: translateX(-50%) translateY(20px); background: #161920; 
      border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 24px; padding: 16px; 
      width: calc(100% - 40px); max-width: 360px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; 
      box-shadow: 0 20px 50px rgba(0,0,0,0.8); opacity: 0; pointer-events: none; 
      transition: .3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 9998; 
    }
    .tools-popup.show { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
    
    .tools-popup a { 
      padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.03); 
      color: #f3f4f6; text-decoration: none; font-size: 12px; font-weight: 600; 
      display: flex; flex-direction: column; align-items: center; gap: 8px; 
      transition: .2s; text-align: center; border: 1px solid rgba(255,255,255,0.05);
    }
    .tools-popup a:hover { background: rgba(212, 175, 55, 0.1); border-color: rgba(212, 175, 55, 0.3); transform: translateY(-2px); }
    
    .support-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 10000; opacity: 0; pointer-events: none; transition: .3s; }
    .support-modal.show { opacity: 1; pointer-events: auto; }
    .support-card { background: #161920; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 24px; padding: 30px; max-width: 340px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.8); transform: translateY(20px); transition: .3s; }
    .support-modal.show .support-card { transform: translateY(0); }
    .support-card h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: #d4af37; margin-bottom: 12px; }
    .support-card p { font-size: 14px; color: #f3f4f6; line-height: 1.6; margin-bottom: 20px; }
    .support-card button { background: #d4af37; border: none; padding: 12px 20px; border-radius: 12px; color: #0f1115; font-weight: 700; cursor: pointer; width: 100%; font-family: 'Montserrat', sans-serif; }

    /* ============ НОВОЕ: ФУТЕР О ПРОЕКТЕ ============ */
    .project-footer {
      max-width: 768px;
      margin: 40px auto 20px auto;
      padding: 0 16px;
      font-family: 'Montserrat', sans-serif;
    }
    .footer-inner {
      background: var(--card, rgba(22, 25, 32, 0.88));
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--stroke, rgba(255,255,255,0.09));
      border-radius: 24px;
      padding: 22px 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .footer-mission {
      text-align: center;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--stroke, rgba(255,255,255,0.09));
    }
    .footer-icon {
      font-size: 22px;
      margin-bottom: 6px;
    }
    .footer-mission h3 {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: var(--text, #f3f4f6);
      margin-bottom: 8px;
    }
    .footer-mission p {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--muted, #a1a1b5);
      margin-bottom: 6px;
    }
    .footer-slogan {
      font-style: italic;
      color: var(--accent, #d4af37) !important;
      font-size: 12px !important;
      margin-top: 8px !important;
      font-weight: 600;
    }
    .footer-authors {
      padding: 18px 0;
    }
    .footer-authors h4 {
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent, #d4af37);
      margin-bottom: 12px;
      font-weight: 700;
    }
    .author-card {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .author-card:last-child { margin-bottom: 0; }
    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--accent, #d4af37) 18%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent, #d4af37) 40%, transparent);
      color: var(--accent, #d4af37);
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .author-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--text, #f3f4f6);
      margin-bottom: 2px;
    }
    .author-role {
      font-size: 11.5px;
      color: var(--accent, #d4af37);
      margin-bottom: 2px;
      font-weight: 600;
    }
    .author-sub {
      font-size: 11px;
      color: var(--muted, #a1a1b5);
      line-height: 1.4;
    }
    .footer-bottom {
      padding-top: 16px;
      border-top: 1px solid var(--stroke, rgba(255,255,255,0.09));
      text-align: center;
      font-size: 11px;
      color: var(--muted, #a1a1b5);
      opacity: 0.75;
      line-height: 1.5;
    }
    @media (max-width: 480px) {
      .footer-inner { padding: 18px 16px; }
      .author-avatar { width: 36px; height: 36px; font-size: 13px; }
    }
  `;
  document.head.appendChild(style);

  const path = window.location.pathname;
  const isHome = path.includes('index.html') || path === '/' || path.endsWith('/');
  const isModules = path.includes('module-') || path.includes('lesson.html');
  const isNotebook = path.includes('notebook.html');

  const getIcon = (pathData, isActive) => `
    <svg viewBox="0 0 24 24" fill="${isActive ? 'currentColor' : 'none'}" fill-opacity="${isActive ? '0.15' : '0'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${pathData}
    </svg>
  `;

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <a href="index.html" class="nav-item ${isHome ? 'active' : ''}">
      <span class="icon">${getIcon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', isHome)}</span>
      <span>Главная</span>
    </a>
    <a href="index.html#modules" class="nav-item ${isModules ? 'active' : ''}" id="navModulesLink">
      <span class="icon">${getIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/>', isModules)}</span>
      <span>Модули</span>
    </a>
    <button class="nav-item" onclick="window.toggleTools()">
      <span class="icon">${getIcon('<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>', false)}</span>
      <span>Сервисы</span>
    </button>
    <a href="notebook.html" class="nav-item ${isNotebook ? 'active' : ''}">
      <span class="icon">${getIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', isNotebook)}</span>
      <span>Тетрадь</span>
    </a>
    <button class="nav-item help-btn" onclick="window.openSupport()">
      <span class="icon">${getIcon('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', true)}</span>
      <span>Помощь</span>
    </button>
  `;
  document.body.appendChild(nav);

  /* НОВОЕ: обработчик кнопки «Модули» — плавный скролл на главной */
  const modulesLink = document.getElementById('navModulesLink');
  if (modulesLink) {
    modulesLink.addEventListener('click', function(e) {
      if (isHome) {
        e.preventDefault();
        const target = document.getElementById('modules');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // если не на главной — обычный переход на index.html#modules
    });
  }

  const backdrop = document.createElement('div');
  backdrop.id = 'toolsBackdrop';
  backdrop.className = 'tools-backdrop';
  backdrop.onclick = function() { window.toggleTools(); };
  document.body.appendChild(backdrop);

  const toolsPopup = document.createElement('div');
  toolsPopup.id = 'toolsPopup';
  toolsPopup.className = 'tools-popup';
  toolsPopup.innerHTML = `
    <a href="breathing.html">🌿 Дыхание</a>
    <a href="inspiration.html">🎬 Вдохновение</a>
    <a href="budget.html">💰 Бюджет</a>
    <a href="balance-wheel.html">🎡 Колесо</a>
    <a href="challenges.html">🏆 Челленджи</a>
    <a href="scam-game.html">🕵️ Мошенник</a>
    <a href="habit-calculator.html">💸 Привычки</a>
    <a href="body-map.html">🧠 Карта тела</a>
    <a href="emotion-magic.html">✨ Магия слов</a>
    <a href="survive-test.html">🌧 Пережить</a>
    <a href="cbt-diary.html">📝 Дневник</a>
  `;
  document.body.appendChild(toolsPopup);

  const supportModal = document.createElement('div');
  supportModal.id = 'supportModal';
  supportModal.className = 'support-modal';
  supportModal.innerHTML = `
    <div class="support-card">
      <h3>Мы рядом 💛</h3>
      <p id="supportText">Ты уже проделал(а) большой путь. Даже если сейчас кажется, что стоишь на месте — ты дышишь, а значит, продолжаешь жить. Сделай глубокий вдох. Ты справишься.</p>
      <button onclick="document.getElementById('supportModal').classList.remove('show')">Спасибо</button>
    </div>
  `;
  document.body.appendChild(supportModal);

  /* НОВОЕ: футер о проекте и авторах — вставляем перед нижним меню */
  const footer = document.createElement('footer');
  footer.className = 'project-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-mission">
        <div class="footer-icon">🧭</div>
        <h3>Точка опоры</h3>
        <p>Бесплатное приложение для студентов — про финансы, психологию и поддержку. Практика вместо лекций, маленькие шаги вместо перфекционизма.</p>
        <p class="footer-slogan">«Твой внутренний компас в мире дедлайнов»</p>
      </div>
      <div class="footer-authors">
        <h4>Авторы проекта</h4>
        <div class="author-card">
          <div class="author-avatar">ЕО</div>
          <div>
            <div class="author-name">Елена Осинцева</div>
            <div class="author-role">Преподаватель, психолог</div>
            <div class="author-sub">Автор курсов · Куратор модулей «Психология» и «Поддержка»</div>
          </div>
        </div>
        <div class="author-card">
          <div class="author-avatar">ТХ</div>
          <div>
            <div class="author-name">Тимур Хайретдинов</div>
            <div class="author-role">Преподаватель, коуч, экономист</div>
            <div class="author-sub">Высшее экономическое образование · Куратор модуля «Финансы»</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 Точка опоры · Бесплатно для студентов<br>
        Сделано с заботой о тех, кто учится
      </div>
    </div>
  `;
  document.body.insertBefore(footer, nav);

  const warmWords = [
    "Ты не обязан(а) быть продуктивным(ой) 24/7. Отдых — это тоже важная работа.",
    "Если сейчас тяжело — просто сделай глубокий вдох. Шаг за шагом, ты справишься.",
    "Твоя ценность не измеряется оценками, лайками или чужим мнением.",
    "Любая ошибка — это не провал, а данные.",
    "Ты уже здесь. Ты пытаешься разобраться в себе. Это требует огромной смелости.",
    "Не сравнивай свой день 1 с чьим-то днём 100. У каждого свой темп.",
    "Позволь себе сегодня сделать меньше, но почувствовать больше.",
    "Ты — не свои мысли. Ты — тот, кто их замечает."
  ];

  window.toggleTools = function() {
    document.getElementById('toolsPopup').classList.toggle('show');
    document.getElementById('toolsBackdrop').classList.toggle('show');
  };

  window.openSupport = function() {
    const randomPhrase = warmWords[Math.floor(Math.random() * warmWords.length)];
    document.getElementById('supportText').textContent = randomPhrase;
    document.getElementById('supportModal').classList.add('show');
  };
})();
