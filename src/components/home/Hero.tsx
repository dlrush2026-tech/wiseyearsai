export function Hero() {
  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center bg-dark-bg text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://vibe.filesafe.space/1793048052107408140/attachments/a7a23d83-1667-4b30-a7d1-935f612b76a1.png"
          alt="Dee Rush leading a practical, hands-on AI training session with a whiteboard in a conference room"
          className="w-full h-full object-cover object-center lg:object-[65%_center] brightness-100"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/5" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 backdrop-blur-xs">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold">
              Live, Hands-on AI Literacy Training for Mature Adults
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            AI Training Where <span className="text-gold-metallic">Every Question Matters.</span>
          </h1>

          <p className="text-lg sm:text-xl font-serif font-semibold text-white/95">
            Because learning AI shouldn&apos;t leave anyone behind.
          </p>

          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
            At Wise Years AI, we believe learning happens by doing. Our patient, instructor-led
            classes give you the opportunity to ask questions, practice new skills, and discover
            what AI can help you accomplish at work and in everyday life.
          </p>

          <div className="rounded-xl border border-gold/30 bg-gold/10 px-5 py-4 backdrop-blur-xs">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              <span className="text-gold">Every participant</span> leaves each class with something
              they&apos;ve created, tested, and learned to use independently.
            </p>
          </div>

          <p className="pt-1 text-sm text-gray-300">
            <span className="font-semibold text-gold">Live instruction.</span> Practical examples.
            Responsible AI use. No technical background required.
          </p>

          <div className="pt-6 mt-2 max-w-lg">
            <div className="flex items-center gap-5 border-t border-white/15 pt-6">
              <div className="group relative w-16 h-16 shrink-0">
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
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-gold/60 group-hover:border-gold transition-colors"
                />
              </div>
              <div className="flex-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                  Multiple Decades
                </span>
                <p className="mt-1 text-xs text-gray-300 uppercase tracking-wider">
                  of IT Experience
                </p>
              </div>
              <div className="border-l border-white/15 pl-5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">100%</span>
                <p className="mt-1 text-xs text-gray-300 uppercase tracking-wider">Live Training</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
