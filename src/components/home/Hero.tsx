export function Hero() {
  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center bg-dark-bg text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://vibe.filesafe.space/1793048052107408140/attachments/a7a23d83-1667-4b30-a7d1-935f612b76a1.png"
          alt="Dee Rush leading a practical, hands-on AI training session with a whiteboard in a conference room"
          className="w-full h-full object-cover object-center lg:object-[65%_center] brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="group relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full bg-gold/0 blur-lg transition-colors duration-500 group-hover:bg-gold/25"
              />
              <span
                aria-hidden="true"
                className="logo-glow absolute -inset-1 rounded-full border-2 border-gold/50"
              />
              <img
                src="https://vibe.filesafe.space/1793048052107408140/attachments/fcaa638e-49b2-49a4-8361-13fa359f817d.png"
                alt="Wise Years AI Logo"
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gold/60 group-hover:border-gold transition-colors"
              />
            </div>
            <div className="inline-flex items-center rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 backdrop-blur-xs">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
                Practical AI Training for Real Life and Work
              </span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Learn to Use AI With Confidence
          </h1>

          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white/95">
            Practical, hands-on AI training for mature adults and today&apos;s workforce.
          </h2>

          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
            You don&apos;t need to be a technology expert to benefit from AI. Learn how to use AI
            for everyday tasks, workplace responsibilities, writing, research, planning, and
            problem-solving through practical training designed around your needs. Whether
            you&apos;re just getting started or want to build on your existing skills, you&apos;ll
            learn at a pace that works for you.
          </p>

          <p className="pt-2 text-sm text-gray-300">
            <span className="font-semibold text-gold">Live instruction.</span> Practical examples.
            Responsible AI use. No technical background required.
          </p>

          <div className="pt-8 mt-2 grid grid-cols-2 gap-6 border-t border-white/15 max-w-lg">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                Multiple Decades
              </span>
              <p className="mt-1 text-xs text-gray-300 uppercase tracking-wider">
                of IT Experience
              </p>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">100%</span>
              <p className="mt-1 text-xs text-gray-300 uppercase tracking-wider">Live Training</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
