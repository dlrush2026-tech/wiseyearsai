import { useState } from "react";
import { X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/form-tracking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceType: "live-training",
    preferredDate: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
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
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
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
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="317-555-0199"
                    className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Organization / Role
                  </label>
                  <input
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
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Service of Interest
                  </label>
                  <select
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
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Preferred Timeframe
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  How can Dee best help your team?
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your team's goals, current comfort level with tech, or specific routine tasks to simplify..."
                  className="w-full rounded border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                />
              </div>

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
                  className="rounded bg-[#c9a050] hover:bg-[#b88f3f] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow"
                >
                  Confirm Appointment Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
