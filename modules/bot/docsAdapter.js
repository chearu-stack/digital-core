const destinations = {
  max: 'https://max.ru/u/f9LHodD0cOKUpz6Ua2zqOGJYCvgLZbKFxJjeZn7qlRiRWa5hN8cS6hlwqcg',
  vk: 'https://vk.me/chea52',
  vkProfile: 'https://vk.com/chea52'
};

export const docsAdapter = {
  async copy(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (!copied) throw new Error('Clipboard access is unavailable');
  },

  openMessenger(name) {
    const destination = destinations[name];
    if (!destination) return;
    window.open(destination, '_blank', 'noopener,noreferrer');
  }
};
