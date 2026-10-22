# Digital Core

Digital Core is a bilingual engineering showcase. This README remains the single source of truth for product scope, visibility rules, catalog data, and release acceptance. The local copy is excluded from the public Git repository by `.gitignore`.

## Gold Master Baseline

The project state at Git commit `34eb647` (`Position gas trading project as AI Guard`) is the approved Gold Master baseline for the showcase UI and project registries. The primary and fallback registries are generated from the canonical project data in this document. Baseline verification on 2026-10-22: `python add_project.py --check`, JavaScript syntax checks, and `git diff --check` passed. The vpfarm production URL could not be reached by the available web verifier during this review.

## Product structure

The page renders only the explicit records in `assets/data/projects.json`; it never scans directories or infers project names from local folders.

- Tier 1 is the `flagship_projects` array; Tier 2 is the `catalog` array. The README JSON block below is the only canonical inventory.
- `assets/data/projects-fallback.json` mirrors both arrays and is used only when the primary data file cannot be loaded. Keep both arrays and their records synchronized.

## Tier 1 / Selected Work and Tier 2 / Engineering Index

Project names, descriptions, visibility, status, and membership in each tier are defined only in the canonical JSON block below. Do not maintain a second project list in prose.

## Featured card visual contract

- Use one dark charcoal base across all flagship projects, with a restrained blurred fog tinted by each project's own `ambient_color` and a faint technical grid on a separate background layer. Do not apply one shared green or gray tint to every card.
- The top row contains the project number and its public display status exactly once.
- The middle zone contains the category and readable project title; the lower zone contains a short description.
- Keep technology tags and implementation details in project details and the engineering index, not on flagship cards.
- Keep screenshots fully hidden in the default card state. When an approved project image exists in `cover_image` or `screenshots`, fade it in beneath a dark, tinted overlay on hover or keyboard focus. Keep project text above that layer with strong contrast. The full image remains available in the wide project detail dialog.
- Keep the fog and grid low-contrast so they add depth without competing with the card content.
- The ambient color mesh remains a page background effect. It starts from each project's curated `ambient_color` and may blend in a small portion of the approved cover image's sampled color, but must stay behind the card's own fog and text layers.

## Data contract

Each project record includes `id`, `name`, `name_en`, `category`, `description`, `description_en`, `tech_stack`, `status`, `status_en`, `display_mode`, `github_url`, `demo_url`, `is_private`, `visibility_status`, `screenshots`, and `architecture_diagram`. Required fields also include `highlights` and `highlights_en`, non-empty arrays of strings with matching item counts. Optional fields are `cover_image`, `contact_email`, `presentation_url`, `ambient_color`, per-project `technical_debt`, paired localized `direction` / `direction_en` and `access_note` / `access_note_en` strings, and paired `workflow` / `workflow_en` step arrays. The root `technical_debt` array records cross-project backlog items. The canonical values for every project and backlog item are the JSON object embedded in this README below.

- Every project record includes non-empty `highlights` and `highlights_en` string arrays with matching item counts, describing the problems it addresses in Russian and English. The project detail dialog renders these items alongside mode and direction.
- Tier membership is determined only by the containing `flagship_projects` or `catalog` array. Do not add a redundant `tier` field to project objects.

- `name` and `description` are curated public Russian copy. They must describe project purpose, never filesystem folder names or internal identifiers. The Russian UI omits implementation labels and technology tags.
- `display_mode` is the localized public usage/access state. It is independent of link validation. A localized `direction` may override the category label in project details.
- `visibility_status` is internal metadata and must never create a public ?unverified? badge.
- Render a repository action only when `is_private === false` and `github_url` is a valid HTTPS GitHub repository URL.
- `demo_url` is an embeddable public application. The UI uses a sandboxed frame plus an external-tab link when provided; the demo section is omitted when the URL is absent.
- `presentation_url` is for an externally hosted presentation that may sleep or reject framing. Open it in a new tab with an explicit startup-delay notice; do not embed it.
- `cover_image` is approved local media for ambient color sampling and the card's hover preview; it is hidden in the default state. `screenshots` is an array of approved media paths under a descriptive project folder in `assets/images/projects/`, shown in project details; `architecture_diagram` is a local image path or `null`.
- Never put API keys, passwords, or protected access tokens in client-side data.

## Runtime behavior

- Russian is the default language. The English version switches without a reload.
- Russian-facing names, descriptions, navigation, modes, and assistant copy use Russian. Internal IDs and technology labels are not rendered in that mode.
- The featured counter is calculated from the loaded flagship array. The loading indicator is cleared after rendering.
- On primary data failure, the bundled fallback is used and an availability message is shown.
- The internal R&D dialog-state engine remains in the canonical Tier 2 data but is excluded from the public catalog, filters, and project navigation. It has no active links or call actions.
- Search and category filters operate only over public catalog entries.
- On touch devices, project dialogs close and navigate by swipes; close crosses are hidden. Desktop retains the close button and backdrop behavior.
- Source files and JSON data use UTF-8 without BOM.

## Verification record

- 2026-10-21: The project owner reported that the mobile version had been checked and was working. Mobile verification is complete for this review; the external review identified no confirmed mobile defect.

## Registry maintenance workflow

Edit the canonical JSON block below in this README, then run `python add_project.py` from the repository root. The local script validates the complete data contract and generates both `assets/data/projects.json` and `assets/data/projects-fallback.json` from the same source. Use `python add_project.py --check` to validate and check whether both generated files are current without writing them.

Do not edit either generated registry by hand. `add_project.py` is a local maintenance tool and is ignored by Git; the public repository contains only files required by the website. This README is also intentionally local and ignored by Git, so preserve its local copy as the authoritative product and project-data record.

<!-- PROJECT_DATA_BEGIN -->
```json
{
  "technical_debt": [
    {
      "module_id": "internal-dialog-state-engine",
      "status": "R&D / INTERNAL ENGINE",
      "items": [
        "Isolated testing is required for resumed state restoration."
      ]
    },
    {
      "module_id": "techbase-os",
      "status": "optimization_pending",
      "items": [
        "Optimize vectorization for automatic RAG search across local manuals."
      ]
    },
    {
      "module_id": "project-modal-highlights",
      "status": "backlog",
      "title": "Add a resolved-tasks / engineering-impact column to project details",
      "scope": [
        "Add a required highlights string array to every project object in the primary and fallback registries.",
        "Validate highlights during catalog loading and keep both registries synchronized.",
        "Render a third project-detail metadata block beside Mode and Direction.",
        "Use a three-column desktop layout and a vertically stacked mobile layout with resilient text wrapping.",
        "Provide engineering-impact highlights for the eight flagship projects; define equivalent highlights for catalog modules when applying the schema."
      ],
      "project_highlights": {
        "vpfarm": [
          "Present farm products and accept inquiries through the online catalog.",
          "Load catalog data through an API and keep previously loaded data available in localStorage and a fallback JSON file.",
          "Refresh catalog data with Stale-While-Revalidate so available data remains accessible on unstable connections."
        ],
        "bibliotheca": [
          "Automatically collect and parse publications from two external sites.",
          "Update the library database and website without manually transferring each work.",
          "Schedule daily collection with cron; the documented archive contains 143 works."
        ],
        "faralab": [
          "Build the gallery automatically by scanning the image directory.",
          "Present the lab’s completed work and services.",
          "Help clients reach the lab through a mobile interface, contact details, and map."
        ],
        "fvk-content-factory": [
          "Turn source notes and materials into publication drafts.",
          "Keep system code, profile.json, prompts, and working materials separate.",
          "Leave review and final publication approval to a human editor."
        ],
        "herbarium-ai": [
          "Collect plant, taxonomy, collection place and date, and image details.",
          "Create a structured herbarium sheet and PDF in the browser.",
          "Support a complete manual workflow without an API key, with DeepSeek as an optional mode."
        ],
        "techbase-os": [
          "Search technical facts across PDF manuals and VOGE documentation.",
          "Separate deterministic retrieval from language-model answer generation.",
          "Check answers against the original technical documents."
        ],
        "piceatom": [
          "Operate an isolated control environment on a private VDS server.",
          "Avoid external counters, metrics, and public entry points as required by the project architecture.",
          "Protect communication channels and apply role-based access control."
        ],
        "rf-smeta": [
          "Perform estimate calculations with exact Decimal arithmetic.",
          "Provide access to the tool through a protected environment.",
          "Collect input data with questionnaires."
        ]
      },
      "acceptance_criteria": [
        "Primary and fallback registries contain equivalent project records and highlights arrays.",
        "Every project_highlights key matches an existing canonical project id.",
        "Invalid or missing highlights data is handled during catalog loading.",
        "Project details show Mode, Direction, and Engineering Impact without overlap on desktop or mobile."
      ]
    },
    {
      "module_id": "vk-bot-public-ui",
      "status": "closed_r_and_d",
      "scope": [
        "Keep the VK bot as a closed R&D module in Tier 2.",
        "Remove all public VK bot call-to-action controls and active external links.",
        "Keep repository, demo, and presentation URLs null and mark the module private.",
        "The separate website lead-assistant widget is not the VK bot and remains independent."
      ],
      "acceptance_criteria": [
        "The Tier 2 entry is labeled as a closed R&D module.",
        "The entry exposes no active VK bot links or call buttons.",
        "Primary and fallback records remain identical."
      ]
    },
    {
      "module_id": "social-preview-metadata",
      "status": "backlog",
      "title": "Add metadata for social link previews",
      "scope": [
        "Add Open Graph and Twitter card title, description, canonical page URL, content type, and preview image metadata to the site head.",
        "Evaluate JSON-LD only for public facts that can be verified and approved.",
        "Use approved Digital Core branding for the preview image and verify that it is publicly reachable on GitHub Pages."
      ],
      "acceptance_criteria": [
        "Shared site links expose accurate title, description, URL, and image metadata in supported preview formats.",
        "Any structured data contains only verified and approved public facts.",
        "The preview image loads from the deployed GitHub Pages site."
      ]
    },
    {
      "module_id": "russian-technology-stack-visibility",
      "status": "decision_required",
      "title": "Decide how to present the technology stack in the Russian interface",
      "scope": [
        "Review the current rule that hides technology labels in Russian mode while retaining curated technology data and English-mode display.",
        "Consider Russian explanations or an explicitly approved set of standard technology names without weakening the Russian-language requirement.",
        "Keep repository links limited to verified public repositories; do not invent or add unverified frameworks."
      ],
      "acceptance_criteria": [
        "The language policy for technology names is explicitly approved before implementation.",
        "Only verified project technologies are shown, and private repositories remain undisclosed."
      ]
    },
    {
      "module_id": "english-location-label",
      "status": "backlog",
      "title": "Localize the location label in English mode",
      "scope": [
        "Replace the Russian location label in the English dictionary with its English equivalent.",
        "Check the full location block in both languages after switching."
      ],
      "acceptance_criteria": [
        "The English location block contains no Russian label text.",
        "The Russian location block remains unchanged."
      ]
    },
    {
      "module_id": "herbarium-copy-parity",
      "status": "backlog",
      "title": "Align the Russian and English Herbarium AI descriptions",
      "scope": [
        "Describe DeepSeek as optional in both languages and state that manual construction and PDF export work without an API key.",
        "Keep both descriptions consistent without claiming that the product itself creates AI systems."
      ],
      "acceptance_criteria": [
        "Russian and English descriptions communicate the same product capabilities and optional AI role."
      ]
    },
    {
      "module_id": "catalog-fallback-validation",
      "status": "backlog",
      "title": "Make the generated fallback registry loadable",
      "scope": [
        "Resolve the mismatch between the fallback loader's fallback_updated_at requirement and the generated fallback JSON contract.",
        "Preserve README as the canonical source and keep the primary and fallback project arrays synchronized."
      ],
      "acceptance_criteria": [
        "With the primary file unavailable and no local cache, the fallback registry renders the project catalog.",
        "The fallback availability status displays a valid source date or does not require a missing date field."
      ]
    },
    {
      "module_id": "public-runtime-data-boundary",
      "status": "backlog",
      "title": "Keep internal technical-debt notes out of public runtime data",
      "scope": [
        "Separate the README's canonical internal backlog from the public project data emitted for the website.",
        "Update the generator contract so runtime project records contain only data required by the public interface."
      ],
      "acceptance_criteria": [
        "The website continues to load the complete public project catalog without a technical_debt field.",
        "Internal backlog entries remain available in the local canonical README and are absent from deployed JSON files."
      ]
    },
    {
      "module_id": "frontend-dead-style-cleanup",
      "status": "backlog",
      "title": "Remove obsolete styles and consolidate repeated rules",
      "scope": [
        "Remove selectors left unused after the chat widget removal and obsolete hero or demo elements.",
        "Consolidate repeated project-card rules and repeated language-dictionary overrides without changing approved visuals or behavior."
      ],
      "acceptance_criteria": [
        "No removed widget or unused markup styles remain in the public stylesheet.",
        "Project card appearance and approved desktop and mobile interactions remain unchanged."
      ]
    },
    {
      "module_id": "catalog-search-render-scope",
      "status": "backlog",
      "title": "Limit catalog search rendering to the catalog",
      "scope": [
        "Avoid rebuilding featured cards for catalog-only search input when their data has not changed."
      ],
      "acceptance_criteria": [
        "Typing in catalog search does not re-render the featured showcase."
      ]
    }
  ],
  "flagship_projects": [
    {
      "id": "vpfarm",
      "name": "Ваша Птица Ферма",
      "name_en": "Your Poultry Farm",
      "category": "commerce",
      "description": "Коммерческий каталог фермерского хозяйства с учётом продукции, фильтрами и приёмом заявок. Каталог получает данные через API; localStorage и резервный JSON помогают сохранить доступ к уже загруженным данным при нестабильном интернете. Интеграция локального учёта с облачной базой рассматривается как способ исключить повторный ввод.",
      "description_en": "A commercial farm catalog with product tracking, filters, and inquiry intake. The catalog loads data through an API; localStorage and a fallback JSON file preserve access to previously loaded data on unstable connections. Integrating local records with a cloud database is an identified goal to avoid duplicate entry.",
      "tech_stack": [
        "HTML",
        "CSS",
        "Python",
        "JavaScript",
        "API",
        "JSON",
        "localStorage",
        "GitHub Pages"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "live_static_ecommerce",
      "github_url": null,
      "demo_url": "https://chearu-stack.github.io/vpfarm/",
      "is_private": true,
      "visibility_status": "verified",
      "screenshots": [
        "assets/images/projects/vpfarm/vpfarm-showcase.png"
      ],
      "architecture_diagram": null,
      "ambient_color": "#22c55e",
      "cover_image": "assets/images/projects/vpfarm/vpfarm-showcase.png",
      "highlights": [
        "Показывать каталог продукции и принимать заявки через онлайн-витрину хозяйства.",
        "Получать каталог через API и сохранять доступ к загруженным данным в localStorage и резервном JSON.",
        "Обновлять каталог по Stale-While-Revalidate, чтобы данные оставались доступны при нестабильном интернете."
      ],
      "highlights_en": [
        "Present farm products and accept inquiries through the online catalog.",
        "Load catalog data through an API and keep previously loaded data available in localStorage and a fallback JSON file.",
        "Refresh catalog data with Stale-While-Revalidate so available data remains accessible on unstable connections."
      ]
    },
    {
      "id": "bibliotheca",
      "name": "Авторский литературный архив",
      "name_en": "Bibliotheca",
      "category": "web_interface",
      "description": "Автоматизированная цифровая библиотека прозы и поэзии. Python-сборщик забирает и разбирает публикации с двух внешних сайтов, обновляет собственную базу и библиотечный сайт; ежедневный запуск cron запланирован на 06:00 по Москве. Архив включает 143 произведения.",
      "description_en": "An automated digital library of prose and poetry. A Python collector parses publications from two external sites and updates its own database and library site; a daily cron run is scheduled for 06:00 Moscow time. The archive contains 143 works.",
      "tech_stack": [
        "Python",
        "cron",
        "Web scraping",
        "Database",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "live_static_archive",
      "github_url": null,
      "demo_url": "https://chearu-stack.github.io/bibliotheca/",
      "is_private": true,
      "visibility_status": "verified",
      "screenshots": [
        "assets/images/projects/bibliotheca/bibliotheca-preview.png"
      ],
      "architecture_diagram": null,
      "ambient_color": "#b45309",
      "cover_image": "assets/images/projects/bibliotheca/bibliotheca-preview.png",
      "highlights": [
        "Автоматически собирать и разбирать публикации с двух внешних сайтов.",
        "Обновлять собственную базу и библиотечный сайт без ручного переноса каждого произведения.",
        "Планировать ежедневный сбор через cron; зафиксированный архив — 143 произведения."
      ],
      "highlights_en": [
        "Automatically collect and parse publications from two external sites.",
        "Update the library database and website without manually transferring each work.",
        "Schedule daily collection with cron; the documented archive contains 143 works."
      ]
    },
    {
      "id": "faralab",
      "name": "Сервис по автомобильному свету",
      "name_en": "FARALAB",
      "category": "web_interface",
      "description": "Сайт лаборатории автомобильного освещения: каталог работ и фотографий, услуги, контакты, адрес и карта. Скрипт сканирует папку с изображениями и автоматически собирает галерею; интерфейс включает мобильную навигацию и видеоматериалы.",
      "description_en": "A website for an automotive lighting lab, with a work and photo catalog, services, contacts, address, and map. A script scans the image folder and builds the gallery automatically; the interface also includes mobile navigation and video content.",
      "tech_stack": [
        "HTML",
        "CSS",
        "JavaScript",
        "GitHub Pages",
        "File-based gallery automation"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "live_static_showcase",
      "github_url": null,
      "demo_url": "https://chearu-stack.github.io/faralab/",
      "is_private": true,
      "visibility_status": "verified",
      "screenshots": [
        "assets/images/projects/faralab/faralab-showcase.png"
      ],
      "architecture_diagram": null,
      "ambient_color": "#38bdf8",
      "cover_image": "assets/images/projects/faralab/faralab-showcase.png",
      "highlights": [
        "Автоматически формировать галерею, сканируя папку с фотографиями.",
        "Показывать каталог выполненных работ и услуг лаборатории.",
        "Помогать клиентам связаться с лабораторией через мобильный интерфейс, контакты и карту."
      ],
      "highlights_en": [
        "Build the gallery automatically by scanning the image directory.",
        "Present the lab’s completed work and services.",
        "Help clients reach the lab through a mobile interface, contact details, and map."
      ]
    },
    {
      "id": "fvk-content-factory",
      "name": "Фабрика контента FVK",
      "name_en": "FVK Content Factory",
      "category": "ai_automation",
      "description": "Система подготовки контента: преобразует исходные заметки и материалы в черновики публикаций, оставляя решение о публикации за редактором. Код, настройки профиля, промпты и рабочие материалы разделены по отдельным файлам и каталогам.",
      "description_en": "A content preparation system that turns source notes and materials into publication drafts while leaving publication approval to a human editor. System code, profile settings, prompts, and working materials are kept in separate files and directories.",
      "tech_stack": [
        "Python",
        "JSON",
        "Prompt files"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "b2b_offer",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [
        "assets/images/projects/fvk-content-factory/factory-screen.png",
        "assets/images/projects/fvk-content-factory/factory-story.png"
      ],
      "architecture_diagram": null,
      "contact_email": "ea52@bk.ru",
      "cover_image": "assets/images/projects/fvk-content-factory/factory-screen.png",
      "ambient_color": "#34d399",
      "highlights": [
        "Преобразовывать исходные заметки и материалы в черновики публикаций.",
        "Разделять системный код, profile.json, промпты и рабочие материалы.",
        "Оставлять редактору проверку и окончательное решение о публикации."
      ],
      "highlights_en": [
        "Turn source notes and materials into publication drafts.",
        "Keep system code, profile.json, prompts, and working materials separate.",
        "Leave review and final publication approval to a human editor."
      ]
    },
    {
      "id": "herbarium-ai",
      "name": "Конструктор гербарных листов",
      "name_en": "Herbarium AI",
      "category": "ai_automation",
      "description": "Браузерный конструктор гербарных листов: принимает данные о растении и изображение, формирует структурированный лист и экспортирует PDF. Доступны ручной и ИИ-сценарии; ручной режим работает без API-ключа, а DeepSeek подключается как дополнительный помощник.",
      "description_en": "A browser-based herbarium sheet builder that accepts plant details and an image, creates a structured sheet, and exports it as PDF. It supports manual and AI-assisted workflows; manual use does not require an API key, and DeepSeek is an optional assistant.",
      "tech_stack": [
        "HTML",
        "CSS",
        "JavaScript",
        "Browser-side processing",
        "PDF",
        "DeepSeek API"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "live_client_constructor_pdf",
      "github_url": null,
      "demo_url": "https://chearu-stack.github.io/herbarium/",
      "is_private": true,
      "visibility_status": "verified",
      "screenshots": [
        "assets/images/projects/herbarium-ai/herbarium-constructor.png"
      ],
      "architecture_diagram": null,
      "ambient_color": "#84cc16",
      "cover_image": "assets/images/projects/herbarium-ai/herbarium-constructor.png",
      "highlights": [
        "Собирать сведения о растении, таксономии, месте и дате сбора вместе с изображением.",
        "Формировать структурированный гербарный лист и PDF в браузере.",
        "Работать вручную без API-ключа; использовать DeepSeek только как дополнительный режим."
      ],
      "highlights_en": [
        "Collect plant, taxonomy, collection place and date, and image details.",
        "Create a structured herbarium sheet and PDF in the browser.",
        "Support a complete manual workflow without an API key, with DeepSeek as an optional mode."
      ]
    },
    {
      "id": "techbase-os",
      "name": "База знаний для СТО и мотодилеров",
      "name_en": "TechBase OS",
      "category": "ai_automation",
      "description": "Техническая база знаний для сервисных центров и мотодилеров на материалах руководств VOGE. Поиск по PDF-документам выполняется детерминированно; ответы сверяются с первоисточниками, а языковая модель не выбирает за пользователя фрагменты для поиска.",
      "description_en": "A technical knowledge base for service centers and motorcycle dealers, using VOGE manuals. Search across PDF documents is deterministic; answers are checked against source material, and the language model does not choose which passages to search.",
      "tech_stack": [
        "Python",
        "Streamlit",
        "RAG",
        "PDF processing"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "on_demand_knowledge_presentation",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [
        "assets/images/projects/techbase-os/voge-knowledge-base.png"
      ],
      "architecture_diagram": null,
      "presentation_url": "https://techbase-os.streamlit.app/",
      "ambient_color": "#657680",
      "cover_image": "assets/images/projects/techbase-os/voge-knowledge-base.png",
      "highlights": [
        "Искать технические сведения в PDF-руководствах и документации VOGE.",
        "Отделять детерминированный поиск от генерации ответа языковой моделью.",
        "Проверять выводы по первоисточникам технической документации."
      ],
      "highlights_en": [
        "Search technical facts across PDF manuals and VOGE documentation.",
        "Separate deterministic retrieval from language-model answer generation.",
        "Check answers against the original technical documents."
      ]
    },
    {
      "id": "piceatom",
      "name": "Закрытая система контроля",
      "name_en": "Protected Control System",
      "category": "web_interface",
      "description": "Изолированный серверный контур системы контроля. Подробный показ предоставляется по запросу.",
      "description_en": "An isolated server environment for a control system. A detailed walkthrough is available on request.",
      "tech_stack": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "protected_vds_isolated_contour",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [
        "assets/images/projects/protected-control-system/control-system.png"
      ],
      "architecture_diagram": null,
      "ambient_color": "#94a3b8",
      "cover_image": "assets/images/projects/protected-control-system/control-system.png",
      "highlights": [
        "Работать в изолированной среде управления на частном сервере VDS.",
        "Исключить внешние счётчики, метрики и публичные точки входа согласно архитектуре проекта.",
        "Защищать каналы связи и применять ролевое управление доступом."
      ],
      "highlights_en": [
        "Operate an isolated control environment on a private VDS server.",
        "Avoid external counters, metrics, and public entry points as required by the project architecture.",
        "Protect communication channels and apply role-based access control."
      ]
    },
    {
      "id": "rf-smeta",
      "name": "Сметный комплекс",
      "name_en": "Estimate Suite",
      "category": "construction",
      "description": "Профессиональная система расчёта строительных смет. Доступ предоставляется по запросу в защищённом контуре.",
      "description_en": "A professional construction estimating suite available on request through a protected access channel.",
      "tech_stack": [
        "Construction",
        "Estimating"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "protected_contour",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [
        "assets/images/projects/estimate-suite/estimate-screen.png"
      ],
      "architecture_diagram": null,
      "cover_image": "assets/images/projects/estimate-suite/estimate-screen.png",
      "ambient_color": "#94a3b8",
      "highlights": [
        "Выполнять сметные вычисления с точной десятичной арифметикой Decimal.",
        "Предоставлять доступ к инструменту через защищённый контур.",
        "Собирать исходные данные с помощью опросников."
      ],
      "highlights_en": [
        "Perform estimate calculations with exact Decimal arithmetic.",
        "Provide access to the tool through a protected environment.",
        "Collect input data with questionnaires."
      ]
    }
  ],
  "catalog": [
    {
      "id": "stroy-calc",
      "name": "Строительные расчёты",
      "name_en": "Stroy-Calc",
      "category": "construction",
      "description": "Набор автономных инженерных и строительных калькуляторов. В отопительном блоке результаты расчёта теплопотерь передаются через localStorage калькуляторам радиаторов и насоса или заменяются ручным вводом; калькулятор расширительного бака остаётся автономным.",
      "description_en": "A set of independent engineering and construction calculators. In the heating workflow, heat-loss results pass through localStorage to the radiator and pump calculators or can be entered manually; the expansion tank calculator remains standalone.",
      "tech_stack": [
        "JavaScript",
        "localStorage",
        "CalculatorRegistry",
        "window.Data",
        "HeatingResults"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "live_static_tool",
      "github_url": null,
      "demo_url": "https://chearu-stack.github.io/stroy-calc/",
      "is_private": true,
      "visibility_status": "verified",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Рассчитывать теплопотери, радиаторы, расширительный бак и насос отдельными модулями.",
        "Передавать HeatingResults между связанными калькуляторами отопления через localStorage с возможностью ручного ввода.",
        "Сохранять калькулятор расширительного бака автономным и показывать, где получить недостающие исходные данные."
      ],
      "highlights_en": [
        "Calculate heat loss, radiators, expansion tanks, and pumps in separate modules.",
        "Pass HeatingResults between connected heating calculators through localStorage, with manual input as an alternative.",
        "Keep the expansion tank calculator independent and show where to obtain missing inputs."
      ]
    },
    {
      "id": "money-wise",
      "name": "Расчёт личных финансов",
      "name_en": "MoneyWise Core",
      "category": "ai_automation",
      "description": "Модуль точных финансовых расчётов на Decimal без ошибок двоичной арифметики float. Связанный продукт MoneyWise Pro — персональный финансовый калькулятор на Streamlit; по предоставленным сведениям, в его тестовом наборе проходили 60 тестов. Продукт работает без рекламы и обязательной регистрации.",
      "description_en": "A financial calculation module using Decimal to avoid binary floating-point errors. The related MoneyWise Pro is a personal finance calculator built with Streamlit; according to the supplied project notes, its test suite had 60 passing tests. The product has no ads or mandatory registration.",
      "tech_stack": [
        "Python",
        "Decimal",
        "Streamlit",
        "Automated tests"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "engineering_module",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Выполнять денежные вычисления с Decimal вместо float.",
        "Предоставлять персональный финансовый калькулятор MoneyWise Pro на Streamlit.",
        "Работать без рекламы и обязательной регистрации; в описании проекта указано 60 проходивших тестов."
      ],
      "highlights_en": [
        "Use Decimal rather than float for monetary calculations.",
        "Provide the MoneyWise Pro personal finance calculator on Streamlit.",
        "Work without ads or mandatory registration; the project notes report 60 passing tests."
      ],
      "presentation_url": "https://money-wise-pro.streamlit.app/"
    },
    {
      "id": "order-sniper",
      "name": "Анализ вакансий",
      "name_en": "Order-Sniper",
      "category": "ai_automation",
      "description": "Инструмент анализа вакансий и заказов: сопоставляет требования конкретного предложения с локальной базой проектов и накопленным опытом. Автоматизирует первичную оценку соответствия, а не только поиск совпадающих ключевых слов.",
      "description_en": "A job and contract analysis tool that compares a specific offer with a local project database and accumulated experience. It automates an initial fit assessment rather than only searching for matching keywords.",
      "tech_stack": [
        "Python",
        "Automation",
        "Local project database"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "engineering_module",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Анализировать требования вакансии или заказа.",
        "Сопоставлять запрос с локальной базой проектов и накопленным опытом.",
        "Поддерживать первичную оценку соответствия без неподтверждённых обещаний о рейтинге."
      ],
      "highlights_en": [
        "Analyze requirements from a job or contract offer.",
        "Match the request against a local project database and accumulated experience.",
        "Support an initial fit assessment without assuming an unconfirmed scoring method."
      ]
    },
    {
      "id": "vk-bot-fsm-engine",
      "name": "Внутренний движок состояний",
      "name_en": "Internal Dialog State Engine",
      "category": "fsm",
      "description": "Внутренний R&D-движок диалогового бота на конечном автомате (FSM). Формальные состояния и разрешённые переходы обеспечивают предсказуемое управление сценарием независимо от свободной генерации текста языковой моделью.",
      "description_en": "An internal R&D dialog engine based on a finite-state machine (FSM). Explicit states and allowed transitions make scenario control predictable and independent of free-form language-model text generation.",
      "tech_stack": [
        "Python",
        "FSM"
      ],
      "status": "Закрытый модуль R&D",
      "status_en": "Closed R&D module",
      "display_mode": "research_internal_engine",
      "technical_debt": [
        "Isolated testing is required for resumed state restoration."
      ],
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Задавать состояния диалога и допустимые переходы формальной логикой FSM.",
        "Управлять сценарием предсказуемо, не полагаясь только на свободную генерацию текста."
      ],
      "highlights_en": [
        "Define dialog states and allowed transitions with FSM logic.",
        "Keep scenario control predictable instead of relying only on free-form text generation."
      ]
    },
    {
      "id": "core-wisdom",
      "name": "Маршрутизация команд",
      "name_en": "core_wisdom",
      "category": "architecture_docs",
      "description": "Архитектурный прототип управляющего ядра и диспетчера команд. Маршрутизирует запросы между компонентами, отделяя выбор исполнителя от выполнения отдельных операций.",
      "description_en": "An architectural prototype of a control core and command dispatcher. It routes requests between components, separating the choice of handler from execution of individual operations.",
      "tech_stack": [
        "Python",
        "FastAPI"
      ],
      "status": "Implemented",
      "status_en": "Implemented",
      "display_mode": "research_core_architecture",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Маршрутизировать запросы между компонентами через диспетчер команд.",
        "Отделять логику диспетчеризации от выполнения операций."
      ],
      "highlights_en": [
        "Route requests between components through a command dispatcher.",
        "Separate dispatch decisions from operation execution."
      ]
    },
    {
      "id": "gas-trader-concept",
      "name": "AI Guard: Шлюз автоматического контроля операций и сделок",
      "name_en": "AI Guard: Automated Operations and Deal Control Gateway",
      "category": "ai_automation",
      "description": "Двухуровневая система автоматического разбора неструктурированных заявок (чаты, письма) с детерминированной проверкой бизнес-правил и лимитов.",
      "description_en": "A two-layer system that parses unstructured requests from chats and emails, then deterministically checks business rules and limits.",
      "tech_stack": [
        "Python Core Engine",
        "LLM NLU Parsing",
        "Typed Schema Validation",
        "Deterministic Rule Engine",
        "Automated Report Generation"
      ],
      "status": "Proprietary MVP",
      "status_en": "Proprietary MVP",
      "display_mode": "proprietary_mvp",
      "github_url": null,
      "demo_url": null,
      "is_private": true,
      "visibility_status": "not_applicable",
      "screenshots": [],
      "architecture_diagram": null,
      "highlights": [
        "Двухконтурная защита: LLM извлекает факты из текста, а изолированное Python-ядро жестко проверяет регламенты и лимиты",
        "Трехпозиционная матрица аудита: автоматическое выявление операций, выходящих за рамки формализованных правил",
        "Готовый комплект архитектурной документации и бизнес-моделей (RU/EN спецификации)"
      ],
      "highlights_en": [
        "Two-layer control: the LLM extracts facts from text while an isolated Python core checks policies and limits deterministically.",
        "Three-outcome audit matrix: automatically identifies operations outside formalized rules.",
        "A complete set of architecture documents and business models, including RU/EN specifications."
      ],
      "direction": "ИИ-Аудит & Автоматизация Рисков",
      "direction_en": "AI Audit & Risk Automation",
      "access_note": "Показ архитектуры и спецификаций — по запросу (NDA).",
      "access_note_en": "Architecture and specifications are available on request under NDA.",
      "workflow": [
        "Текст заявки",
        "LLM-парсинг",
        "Python-валидатор",
        "Отчёт"
      ],
      "workflow_en": [
        "Request text",
        "LLM parsing",
        "Python validator",
        "Report"
      ]
    }
  ]
}
```
<!-- PROJECT_DATA_END -->

## Local preview

Serve the repository root over HTTP so JSON requests work. On Windows, the ignored `start-local.bat` starts Python's local HTTP server.

## Release acceptance

Verify JSON parsing, matching generated arrays, unique IDs, allowed media paths, no public source buttons for private records, Russian and English language switching, text wrapping, responsive layout, and the absence of filesystem-derived names. Tier counts are derived from the canonical arrays, not hard-coded. Confirm that on-demand Streamlit pages open externally rather than inside an iframe.
## Эталонное состояние (Gold Master Baseline)

- **Тег эталона:** `v1.0.0-gold-baseline`
- **Команда жесткого отката к эталону:**
  ```bash
  git reset --hard v1.0.0-gold-baseline
  ```
