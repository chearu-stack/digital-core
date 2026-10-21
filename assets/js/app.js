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
      detailScreenshots:'Скриншоты',detailNoMedia:'Подтверждённые схемы и снимки экрана пока не добавлены.',
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
  Object.assign(copy.ru, {"heroCopy":"\u041f\u0440\u043e\u0435\u043a\u0442\u0438\u0440\u0443\u044e \u0438 \u0441\u043e\u0437\u0434\u0430\u044e \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b \u2014 \u043e\u0442 \u0441\u0438\u0441\u0442\u0435\u043c \u0438\u0441\u043a\u0443\u0441\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442\u0430 \u0434\u043e \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u0445 \u0438 \u0443\u0434\u043e\u0431\u043d\u044b\u0445 \u0432 \u0440\u0430\u0431\u043e\u0442\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u043e\u0432.","catalogCopy":"\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b, \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438<br>\u0438 \u0440\u0430\u0431\u043e\u0447\u0438\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430.","filters":{"all":"\u0412\u0441\u0435","ai_automation":"\u0418\u0418 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f","commerce":"\u041a\u043e\u043c\u043c\u0435\u0440\u0446\u0438\u044f","web_interface":"\u0421\u0430\u0439\u0442\u044b \u0438 \u0432\u0435\u0431-\u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b","architecture_docs":"\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430","fsm":"\u041b\u043e\u0433\u0438\u043a\u0430 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0439","construction":"\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e"},"projectDetailKicker":"\u041f\u0420\u041e\u0415\u041a\u0422 / \u041f\u041e\u0414\u0420\u041e\u0411\u041d\u041e\u0421\u0422\u0418","detailStack":"\u0421\u043e\u0441\u0442\u0430\u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438","detailScreenshots":"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f","detailSource":"\u041e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u0438\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434","detailSourceUnavailable":"\u041e\u0442\u043a\u0440\u044b\u0442\u0430\u044f \u0441\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0438\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434 \u043d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u0430; \u043a\u043e\u0434 \u043d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f.","githubAction":"\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434","detailDemo":"\u041f\u043e\u043a\u0430\u0437 \u043f\u0440\u043e\u0435\u043a\u0442\u0430","openExternal":"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u043a\u0430\u0437 \u0432 \u043d\u043e\u0432\u043e\u0439 \u0432\u043a\u043b\u0430\u0434\u043a\u0435 \u2197","demoUnavailable":"\u041e\u0431\u0449\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0439 \u043f\u043e\u043a\u0430\u0437 \u043d\u0435 \u043f\u0440\u0435\u0434\u0443\u0441\u043c\u043e\u0442\u0440\u0435\u043d.","accessByRequest":"\u0414\u043e\u0441\u0442\u0443\u043f \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443.","presentationTitle":"\u041f\u0440\u0435\u0437\u0435\u043d\u0442\u0430\u0446\u0438\u044f \u0431\u0430\u0437\u044b \u0437\u043d\u0430\u043d\u0438\u0439","openPresentation":"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043f\u0440\u0435\u0437\u0435\u043d\u0442\u0430\u0446\u0438\u044e \u2197","presentationNotice":"\u041f\u043e\u043a\u0430\u0437 \u0440\u0430\u0437\u043c\u0435\u0449\u0451\u043d \u043d\u0430 \u0432\u043d\u0435\u0448\u043d\u0435\u043c \u0441\u0435\u0440\u0432\u0438\u0441\u0435; \u043f\u0435\u0440\u0432\u044b\u0439 \u0437\u0430\u043f\u0443\u0441\u043a \u043c\u043e\u0436\u0435\u0442 \u0437\u0430\u043d\u044f\u0442\u044c \u0432\u0440\u0435\u043c\u044f.","heroVisualLabel":"\u0421\u0445\u0435\u043c\u0430 \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0433\u043e \u044f\u0434\u0440\u0430 \u2014 \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c","heroImageAlt":"\u0421\u0445\u0435\u043c\u0430 \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0439 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u0441 \u0441\u0432\u0435\u0442\u044f\u0449\u0438\u043c\u0438\u0441\u044f \u043b\u0438\u043d\u0438\u044f\u043c\u0438 \u043d\u0430 \u0442\u0451\u043c\u043d\u043e\u043c \u0444\u043e\u043d\u0435","heroVisualCaption":"\u0421\u0418\u0421\u0422\u0415\u041c\u042b \u00b7 \u0414\u0410\u041d\u041d\u042b\u0415 \u00b7 \u0418\u041d\u0422\u0415\u0420\u0424\u0415\u0419\u0421\u042b","heroCoordinates":"\u042f\u0414\u0420\u041e\u201401 / 55.9678\u00b0 \u0421\u0428 \u00b7 43.0768\u00b0 \u0412\u0414","brandMark":"\u0426\u042f","brandCaption":"\u0426\u0418\u0424\u0420\u041e\u0412\u041e\u0415<br>\u042f\u0414\u0420\u041e","brandAria":"\u0426\u0438\u0444\u0440\u043e\u0432\u043e\u0435 \u044f\u0434\u0440\u043e \u2014 \u043d\u0430\u0432\u0435\u0440\u0445","languageSwitch":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a","menuOpen":"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e","heroLabel":"\u041d\u0415\u0417\u0410\u0412\u0418\u0421\u0418\u041c\u0410\u042f \u0418\u041d\u0416\u0415\u041d\u0415\u0420\u041d\u0410\u042f \u041f\u0420\u0410\u041a\u0422\u0418\u041a\u0410","heroRule":"\u041b\u0418\u0421\u0422\u0410\u0419\u0422\u0415, \u0427\u0422\u041e\u0411\u042b \u0418\u0421\u0421\u041b\u0415\u0414\u041e\u0412\u0410\u0422\u042c","sectionWorkKicker":"01 / \u0418\u0417\u0411\u0420\u0410\u041d\u041d\u042b\u0415 \u0420\u0415\u0428\u0415\u041d\u0418\u042f","sectionCatalogKicker":"02 / \u0418\u041d\u0416\u0415\u041d\u0415\u0420\u041d\u042b\u0419 \u0423\u041a\u0410\u0417\u0410\u0422\u0415\u041b\u042c","sectionAboutKicker":"03 / \u041f\u0420\u0418\u041d\u0426\u0418\u041f\u042b","sectionFooterKicker":"04 / \u0421\u0412\u042f\u0417\u042c","principleOne":"\u042f\u0421\u041d\u041e\u0421\u0422\u042c","principleTwo":"\u041d\u0410\u0414\u0401\u0416\u041d\u041e\u0421\u0422\u042c","principleThree":"\u041c\u0410\u0421\u0422\u0415\u0420\u0421\u0422\u0412\u041e","backToTop":"\u0412\u0412\u0415\u0420\u0425 \u2191","copyright":"\u0426\u0418\u0424\u0420\u041e\u0412\u041e\u0415 \u042f\u0414\u0420\u041e 2026","dialogClose":"\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043e\u043a\u043d\u043e","aboutCopy":"\u042f \u0438\u0437\u0443\u0447\u0430\u044e \u0437\u0430\u0434\u0430\u0447\u0443, \u0432\u044b\u0434\u0435\u043b\u044f\u044e \u0433\u043b\u0430\u0432\u043d\u043e\u0435 \u0438 \u0441\u043e\u0437\u0434\u0430\u044e \u044f\u0441\u043d\u043e\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u0435. \u0412 \u043e\u0441\u043d\u043e\u0432\u0435 \u2014 \u0430\u043a\u043a\u0443\u0440\u0430\u0442\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430, \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0438 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043d\u0435 \u043c\u0435\u0448\u0430\u0435\u0442 \u0440\u0430\u0431\u043e\u0442\u0435."});
  Object.assign(copy.ru, {"heroIndex":"? 001 ? 026","scrollHint":"\u041b\u0418\u0421\u0422\u0410\u0419\u0422\u0415 \u0412\u041d\u0418\u0417 \u2193","languageSwitchLabel":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a","locationCoordinates":"55\u00b058\u2032 \u0441. \u0448. \u00b7 43\u00b004\u2032 \u0432. \u0434."});
  Object.assign(copy.en, {"brandMark":"DC","brandCaption":"DIGITAL<br>CORE","brandAria":"Digital Core ? back to top","heroIndex":"NO. 001 ? 026","heroCoordinates":"CORE?01 / 55.9678? N ? 43.0768? E","scrollHint":"SCROLL TO EXPLORE ?","sectionWorkKicker":"01 / SELECTED WORK","sectionCatalogKicker":"02 / ENGINEERING INDEX","sectionAboutKicker":"03 / PRINCIPLES","sectionFooterKicker":"04 / NEXT STEP","principleOne":"CLARITY","principleTwo":"RELIABILITY","principleThree":"CRAFT","copyright":"DIGITAL CORE 2026","backToTop":"BACK TO TOP ?","languageSwitchLabel":"Switch language","menuOpen":"Open menu","presentationTitle":"Knowledge base presentation","openPresentation":"Open presentation ?","presentationNotice":"This presentation is hosted externally; its first launch may take a little time."});
  Object.assign(copy.ru, {locationLabel:'ЛОКАЦИЯ',locationCity:'Павлово, Нижегородская область',locationCoordinates:'55°58′ N · 43°04′ E',workLinkLabel:'Смотреть проекты',heroVisualLabel:'Инженерная визуализация Digital Core — перейти к проектам',heroImageAlt:'Инженерная цифровая структура с неоновыми линиями на тёмном фоне',heroVisualCaption:'СИСТЕМЫ · ДАННЫЕ · ИНТЕРФЕЙСЫ'});
  Object.assign(copy.ru, {locationCoordinates:'55\u00b058\u2032 \u0441. \u0448. \xb7 43\u00b004\u2032 \u0432. \u0434.'});
  Object.assign(copy.en, {locationLabel:'ЛОКАЦИЯ',locationCity:'Pavlovo, Nizhny Novgorod Oblast',locationCoordinates:'55°58′ N · 43°04′ E',workLinkLabel:'Explore projects',heroVisualLabel:'Digital Core engineering visualization — view projects',heroImageAlt:'Engineered digital structure with neon lines against a dark background',heroVisualCaption:'SYSTEMS · DATA · INTERFACES'});
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
      protected_vds_isolated_contour:'ЗАЩИЩЁННЫЙ СЕРВЕР / ИЗОЛИРОВАННЫЙ КОНТУР',
      live_static_tool:'LIVE / ИНЖЕНЕРНЫЙ ИНСТРУМЕНТ',
      engineering_module:'ENGINEERING MODULE', research_debt:'R&D / ТЕХНИЧЕСКИЙ ДОЛГ',
      research_core_architecture:'CORE ARCHITECTURE / R&D', research_prototype:'ARCHITECTURE / R&D'
    },
    en: {
      live_static_ecommerce:'LIVE SITE / E-COMMERCE', live_static_archive:'LIVE SITE / ARCHIVE', live_static_showcase:'LIVE SITE / SHOWCASE',
      b2b_offer:'B2B OFFER / PRESENTATION', live_client_constructor_pdf:'LIVE / PDF CONSTRUCTOR',
      wake_on_demand_knowledge_base:'KNOWLEDGE BASE / VOGE', vds_live_frontend:'LIVE FRONTEND / VDS',
      protected_vds_isolated_contour:'PROTECTED VDS / ISOLATED CONTOUR',
      protected_contour:'PROTECTED ACCESS / ON REQUEST', live_static_tool:'LIVE / ENGINEERING TOOL',
      engineering_module:'ENGINEERING MODULE', research_debt:'R&D / TECHNICAL DEBT',
      research_core_architecture:'CORE ARCHITECTURE / R&D', research_prototype:'ARCHITECTURE / R&D'
    }
  };
  Object.assign(copy.ru, {"heroIndex":"\u2116 001 \u2014 026","heroCoordinates":"\u042f\u0414\u0420\u041e\u201401 / 55.9678\u00b0 \u0421\u0428 \u00b7 43.0768\u00b0 \u0412\u0414","brandMark":"\u0426\u042f","brandCaption":"\u0426\u0418\u0424\u0420\u041e\u0412\u041e\u0415<br>\u042f\u0414\u0420\u041e","brandAria":"\u0426\u0438\u0444\u0440\u043e\u0432\u043e\u0435 \u044f\u0434\u0440\u043e \u2014 \u043d\u0430\u0432\u0435\u0440\u0445","languageSwitchLabel":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a","menuOpen":"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e","detailStatus":"\u0420\u0435\u0436\u0438\u043c","locationCoordinates":"55\u00b058\u2032 \u0441. \u0448. \u00b7 43\u00b004\u2032 \u0432. \u0434."});
  Object.assign(copy.en, {"brandAria":"Digital Core \u2014 back to top","heroIndex":"No. 001 \u2014 026","heroCoordinates":"CORE\u201401 / 55.9678\u00b0 N \u00b7 43.0768\u00b0 E","scrollHint":"SCROLL TO EXPLORE \u2193","backToTop":"BACK TO TOP \u2191","openPresentation":"Open presentation \u2197"});
  Object.assign(copy.ru, {"heroVisualLabel":"\u0421\u0445\u0435\u043c\u0430 \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0433\u043e \u044f\u0434\u0440\u0430 \u2014 \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c","detailStatus":"\u0420\u0435\u0436\u0438\u043c","detailNoMedia":"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043d\u043d\u044b\u0435 \u0441\u0445\u0435\u043c\u044b \u0438 \u0441\u043d\u0438\u043c\u043a\u0438 \u044d\u043a\u0440\u0430\u043d\u0430 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b.","detailMediaUnavailable":"\u0424\u0430\u0439\u043b \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d.","detailStack":"\u0421\u043e\u0441\u0442\u0430\u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438","filters":{"all":"\u0412\u0441\u0435","ai_automation":"\u0418\u0418 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f","commerce":"\u041a\u043e\u043c\u043c\u0435\u0440\u0446\u0438\u044f","web_interface":"\u0421\u0430\u0439\u0442\u044b \u0438 \u0446\u0438\u0444\u0440\u043e\u0432\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b","architecture_docs":"\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430","fsm":"\u041b\u043e\u0433\u0438\u043a\u0430 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0439","construction":"\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e"}});
  displayModes.ru = {"live_static_ecommerce":"\u0416\u0418\u0412\u041e\u0419 \u0421\u0410\u0419\u0422 / \u041a\u0410\u0422\u0410\u041b\u041e\u0413 \u0418 \u0417\u0410\u042f\u0412\u041a\u0418","live_static_archive":"\u0414\u0415\u0419\u0421\u0422\u0412\u0423\u042e\u0429\u0418\u0419 \u0421\u0410\u0419\u0422 / \u0410\u0420\u0425\u0418\u0412","live_static_showcase":"\u0414\u0415\u0419\u0421\u0422\u0412\u0423\u042e\u0429\u0418\u0419 \u0421\u0410\u0419\u0422 / \u041f\u041e\u041a\u0410\u0417 \u0423\u0421\u041b\u0423\u0413","b2b_offer":"\u041f\u0420\u0415\u0414\u041b\u041e\u0416\u0415\u041d\u0418\u0415 \u0414\u041b\u042f \u0411\u0418\u0417\u041d\u0415\u0421\u0410","live_client_constructor_pdf":"\u0414\u0415\u0419\u0421\u0422\u0412\u0423\u042e\u0429\u0418\u0419 \u041a\u041e\u041d\u0421\u0422\u0420\u0423\u041a\u0422\u041e\u0420 PDF","wake_on_demand_knowledge_base":"\u0411\u0410\u0417\u0410 \u0417\u041d\u0410\u041d\u0418\u0419 / \u0417\u0410\u041f\u0423\u0421\u041a \u041f\u041e \u0417\u0410\u041f\u0420\u041e\u0421\u0423","on_demand_knowledge_presentation":"\u041f\u0420\u0415\u0417\u0415\u041d\u0422\u0410\u0426\u0418\u042f \u0411\u0410\u0417\u042b \u0417\u041d\u0410\u041d\u0418\u0419 / \u0417\u0410\u041f\u0423\u0421\u041a \u041c\u041e\u0416\u0415\u0422 \u0417\u0410\u041d\u042f\u0422\u042c \u0412\u0420\u0415\u041c\u042f","vds_live_frontend":"\u0412\u0415\u0411-\u041f\u0420\u041e\u0414\u0423\u041a\u0422 / \u0421\u041e\u0411\u0421\u0422\u0412\u0415\u041d\u041d\u042b\u0419 \u0421\u0415\u0420\u0412\u0415\u0420","protected_contour":"\u0417\u0410\u0429\u0418\u0429\u0401\u041d\u041d\u042b\u0419 \u0414\u041e\u0421\u0422\u0423\u041f / \u041f\u041e \u0417\u0410\u041f\u0420\u041e\u0421\u0423","live_static_tool":"\u0414\u0415\u0419\u0421\u0422\u0412\u0423\u042e\u0429\u0418\u0419 \u0421\u0410\u0419\u0422 / \u0420\u0410\u0421\u0427\u0401\u0422\u042b","engineering_module":"\u0418\u041d\u0416\u0415\u041d\u0415\u0420\u041d\u042b\u0419 \u041c\u041e\u0414\u0423\u041b\u042c","research_debt":"\u0418\u0421\u0421\u041b\u0415\u0414\u041e\u0412\u0410\u041d\u0418\u0415 / \u0422\u0415\u0425\u041d\u0418\u0427\u0415\u0421\u041a\u0418\u0419 \u0414\u041e\u041b\u0413","research_core_architecture":"\u041e\u0421\u041d\u041e\u0412\u041d\u0410\u042f \u0410\u0420\u0425\u0418\u0422\u0415\u041a\u0422\u0423\u0420\u0410 / \u0418\u0421\u0421\u041b\u0415\u0414\u041e\u0412\u0410\u041d\u0418\u0415","research_prototype":"\u0410\u0420\u0425\u0418\u0422\u0415\u041a\u0422\u0423\u0420\u041d\u042b\u0419 \u041f\u0420\u041e\u0422\u041e\u0422\u0418\u041f"};
  Object.assign(displayModes.ru, {"live_client_constructor_pdf":"\u0414\u0415\u0419\u0421\u0422\u0412\u0423\u042e\u0429\u0418\u0419 \u041a\u041e\u041d\u0421\u0422\u0420\u0423\u041a\u0422\u041e\u0420 \u0414\u041e\u041a\u0423\u041c\u0415\u041d\u0422\u041e\u0412 \u041f\u0414\u0424","vds_live_frontend":"\u0426\u0418\u0424\u0420\u041e\u0412\u041e\u0419 \u041f\u0420\u041e\u0414\u0423\u041a\u0422 / \u0421\u041e\u0411\u0421\u0422\u0412\u0415\u041d\u041d\u042b\u0419 \u0421\u0415\u0420\u0412\u0415\u0420"});
  displayModes.ru.research_internal_engine = 'R&D / INTERNAL ENGINE';
  displayModes.en.research_internal_engine = 'R&D / INTERNAL ENGINE';
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
    document.title = language === 'ru' ? '\u0426\u0438\u0444\u0440\u043e\u0432\u043e\u0435 \u044f\u0434\u0440\u043e \u2014 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u043d\u044b\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u044f' : 'Digital Core \u2014 engineering products';
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
    $('#lang-switch').setAttribute('aria-label', copy[language].languageSwitchLabel || (language === 'ru' ? '\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a' : 'Switch language'));
    $('#menu-toggle').setAttribute('aria-label', language === 'ru' ? '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e' : 'Open menu');
    window.LeadBot?.setLanguage(language);
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
      card.dataset.project = project.id;
      card.dataset.meshImage = safeMediaPath(project.cover_image) ? project.cover_image : '';
      const ambientHex = typeof project.ambient_color === 'string' && /^#[0-9a-f]{6}$/i.test(project.ambient_color)
        ? project.ambient_color
        : '#587b43';
      card.dataset.meshColor = ambientHex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16)).join(',');
      card.style.setProperty('--project-glow-rgb', card.dataset.meshColor);
      const previewPath = safeMediaPath(project.cover_image)
        ? project.cover_image
        : (Array.isArray(project.screenshots) ? project.screenshots.find(safeMediaPath) : null);
      if (previewPath) {
        const preview = element('img', 'project-hover-preview');
        preview.src = previewPath;
        preview.alt = '';
        preview.loading = 'lazy';
        preview.decoding = 'async';
        preview.setAttribute('aria-hidden', 'true');
        card.append(preview);
      }
      const number = element('div', 'project-number');
      number.append(element('span', '', String(index + 1).padStart(2, '0') + ' / ' + String(state.projects.flagship_projects.length).padStart(2, '0')));
      number.append(element('span', '', displayMode(project)));
      card.append(number);
      const body = element('div', 'project-body');
      body.append(element('div', 'project-meta', categoryLabel(project.category)));
      body.append(element('h3', '', state.language === 'ru' ? project.name : project.name_en));
      card.append(body);
      const summary = element('div', 'project-summary');
      summary.append(element('p', 'project-description', state.language === 'ru' ? project.description : project.description_en));
      card.append(summary, element('span', 'card-arrow', '↗'));
    } else {
      card.append(element('span', 'row-num', String(index + 1).padStart(2, '0')));
      const title = element('span', '');
      title.append(element('span', 'row-title', state.language === 'ru' ? project.name : project.name_en));
      title.append(element('span', 'row-description', state.language === 'ru' ? project.description : project.description_en));
      card.append(title);
      const tags = element('span', 'row-tags');
      (state.language === 'ru' ? [] : (project.tech_stack || []).slice(0, 3)).forEach((tag) => tags.append(element('span', '', tag)));
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
    const tags = state.language === 'ru' ? [] : [...new Set(state.projects.catalog.flatMap((item) => item.tech_stack || []))].sort((a, b) => a.localeCompare(b));
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
    if (state.language !== 'ru' && (project.tech_stack || []).length) addDefinition(facts, text('detailStack'), project.tech_stack.join(' \u00b7 '));
    detailRoot.append(facts);

    const actions = element('div', 'project-actions');
    const githubUrl = project.is_private === false ? publicGithubUrl(project.github_url) : null;
    if (githubUrl) addLink(actions, text('githubAction'), githubUrl, 'detail-action github-action');
    const demoUrl = safeHttpsUrl(project.demo_url);
    const presentationUrl = safeHttpsUrl(project.presentation_url);
    if (demoUrl) addLink(actions, text('openExternal'), demoUrl.href, 'detail-action external-action');
    if (presentationUrl && project.display_mode === 'on_demand_knowledge_presentation') addLink(actions, text('openPresentation'), presentationUrl.href, 'detail-action external-action');
    if (typeof project.contact_email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.contact_email)) {
      const label = state.language === 'ru' ? '\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0435' : 'Discuss implementation';
      addLink(actions, label, 'mailto:' + project.contact_email, 'detail-action contact-action');
    }
    if (actions.childElementCount) detailRoot.append(actions);

    const demoSection = element('section', 'detail-section');
    demoSection.append(addI18nText('h3', '', project.display_mode === 'on_demand_knowledge_presentation' ? 'presentationTitle' : 'detailDemo'));
    if (demoUrl) {
      const frame = element('iframe', 'demo-frame');
      frame.src = demoUrl.href;
      frame.title = name + ' — ' + text('detailDemo');
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer';
      frame.setAttribute('sandbox', 'allow-scripts allow-forms');
      frame.setAttribute('allow', 'fullscreen');
      demoSection.append(frame);
    } else if (project.display_mode === 'on_demand_knowledge_presentation') demoSection.append(addI18nText('p', 'detail-empty', 'presentationNotice'));
    else demoSection.append(addI18nText('p', 'detail-empty', (project.display_mode === 'b2b_offer' || project.display_mode.startsWith('protected') || project.display_mode === 'wake_on_demand_knowledge_base') ? 'accessByRequest' : 'demoUnavailable'));
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
    if (event.target === projectDialog && !window.matchMedia('(max-width: 767px)').matches) closeDialog(projectDialog, previousFocus);
    if (event.target === mediaDialog && !window.matchMedia('(max-width: 767px)').matches) closeDialog(mediaDialog, mediaTrigger);
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
// Mobile-only swipe navigation for project and media dialogs.
window.addEventListener('DOMContentLoaded', () => {
  const mobile = window.matchMedia('(max-width: 767px)');
  const projectDialog = document.getElementById('project-dialog');
  const mediaDialog = document.getElementById('media-dialog');
  if (!projectDialog || !mediaDialog) return;

  for (const dialog of [projectDialog, mediaDialog]) {
    const shell = dialog.querySelector('.project-dialog-shell, .media-dialog-shell');
    if (shell && !shell.querySelector('.swipe-indicator')) {
      const handle = document.createElement('div');
      handle.className = 'swipe-indicator';
      handle.setAttribute('aria-hidden', 'true');
      shell.prepend(handle);
    }
  }

  let currentProjectId = null;
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-project-open]');
    if (opener) currentProjectId = opener.dataset.projectOpen;
  }, true);

  const starts = new WeakMap();
  for (const dialog of [projectDialog, mediaDialog]) {
    dialog.addEventListener('cancel', (event) => {
      if (mobile.matches) event.preventDefault();
    });
    dialog.addEventListener('touchstart', (event) => {
      if (!mobile.matches || event.touches.length !== 1) return;
      starts.set(dialog, {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        top: dialog.querySelector('.project-dialog-shell')?.scrollTop ?? dialog.scrollTop
      });
    }, { passive: true });
    dialog.addEventListener('touchend', (event) => {
      if (!mobile.matches || !event.changedTouches.length) return;
      const start = starts.get(dialog);
      starts.delete(dialog);
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start.x;
      const dy = event.changedTouches[0].clientY - start.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 64) return;

      if (dialog === projectDialog && Math.abs(dx) > Math.abs(dy)) {
        const openers = [...document.querySelectorAll('[data-project-open]')];
        const index = openers.findIndex((item) => item.dataset.projectOpen === currentProjectId);
        const next = openers[index + (dx < 0 ? 1 : -1)];
        if (next) next.click();
        return;
      }

      if (dy > 0 && (dialog === mediaDialog || start.top <= 0)) {
        const closeButton = dialog.querySelector('[data-close-dialog]');
        if (closeButton) closeButton.click();
        else dialog.close();
      }
    }, { passive: true });
  }
});
