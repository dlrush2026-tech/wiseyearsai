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
          "Business & Entrepreneur Readiness — a free AI Literacy Technology Training series presented by Wise Years Ai in partnership with The Grindery.",
      },
      { property: "og:title", content: "Upcoming Classes — Wise Years Ai" },
      {
        property: "og:description",
        content:
          "Business & Entrepreneur Readiness free AI training series on Wednesday afternoons at The Bradley Education Center.",
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
    sessions: [] as string[],
    experienceLevel: "",
    aiTools: "",
    learningGoals: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSession = (sessionVal: string) => {
    setFormData((prev) => {
      const exists = prev.sessions.includes(sessionVal);
      return {
        ...prev,
        sessions: exists
          ? prev.sessions.filter((s) => s !== sessionVal)
          : [...prev.sessions, sessionVal],
      };
    });
  };

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
    if (formData.sessions.length === 0) {
      setErrorMessage("Please select at least one session to attend.");
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
        sessionsAttending: formData.sessions.join(", "),
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
        sessionsAttending: "Which session(s) will you attend?",
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
              Fall 2026 &middot; Wednesday Afternoons
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Upcoming Classes
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-1">
            Business & Entrepreneur Readiness &mdash; a free AI Literacy Technology Training series
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
              alt="Business and Entrepreneur Readiness flyer: AI Literacy Technology Training, Wednesday afternoons October 14, 21 and 28, 1:30-2:45pm, at The Bradley Education Center, First Baptist Church North Indianapolis, 877 Udell Street"
              className="w-full rounded-2xl shadow-2xl block border border-gray-200"
            />
          </div>

          {/* Registration message + form */}
          <div>
            <p className="text-center lg:text-left text-xl sm:text-2xl font-bold text-[#154734] mb-5 leading-snug">
              Enter your contact information below to complete registration.
            </p>
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xl p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-5xl">🎉</div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    You're Registered!
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                    Thank you! Dee has been notified and looks forward to seeing you. Details will
                    be confirmed by email.
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
                        sessions: [],
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
                      Free to attend. Let us know where you're starting from so Dee can gear the
                      training to the room.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded bg-red-50 border border-red-200 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  )}

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
                      Which session(s) will you attend? *
                    </label>
                    <div className="space-y-2.5 text-base text-gray-700">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sessions.includes("Wed, Oct 14 (1:30-2:45pm)")}
                          onChange={() => toggleSession("Wed, Oct 14 (1:30-2:45pm)")}
                          className="h-5 w-5 rounded text-gold focus:ring-gold"
                        />
                        <span>Wed, October 14 (1:30 &ndash; 2:45 PM)</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sessions.includes("Wed, Oct 21 (1:30-2:45pm)")}
                          onChange={() => toggleSession("Wed, Oct 21 (1:30-2:45pm)")}
                          className="h-5 w-5 rounded text-gold focus:ring-gold"
                        />
                        <span>Wed, October 21 (1:30 &ndash; 2:45 PM)</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sessions.includes("Wed, Oct 28 (1:30-2:45pm)")}
                          onChange={() => toggleSession("Wed, Oct 28 (1:30-2:45pm)")}
                          className="h-5 w-5 rounded text-gold focus:ring-gold"
                        />
                        <span>Wed, October 28 (1:30 &ndash; 2:45 PM)</span>
                      </label>
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
                    className="w-full rounded bg-[#181818] hover:bg-black text-gold border border-gold/40 py-4 text-base font-bold uppercase tracking-wider transition-all cursor-pointer shadow disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Reserve My Spot \u2192"}
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

      {/* What We'll Cover Each Week */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gold inline-block bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              Three Wednesday Sessions
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mt-3">
              What We'll Cover Each Week
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Session 1 */}
            <div className="bg-[#faf8f5] border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex flex-col items-center justify-center bg-gold text-dark-bg font-bold rounded-lg w-14 h-14 mb-4 shadow-sm">
                  <span className="text-[10px] tracking-widest uppercase font-semibold">OCT</span>
                  <span className="font-serif text-2xl font-bold leading-none">14</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Session 1 &middot; Wednesday, October 14
                </h3>
                <p className="text-xs text-gray-500 font-semibold mb-3">1:30 &ndash; 2:45 PM</p>
                <div className="border-t border-dashed border-gray-300 pt-3 space-y-2.5 text-xs text-gray-700 leading-relaxed">
                  <strong className="text-[#154734] block text-sm font-bold">
                    Better AI Prompts: Create a Bio That Sounds Like You
                  </strong>
                  <p>
                    Learn how to give AI better instructions and introduce yourself with confidence.
                    Write detailed prompts that explain your goal, audience, and preferred tone.
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                    <li>
                      Create a short bio for business, work, ministry, or community involvement
                      &mdash; picture included (don't love your photo? We'll use AI to upgrade it)
                    </li>
                    <li>
                      Refine the wording so it accurately reflects your experience and personality
                    </li>
                    <li>
                      Adapt your bio into a LinkedIn headline or a brief personal or business
                      introduction
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs border-t border-gray-200 pt-3 mt-4 text-gray-700">
                <strong className="text-gold font-bold">Leave with:</strong> A polished short bio or
                flyer and a reusable prompt and booklet you can use again.
              </p>
            </div>

            {/* Session 2 */}
            <div className="bg-[#faf8f5] border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex flex-col items-center justify-center bg-gold text-dark-bg font-bold rounded-lg w-14 h-14 mb-4 shadow-sm">
                  <span className="text-[10px] tracking-widest uppercase font-semibold">OCT</span>
                  <span className="font-serif text-2xl font-bold leading-none">21</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Session 2 &middot; Wednesday, October 21
                </h3>
                <p className="text-xs text-gray-500 font-semibold mb-3">1:30 &ndash; 2:45 PM</p>
                <div className="border-t border-dashed border-gray-300 pt-3 space-y-2.5 text-xs text-gray-700 leading-relaxed">
                  <strong className="text-[#154734] block text-sm font-bold">
                    From Idea to Presentation: Build Your Message with AI
                  </strong>
                  <p>
                    Turn a business idea, workplace topic, or community project into a clear
                    presentation plan.
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                    <li>Use ChatGPT or Claude to turn your ideas into a five-slide outline</li>
                    <li>Create clear slide titles and concise talking points</li>
                    <li>Explore visual styles that fit your audience and message</li>
                    <li>Draft speaker notes to help you explain your ideas confidently</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs border-t border-gray-200 pt-3 mt-4 text-gray-700">
                <strong className="text-gold font-bold">Leave with:</strong> Content for five slides
                and speaker notes, ready to transfer into a presentation tool.
              </p>
            </div>

            {/* Session 3 */}
            <div className="bg-[#faf8f5] border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex flex-col items-center justify-center bg-gold text-dark-bg font-bold rounded-lg w-14 h-14 mb-4 shadow-sm">
                  <span className="text-[10px] tracking-widest uppercase font-semibold">OCT</span>
                  <span className="font-serif text-2xl font-bold leading-none">28</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Session 3 &middot; Wednesday, October 28
                </h3>
                <p className="text-xs text-gray-500 font-semibold mb-3">1:30 &ndash; 2:45 PM</p>
                <div className="border-t border-dashed border-gray-300 pt-3 space-y-2.5 text-xs text-gray-700 leading-relaxed">
                  <strong className="text-[#154734] block text-sm font-bold">
                    AI As Your Daily Assistant: Organize Your Day
                  </strong>
                  <p>
                    Discover how AI can help you sort information, plan your next steps, and write
                    follow-up messages.
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                    <li>Turn sample emails and notes into a clear action list</li>
                    <li>Identify deadlines, follow-ups, and tasks that need your attention</li>
                    <li>Create a daily plan based on your priorities</li>
                    <li>
                      Draft a helpful response for a customer, coworker, community contact, or
                      personal commitment
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs border-t border-gray-200 pt-3 mt-4 text-gray-700">
                <strong className="text-gold font-bold">Leave with:</strong> A reusable daily
                planning prompt, an organized task list, and a follow-up message draft.{" "}
                <em className="text-gray-500">
                  Practice uses sample messages &mdash; connecting your email account is not
                  required.
                </em>
              </p>
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
