import { WidgetFSM, labels } from './fsm-controller.js';

const root = document.getElementById('bot-root');
if (!root) throw new Error('Missing #bot-root mount point');

let language = 'ru';
let isOpen = false;
let firstRender = true;

function text(key) {
  return labels[language][key];
}

root.innerHTML = `<button class="bot-launcher" type="button" aria-label="${text('launcher')}">✳</button><section class="bot-panel" aria-label="${text('panel')}" hidden><div class="bot-head"><div><strong>${text('title')}</strong></div><button class="bot-close" type="button" aria-label="${text('close')}">×</button></div><div class="bot-messages" aria-live="polite"></div><div class="bot-options"></div><form class="bot-input"><label class="sr-only" for="bot-text">${text('input')}</label><input id="bot-text" autocomplete="off" placeholder="${text('placeholder')}"><button type="submit" aria-label="${text('send')}">↑</button></form></section>`;

const panel = root.querySelector('.bot-panel');
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

root.querySelector('.bot-launcher').addEventListener('click', () => {
  isOpen = true;
  panel.hidden = false;
  fsm.handleAction({ type: 'OPEN' });
});

root.querySelector('.bot-close').addEventListener('click', () => {
  isOpen = false;
  panel.hidden = true;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    isOpen = false;
    panel.hidden = true;
  }
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
  open() {
    isOpen = true;
    panel.hidden = false;
    fsm.handleAction({ type: 'OPEN' });
  },
  close() {
    isOpen = false;
    panel.hidden = true;
  },
  setLanguage
};
