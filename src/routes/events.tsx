import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EVENT_FLYER_IMAGE } from "@/lib/event-assets";
import { postTrackingEvent, buildTrackingPayload } from "@/lib/form-tracking";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Classes | Wise Years Ai" },
      {
        name: "description",
        content:
          "Business & Entrepreneur Readiness — a free AI Literacy Technology Training class on Saturday, November 7, presented by Wise Years Ai in partnership with The Grindery.",
      },
      { property: "og:title", content: "Upcoming Classes — Wise Years Ai" },
      {
        property: "og:description",
        content:
          "Business & Entrepreneur Readiness — a free AI Literacy Technology Training class on Saturday, November 7 at The Bradley Education Center.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experienceLevel: "",
    aiTools: "",
    learningGoals: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMessage("Please enter both your first and last name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.experienceLevel.trim()) {
      setErrorMessage("Please select your AI experience level.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildTrackingPayload("event-registration", "Upcoming Classes Registration");
      payload.formData = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        sessionsAttending: "Sat, November 7 — AI Tool Setup (9:30am-10am), Class (10:00am-11:45am)",
        experienceLevel: formData.experienceLevel,
        aiToolsUsed: formData.aiTools.trim(),
        learningGoals: formData.learningGoals.trim(),
      };
      payload.formLabels = {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        firstName: "First Name",
        lastName: "Last Name",
        sessionsAttending: "Session",
        experienceLevel: "AI Experience Level",
        aiToolsUsed: "AI Tools Used",
        learningGoals: "What do you want to learn?",
      };

      postTrackingEvent(payload);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Registration error:", err);
      // Still show confirmation if network glitch so user is not blocked
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800">
      {/* Hero Header */}
      <section className="bg-[#181818] text-white py-16 px-4 border-b border-white/10 text-center">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="inline-block rounded-full bg-gold/15 px-3 py-1 border border-gold/40">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gold">
              Fall 2026 &middot; November
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Upcoming Classes
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-1">
            Business & Entrepreneur Readiness &mdash; a free AI Literacy Technology Training class
            presented by Wise Years Ai in partnership with The Grindery.
          </p>
        </div>
      </section>

      {/* Flyer + Registration Form side by side */}
      <section className="py-12 px-4 sm:px-6 bg-[#f5f2eb]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Flyer */}
          <div className="w-full max-w-[460px] mx-auto lg:mx-0 lg:sticky lg:top-6">
            <img
              src={EVENT_FLYER_IMAGE}
              alt="Business and Entrepreneur Readiness flyer: Fall 2026 at The Grindery, Saturday November 7, 2026, 877 Udell Street, Indianapolis, IN. Class Schedule: 9:30 AM - 10:00 AM AI Tool Setup (ChatGPT and/or Claude), 10:00 AM - 11:45 AM AI Literacy Technology Training taught by Deirdre 'Dee' Rush, Certified AI Consultant. Bring laptops or tablets. Text 317-250-0855 to inform The Grindery you have registered."
              className="w-full rounded-2xl shadow-2xl block border border-gray-200"
            />
          </div>

          {/* Registration message + form */}
          <div id="register">
            <p className="text-center lg:text-left text-xl sm:text-2xl font-bold text-[#154734] mb-5 leading-snug">
              Enter your contact information below to complete registration.
            </p>
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xl p-6 sm:p-8 scroll-mt-24">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-5xl">🎉</div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    You're Registered!
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                    Thank you! Dee has been notified and looks forward to seeing you on Saturday,
                    November 7. Details will be confirmed by email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        experienceLevel: "",
                        aiTools: "",
                        learningGoals: "",
                      });
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded bg-gold-metallic px-6 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg cursor-pointer transition-all"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="font-serif text-2xl font-bold text-[#154734]">
                      Reserve Your Spot
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Let us know where you're starting from so Dee can gear the training to the
                      room.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded bg-red-50 border border-red-200 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <div className="rounded-lg bg-[#e7f3ee] border border-[#c4e3d5] p-4">
                    <p className="text-sm text-[#154734] font-medium leading-relaxed">
                      <strong>Registering for:</strong> Saturday, November 7 &mdash; AI Tool Setup
                      (9:30&ndash;10:00 AM) &amp; Class (10:00&ndash;11:45 AM). Free and open to the
                      community.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First name"
                        className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last name"
                        className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your AI Experience Level *
                    </label>
                    <div className="space-y-2.5 text-base text-gray-700">
                      {[
                        "Just starting — totally new to AI",
                        "Some experience — still learning",
                        "Comfortable — I use AI tools regularly",
                      ].map((level) => (
                        <label key={level} className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="radio"
                            name="aiExperience"
                            value={level}
                            checked={formData.experienceLevel === level}
                            onChange={(e) =>
                              setFormData({ ...formData, experienceLevel: e.target.value })
                            }
                            className="h-5 w-5 text-gold focus:ring-gold"
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      What AI tools have you used, if any? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.aiTools}
                      onChange={(e) => setFormData({ ...formData, aiTools: e.target.value })}
                      placeholder="e.g., ChatGPT, Siri, none yet, not sure..."
                      className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      What do you want to learn at this event? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.learningGoals}
                      onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
                      placeholder="Tell Dee what would help you most so she can gear the training to you."
                      className="w-full rounded border border-gray-300 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded bg-gold-metallic hover:opacity-90 text-dark-bg border border-gold/40 py-4 text-base font-bold uppercase tracking-wider transition-all cursor-pointer shadow disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Register for Free Training \u2192"}
                  </button>

                  <p className="text-center text-sm text-gray-500 pt-1">
                    Prefer to text or email? Text 317-250-0855 or email info@africalogical.com.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gold inline-block bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              Fall 2026 Classes sponsored by TheGrindery.org
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mt-3">
              What You'll Learn
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-[#faf8f5] border-2 border-gold/50 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="inline-flex flex-col items-center justify-center bg-gold text-dark-bg font-bold rounded-lg w-16 h-16 shadow-sm flex-shrink-0 self-start">
                  <span className="text-[10px] tracking-widest uppercase font-semibold">NOV</span>
                  <span className="font-serif text-2xl font-bold leading-none">7</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-dark-bg bg-gold rounded-full px-2.5 py-0.5 mb-2">
                    Free &middot; Open to the Community
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gray-900">
                    AI Tool Setup &middot; Saturday, November 7
                  </h3>
                  <p className="text-sm text-gray-500 font-semibold mt-1">
                    Setup 9:30 &ndash; 10:00 AM &middot; Class 10:00 &ndash; 11:45 AM
                  </p>
                  <div className="border-t border-dashed border-gray-300 pt-3 mt-3 space-y-2.5 text-sm text-gray-700 leading-relaxed">
                    <strong className="text-[#154734] block text-base font-bold">
                      Get Your AI Tools Installed & Ready Before Class Begins
                    </strong>
                    <p>
                      The AI tools we&rsquo;ll use in class are <strong>ChatGPT</strong> and/or{" "}
                      <strong>Claude</strong>. Please have them loaded on your device before you
                      arrive &mdash; or plan to load them during the 9:30&ndash;10:00 AM setup time
                      and we&rsquo;ll walk through it together, step by step. No experience needed.
                    </p>
                    <ul className="space-y-1.5 list-disc pl-5 text-gray-600">
                      <li>
                        <strong className="text-gray-800">Setup:</strong> 9:30 &ndash; 10:00 AM
                        (install ChatGPT and/or Claude with hands-on help)
                      </li>
                      <li>
                        <strong className="text-gray-800">Class:</strong> 10:00 &ndash; 11:45 AM
                      </li>
                      <li>
                        <strong className="text-gray-800">Laptop and/or tablet required</strong> to
                        participate
                      </li>
                      <li>Free and open to everyone in the community</li>
                      <li>Responsible AI use and privacy guidance included</li>
                    </ul>
                  </div>
                  <div className="pt-5">
                    <a
                      href="#register"
                      className="inline-flex items-center justify-center rounded-md bg-gold-metallic px-6 py-3.5 text-base font-bold uppercase tracking-wider text-dark-bg transition-all shadow hover:shadow-lg"
                    >
                      Register for Free Training
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Badge */}
          <div className="mt-8 p-4 rounded-lg bg-[#e7f3ee] border border-[#c4e3d5] text-xs sm:text-sm text-[#154734] text-center font-medium">
            <strong>Location:</strong> The Bradley Education Center, First Baptist Church North
            Indianapolis &mdash; 877 Udell Street, Indianapolis, IN
          </div>
        </div>
      </section>
    </div>
  );
}
