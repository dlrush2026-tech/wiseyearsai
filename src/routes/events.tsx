import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events & Workshops | Wise Years Ai" },
      {
        name: "description",
        content:
          "Join upcoming live hands-on AI workshops, webinars, and community learning sessions led by Dee Rush.",
      },
      { property: "og:title", content: "Upcoming Events — Wise Years Ai" },
      {
        property: "og:description",
        content:
          "Discover upcoming live AI training sessions, senior digital literacy workshops, and nonprofit webinars.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const events = [
    {
      date: "November 14, 2026",
      time: "1:00 PM – 2:30 PM EST",
      format: "Live Interactive Webinar (Zoom)",
      title: "AI Demystified: Hands-on Prompting for Nonprofits & Mature Adults",
      desc: "Learn how to use AI to write newsletters, summarize grant guidelines, and organize weekly agendas without stress.",
      spots: "8 spots remaining",
      level: "Beginner Friendly",
    },
    {
      date: "December 3, 2026",
      time: "10:00 AM – 11:30 AM EST",
      format: "Hybrid (Indianapolis, IN & Online)",
      title: "Safe AI for Caregivers & Senior Community Coordinators",
      desc: "A compassionate session focused on data safety, spotting digital misinformation, and using voice AI to assist caregiving routines.",
      spots: "Open Registration",
      level: "No Experience Needed",
    },
    {
      date: "January 18, 2027",
      time: "2:00 PM – 4:00 PM EST",
      format: "Virtual Intensive Workshop",
      title: "The 2027 AI Playbook for Small Teams & 501(c)(3) Organizations",
      desc: "Step-by-step masterclass covering ChatGPT vs Claude vs Copilot. Turn 10 hours of weekly administrative grind into 45 minutes of reviewed output.",
      spots: "Filling Fast",
      level: "All Skill Levels",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="bg-[#181818] text-white py-20 px-4 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-block rounded-full bg-gold/15 px-3 py-1 border border-gold/40">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gold">
              COMMUNITY & LEARNING
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Upcoming Workshops &amp; <span className="text-gold italic">Live Events</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join Dee Rush for interactive, supportive, live demonstrations where questions are
            always welcomed and encouragement is guaranteed.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {evt.level}
                </span>
                <span className="text-xs text-gray-500 font-medium">{evt.spots}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                {evt.title}
              </h3>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600">
                <span className="flex items-center gap-1 font-semibold text-gray-800">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {evt.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {evt.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {evt.format}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">{evt.desc}</p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#c9a050] hover:bg-[#b88f3f] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow-sm"
              >
                Register &amp; Save Seat
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Host Private Training */}
      <section className="bg-white border-t border-gray-200 py-16 px-4">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Want a dedicated workshop for your team?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Dee travels across the United States and delivers customized virtual or in-person
            sessions built around your exact workplace tools.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded bg-[#181818] hover:bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-gold border border-gold/40 transition-all cursor-pointer shadow"
            >
              Request Custom Workshop Date
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
