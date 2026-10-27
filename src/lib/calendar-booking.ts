// Calendar booking helper — wires the booking modal to the discovery calendar.
// Availability is fetched from the calendar free-slots endpoint; bookings are
// submitted to the vibe booking endpoint, which handles contact creation,
// custom fields, and appointment booking in one request.

export const CALENDAR_IDS = {
  discovery: "ukU1JZlaV6k2yG1FdyjY",
};

export const BOOKING_LOCATION_ID = "seWTm9cVveJJiWIJrOdE";

const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

export type CustomFieldValue = { id: string; field_value: string };

export type BookingPayload = {
  locationId: string;
  calendarId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedSlot: string;
  selectedTimezone?: string;
  sessionId?: string;
  customFields?: CustomFieldValue[];
} & Partial<
  Record<
    | "notes"
    | "address1"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "companyName"
    | "website"
    | "gender"
    | "dateOfBirth"
    | "timezone",
    string
  >
>;

export const getBrowserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const clampAvailabilityRange = (startMs: number, endMs: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = Math.max(startMs, today.getTime());
  const maxEndDate = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEndDate);
  return { startDate, endDate };
};

export type FreeSlotsResponse = Record<string, { slots: string[] }>;

export const fetchCalendarFreeSlots = async (
  calendarId: string,
  startMs: number,
  endMs: number,
): Promise<FreeSlotsResponse> => {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });
  const response = await fetch(`${BOOKING_API_URL}/calendars/${calendarId}/free-slots?${params}`);
  if (!response.ok) throw new Error("Failed to fetch calendar availability");
  return (await response.json()) as FreeSlotsResponse;
};

export const submitCalendarBooking = async (payload: BookingPayload) => {
  const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      selectedTimezone: payload.selectedTimezone ?? getBrowserTimezone(),
      sessionId: payload.sessionId ?? crypto.randomUUID(),
      customFields: payload.customFields ?? [],
    }),
  });
  if (!response.ok) throw new Error("Booking submission failed");
  return response.json();
};

// Build a 31-day fetch window covering the month that contains `dateStr`,
// clamped to today so we never request past availability.
export const monthWindowForDate = (dateStr: string) => {
  const date = new Date(`${dateStr}T00:00:00`);
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = Math.max(firstOfMonth, today.getTime());
  const end = start + 31 * 24 * 60 * 60 * 1000;
  return { start, end };
};

export const todayISO = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().slice(0, 10);
};

export const formatSlotTime = (iso: string) => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};
