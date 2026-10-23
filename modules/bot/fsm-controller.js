import { briefAdapter } from './briefAdapter.js';
import { calendarAdapter, SLOT_DURATION_MINUTES } from './calendarAdapter.js';
import { docsAdapter } from './docsAdapter.js';

const STORAGE_KEY = 'digital-core-bot-session-v1';
const SCHEMA_VERSION = 4;
const MAX_FIELD_LENGTH = 2000;
const MAX_MESSAGE_LENGTH = 8000;
const MAX_MESSAGES = 200;
const FIELD_LIMITS = Object.freeze({
  goal: { min: 4, max: 160 },
  details: { min: 20, max: 1000 },
  contact: { min: 4, max: 180 }
});

const STATES = Object.freeze({
  IDLE: 'IDLE',
  AWAITING_GOAL: 'AWAITING_GOAL',
  AWAITING_DETAILS: 'AWAITING_DETAILS',
  AWAITING_CONTACT: 'AWAITING_CONTACT',
  AWAITING_DATE: 'AWAITING_DATE',
  AWAITING_TIME: 'AWAITING_TIME',
  CHECKING: 'CHECKING',
  UNAVAILABLE: 'UNAVAILABLE',
  RESULT: 'RESULT'
});

export const labels = {
  ru: {
    title: 'ЦИФРОВОЙ АССИСТЕНТ',
    launcher: 'Открыть цифрового ассистента',
    panel: 'Цифровой ассистент Евгения Чернышева',
    close: 'Закрыть',
    input: 'Ваш ответ',
    defaultPlaceholder: 'Введите ответ...',
    placeholders: {
      AWAITING_GOAL: 'Например: Архитектура RAG-системы или аудит кода...',
      AWAITING_DETAILS: 'Суть задачи или ожидаемый результат...',
      AWAITING_CONTACT: 'Имя и телефон (звонок/WhatsApp) / email / Telegram...'
    },
    send: 'Отправить',
    welcome: 'Здравствуйте. Я помогу сформировать вводные по вашей задаче и проверю свободное время. Диалог хранится только в этой вкладке и не отправляется на сервер. Если захотите продолжить общение в мессенджере, скопируйте сводку и отправьте её сами.',
    start: 'Начать',
    questionGoal: 'С каким вопросом или проектом вы планируете работать?',
    questionDetails: 'Опишите ключевую задачу или ожидаемый результат. Пара предложений — этого достаточно для первичного контекста.',
    questionContact: 'Как к вам обращаться и где вам удобнее продолжить общение?',
    date: 'Укажите удобную дату для связи.',
    time: 'Укажите время. Проверяю свободное время…',
    checking: 'Сверяю свободное время…',
    busy: 'Это время занято. Ищу ближайшие свободные окна…',
    alternatives: 'Вот ближайшие свободные окна:',
    unavailable: 'На ближайшие 7 дней свободных окон нет. Попробуйте позже.',
    available: 'Время свободно. Добавил его в бриф.',
    confirm: 'Сводка готова. Скопируйте её и выберите, где продолжить общение с Евгением:',
    briefTitle: 'Сводка сессии:',
    goalLabel: 'Задача',
    detailsLabel: 'Контекст',
    contactLabel: 'Контакт',
    slotLabel: 'Запрошенный слот',
    timeZone: 'Europe/Moscow',
    copy: 'Скопировать бриф',
    copied: 'Бриф скопирован. Откройте мессенджер и вставьте текст.',
    copyError: 'Не удалось скопировать. Выделите текст брифа и скопируйте вручную.',
    max: 'Перейти в MAX',
    vk: 'Перейти во ВКонтакте',
    restart: 'Начать заново',
    retry: 'Повторить проверку',
    error: 'Не удалось проверить расписание. Попробуйте ещё раз.',
    interrupted: 'Проверка прервалась. Выберите время, чтобы проверить его снова.',
    choose: 'Выберите вариант кнопкой ниже.',
    invalidText: 'Пожалуйста, введите ответ текстом.',
    invalidGoal: 'Добавьте немного подробностей о вопросе или проекте (не менее 4 символов).',
    longGoal: 'Сократите описание вопроса или проекта до 160 символов.',
    invalidDetails: 'Добавьте контекст задачи или ожидаемого результата (не менее 20 символов).',
    longDetails: 'Сократите описание задачи до 1000 символов.',
    invalidContact: 'Укажите имя и способ связи: телефон, email или Telegram (@имя).',
    longContact: 'Сократите контактные данные до 180 символов.',
    step: 'step'
  },
  en: {
    title: 'DIGITAL ASSISTANT',
    launcher: 'Open digital assistant',
    panel: 'Digital assistant by Evgeny Chernyshev',
    close: 'Close',
    input: 'Your response',
    defaultPlaceholder: 'Enter a response...',
    placeholders: {
      AWAITING_GOAL: 'For example: RAG system architecture or code audit...',
      AWAITING_DETAILS: 'The task or expected outcome...',
      AWAITING_CONTACT: 'Name and phone (call/WhatsApp) / email / Telegram...'
    },
    send: 'Send',
    welcome: 'Hello. I’ll help outline your request and check available times. This conversation is stored only in this tab and is not sent to a server. If you want to continue in a messenger, copy the summary and send it yourself.',
    start: 'Get started',
    questionGoal: 'What question or project would you like to work on?',
    questionDetails: 'Describe the key task or expected outcome. A couple of sentences is enough for initial context.',
    questionContact: 'What should I call you, and where would you prefer to continue the conversation?',
    date: 'Choose a convenient date to talk.',
    time: 'Choose a time. Checking availability…',
    checking: 'Checking availability…',
    busy: 'That time is busy. Looking for the nearest available options…',
    alternatives: 'Here are the nearest available times:',
    unavailable: 'There are no open times in the next 7 days. Please try again later.',
    available: 'The time is free. I added it to your brief.',
    confirm: 'Your summary is ready. Copy it and choose where to continue the conversation with Evgeny:',
    briefTitle: 'Session summary:',
    goalLabel: 'Request',
    detailsLabel: 'Context',
    contactLabel: 'Contact',
    slotLabel: 'Requested time',
    timeZone: 'Europe/Moscow',
    copy: 'Copy brief',
    copied: 'Brief copied. Open a messenger and paste the text.',
    copyError: 'Could not copy. Select and copy the brief manually.',
    max: 'Open MAX',
    vk: 'Open VKontakte',
    restart: 'Start over',
    retry: 'Check again',
    error: 'Could not check availability. Please try again.',
    interrupted: 'The check was interrupted. Select a time to check it again.',
    choose: 'Choose an option using the button below.',
    invalidText: 'Please enter a text response.',
    invalidGoal: 'Please add a little more detail about your question or project (at least 4 characters).',
    longGoal: 'Shorten the question or project description to 160 characters.',
    invalidDetails: 'Please add context about the task or expected outcome (at least 20 characters).',
    longDetails: 'Shorten the task description to 1000 characters.',
    invalidContact: 'Enter your name and a contact method: phone, email, or Telegram (@username).',
    longContact: 'Shorten the contact details to 180 characters.',
    step: 'step'
  }
};

const QUESTIONS = ['goal', 'details', 'contact'];

function emptyState() {
  return {
    schema: SCHEMA_VERSION,
    step: STATES.IDLE,
    lead: { goal: '', details: '', contact: '', date: '', time: '' },
    messages: []
  };
}

function safeString(value) {
  return typeof value === 'string' ? value.slice(0, MAX_FIELD_LENGTH) : '';
}

function safeMessage(value) {
  return typeof value === 'string' ? value.slice(0, MAX_MESSAGE_LENGTH) : '';
}

function normalizeAnswer(value) {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/gu, ' ')
    .replace(/[\s\u2028\u2029]+/gu, ' ')
    .trim();
}

function validateAnswer(field, value) {
  const limit = FIELD_LIMITS[field];
  const length = Array.from(value).length;
  if (length < limit.min) return `invalid${field[0].toUpperCase()}${field.slice(1)}`;
  if (length > limit.max) return `long${field[0].toUpperCase()}${field.slice(1)}`;
  if (field !== 'contact') return null;

  const emailPattern = /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/u;
  const telegramPattern = /(?:^|\s)@[A-Za-z0-9_]{5,32}(?=$|[\s,;.!?])/u;
  const telegramLinkPattern = /(?:https?:\/\/)?t\.me\/[A-Za-z0-9_]{5,32}/iu;
  const phonePattern = /\+?\d[\d\s().-]{7,}\d/gu;
  const phoneMatches = value.match(phonePattern) || [];
  const hasPhone = phoneMatches.some(candidate => {
    const digits = candidate.replace(/\D/gu, '').length;
    return digits >= 10 && digits <= 15;
  });
  const hasEmail = emailPattern.test(value);
  const hasTelegram = telegramPattern.test(value) || telegramLinkPattern.test(value);
  if (!hasPhone && !hasEmail && !hasTelegram) return 'invalidContact';

  const name = value
    .replace(emailPattern, ' ')
    .replace(phonePattern, ' ')
    .replace(telegramPattern, ' ')
    .replace(telegramLinkPattern, ' ')
    .replace(/(?:^|[^\p{L}\p{N}])(?:telegram|телеграм(?:м)?|телега|whatsapp|ватсап|вотсап|email|e-mail|почта|телефон|phone|tg|wa)(?=$|[^\p{L}\p{N}])/giu, ' ')
    .replace(/[^\p{L}]/gu, '');
  return Array.from(name).length >= 2 ? null : 'invalidContact';
}

function restoreState() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (
      stored?.schema !== SCHEMA_VERSION ||
      !Object.values(STATES).includes(stored.step) ||
      !stored.lead ||
      !Array.isArray(stored.messages)
    ) return emptyState();

    return {
      schema: SCHEMA_VERSION,
      step: stored.step,
      lead: {
        goal: safeString(stored.lead.goal),
        details: safeString(stored.lead.details),
        contact: safeString(stored.lead.contact),
        date: safeString(stored.lead.date),
        time: safeString(stored.lead.time)
      },
      messages: stored.messages
        .filter(message => message && ['user', 'system', 'slot_selection', 'brief'].includes(message.type))
        .slice(-MAX_MESSAGES)
        .map(message => {
          if (message.type === 'user') return { type: 'user', text: safeMessage(message.text) };
          if (message.type === 'system') return { type: 'system', key: typeof message.key === 'string' ? message.key : '' };
          if (message.type === 'slot_selection') return {
            type: 'slot_selection',
            payload: {
              date: isValidDate(message.payload?.date) ? message.payload.date : '',
              time: isValidTime(message.payload?.time) ? message.payload.time : ''
            }
          };
          return {
            type: 'brief',
            payload: {
              goal: safeString(message.payload?.goal),
              details: safeString(message.payload?.details),
              contact: safeString(message.payload?.contact),
              date: isValidDate(message.payload?.date) ? message.payload.date : '',
              time: isValidTime(message.payload?.time) ? message.payload.time : ''
            }
          };
        })
    };
  } catch {
    return emptyState();
  }
}

function formatDate(date, language) {
  return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
    month: 'long'
  }).format(new Date(`${date}T12:00:00+03:00`));
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isValidTime(value) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return false;
  const [hour, minute] = value.split(':').map(Number);
  return minute % SLOT_DURATION_MINUTES === 0 && hour * 60 + minute + SLOT_DURATION_MINUTES <= 24 * 60;
}

function compareSlots(left, right) {
  return `${left.date}T${left.time}`.localeCompare(`${right.date}T${right.time}`);
}

export class WidgetFSM {
  constructor({ onChange = () => {}, calendar = calendarAdapter, documents = docsAdapter, language = 'ru' } = {}) {
    this.onChange = onChange;
    this.calendar = calendar;
    this.documents = documents;
    this.language = labels[language] ? language : 'ru';
    this.state = restoreState();
    this.options = [];
    this.pending = false;
    this.requestId = 0;

    if (this.state.step === STATES.CHECKING) {
      this.state.step = STATES.AWAITING_TIME;
      this.addSystemMessage('interrupted');
    }

    this.persist();
    this.publish();
    this.restoreOptions();
  }

  t(key) {
    return labels[this.language][key];
  }

  formatBrief() {
    return this.formatBriefFor(this.state.lead);
  }

  formatBriefFor(source) {
    const lead = {
      ...source,
      date: source.date ? formatDate(source.date, this.language) : ''
    };
    return briefAdapter.format(lead, labels[this.language]);
  }

  renderMessage(message) {
    if (message.type === 'user') return { text: message.text, user: true };
    if (message.type === 'system') return { text: this.t(message.key), user: false };
    if (message.type === 'slot_selection') {
      const { date, time } = message.payload;
      return { text: `${date ? formatDate(date, this.language) : ''}${time ? ` · ${time}` : ''}`, user: true };
    }
    if (message.type === 'brief') return { text: this.formatBriefFor(message.payload), user: false };
    return { text: '', user: false };
  }

  view() {
    return {
      step: this.state.step,
      messages: this.state.messages.map(message => this.renderMessage(message)),
      options: this.options,
      busy: this.pending,
      active: this.state.messages.length > 0
    };
  }

  publish() {
    this.onChange(this.view());
  }

  persist() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Keep the dialog usable in memory if this browser blocks sessionStorage.
    }
  }

  addSystemMessage(key) {
    this.state.messages.push({ type: 'system', key });
    if (this.state.messages.length > MAX_MESSAGES) this.state.messages.shift();
    this.persist();
  }

  addUserMessage(text) {
    this.state.messages.push({ type: 'user', text });
    if (this.state.messages.length > MAX_MESSAGES) this.state.messages.shift();
    this.persist();
  }

  addSlotSelection(date, time = '') {
    this.state.messages.push({ type: 'slot_selection', payload: { date, time } });
    if (this.state.messages.length > MAX_MESSAGES) this.state.messages.shift();
    this.persist();
  }

  addBriefMessage() {
    this.state.messages.push({ type: 'brief', payload: { ...this.state.lead } });
    if (this.state.messages.length > MAX_MESSAGES) this.state.messages.shift();
    this.persist();
  }

  setStep(step) {
    this.state.step = step;
    this.persist();
  }

  setOptions(options) {
    this.options = options;
    this.publish();
  }

  async restoreOptions() {
    switch (this.state.step) {
      case STATES.IDLE:
        if (this.state.messages.length) this.showStart();
        break;
      case STATES.AWAITING_DATE:
        await this.populateDates();
        break;
      case STATES.AWAITING_TIME:
        await this.populateTimes();
        break;
      case STATES.UNAVAILABLE:
        this.showRestart();
        break;
      case STATES.RESULT:
        this.showResultActions();
        break;
    }
  }

  async handleAction(action) {
    if (!action || typeof action.type !== 'string') return;
    if (action.type === 'RESTART') {
      this.reset();
      return;
    }
    if (this.pending) return;

    switch (action.type) {
      case 'OPEN':
        if (!this.state.messages.length) {
          this.addSystemMessage('welcome');
          this.setStep(STATES.IDLE);
          this.showStart();
        }
        break;
      case 'START':
        if (this.state.step === STATES.IDLE) this.askQuestion(0);
        break;
      case 'SUBMIT_TEXT':
        this.submitText(action.payload);
        break;
      case 'SELECT_DATE':
        await this.selectDate(action.payload);
        break;
      case 'SELECT_TIME':
        await this.checkTime(this.state.lead.date, action.payload);
        break;
      case 'SELECT_ALTERNATIVE':
        await this.checkTime(action.payload?.date, action.payload?.time, true);
        break;
      case 'RETRY_DATES':
        await this.populateDates();
        break;
      case 'RETRY_TIMES':
        await this.populateTimes();
        break;
      case 'COPY_BRIEF':
        await this.copyBrief();
        break;
      case 'OPEN_MAX':
        this.documents.openMessenger('max');
        break;
      case 'OPEN_VK':
        this.documents.openMessenger('vk');
        break;
    }
  }

  showStart() {
    this.setOptions([{ label: this.t('start'), action: { type: 'START' } }]);
  }

  askQuestion(index) {
    const field = QUESTIONS[index];
    if (!field) {
      this.askDate();
      return;
    }
    this.setStep([STATES.AWAITING_GOAL, STATES.AWAITING_DETAILS, STATES.AWAITING_CONTACT][index]);
    this.addSystemMessage(`question${field[0].toUpperCase()}${field.slice(1)}`);
    this.setOptions([]);
  }

  submitText(value) {
    if (![STATES.AWAITING_GOAL, STATES.AWAITING_DETAILS, STATES.AWAITING_CONTACT].includes(this.state.step)) {
      this.addSystemMessage('choose');
      this.publish();
      return;
    }

    const text = normalizeAnswer(value);
    if (!text) {
      this.addSystemMessage('invalidText');
      this.publish();
      return;
    }

    const index = [STATES.AWAITING_GOAL, STATES.AWAITING_DETAILS, STATES.AWAITING_CONTACT].indexOf(this.state.step);
    const field = QUESTIONS[index];
    const validationError = validateAnswer(field, text);
    if (validationError) {
      this.addSystemMessage(validationError);
      this.publish();
      return;
    }

    this.addUserMessage(text);
    this.state.lead[field] = text;
    this.persist();
    if (index < QUESTIONS.length - 1) this.askQuestion(index + 1);
    else this.askDate();
  }

  async askDate() {
    this.setStep(STATES.AWAITING_DATE);
    this.addSystemMessage('date');
    await this.populateDates();
  }

  async populateDates() {
    this.setOptions([]);
    try {
      const dates = (await this.calendar.getAvailableDates()).filter(isValidDate);
      if (!dates.length) {
        this.setStep(STATES.UNAVAILABLE);
        this.addSystemMessage('unavailable');
        this.showRestart();
        return;
      }
      this.setOptions(dates.map(date => ({
        label: formatDate(date, this.language),
        action: { type: 'SELECT_DATE', payload: date }
      })));
    } catch {
      this.addSystemMessage('error');
      this.setOptions([{ label: this.t('retry'), action: { type: 'RETRY_DATES' } }]);
    }
  }

  async selectDate(date) {
    if (this.state.step !== STATES.AWAITING_DATE || this.pending || !isValidDate(date)) return;
    const requestId = ++this.requestId;
    this.pending = true;
    this.setOptions([]);
    this.publish();
    try {
      const dates = await this.calendar.getAvailableDates();
      if (requestId !== this.requestId) return;
      if (!dates.includes(date)) {
        this.pending = false;
        await this.populateDates();
        return;
      }
    } catch {
      if (requestId !== this.requestId) return;
      this.pending = false;
      this.addSystemMessage('error');
      this.setOptions([{ label: this.t('retry'), action: { type: 'RETRY_DATES' } }]);
      return;
    }
    if (requestId !== this.requestId) return;
    this.state.lead.date = date;
    this.state.lead.time = '';
    this.addSlotSelection(date);
    this.persist();
    this.setStep(STATES.AWAITING_TIME);
    this.addSystemMessage('time');
    try {
      await this.populateTimes();
    } finally {
      if (requestId === this.requestId) {
        this.pending = false;
        this.publish();
      }
    }
  }

  async populateTimes() {
    this.setOptions([]);
    try {
      const slots = await this.calendar.getAvailableSlots(this.state.lead.date);
      const validSlots = slots.filter(isValidTime);
      if (!validSlots.length) {
        this.state.lead.date = '';
        this.persist();
        await this.askDate();
        return;
      }
      this.setOptions(validSlots.map(time => ({ label: time, action: { type: 'SELECT_TIME', payload: time } })));
    } catch {
      this.addSystemMessage('error');
      this.setOptions([{ label: this.t('retry'), action: { type: 'RETRY_TIMES' } }]);
    }
  }

  async checkTime(date, time, isAlternative = false) {
    if (
      this.state.step !== STATES.AWAITING_TIME ||
      (!isAlternative && date !== this.state.lead.date) ||
      !isValidDate(date) ||
      !isValidTime(time)
    ) return;

    const requestId = ++this.requestId;
    this.pending = true;
    this.setStep(STATES.CHECKING);
    this.addSlotSelection(date, time);
    this.addSystemMessage('checking');
    this.setOptions([]);
    this.publish();

    try {
      const isFree = await this.calendar.isFree(date, time);
      if (requestId !== this.requestId) return;

      if (isFree === true) {
        this.state.lead.time = time;
        this.state.lead.date = date;
        this.persist();
        this.setStep(STATES.RESULT);
        this.addSystemMessage('available');
        this.addSystemMessage('confirm');
        this.addBriefMessage();
        this.showResultActions();
        return;
      }

      if (isFree !== false) throw new Error('Calendar adapter returned a non-boolean status');
      this.setStep(STATES.AWAITING_TIME);
      this.addSystemMessage('busy');
      const alternatives = await this.findAlternatives(date, time);
      if (alternatives.length) {
        this.addSystemMessage('alternatives');
        this.setOptions(alternatives.map(slot => ({
          label: `${formatDate(slot.date, this.language)} · ${slot.time}`,
          action: { type: 'SELECT_ALTERNATIVE', payload: slot }
        })));
      } else {
        this.addSystemMessage('unavailable');
        this.setStep(STATES.UNAVAILABLE);
        this.showRestart();
      }
    } catch {
      if (requestId !== this.requestId) return;
      this.pending = false;
      if (this.state.step === STATES.CHECKING) this.setStep(STATES.AWAITING_TIME);
      this.addSystemMessage('error');
      this.setOptions([{ label: this.t('retry'), action: { type: 'RETRY_TIMES' } }]);
    } finally {
      if (requestId === this.requestId) {
        this.pending = false;
        this.publish();
      }
    }
  }

  async findAlternatives(selectedDate, selectedTime) {
    const dates = await this.calendar.getAvailableDates();
    const candidates = [];

    for (const date of dates.filter(isValidDate)) {
      const slots = await this.calendar.getAvailableSlots(date);
      for (const time of slots.filter(isValidTime)) {
        const candidate = { date, time };
        if (candidate.date !== selectedDate || candidate.time !== selectedTime) candidates.push(candidate);
      }
    }

    candidates.sort(compareSlots);
    const alternatives = [];
    for (const candidate of candidates) {
      if (await this.calendar.isFree(candidate.date, candidate.time)) alternatives.push(candidate);
      if (alternatives.length === 3) break;
    }
    return alternatives;
  }

  showResultActions() {
    this.setOptions([
      { label: this.t('copy'), action: { type: 'COPY_BRIEF' } },
      { label: this.t('max'), action: { type: 'OPEN_MAX' } },
      { label: this.t('vk'), action: { type: 'OPEN_VK' } },
      { label: this.t('restart'), action: { type: 'RESTART' } }
    ]);
  }

  async copyBrief() {
    try {
      await this.documents.copy(this.formatBrief());
      this.addSystemMessage('copied');
    } catch {
      this.addSystemMessage('copyError');
    }
    this.showResultActions();
  }

  showRestart() {
    this.setOptions([{ label: this.t('restart'), action: { type: 'RESTART' } }]);
  }

  reset() {
    this.requestId++;
    this.pending = false;
    this.options = [];
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Reset the in-memory state even if storage is unavailable.
    }
    this.state = emptyState();
    this.publish();
    this.handleAction({ type: 'OPEN' });
  }

  setLanguage(language) {
    if (!labels[language]) return;
    this.language = language;
    this.restoreOptions();
    this.publish();
  }
}

export { STATES as WIDGET_FSM_STATES, SLOT_DURATION_MINUTES };
