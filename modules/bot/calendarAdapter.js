const WORKER_URL = 'https://calendar-gateway.chearu.workers.dev';
const TIME_ZONE = 'Europe/Moscow';
export const SLOT_DURATION_MINUTES = 30;
const FIRST_SLOT_MINUTE = 10 * 60;
const LAST_SLOT_MINUTE = 17 * 60 + 30;
const HORIZON_DAYS = 7;
const REQUEST_TIMEOUT_MS = 10000;

function datePartsInMoscow(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  return Object.fromEntries(parts.map(part => [part.type, part.value]));
}

function todayInMoscow() {
  const parts = datePartsInMoscow(new Date());
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function addCalendarDays(dateKey, amount) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + amount, 12))
    .toISOString()
    .slice(0, 10);
}

function isValidDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isWeekday(dateKey) {
  const day = new Date(`${dateKey}T12:00:00Z`).getUTCDay();
  return day >= 1 && day <= 5;
}

function availableWorkdays() {
  const today = todayInMoscow();
  const days = [];
  for (let offset = 1; offset <= HORIZON_DAYS; offset++) {
    const date = addCalendarDays(today, offset);
    if (isWeekday(date)) days.push(date);
  }
  return days;
}

function slotGrid() {
  const slots = [];
  for (let minute = FIRST_SLOT_MINUTE; minute <= LAST_SLOT_MINUTE; minute += SLOT_DURATION_MINUTES) {
    const hour = Math.floor(minute / 60);
    const minutePart = minute % 60;
    slots.push(`${String(hour).padStart(2, '0')}:${String(minutePart).padStart(2, '0')}`);
  }
  return slots;
}

function validDateAndTime(date, time) {
  return isValidDateKey(date) && availableWorkdays().includes(date) && slotGrid().includes(time);
}

function moscowWallTimeToUtc(dateKey, time) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const wallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  let timestamp = wallTimeAsUtc;

  // Convert a Moscow wall-clock time to UTC without using the browser's local zone.
  for (let attempt = 0; attempt < 3; attempt++) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date(timestamp)).map(part => [part.type, part.value]));

    const representedAsUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    const offset = representedAsUtc - timestamp;
    const adjusted = wallTimeAsUtc - offset;
    if (adjusted === timestamp) break;
    timestamp = adjusted;
  }

  return new Date(timestamp);
}

async function requestSlotStatus(timeMin, timeMax) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response;

  try {
    response = await fetch(WORKER_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeMin, timeMax }),
      signal: controller.signal
    });
  } catch {
    throw new Error('Calendar gateway request failed');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) throw new Error(`Calendar gateway returned HTTP ${response.status}`);

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Calendar gateway returned invalid JSON');
  }

  if (!data || typeof data.is_free !== 'boolean') {
    throw new Error('Calendar gateway response must contain a boolean is_free field');
  }
  return data.is_free === true;
}

export const calendarAdapter = {
  /** Next seven calendar days, filtered to Monday through Friday in Moscow. */
  getAvailableDates() {
    return availableWorkdays();
  },

  /**
   * Returns candidate start times. Availability is checked lazily by isFree()
   * after the visitor selects a time, so no daily busy schedule is sent to the browser.
   */
  getAvailableSlots(date) {
    if (!availableWorkdays().includes(date)) return [];
    return slotGrid();
  },

  async isFree(date, time) {
    if (!validDateAndTime(date, time)) {
      throw new RangeError('Requested slot is outside the supported weekday horizon');
    }

    const start = moscowWallTimeToUtc(date, time);
    const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
    return requestSlotStatus(start.toISOString(), end.toISOString());
  }
};
