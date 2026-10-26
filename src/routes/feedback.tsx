import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Your Feedback | Insightful Precision Solutions" },
      {
        name: "description",
        content:
          "Rate your experience with Insightful Precision Solutions and share feedback on your AI training.",
      },
      {
        property: "og:title",
        content: "Share Your Feedback — Insightful Precision Solutions",
      },
      {
        property: "og:description",
        content:
          "Tell us how we did. Your feedback helps us keep AI training practical and encouraging.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header */}
      <section className="bg-dark-bg text-white py-16 sm:py-20 px-4 border-b border-white/10">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5">
            <MessageSquare className="w-4 h-4 text-gold" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              Your Feedback Matters
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            How Are We Doing?
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Thank you for training with Insightful Precision Solutions. Share how
            your experience went so we can keep improving.
          </p>
        </div>
      </section>

      {/* Feedback form */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {submitted ? (
          <div className="rounded-2xl bg-white border border-gold/40 p-10 text-center shadow-sm space-y-4">
            <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Thank you for your feedback!
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              You rated your experience{" "}
              <strong className="text-gold">{userRating} out of 5 stars</strong>.
              We appreciate you taking the time to share it.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover"
              >
                Back to Home
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 transition-all hover:border-gold hover:text-gold"
              >
                Explore Training
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm space-y-8">
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                Rate your experience
              </p>
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1.5 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-9 h-9 transition-colors ${
                        (hoverRating !== null
                          ? hoverRating >= star
                          : (userRating ?? 0) >= star)
                          ? "text-gold fill-gold"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-400 max-w-xs mx-auto">
                <span>Very Dissatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (userRating) setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="feedback-comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tell us more (optional)
                </label>
                <textarea
                  id="feedback-comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What went well? What could be better?"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <button
                type="submit"
                disabled={!userRating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-dark-bg transition-all hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Submit Feedback
              </button>
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                This form helps us understand your experience. Please don&apos;t
                include sensitive personal or workplace information.
              </p>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}