import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, Send } from "lucide-react";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/form-tracking";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Dee — Practical AI Training | Wise Years Ai",
      },
      {
        name: "description",
        content:
          "Send Dee Rush a message about practical AI training for yourself, your team, or your organization. Live, hands-on, responsible AI instruction.",
      },
      { property: "og:title", content: "Contact Wise Years Ai" },
      {
        property: "og:description",
        content:
          "Have a question about AI training? Send a message and Dee will get back to you personally.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT_MESSAGE_FIELD_ID = "JTqeCWtp0f47EkGp0hCy";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.message.trim()) {
      setError("Please share a short message so Dee knows how to help.");
      return;
    }
    setSubmitting(true);
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || "";
    try {
      const payload = buildTrackingPayload("contact-form", "Contact Dee");
      postTrackingEvent(
        {
          ...payload,
          formData: {
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
          },
          formLabels: {
            first_name: "First Name",
            last_name: "Last Name",
            email: "Email Address",
            phone: "Phone Number",
            organization: "Organization / Role",
          },
        },
        {
          customFields: {
            [CONTACT_MESSAGE_FIELD_ID]: {
              value: formData.message,
              label: "Contact Message",
            },
          },
        },
      );
      // Fire-and-forget; give the CRM a moment then confirm to the visitor.
      await new Promise((resolve) => setTimeout(resolve, 400));
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again, or call 317-695-6863.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header */}
      <section className="bg-dark-bg text-white py-16 sm:py-20 px-4 border-b border-white/10">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5">
            <Mail className="w-4 h-4 text-gold" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              Get in Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Contact <span className="text-gold italic">Dee</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a question about AI training for yourself, your team, or your organization? Send a
            message and Dee will get back to you personally.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl bg-white border border-gold/40 p-10 text-center shadow-sm space-y-4">
                <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Message Received — Thank You!
                </h2>
                <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                  Thank you,{" "}
                  <span className="font-semibold text-gray-900">{formData.name || "there"}</span>.
                  Your message is on its way to Dee. She&apos;ll review it and reply personally as
                  soon as she can.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover"
                  >
                    Back to Home
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 transition-all hover:border-gold hover:text-gold"
                  >
                    Explore Training
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Send Dee a Message
                </h2>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and Dee will get back to you. The more you share about
                  your goals, the better she can help.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Your Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@organization.org"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="317-555-0199"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-org"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Organization / Role
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization: e.target.value,
                          })
                        }
                        placeholder="Community Center / Director"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Your Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Dee about your goals, your team, or what you'd like to learn…"
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-md border border-red-400/50 bg-red-50 px-4 py-3 text-sm text-red-700 leading-relaxed"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By submitting, you agree to be contacted about your inquiry. Please don&apos;t
                    include sensitive personal or workplace information in your message.
                  </p>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-dark-bg text-white p-8 border border-white/10 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-white mb-5">
                Other Ways to Reach Dee
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Call or Text
                    </p>
                    <a
                      href="tel:3176956863"
                      className="text-base text-white hover:text-gold transition-colors font-medium"
                    >
                      317-695-6863
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Based In
                    </p>
                    <p className="text-base text-white leading-relaxed">Indianapolis, IN</p>
                    <p className="text-sm text-gray-400 leading-relaxed mt-1">
                      Serving nonprofits, care teams &amp; mature workforce organizations
                      nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Prefer to Talk It Through?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                If you&apos;d rather walk through your needs live, book a free discovery call and
                Dee will help you find the right fit.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover"
              >
                Explore AI Training
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
