import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need previous experience with AI?",
    a: "No. Training is designed to meet you where you are. Whether AI is completely new to you or you've already experimented with it, sessions are paced to your comfort level and built around real, useful tasks.",
  },
  {
    q: "What if I'm not confident using technology?",
    a: "That's exactly who this training is for. Instruction is patient, encouraging, and hands-on, with clear demonstrations and guided practice. No question is too basic, and you learn by doing in a supportive setting.",
  },
  {
    q: "What will I learn during training?",
    a: "You'll practice practical tasks like drafting emails, summarizing documents, organizing notes, preparing for meetings, and creating simple plans — along with how to use AI responsibly and recognize its limitations.",
  },
  {
    q: "Can I learn AI for personal use rather than work?",
    a: "Yes. Training covers everyday tasks, personal projects, writing, research, and planning — not just workplace use. You'll learn ways to use AI that are relevant to your own life and goals.",
  },
  {
    q: "Is training available for employees and teams?",
    a: "Yes. Team training can be tailored to your organization's goals, tools, and staff experience levels, with practical workplace examples and guided exercises.",
  },
  {
    q: "Do you offer training for nonprofits and community organizations?",
    a: "Yes. Dee works with nonprofits, caregiver organizations, and community groups, with examples relevant to missions like outreach, grant writing, communications, and coordination.",
  },
  {
    q: "How do I book a session or register for a workshop?",
    a: "Use the Book a Training Session form to request a consultation, or visit the Upcoming Events page to register for a scheduled live workshop. Dee will follow up to confirm details.",
  },
  {
    q: "How do you address responsible AI use and privacy?",
    a: "Training covers verifying AI-generated information, protecting sensitive information, following employer policies, and applying human judgment before acting on AI output — so you use AI thoughtfully and safely.",
  },
];

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-24 bg-warm-cream border-t border-gray-200/70">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-serif text-lg font-semibold text-gray-900">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div
                    id={`faq-panel-${i}`}
                    className="px-6 pb-6 -mt-1 text-base text-gray-600 leading-relaxed"
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
