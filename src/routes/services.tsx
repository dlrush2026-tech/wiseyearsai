import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, User, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "AI Training Services — Individual & Team | Wise Years Ai",
      },
      {
        name: "description",
        content:
          "Practical AI training options: 1-on-1 coaching for mature adults, live hands-on workshops for teams, and strategic AI consulting for organizations. Find the right fit.",
      },
      {
        property: "og:title",
        content: "AI Training Services — Wise Years Ai",
      },
      {
        property: "og:description",
        content:
          "Individual coaching, team workshops, and strategic AI consulting — practical, hands-on, and responsible.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    {
      audience: "Individual Learners",
      icon: User,
      title: "1-on-1 Coaching & AI Literacy",
      desc: "Tailored coaching for mature adults, caregivers, and individuals who want to build confidence with AI at their own pace — for personal use, everyday tasks, or professional development.",
      bullets: [
        "Getting comfortable with ChatGPT and other AI tools",
        "Everyday tasks: writing, research, planning, and organizing",
        "Spotting AI scams, deepfakes, and misinformation",
        "Responsible AI use and protecting personal information",
      ],
      idealFor: "Mature adults, caregivers, individual professionals",
      cta: "Book Individual Training",
    },
    {
      audience: "Teams & Organizations",
      icon: Users,
      title: "Live, Hands-on AI Workshops",
      desc: "Interactive, step-by-step sessions using real workplace documents, emails, newsletters, and reports. Tailored to your team's tools, goals, and experience levels.",
      bullets: [
        "Practical prompting for everyday workplace communication",
        "Summarizing documents and drafting outreach materials",
        "Organizing notes, agendas, and meeting prep",
        "Responsible AI use and data safety for your team",
      ],
      idealFor: "Nonprofit staff, community teams, small businesses",
      cta: "Discuss Team Training",
    },
    {
      audience: "Leaders & Decision-Makers",
      icon: Briefcase,
      title: "Strategic AI Consulting",
      desc: "Align your organization's mission with practical, responsible AI use. Identify where AI helps most and build guidelines your team can trust.",
      bullets: [
        "Review of repetitive tasks and time drains",
        "Tool selection guidance (ChatGPT, Claude, Copilot, and more)",
        "AI use policy and human-in-the-loop oversight",
        "Practical adoption plan for your team",
      ],
      idealFor: "Executive directors, operations managers, board leaders",
      cta: "Request a Consultation",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="bg-dark-bg text-white py-20 px-4 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              AI Training Options
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Practical AI Training Built for <span className="text-gold italic">Real People</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Three ways to build AI skills — for yourself, your team, or your organization. Each
            option is live, hands-on, and tailored to your needs. No technical background required.
          </p>
        </div>
      </section>

      {/* Quick path selector */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: "Learning for yourself?", to: "#individual", text: "1-on-1 Coaching" },
            { label: "Training your team?", to: "#team", text: "Live Workshops" },
            { label: "Planning AI adoption?", to: "#consulting", text: "Strategic Consulting" },
          ].map((p, i) => (
            <a
              key={i}
              href={p.to}
              className="block rounded-xl bg-white border border-gray-200 p-5 hover:border-gold transition-colors"
            >
              <p className="text-sm text-gray-500">{p.label}</p>
              <p className="font-serif text-lg font-bold text-gray-900 mt-1">{p.text}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const anchor = i === 0 ? "individual" : i === 1 ? "team" : "consulting";
            return (
              <div
                id={anchor}
                key={i}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow scroll-mt-28"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <span className="rounded-full bg-gold/10 border border-gold/30 text-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                      {svc.audience}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{svc.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">{svc.desc}</p>

                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      What You Will Gain:
                    </h4>
                    {svc.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-2.5 text-base text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-4">
                    <strong className="text-gray-700">Ideal for:</strong> {svc.idealFor}
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover cursor-pointer"
                  >
                    {svc.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-dark-bg text-white py-16 px-4">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to empower your team with safe, practical AI?
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Every session is tailored to your organization's comfort level, tools, and mission. No
            generic one-size-fits-all slide decks.
          </p>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-md bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover cursor-pointer shadow-md"
            >
              Book a Consulting Appointment
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
