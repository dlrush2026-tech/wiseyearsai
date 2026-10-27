import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Award, HeartHandshake, ShieldCheck, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dee Rush — 46+ Years IT Expertise | Wise Years Ai" },
      {
        name: "description",
        content:
          "Meet Deirdre (Dee) Rush, certified AI consultant, coach, and trainer bringing 46+ years of tech expertise to mature adults and nonprofit leaders.",
      },
      { property: "og:title", content: "About Dee Rush — Wise Years Ai" },
      {
        property: "og:description",
        content: "Making AI approachable, practical, safe, and encouraging for everyone.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Header */}
      <section className="bg-[#181818] text-white py-20 px-4 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-block rounded-full bg-gold/15 px-3 py-1 border border-gold/40">
            <span className="text-[11px] font-bold tracking-widest uppercase text-gold">
              MEET YOUR AI TRAINER &amp; COACH
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Deirdre <span className="text-gold italic">&quot;Dee&quot;</span> Rush
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridging the generational tech divide with 46+ years of deep IT systems expertise, deep
            patience, and unconditional encouragement.
          </p>
        </div>
      </section>

      {/* Main Bio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Portrait */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://vibe.filesafe.space/1793048052107408140/attachments/c90b739a-803a-4d77-9670-9c33b2e29230.png"
                alt="Deirdre Dee Rush, Certified AI Consultant and Trainer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  Founder &amp; Principal
                </span>
                <h4 className="font-serif text-lg font-bold">Deirdre &quot;Dee&quot; Rush</h4>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                46+ Years IT Expertise
              </span>
              <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                Certified AI Consultant
              </span>
              <span className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                Indianapolis, IN
              </span>
            </div>
          </div>

          {/* Narrative */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              &quot;AI should never make you feel inadequate. It should give you back your time and
              confidence.&quot;
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              With over four decades in software engineering, enterprise IT systems, and community
              technology leadership, Dee saw firsthand how rapidly changing AI tools were causing
              anxiety among mature professionals, nonprofit teams, and caregivers.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Instead of technical jargon or overwhelming theoretical equations, Dee founded{" "}
              <strong className="text-gray-900">Wise Years Ai</strong> to deliver compassionate,
              hands-on guidance. She teaches practical prompts, workflow automation, and data safety
              protocols that empower you on day one.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900">
                    Proven IT Pedigree
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    46+ years solving real-world technological challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                <HeartHandshake className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-gray-900">
                    Human-First Approach
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Patient, respectful, and tailored to any learning pace.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="rounded bg-gold hover:bg-gold-hover px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer shadow"
              >
                Book a Session with Dee
              </button>
              <a
                href="tel:3176956863"
                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white hover:bg-gray-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-800 transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                317-695-6863
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / 3 Tenets */}
      <section className="bg-white border-t border-gray-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Our Core Guiding Principles
            </h3>
            <p className="text-xs uppercase tracking-widest text-gold font-bold">
              Clarity • Confidence • Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-200/60 shadow-xs space-y-2">
              <h4 className="font-serif text-lg font-bold text-gray-900">
                1. Clarity Over Complexity
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We cut through buzzwords and hype. You will always understand exactly what an AI
                tool is doing, how to prompt it, and what results to expect.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-200/60 shadow-xs space-y-2">
              <h4 className="font-serif text-lg font-bold text-gray-900">
                2. Confidence Over Fear
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Fear vanishes when you get your hands on the keyboard in a safe, non-judgmental
                environment. No question is ever silly or too basic.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-200/60 shadow-xs space-y-2">
              <h4 className="font-serif text-lg font-bold text-gray-900">3. Practical Solutions</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We focus on tangible tasks: letters, newsletters, event planning, and data
                organization. You leave every session ready to save hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
