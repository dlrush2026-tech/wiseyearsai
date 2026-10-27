import { useEffect, useRef, useState } from "react";
import { X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/form-tracking";
import {
  CALENDAR_IDS,
  BOOKING_LOCATION_ID,
  fetchCalendarFreeSlots,
  submitCalendarBooking,
  monthWindowForDate,
  todayISO,
  formatSlotTime,
} from "@/lib/calendar-booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_LABELS: Record<string, string> = {
  "live-training": "Live, Hands-on AI Training",
  "strategic-consulting": "Strategic AI Consulting",
  "speaking-keynote": "Keynote / Event Workshop",
  "mature-workforce": "Mature Workforce / Seniors AI",
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [slotsByDate, setSlotsByDate] = useState<Record<string, string[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const fetchedMonthRef = useRef<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceType: "live-training",
    preferredDate: "",
    notes: "",
  });

  // Fetch real availability for the month containing the selected date
  // (or today's month when the modal first opens).
  useEffect(() => {
    if (!isOpen) return;
    let stale = false;
    const refDate = formData.preferredDate || todayISO();
    const monthKey = refDate.slice(0, 7);
    if (fetchedMonthRef.current === monthKey) return;
    const { start, end } = monthWindowForDate(refDate);
    setLoadingSlots(true);
    setSlotsError(null);
    fetchCalendarFreeSlots(CALENDAR_IDS.discovery, start, end)
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
          "Couldn't load live availability — you can still request a time and Dee will confirm directly.",
        );
      })
      .finally(() => {
        if (!stale) setLoadingSlots(false);
      });
    return () => {
      stale = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, formData.preferredDate]);

  // Reset the chosen time whenever the date changes.
  useEffect(() => {
    setSelectedSlot(null);
  }, [formData.preferredDate]);

  if (!isOpen) return null;

  const availableTimes = formData.preferredDate ? (slotsByDate[formData.preferredDate] ?? []) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    if (!selectedSlot) {
      setBookingError("Please choose an available time for your selected date.");
      return;
    }
    setSubmitting(true);
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || "";
    try {
      await submitCalendarBooking({
        locationId: BOOKING_LOCATION_ID,
        calendarId: CALENDAR_IDS.discovery,
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        selectedSlot,
        notes: formData.notes,
        companyName: formData.organization,
        customFields: [
          {
            id: "wRlfdjnwngITW7iodyiY",
            field_value: SERVICE_LABELS[formData.serviceType] ?? formData.serviceType,
          },
          {
            id: "MgaopzMpsPk20qKNFrKl",
            field_value: formData.preferredDate,
          },
        ],
      });
      // Fire-and-forget analytics event alongside the real booking.
      const payload = buildTrackingPayload("booking-consultation", "Book a Consulting Appointment");
      postTrackingEvent(payload, {
        customFields: {
          wRlfdjnwngITW7iodyiY: {
            value: formData.serviceType,
            label: "Service of Interest",
          },
          MgaopzMpsPk20qKNFrKl: {
            value: formData.preferredDate,
            label: "Preferred Timeframe",
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
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-semibold tracking-wide text-white">
              Book a Consulting Appointment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
                Consultation Request Received!
              </h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Dee
                will review your organization&apos;s details and connect with you directly to
                schedule your custom AI training session.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="rounded bg-[#c9a050] hover:bg-[#b88f3f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed">
                Meet with Dee Rush (46+ years IT expertise) to discover how practical, approachable
                AI can simplify repetitive tasks and empower your mature workforce or nonprofit
                team.
              </p>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    Service of Interest
                  </label>
                  <select
                    id="booking-service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                  >
                    <option value="live-training">Live, Hands-on AI Training</option>
                    <option value="strategic-consulting">Strategic AI Consulting</option>
                    <option value="speaking-keynote">Keynote / Event Workshop</option>
                    <option value="mature-workforce">Mature Workforce / Seniors AI</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-medium text-gray-300 mb-1"
                  >
                    Preferred Timeframe
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={todayISO()}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Available times for the selected date (live calendar availability) */}
              {formData.preferredDate && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span className="block text-xs font-medium text-gray-300">Available Times</span>
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

              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  How can Dee best help your team?
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your team's goals, current comfort level with tech, or specific routine tasks to simplify..."
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
                  onClick={onClose}
                  className="rounded border border-white/20 px-4 py-2 text-xs font-semibold uppercase text-gray-300 hover:text-white hover:border-white/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded bg-[#c9a050] hover:bg-[#b88f3f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Confirm Appointment Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
