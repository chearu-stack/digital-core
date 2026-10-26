import { WidgetFSM, labels } from './fsm-controller.js';

const root = document.getElementById('bot-root');
if (!root) throw new Error('Missing #bot-root mount point');

let language = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'ru';
let isOpen = false;
let firstRender = true;
let lastOpener = null;

function text(key) {
  return labels[language][key];
}

root.innerHTML = `<button class="bot-launcher" type="button" aria-label="${text('launcher')}" aria-expanded="false">✳</button><section class="bot-panel" aria-label="${text('panel')}" hidden><div class="bot-head"><span class="bot-drag-indicator" aria-hidden="true"></span><div><strong>${text('title')}</strong></div><button class="bot-close" type="button" aria-label="${text('close')}">×</button></div><div class="bot-messages" aria-live="polite"></div><div class="bot-options"></div><form class="bot-input"><label class="sr-only" for="bot-text">${text('input')}</label><input id="bot-text" autocomplete="off" placeholder="${text('placeholder')}"><button type="submit" aria-label="${text('send')}">↑</button></form></section>`;

const panel = root.querySelector('.bot-panel');
const launcher = root.querySelector('.bot-launcher');
const messages = root.querySelector('.bot-messages');
const options = root.querySelector('.bot-options');
const form = root.querySelector('.bot-input');
const input = root.querySelector('#bot-text');

function render(view) {
  if (firstRender) {
    isOpen = view.active;
    firstRender = false;
  }
  panel.hidden = !isOpen;
  launcher.hidden = isOpen;
  launcher.setAttribute('aria-expanded', String(isOpen));

  messages.replaceChildren();
  for (const message of view.messages) {
    const item = document.createElement('div');
    item.className = `bot-message${message.user ? ' user' : ''}`;
    item.textContent = message.text;
    messages.append(item);
  }
  messages.scrollTop = messages.scrollHeight;

  options.replaceChildren();
  for (const option of view.options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.label;
    button.dataset.action = option.action.type;
    button.dataset.payload = JSON.stringify(option.action.payload ?? null);
    button.disabled = view.busy;
    options.append(button);
  }

  input.disabled = view.busy;
  input.placeholder = labels[language].placeholders[view.step] || labels[language].defaultPlaceholder;
}

const fsm = new WidgetFSM({ onChange: render, language });

function syncVisibility() {
  panel.hidden = !isOpen;
  launcher.hidden = isOpen;
  launcher.setAttribute('aria-expanded', String(isOpen));
}

function openWidget(opener = document.activeElement) {
  if (isOpen) {
    root.querySelector('.bot-close').focus();
    return;
  }
  lastOpener = opener && typeof opener.focus === 'function' && opener !== document.body ? opener : launcher;
  isOpen = true;
  syncVisibility();
  fsm.handleAction({ type: 'OPEN' });
  requestAnimationFrame(() => root.querySelector('.bot-close').focus());
}

function closeWidget() {
  if (!isOpen) return;
  isOpen = false;
  panel.style.transform = '';
  syncVisibility();
  const focusTarget = lastOpener?.isConnected && !lastOpener.hidden ? lastOpener : launcher;
  lastOpener = null;
  focusTarget.focus();
}

function setLanguage(next) {
  if (!labels[next]) return;
  language = next;
  root.querySelector('.bot-head strong').textContent = text('title');
  root.querySelector('.bot-launcher').setAttribute('aria-label', text('launcher'));
  panel.setAttribute('aria-label', text('panel'));
  root.querySelector('.bot-close').setAttribute('aria-label', text('close'));
  root.querySelector('label.sr-only').textContent = text('input');
  root.querySelector('button[type="submit"]').setAttribute('aria-label', text('send'));
  fsm.setLanguage(next);
}

launcher.addEventListener('click', () => {
  if (isOpen) closeWidget();
  else openWidget(launcher);
});

root.querySelector('.bot-close').addEventListener('click', () => {
  closeWidget();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isOpen) closeWidget();
});

document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const trigger = event.target.closest('.js-start-conversation');
  if (!trigger) return;
  event.preventDefault();
  openWidget(trigger);
});

options.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  let payload = null;
  try {
    payload = JSON.parse(button.dataset.payload);
  } catch {
    return;
  }
  fsm.handleAction({ type: button.dataset.action, payload });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value;
  input.value = '';
  fsm.handleAction({ type: 'SUBMIT_TEXT', payload: value });
});

window.LeadBot = {
  get isOpen() { return isOpen; },
  open: openWidget,
  close: closeWidget,
  setLanguage
};

const header = root.querySelector('.bot-head');
let touchStartY = 0;
let touchStartTime = 0;
let touchDistance = 0;
let trackingTouch = false;

header.addEventListener('touchstart', event => {
  if (event.touches.length !== 1 || event.target.closest('button, a, input, select, textarea')) return;
  trackingTouch = true;
  touchStartY = event.touches[0].clientY;
  touchStartTime = performance.now();
  touchDistance = 0;
}, { passive: true });

header.addEventListener('touchmove', event => {
  if (!trackingTouch || !isOpen || event.touches.length !== 1) return;
  const distance = event.touches[0].clientY - touchStartY;
  if (distance <= 0) return;
  touchDistance = distance;
  event.preventDefault();
  panel.classList.add('is-dragging');
  panel.style.transform = `translateY(${distance}px)`;
}, { passive: false });

function finishHeaderTouch() {
  if (!trackingTouch) return;
  trackingTouch = false;
  panel.classList.remove('is-dragging');
  const elapsed = Math.max(performance.now() - touchStartTime, 1);
  const velocity = touchDistance / elapsed;
  if (touchDistance > panel.offsetHeight * 0.3 || (touchDistance > 36 && velocity > 0.6)) {
    closeWidget();
  }
  panel.style.transform = '';
  touchDistance = 0;
}

header.addEventListener('touchend', finishHeaderTouch, { passive: true });
header.addEventListener('touchcancel', finishHeaderTouch, { passive: true });
