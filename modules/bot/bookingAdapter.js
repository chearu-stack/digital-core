const DEFAULT_BOOKING_URL = 'https://calendar-gateway.chearu.workers.dev/book';
const REQUEST_TIMEOUT_MS = 15000;

export class BookingRequestError extends Error {
  constructor(code, status) {
    super(code);
    this.name = 'BookingRequestError';
    this.code = code;
    this.status = status;
  }
}

function bookingUrl() {
  const configured = globalThis.DIGITAL_CORE_BOOKING_URL;
  return typeof configured === 'string' && configured.trim()
    ? configured.trim()
    : DEFAULT_BOOKING_URL;
}

export const bookingAdapter = {
  async book(lead, requestId) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response;

    try {
      response = await fetch(bookingUrl(), {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          lead: {
            goal: lead.goal,
            details: lead.details,
            contact: lead.contact,
            date: lead.date,
            time: lead.time
          }
        }),
        signal: controller.signal
      });
    } catch {
      throw new BookingRequestError('booking_request_failed', 0);
    } finally {
      clearTimeout(timeout);
    }

    const data = await response.json().catch(() => null);
    if (response.status === 409 && data?.error === 'slot_unavailable') {
      throw new BookingRequestError('slot_unavailable', response.status);
    }
    if (!response.ok) {
      throw new BookingRequestError(data?.error || 'booking_service_unavailable', response.status);
    }
    if (data?.ok !== true || data?.booked !== true || typeof data.eventId !== 'string') {
      throw new BookingRequestError('booking_response_invalid', response.status);
    }
    return { eventId: data.eventId };
  }
};
