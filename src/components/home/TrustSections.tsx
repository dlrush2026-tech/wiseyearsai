import { Link } from "@tanstack/react-router";
import { Star, Quote, ShieldCheck, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dee made AI feel completely approachable. Our team went from nervous to genuinely excited in just one session. The real-work examples made all the difference.",
    name: "Maria S.",
    role: "Nonprofit Program Director",
    tag: "Approachable Instruction",
    avatar:
      "https://vibe.filesafe.space/1793048052107408140/assets/47f03541-e494-4b10-b65e-82c0f4194729.png",
  },
  {
    quote:
      "I'm not a tech person at all, but Dee's training was patient and practical. I left knowing exactly how to use AI for my work every single day.",
    name: "James T.",
    role: "Senior Care Coordinator",
    tag: "Practical Learning",
    avatar:
      "https://vibe.filesafe.space/1793048052107408140/assets/af26622e-910c-4ce6-899f-b64c5f0d2e7f.png",
  },
  {
    quote:
      "Exactly what our mature workforce team needed. Clear, encouraging, and immediately applicable. We're already saving hours every single week.",
    name: "Linda W.",
    role: "Caregiver Organization Lead",
    tag: "Workplace Relevance",
    avatar:
      "https://vibe.filesafe.space/1793048052107408140/assets/ad7e36c7-a5a4-4db0-bd2f-95098cdf3efa.png",
  },
];

const responsiblePoints = [
  "Verify important information AI generates",
  "Avoid entering confidential workplace or personal information unless it's authorized and appropriately protected",
  "Follow your employer's AI policies",
  "Apply human judgment before acting on AI recommendations",
  "Understand that AI can produce inaccurate or misleading content",
];

export function TrustSections() {
  return (
    <>
      {/* TRAINER CREDIBILITY */}
      <section className="py-20 sm:py-24 bg-dark-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
                Practical AI Training Built Around People
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                From Confusion to Clarity. From Pain Points to Real AI Solutions.
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                With multiple decades of IT experience, WiseYearsAI brings a practical perspective
                to helping people understand and use technology. The focus is on making AI easier to
                understand through clear explanations, relevant examples, and guided practice.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                The goal is to help learners develop useful skills, ask better questions, recognize
                AI&apos;s limitations, and apply what they learn with greater confidence.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-metallic px-6 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all"
                >
                  Meet Dee
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-gold hover:text-gold"
                >
                  View Upcoming Workshops
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://vibe.filesafe.space/1793048052107408140/attachments/c90b739a-803a-4d77-9670-9c33b2e29230.png"
                  alt="Deirdre Dee Rush, founder of Wise Years Ai and certified AI trainer with multiple decades of IT experience"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs uppercase tracking-widest text-gold font-bold">
                    Founder &amp; Principal
                  </span>
                  <p className="font-serif text-lg font-bold text-white">
                    Deirdre &ldquo;Dee&rdquo; Rush
                  </p>
                  <p className="text-sm text-gray-300">Multiple Decades of IT Expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-warm-cream border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
              What Learners Value About the Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Trusted by Mature Adults &amp; Workforce Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 border border-gray-200 shadow-sm"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-gold gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-gold" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-gray-200" />
                  </div>
                  <blockquote className="text-base text-gray-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <span className="inline-block w-fit rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-xs font-semibold text-gold uppercase tracking-wider">
                    {t.tag}
                  </span>
                </div>
                <figcaption className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-gold/40"
                  />
                  <div>
                    <p className="font-serif text-base font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSIBLE AI USE */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
              Responsible AI Use
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Use AI Thoughtfully and Safely
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Responsible AI use is part of every training. You&apos;ll learn practical habits to get
            more useful results while protecting yourself and your organization.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {responsiblePoints.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-gray-700 leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            We don&apos;t claim every AI tool is private or secure. Training helps you make informed
            choices about what to share and how to review results.
          </p>
        </div>
      </section>
    </>
  );
}
