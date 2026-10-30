import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, User, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import type { CalendarKey } from "@/lib/calendar-booking";

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
  const [bookingCalendar, setBookingCalendar] = useState<CalendarKey>("discovery");

  const openBooking = (key: CalendarKey) => {
    setBookingCalendar(key);
    setModalOpen(true);
  };

  const services: {
    audience: string;
    icon: typeof User;
    title: string;
    desc: string;
    image: string;
    bullets: string[];
    idealFor: string;
    cta: string;
    calendar: CalendarKey;
  }[] = [
    {
      audience: "Individual Learners",
      icon: User,
      title: "1-on-1 Coaching & AI Literacy",
      desc: "Tailored coaching for mature adults, caregivers, and individuals who want to build confidence with AI at their own pace — for personal use, everyday tasks, or professional development.",
      image:
        "https://vibe.filesafe.space/1793048052107408140/assets/e445ea8e-03c4-4f3c-b52a-abf5bda1320d.png",
      bullets: [
        "Getting comfortable with ChatGPT and other AI tools",
        "Everyday tasks: writing, research, planning, and organizing",
        "Spotting AI scams, deepfakes, and misinformation",
        "Responsible AI use and protecting personal information",
      ],
      idealFor: "Mature adults, caregivers, individual professionals",
      cta: "Book Individual Training",
      calendar: "mature-workforce",
    },
    {
      audience: "Teams & Organizations",
      icon: Users,
      title: "Live, Hands-on AI Workshops",
      desc: "Interactive, step-by-step sessions using real workplace documents, emails, newsletters, and reports. Tailored to your team's tools, goals, and experience levels.",
      image:
        "https://vibe.filesafe.space/1793048052107408140/assets/4afda32e-e095-4b4a-a479-b1e0817c66bc.png",
      bullets: [
        "Practical prompting for everyday workplace communication",
        "Summarizing documents and drafting outreach materials",
        "Organizing notes, agendas, and meeting prep",
        "Responsible AI use and data safety for your team",
      ],
      idealFor: "Nonprofit staff, community teams, small businesses",
      cta: "Discuss Team Training",
      calendar: "live-training",
    },
    {
      audience: "Leaders & Decision-Makers",
      icon: Briefcase,
      title: "Strategic AI Consulting",
      desc: "Align your organization's mission with practical, responsible AI use. Identify where AI helps most and build guidelines your team can trust.",
      image:
        "https://vibe.filesafe.space/1793048052107408140/assets/5dd1d65f-cc0e-41e5-acf4-a43c2c23ed65.png",
      bullets: [
        "Review of repetitive tasks and time drains",
        "Tool selection guidance (ChatGPT, Claude, Copilot, and more)",
        "AI use policy and human-in-the-loop oversight",
        "Practical adoption plan for your team",
      ],
      idealFor: "Executive directors, operations managers, board leaders",
      cta: "Request a Consultation",
      calendar: "strategic-consulting",
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
                className="flex flex-col justify-between rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow scroll-mt-28 overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-dark-bg/85 backdrop-blur-xs border border-gold/40 text-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow">
                        {svc.audience}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-900">{svc.title}</h3>
                    </div>
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
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-4">
                    <strong className="text-gray-700">Ideal for:</strong> {svc.idealFor}
                  </p>
                  <button
                    onClick={() => openBooking(svc.calendar)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-metallic px-4 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all cursor-pointer shadow-xs"
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
              onClick={() => openBooking("discovery")}
              className="rounded-md bg-gold-metallic px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all cursor-pointer shadow-md"
            >
              Book a Consulting Appointment
            </button>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        calendarKey={bookingCalendar}
      />
    </div>
  );
}
