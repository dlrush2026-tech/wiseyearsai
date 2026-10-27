import { useEffect, useRef, useState } from "react";
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/form-tracking";
import {
  CALENDAR_IDS,
  CALENDAR_LABELS,
  BOOKING_LOCATION_ID,
  fetchCalendarFreeSlots,
  submitCalendarBooking,
  monthWindowForDate,
  todayISO,
  formatSlotTime,
  formatLongDate,
  type CalendarKey,
} from "@/lib/calendar-booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarKey?: CalendarKey;
}

export function BookingModal({ isOpen, onClose, calendarKey = "discovery" }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [slotsByDate, setSlotsByDate] = useState<Record<string, string[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const fetchedMonthRef = useRef<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    notes: "",
  });

  const calendarId = CALENDAR_IDS[calendarKey];
  const calendarLabel = CALENDAR_LABELS[calendarKey];

  // Reset everything whenever the modal opens for a (possibly different) calendar.
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setSubmitted(false);
    setBookingError(null);
    setSelectedDate("");
    setSelectedSlot(null);
    setFormData({ name: "", email: "", phone: "", organization: "", notes: "" });
    fetchedMonthRef.current = null;
    setSlotsByDate({});
    setSlotsError(null);
  }, [isOpen, calendarKey]);

  // Fetch real availability for the month containing the selected date
  // (or today's month when the modal first opens).
  useEffect(() => {
    if (!isOpen) return;
    let stale = false;
    const refDate = selectedDate || todayISO();
    const monthKey = refDate.slice(0, 7);
    if (fetchedMonthRef.current === monthKey) return;
    const { start, end } = monthWindowForDate(refDate);
    setLoadingSlots(true);
    setSlotsError(null);
    fetchCalendarFreeSlots(calendarId, start, end)
      .then((res) => {
        if (stale) return;
        const byDate: Record<string, string[]> = {};
        for (const [day, val] of Object.entries(res)) {
          byDate[day] = val?.slots ?? [];
        }
        setSlotsByDate(byDate);
        fetchedMonthRef.current = monthKey;
      })
      .catch(() => {
        if (stale) return;
        setSlotsError(
          "Couldn't load live availability — please try again in a moment, or call 317-695-6863.",
        );
      })
      .finally(() => {
        if (!stale) setLoadingSlots(false);
      });
    return () => {
      stale = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedDate, calendarId]);

  // Reset the chosen time whenever the date changes.
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  if (!isOpen) return null;

  const availableTimes = selectedDate ? (slotsByDate[selectedDate] ?? []) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    if (!selectedSlot) {
      setBookingError("Please choose an available time for your selected date.");
      setStep(1);
      return;
    }
    setSubmitting(true);
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || "";
    try {
      await submitCalendarBooking({
        locationId: BOOKING_LOCATION_ID,
        calendarId,
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        selectedSlot,
        notes: formData.notes,
        companyName: formData.organization,
      });
      // Fire-and-forget analytics event alongside the real booking. The service
      // is encoded by the calendar the booking lands on; we still pass the
      // human-readable label for CRM context.
      const payload = buildTrackingPayload("booking-consultation", "Book a Consulting Appointment");
      postTrackingEvent(payload, {
        customFields: {
          wRlfdjnwngITW7iodyiY: {
            value: calendarLabel,
            label: "Service of Interest",
          },
        },
      });
      setSubmitted(true);
    } catch {
      setBookingError(
        "Something went wrong submitting your request. Please try again, or call 317-695-6863.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-lg bg-[#1f1f1f] text-white border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181818]">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="w-5 h-5 text-gold shrink-0" />
            <h3 className="font-serif text-lg font-semibold tracking-wide text-white truncate">
              {calendarLabel}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close booking dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto" />
              <h4 className="text-xl font-serif font-bold text-white">
                Appointment Request Received!
              </h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your
                request for <span className="font-semibold text-white">{calendarLabel}</span> on{" "}
                <span className="font-semibold text-white">{formatLongDate(selectedDate)}</span> at{" "}
                <span className="font-semibold text-white">
                  {formatSlotTime(selectedSlot ?? "")}
                </span>{" "}
                has been received. Dee will confirm your appointment directly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="rounded bg-gold hover:bg-gold-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full ${step === 1 ? "bg-gold text-dark-bg font-bold" : "bg-white/10 text-gray-400"}`}
                >
                  1. Choose a Time
                </span>
                <ArrowRight className="w-3 h-3 text-gray-500" />
                <span
                  className={`px-2 py-0.5 rounded-full ${step === 2 ? "bg-gold text-dark-bg font-bold" : "bg-white/10 text-gray-400"}`}
                >
                  2. Your Details
                </span>
              </div>

              {step === 1 ? (
                <>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Pick a date and an available time that works for you. You&apos;ll enter your
                    contact details on the next step.
                  </p>

                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      Select a Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={todayISO()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span className="block text-xs font-medium text-gray-300">
                          Available Times — {formatLongDate(selectedDate)}
                        </span>
                      </div>
                      {loadingSlots ? (
                        <p className="text-xs text-gray-400">Checking availability…</p>
                      ) : slotsError ? (
                        <p className="text-xs text-gray-400 leading-relaxed">{slotsError}</p>
                      ) : availableTimes.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map((slot) => {
                            const active = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                aria-pressed={active}
                                className={`rounded border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                                  active
                                    ? "border-gold bg-gold text-dark-bg"
                                    : "border-white/20 bg-black/40 text-gray-200 hover:border-gold"
                                }`}
                              >
                                {formatSlotTime(slot)}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400">
                          No times available on this date — please choose another day.
                        </p>
                      )}
                    </div>
                  )}

                  {bookingError && (
                    <p
                      role="alert"
                      className="rounded border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 leading-relaxed"
                    >
                      {bookingError}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-gray-300 hover:text-white hover:border-white/40 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!selectedSlot) {
                          setBookingError(
                            "Please choose an available time for your selected date.",
                          );
                          return;
                        }
                        setBookingError(null);
                        setStep(2);
                      }}
                      disabled={!selectedSlot}
                      className="inline-flex items-center gap-2 rounded bg-gold hover:bg-gold-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Your Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Selected time summary */}
                  <div className="rounded border border-gold/30 bg-gold/10 px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs min-w-0">
                      <Calendar className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-gray-200 truncate">
                        {formatLongDate(selectedDate)} · {formatSlotTime(selectedSlot ?? "")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline cursor-pointer shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Change
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-medium text-gray-300 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-medium text-gray-300 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@organization.org"
                        className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium text-gray-300 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="317-555-0199"
                        className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-org"
                        className="block text-xs font-medium text-gray-300 mb-1"
                      >
                        Organization / Role
                      </label>
                      <input
                        id="booking-org"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Community Center / Director"
                        className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      How can Dee best help?
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your goals, current comfort level with tech, or specific tasks to simplify…"
                      className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                    />
                  </div>

                  {bookingError && (
                    <p
                      role="alert"
                      className="rounded border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 leading-relaxed"
                    >
                      {bookingError}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1 rounded border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-gray-300 hover:text-white hover:border-white/40 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded bg-gold hover:bg-gold-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting…" : "Confirm Appointment"}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
