import { Link } from "@tanstack/react-router";
import {
  Lightbulb,
  FileText,
  Eye,
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const learningExamples = [
  {
    icon: Lightbulb,
    title: "Get Comfortable with ChatGPT",
    points: [
      "Asking clear, specific questions",
      "Providing useful context so answers are more relevant",
      "Improving an answer through simple follow-up instructions",
    ],
  },
  {
    icon: FileText,
    title: "Put AI to Work on a Real Task",
    points: [
      "Drafting a professional email",
      "Summarizing a long document",
      "Organizing notes or preparing for a meeting",
      "Creating an outline or simple plan",
    ],
  },
  {
    icon: Eye,
    title: "Use AI Thoughtfully",
    points: [
      "Checking important facts before you rely on them",
      "Recognizing when an answer is inaccurate or incomplete",
      "Protecting sensitive information",
      "Reviewing AI-generated content and applying human judgment",
    ],
  },
];

const steps = [
  {
    icon: GraduationCap,
    title: "Start Where You Are",
    desc: "Training meets you at your current comfort level — whether you've never opened a chatbot or you already use AI regularly and want to go further.",
  },
  {
    icon: BookOpen,
    title: "Learn by Practicing",
    desc: "Clear demonstrations and guided exercises help you understand practical AI applications through doing, not just listening.",
  },
  {
    icon: Sparkles,
    title: "Apply What You Learn",
    desc: "Leave with skills you can use right away in everyday activities or workplace responsibilities — and the confidence to keep building.",
  },
];

export function LearningSections() {
  return (
    <>
      {/* WHAT YOU'LL LEARN BY DOING */}
      <section className="py-20 sm:py-24 bg-warm-cream border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
              What You&apos;ll Learn by Doing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Practice Real Tasks, Build Real Skills
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              AI becomes easier to understand when you practice using it. Our training focuses on
              practical tasks that help you build skills you can apply in real situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {learningExamples.map((ex, i) => {
              const Icon = ex.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl bg-white p-8 border border-gray-200 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">{ex.title}</h3>
                  <ul className="space-y-2.5">
                    {ex.points.map((p, pi) => (
                      <li
                        key={pi}
                        className="flex items-start gap-2.5 text-base text-gray-700 leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-12 text-center font-serif text-xl sm:text-2xl text-gray-800 italic max-w-2xl mx-auto">
            &ldquo;You won&apos;t just learn what AI can do. You&apos;ll practice how to use
            it.&rdquo;
          </p>
        </div>
      </section>

      {/* YOUR LEARNING JOURNEY */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Your Learning Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            How Training Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center md:text-left">
                <div className="flex items-center gap-4 mb-4 md:flex-col md:items-start">
                  <div className="w-12 h-12 rounded-full bg-dark-bg text-gold flex items-center justify-center font-serif text-lg font-bold shrink-0">
                    {i + 1}
                  </div>
                  <Icon className="w-7 h-7 text-gold hidden md:block" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover"
          >
            Explore AI Training Options
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
