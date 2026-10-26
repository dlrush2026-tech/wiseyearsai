import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { Hero } from "@/components/home/Hero";
import { AudiencePathways } from "@/components/home/AudiencePathways";
import { LearningSections } from "@/components/home/LearningSections";
import { TrustSections } from "@/components/home/TrustSections";
import { Faq } from "@/components/home/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Practical AI Training for Mature Adults & Workforce | Wise Years AI",
      },
      {
        name: "description",
        content:
          "Learn to use AI with confidence. Practical, hands-on AI training for mature adults and today's workforce — live instruction, real-world tasks, and responsible AI use. No technical background required.",
      },
      {
        property: "og:title",
        content: "Learn to Use AI With Confidence — Wise Years AI",
      },
      {
        property: "og:description",
        content:
          "Practical, hands-on AI training for mature adults and workforce teams. Live instruction, real-world tasks, and responsible AI use — at a pace that works for you.",
      },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1793048052107408140/attachments/a7a23d83-1667-4b30-a7d1-935f612b76a1.png",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://vibe.filesafe.space/1793048052107408140/attachments/a7a23d83-1667-4b30-a7d1-935f612b76a1.png",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Insightful Precision Solutions",
            alternateName: "Wise Years AI",
            description:
              "Practical, hands-on AI training for mature adults and workforce professionals.",
            url: "https://wise-years-clone.vibepreview.app/",
            founder: { "@type": "Person", name: "Deirdre Rush" },
            areaServed: "US",
            knowsAbout: [
              "Artificial intelligence training",
              "ChatGPT training",
              "AI literacy",
              "Responsible AI use",
            ],
          }),
        }}
      />
      <Hero onOpenBooking={() => setBookingOpen(true)} />
      <AudiencePathways onOpenBooking={() => setBookingOpen(true)} />
      <LearningSections />
      <TrustSections />
      <Faq onOpenBooking={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
