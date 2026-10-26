import { Link } from "@tanstack/react-router";
import { Users, User, CheckCircle2, ArrowRight } from "lucide-react";

interface AudiencePathwaysProps {
  onOpenBooking: () => void;
}

export function AudiencePathways({ onOpenBooking }: AudiencePathwaysProps) {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
        <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
          Where Do You Fit In?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          Two Ways to Build Your AI Skills
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Choose the path that matches your goals — individual learning or
          training for your whole team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Pathway A — Individual */}
        <div className="flex flex-col rounded-2xl bg-white p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-6">
            <User className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
            Build Your AI Skills
          </h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Learn how to use AI for everyday tasks, personal projects, writing,
            research, planning, and professional development. Whether
            you&apos;re new to AI or already have some experience, discover
            practical ways to build your skills and use AI more confidently.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Learn through clear explanations and demonstrations",
              "Practice useful tasks with guided support",
              "Build skills you can use independently",
              "Learn how to use AI responsibly",
            ].map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-gray-700"
              >
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-2">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover"
            >
              Explore Individual Training
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Pathway B — Team */}
        <div className="flex flex-col rounded-2xl bg-dark-bg p-8 border border-gold/20 shadow-sm hover:shadow-lg transition-shadow text-white">
          <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-3">
            Help Your Team Build AI Skills
          </h3>
          <p className="text-base text-gray-300 leading-relaxed mb-6">
            Give your employees practical opportunities to understand AI,
            develop useful workplace skills, and explore responsible ways to
            apply AI to their work. Training can be tailored to your
            organization&apos;s goals, staff experience levels, and appropriate
            workplace applications.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Practical workplace examples",
              "Guided learning and hands-on exercises",
              "Responsible AI use and awareness",
              "Training relevant to team needs",
            ].map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-gray-200"
              >
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover cursor-pointer"
            >
              Discuss Team Training
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}