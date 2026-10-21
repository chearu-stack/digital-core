(() => {
  const state = { language: 'ru', category: 'all', query: '', projects: null };
  const copy = {
    ru: {
      navWork:'Работы',navCatalog:'Каталог',navAbout:'Подход',contact:'Обсудить проект',
      heroLabel:'НЕЗАВИСИМАЯ ИНЖЕНЕРНАЯ ПРАКТИКА',heroTitle:'Сложные системы.<br><em>Простые интерфейсы.</em>',
      heroCopy:'Проектирую и собираю цифровые продукты — от локальных AI-систем до сервисов, которыми удобно пользоваться каждый день.',
      scroll:'ЛИСТАЙТЕ, ЧТОБЫ ИССЛЕДОВАТЬ',workTitle:'Избранные проекты',catalogTitle:'Инженерный индекс',
      catalogCopy:'Инструменты, архитектурные заметки<br>и рабочие пространства.',search:'Поиск по каталогу',
      empty:'Ничего не найдено. Попробуйте изменить фильтр.',retryCatalog:'Повторить загрузку',catalogLoading:'Загружаю каталог проектов…',catalogCached:'Каталог загружен из сохранённой копии от {date}.',catalogFallback:'Показана резервная версия каталога от {date}.',catalogLoadError:'Не удалось загрузить каталог. Попробуйте ещё раз.',aboutTitle:'Сначала ясность.<br><em>Затем — система.</em>',
      aboutCopy:'Исследую задачу, выделяю главное и проектирую понятное решение. В основе — аккуратная инженерия, детерминированная логика и интерфейс, который не мешает работе.',
      footerTitle:'Есть задача?<br><em>Давайте разберём.</em>',footerCta:'Обсудить проект',
      footerNote:'СОБРАНО С ВНИМАНИЕМ К ДЕТАЛЯМ',
      filters:{all:'Все',ai_automation:'AI / Автоматизация',commerce:'Commerce',web_interface:'Web',architecture_docs:'Архитектура',fsm:'FSM',construction:'Строительство'},
      statuses:{'Рабочий проект':'В РАБОТЕ','Прототип':'ПРОТОТИП','Архитектурная концепция':'АРХИТЕКТУРНАЯ КОНЦЕПЦИЯ','Демо требует подтверждения':'ДЕМО НЕ ПРОВЕРЕНО','Публикация требует подтверждения':'ПУБЛИКАЦИЯ НЕ ПРОВЕРЕНА','Не проверен':'НЕ ПРОВЕРЕН','Черновик':'ЧЕРНОВИК'},
      projectDetailKicker:'КАРТОЧКА ПРОЕКТА / ПОДРОБНОСТИ',dialogClose:'Закрыть окно',projectDialogLabel:'Подробная информация о проекте',mediaDialogLabel:'Полноэкранный просмотр изображения',
      detailStatus:'Статус',detailCategory:'Направление',detailStack:'Технологии',detailMedia:'Визуальные материалы',detailArchitecture:'Архитектура и схема',
      detailScreenshots:'Скриншоты',detailNoMedia:'Подтверждённые схемы и скриншоты пока не добавлены.',
      detailSource:'Исходный код',detailSourceUnavailable:'Публичная ссылка на репозиторий отсутствует или не прошла проверку. Ссылка на код скрыта.',
      githubAction:'GitHub / Исходный код',detailDemo:'Живое демо',openExternal:'Открыть демо отдельно ↗',demoUnavailable:'Демо-ссылка не подтверждена.',
      openImage:'Открыть изображение',detailMediaUnavailable:'Файл визуального материала недоступен.'
    },
    en: {
      navWork:'Work',navCatalog:'Catalog',navAbout:'Approach',contact:'Start a conversation',
      heroLabel:'INDEPENDENT ENGINEERING PRACTICE',heroTitle:'Complex systems.<br><em>Simple interfaces.</em>',
      heroCopy:'I design and build digital products — from local AI systems to services that feel natural to use every day.',
      scroll:'SCROLL TO EXPLORE',workTitle:'Selected work',catalogTitle:'Engineering index',
      catalogCopy:'Tools, architecture notes<br>and active workspaces.',search:'Search the catalog',
      empty:'No results. Try changing the filter.',retryCatalog:'Retry loading',catalogLoading:'Loading the project catalog…',catalogCached:'Showing the saved catalog copy from {date}.',catalogFallback:'Showing the bundled fallback catalog from {date}.',catalogLoadError:'The catalog could not be loaded. Please try again.',aboutTitle:'Clarity first.<br><em>Then the system.</em>',
      aboutCopy:'I explore the problem, find what matters, and shape a clear solution. Careful engineering, deterministic logic, and an interface that stays out of the way.',
      footerTitle:'Have a challenge?<br><em>Let’s unpack it.</em>',footerCta:'Start a conversation',
      footerNote:'BUILT WITH ATTENTION TO DETAIL',
      filters:{all:'All',ai_automation:'AI / Automation',commerce:'Commerce',web_interface:'Web',architecture_docs:'Architecture',fsm:'FSM',construction:'Construction'},
      statuses:{'Рабочий проект':'IN PROGRESS','Прототип':'PROTOTYPE','Архитектурная концепция':'ARCHITECTURE CONCEPT','Демо требует подтверждения':'DEMO UNVERIFIED','Публикация требует подтверждения':'DEPLOYMENT UNVERIFIED','Не проверен':'UNVERIFIED','Черновик':'DRAFT'},
      projectDetailKicker:'PROJECT FILE / DETAIL VIEW',dialogClose:'Close dialog',projectDialogLabel:'Project details',mediaDialogLabel:'Full-screen image viewer',
      detailStatus:'Status',detailCategory:'Focus',detailStack:'Technology',detailMedia:'Visual proof',detailArchitecture:'Architecture diagram',
      detailScreenshots:'Screenshots',detailNoMedia:'Verified diagrams and screenshots have not been added yet.',
      detailSource:'Source code',detailSourceUnavailable:'A public repository URL is missing or has not passed validation. The code link is hidden.',
      githubAction:'GitHub / Source code',detailDemo:'Live demo',openExternal:'Open demo in a new tab ↗',demoUnavailable:'The demo URL has not been verified.',
      openImage:'View image',detailMediaUnavailable:'This media file is unavailable.'
    }
  };
  Object.assign(copy.ru, {locationLabel:'ЛОКАЦИЯ',locationCity:'Павлово, Нижегородская область',locationAddress:'ул. 5-я Северная, д. 11',locationCoordinates:'55°58′ N · 43°04′ E',workLinkLabel:'Смотреть проекты',heroVisualLabel:'Инженерная визуализация Digital Core — перейти к проектам',heroImageAlt:'Инженерная цифровая структура с неоновыми линиями на тёмном фоне',heroVisualCaption:'СИСТЕМЫ · ДАННЫЕ · ИНТЕРФЕЙСЫ'});
  Object.assign(copy.en, {locationLabel:'LOCATION',locationCity:'Pavlovo, Nizhny Novgorod Oblast',locationAddress:'11 5th Severnaya Street',locationCoordinates:'55°58′ N · 43°04′ E',workLinkLabel:'Explore projects',heroVisualLabel:'Digital Core engineering visualization — view projects',heroImageAlt:'Engineered digital structure with neon lines against a dark background',heroVisualCaption:'SYSTEMS · DATA · INTERFACES'});
  const $ = (selector) => document.querySelector(selector);
  const projectDialog = $('#project-dialog');
  const mediaDialog = $('#media-dialog');
  const detailRoot = $('#project-detail');
  const catalogStatus = $('#catalog-status');
  let activeProject = null;
  let previousFocus = null;
  let mediaTrigger = null;

  const text = (key) => copy[state.language][key];
  const categoryLabel = (key) => copy[state.language].filters[key] || key;
  const safeHttpsUrl = (value) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url : null;
    } catch {
      return null;
    }
  };
  const publicGithubUrl = (value) => {
    const url = safeHttpsUrl(value);
    if (!url || url.hostname.toLowerCase() !== 'github.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    return parts.length >= 2 ? url.href : null;
  };
  const safeMediaPath = (value) => typeof value === 'string'
    && /^assets\/images\/projects\/[a-z0-9-]+\/[a-z0-9._-]+\.(png|jpe?g|webp)$/i.test(value)
    && !value.split('/').includes('..');

  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined && value !== null) node.textContent = value;
    return node;
  };
  const addI18nText = (tag, className, key) => element(tag, className, text(key));
  const addLink = (parent, label, href, className) => {
    const link = element('a', className, label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    parent.append(link);
    return link;
  };
  const displayModes = {
    ru: {
      live_static_ecommerce:'ЖИВОЙ САЙТ / E-COMMERCE',
      live_static_archive:'ЖИВОЙ САЙТ / АРХИВ',
      live_static_showcase:'ЖИВОЙ САЙТ / SHOWCASE',
      b2b_offer:'B2B / ПРЕЗЕНТАЦИЯ',
      live_client_constructor_pdf:'LIVE / PDF-КОНСТРУКТОР',
      wake_on_demand_knowledge_base:'KNOWLEDGE BASE / VOGE',
      vds_live_frontend:'LIVE FRONTEND / VDS',
      protected_contour:'ЗАЩИЩЁННЫЙ КОНТУР / ДОСТУП ПО ЗАПРОСУ',
      live_static_tool:'LIVE / ИНЖЕНЕРНЫЙ ИНСТРУМЕНТ',
      engineering_module:'ENGINEERING MODULE', research_debt:'R&D / ТЕХНИЧЕСКИЙ ДОЛГ',
      research_core_architecture:'CORE ARCHITECTURE / R&D', research_prototype:'ARCHITECTURE / R&D'
    },
    en: {
      live_static_ecommerce:'LIVE SITE / E-COMMERCE', live_static_archive:'LIVE SITE / ARCHIVE', live_static_showcase:'LIVE SITE / SHOWCASE',
      b2b_offer:'B2B OFFER / PRESENTATION', live_client_constructor_pdf:'LIVE / PDF CONSTRUCTOR',
      wake_on_demand_knowledge_base:'KNOWLEDGE BASE / VOGE', vds_live_frontend:'LIVE FRONTEND / VDS',
      protected_contour:'PROTECTED ACCESS / ON REQUEST', live_static_tool:'LIVE / ENGINEERING TOOL',
      engineering_module:'ENGINEERING MODULE', research_debt:'R&D / TECHNICAL DEBT',
      research_core_architecture:'CORE ARCHITECTURE / R&D', research_prototype:'ARCHITECTURE / R&D'
    }
  };
  const displayMode = (project) => displayModes[state.language][project.display_mode] || project.display_mode || '';

  const allProjects = () => state.projects
    ? [...state.projects.flagship_projects, ...state.projects.catalog]
    : [];

  const catalogCacheKey = 'digital-core-project-catalog-v1';
  const isValidCatalog = (data) => data && Array.isArray(data.flagship_projects)
    && Array.isArray(data.catalog)
    && data.flagship_projects.every((project) => project && typeof project.id === 'string' && typeof project.name === 'string')
    && data.catalog.every((project) => project && typeof project.id === 'string' && typeof project.name === 'string');
  const requestJson = async (url, timeoutMs = 5000) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal, cache: 'no-cache' });
      if (!response.ok) throw new Error('Catalog request failed');
      return await response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  };
  const setCatalogStatus = (key, date = '', showRetry = false) => {
    catalogStatus.hidden = !key;
    catalogStatus.dataset.messageKey = key || '';
    catalogStatus.dataset.messageDate = date;
    catalogStatus.dataset.showRetry = String(showRetry);
    $('#catalog-status-message').textContent = key ? text(key).replace('{date}', date) : '';
    $('#catalog-retry').hidden = !showRetry;
  };
  const loadProjectCatalog = async () => {
    setCatalogStatus('catalogLoading');
    try {
      let data;
      try {
        data = await requestJson('assets/data/projects.json');
      } catch {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        data = await requestJson('assets/data/projects.json');
      }
      if (!isValidCatalog(data)) throw new Error('Invalid project catalog');
      state.projects = data;
      const savedAt = new Date().toISOString();
      try {
        localStorage.setItem(catalogCacheKey, JSON.stringify({ savedAt, data }));
      } catch {
        // Keep the catalog available for this session when browser storage is unavailable.
      }
      render();
      setCatalogStatus('');
      return;
    } catch {
      // Continue to the last known good copy or the bundled snapshot.
    }

    try {
      const cached = JSON.parse(localStorage.getItem(catalogCacheKey));
      if (cached && isValidCatalog(cached.data) && Number.isFinite(Date.parse(cached.savedAt))) {
        state.projects = cached.data;
        render();
        const date = new Intl.DateTimeFormat(state.language === 'ru' ? 'ru-RU' : 'en-GB', {
          dateStyle: 'medium', timeStyle: 'short'
        }).format(new Date(cached.savedAt));
        setCatalogStatus('catalogCached', date, true);
        return;
      }
    } catch {
      // Ignore missing or damaged browser cache and try the bundled snapshot.
    }

    try {
      const fallback = await requestJson('assets/data/projects-fallback.json');
      if (!isValidCatalog(fallback) || !fallback.fallback_updated_at) throw new Error('Invalid fallback catalog');
      state.projects = fallback;
      render();
      setCatalogStatus('catalogFallback', fallback.fallback_updated_at, true);
    } catch {
      state.projects = null;
      $('#featured-grid').replaceChildren();
      $('#catalog-list').replaceChildren();
      $('#filters').replaceChildren();
      $('#empty-state').hidden = true;
      setCatalogStatus('catalogLoadError', '', true);
    }
  };

  const applyLanguage = (language) => {
    state.language = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const value = copy[language][node.dataset.i18n];
      if (value) node.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      node.placeholder = copy[language][node.dataset.i18nPlaceholder] || '';
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
      node.alt = copy[language][node.dataset.i18nAlt] || '';
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      node.setAttribute('aria-label', copy[language][node.dataset.i18nAria] || '');
    });
    $('#lang-switch').innerHTML = language === 'ru' ? 'EN <span>↗</span>' : 'RU <span>↗</span>';
    if (state.projects) render();
    if (activeProject) renderProjectDetail(activeProject);
    if (!catalogStatus.hidden) setCatalogStatus(
      catalogStatus.dataset.messageKey,
      catalogStatus.dataset.messageDate,
      catalogStatus.dataset.showRetry === 'true'
    );
  };


  const renderCard = (project, index, featured) => {
    const card = element('a', featured ? 'project-card' : 'catalog-row');
    card.href = '#project-details';
    card.dataset.projectOpen = project.id;
    if (featured) {
      const art = element('div', 'project-art art-' + (project.art || 'wisdom'));
      art.setAttribute('aria-hidden', 'true');
      card.append(art);
      const number = element('div', 'project-number');
      number.append(element('span', '', String(index + 1).padStart(2, '0') + ' / ' + String(state.projects.flagship_projects.length).padStart(2, '0')));
      number.append(element('span', '', displayMode(project)));
      card.append(number);
      const body = element('div', 'project-body');
      body.append(element('div', 'project-meta', categoryLabel(project.category) + ' \u00b7 ' + displayMode(project)));
      body.append(element('h3', '', state.language === 'ru' ? project.name : project.name_en));
      body.append(element('p', '', state.language === 'ru' ? project.description : project.description_en));
      const tags = element('div', 'project-tags');
      (project.tech_stack || []).slice(0, 4).forEach((tag) => tags.append(element('span', '', tag)));
      body.append(tags);
      card.append(body, element('span', 'card-arrow', '↗'));
    } else {
      card.append(element('span', 'row-num', String(index + 1).padStart(2, '0')));
      const title = element('span', '');
      title.append(element('span', 'row-title', state.language === 'ru' ? project.name : project.name_en));
      title.append(element('span', 'row-description', state.language === 'ru' ? project.description : project.description_en));
      card.append(title);
      const tags = element('span', 'row-tags');
      (project.tech_stack || []).slice(0, 3).forEach((tag) => tags.append(element('span', '', tag)));
      card.append(tags);
      card.append(element('span', 'row-status', displayMode(project)));
      card.append(element('span', 'row-arrow', '↗'));
    }
    return card;
  };

  const render = () => {
    const featured = $('#featured-grid');
    const catalogRoot = $('#catalog-list');
    featured.replaceChildren(...state.projects.flagship_projects.map((project, index) => renderCard(project, index, true)));
    const featuredCount = String(state.projects.flagship_projects.length).padStart(2, '0');
    $('#featured-count').textContent = featuredCount + ' / 2022–26';

    const categories = ['all', ...new Set(state.projects.catalog.map((item) => item.category))];
    const tags = [...new Set(state.projects.catalog.flatMap((item) => item.tech_stack || []))].sort((a, b) => a.localeCompare(b));
    const filterKeys = [...new Set([...categories, ...tags])];
    $('#filters').replaceChildren(...filterKeys.map((key) => {
      const button = element('button', 'filter-btn' + (key === state.category ? ' active' : ''), categoryLabel(key));
      button.type = 'button';
      button.dataset.category = key;
      return button;
    }));

    const query = state.query.toLocaleLowerCase();
    const matches = state.projects.catalog.filter((item) => {
      const categoryMatch = state.category === 'all'
        || (categories.includes(state.category) ? item.category === state.category : (item.tech_stack || []).includes(state.category));
      const searchable = [item.name, item.name_en, item.description, item.description_en, (item.tech_stack || []).join(' ')].join(' ').toLocaleLowerCase();
      return categoryMatch && searchable.includes(query);
    });
    catalogRoot.replaceChildren(...matches.map((item, index) => renderCard(item, index, false)));
    $('#empty-state').hidden = matches.length > 0;
  };

  const addDefinition = (list, label, value) => {
    const wrapper = element('div', 'detail-fact');
    wrapper.append(element('dt', '', label), element('dd', '', value));
    list.append(wrapper);
  };
  const openMedia = (source, caption, trigger) => {
    if (!safeMediaPath(source)) return;
    mediaTrigger = trigger;
    $('#media-full-image').src = source;
    $('#media-full-image').alt = caption;
    $('#media-caption').textContent = caption;
    if (typeof mediaDialog.showModal === 'function') mediaDialog.showModal();
    else mediaDialog.setAttribute('open', '');
  };
  const addMediaButton = (gallery, source, caption) => {
    if (!safeMediaPath(source)) return;
    const button = element('button', 'media-thumb');
    button.type = 'button';
    button.setAttribute('aria-label', text('openImage') + ': ' + caption);
    const image = element('img');
    image.src = source;
    image.alt = caption;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      button.replaceChildren(element('span', 'media-thumb-unavailable', text('detailMediaUnavailable')));
    }, { once: true });
    button.append(image);
    button.addEventListener('click', () => openMedia(source, caption, button));
    gallery.append(button);
  };
  const renderProjectDetail = (project) => {
    detailRoot.replaceChildren();
    const name = state.language === 'ru' ? project.name : project.name_en;
    const description = state.language === 'ru' ? project.description : project.description_en;
    const title = element('h2', 'project-detail-title', name);
    title.id = 'project-dialog-title';
    detailRoot.append(title);
    detailRoot.append(element('p', 'project-detail-description', description || ''));

    const facts = element('dl', 'project-facts');
    addDefinition(facts, text('detailStatus'), displayMode(project));
    addDefinition(facts, text('detailCategory'), categoryLabel(project.category));
    if ((project.tech_stack || []).length) addDefinition(facts, text('detailStack'), project.tech_stack.join(' · '));
    detailRoot.append(facts);

    const actions = element('div', 'project-actions');
    const githubUrl = project.is_private === false ? publicGithubUrl(project.github_url) : null;
    if (githubUrl) addLink(actions, text('githubAction'), githubUrl, 'detail-action github-action');
    const demoUrl = safeHttpsUrl(project.demo_url);
    if (demoUrl) addLink(actions, text('openExternal'), demoUrl.href, 'detail-action external-action');
    if (typeof project.contact_email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.contact_email)) {
      const label = state.language === 'ru' ? '\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0435' : 'Discuss implementation';
      addLink(actions, label, 'mailto:' + project.contact_email, 'detail-action contact-action');
    }
    if (actions.childElementCount) detailRoot.append(actions);

    const demoSection = element('section', 'detail-section');
    demoSection.append(addI18nText('h3', '', 'detailDemo'));
    if (demoUrl) {
      const frame = element('iframe', 'demo-frame');
      frame.src = demoUrl.href;
      frame.title = name + ' — ' + text('detailDemo');
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer';
      frame.setAttribute('sandbox', 'allow-scripts allow-forms');
      frame.setAttribute('allow', 'fullscreen');
      demoSection.append(frame);
    } else demoSection.append(addI18nText('p', 'detail-empty', (project.display_mode === 'b2b_offer' || project.display_mode === 'protected_contour' || project.display_mode === 'wake_on_demand_knowledge_base') ? 'accessByRequest' : 'demoUnavailable'));
    detailRoot.append(demoSection);

    const screenshots = Array.isArray(project.screenshots) ? project.screenshots.filter(safeMediaPath) : [];
    const diagram = safeMediaPath(project.architecture_diagram) ? project.architecture_diagram : null;
    const mediaSection = element('section', 'detail-section');
    mediaSection.append(addI18nText('h3', '', 'detailMedia'));
    if (diagram) {
      mediaSection.append(addI18nText('h4', 'detail-subheading', 'detailArchitecture'));
      const diagramGallery = element('div', 'media-gallery architecture-gallery');
      addMediaButton(diagramGallery, diagram, name + ' — ' + text('detailArchitecture'));
      mediaSection.append(diagramGallery);
    }
    if (screenshots.length) {
      mediaSection.append(addI18nText('h4', 'detail-subheading', 'detailScreenshots'));
      const gallery = element('div', 'media-gallery');
      screenshots.forEach((source, index) => addMediaButton(gallery, source, name + ' — ' + text('detailScreenshots') + ' ' + (index + 1)));
      mediaSection.append(gallery);
    }
    if (!diagram && !screenshots.length) mediaSection.append(addI18nText('p', 'detail-empty', 'detailNoMedia'));
    detailRoot.append(mediaSection);
    if (!githubUrl) {
      const sourceNote = element('p', 'source-visibility-note', text('detailSourceUnavailable'));
      sourceNote.setAttribute('role', 'note');
      detailRoot.append(sourceNote);
    }
  };

  const openProject = (project, trigger) => {
    activeProject = project;
    previousFocus = trigger;
    renderProjectDetail(project);
    if (typeof projectDialog.showModal === 'function') projectDialog.showModal();
    else projectDialog.setAttribute('open', '');
  };
  const closeDialog = (dialog, focusTarget) => {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    if (focusTarget && focusTarget.isConnected) focusTarget.focus();
  };

  document.addEventListener('click', (event) => {
    const projectTrigger = event.target.closest('[data-project-open]');
    if (projectTrigger) {
      event.preventDefault();
      const project = allProjects().find((item) => item.id === projectTrigger.dataset.projectOpen);
      if (project) openProject(project, projectTrigger);
      return;
    }
    const filter = event.target.closest('[data-category]');
    if (filter) {
      state.category = filter.dataset.category;
      render();
      return;
    }
    if (event.target.closest('[data-close-dialog]')) {
      const dialog = event.target.closest('dialog');
      closeDialog(dialog, dialog === mediaDialog ? mediaTrigger : previousFocus);
      return;
    }
    if (event.target === projectDialog) closeDialog(projectDialog, previousFocus);
    if (event.target === mediaDialog) closeDialog(mediaDialog, mediaTrigger);
  });

  $('#lang-switch').addEventListener('click', () => applyLanguage(state.language === 'ru' ? 'en' : 'ru'));
  $('#catalog-search').addEventListener('input', (event) => {
    state.query = event.target.value;
    render();
    $('#catalog-search').focus();
  });
  $('#menu-toggle').addEventListener('click', (event) => {
    const open = $('.main-nav').classList.toggle('open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
  });
  $('.main-nav').addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      $('.main-nav').classList.remove('open');
      $('#menu-toggle').setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      $('#catalog-search').focus();
    }
  });
  $('#open-bot').addEventListener('click', () => window.LeadBot?.open());

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = copy.ru[node.dataset.i18n];
    if (value) node.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    const value = copy.ru[node.dataset.i18nAria];
    if (value) node.setAttribute('aria-label', value);
  });

  $('#catalog-retry').addEventListener('click', loadProjectCatalog);
  loadProjectCatalog();
})();
