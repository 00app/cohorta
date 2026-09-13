import type { Metadata } from "next";
import { Container, Section, Eyebrow, Card, Lede } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { scatterTilt } from "@/lib/scatter-tilt";
import { IconRing, IconSparkle } from "@/components/icons";
import { ChatBubble } from "@/components/chat-bubble";
import { howItWorks } from "@/content/member";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Nothing to download, about ten minutes to set up. Here's exactly how Cohorta works, from your group's code to your first match.",
  alternates: { canonical: "/how-it-works" },
};

// Alternating indent + tilt so the step list reads as placed, not ruled off
// with a straight edge — same "broken grid" language as the homepage.
const OFFSET = [
  "sm:-rotate-1",
  "sm:rotate-1 sm:ml-8",
  "sm:-rotate-1 sm:ml-4",
  "sm:rotate-1 sm:ml-10",
  "sm:-rotate-1 sm:ml-2",
];

export default function HowItWorksPage() {
  return (
    <Section className="relative overflow-hidden pt-20 sm:pt-28">
      <Parallax speed={0.14} className="pointer-events-none absolute top-16 right-[8%] hidden lg:block">
        <IconRing className="spin-slow h-28 w-28 text-accent/25" />
      </Parallax>
      <Parallax speed={-0.1} className="pointer-events-none absolute top-[55%] right-[18%] hidden lg:block">
        <IconSparkle className="twinkle h-12 w-12 text-accent" />
      </Parallax>
      {/* top-12, not top-6: at top-6 this had only ~9px clearance to this
          Section's own overflow-hidden edge — the ambient bob-bubble
          animation's 10px upward travel was enough to clip it (confirmed
          live). top-12 leaves real margin for both that and the
          continuous scroll-parallax drift above it. */}
      <Parallax speed={0.1} className="pointer-events-none absolute top-12 left-[6%] hidden md:block">
        <ChatBubble tone="soft" tilt="-5deg">
          about ten minutes
        </ChatBubble>
      </Parallax>

      <Container className="relative">
        <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        <SplitReveal as="h1" text={howItWorks.h1} className="max-w-2xl text-7xl sm:text-8xl" />
        <Lede>{howItWorks.lede}</Lede>

        <ol className="mt-12 space-y-6">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={200 + i * 90} className={scatterTilt(OFFSET, i)}>
              <Card>
                {/* Badge reveals first, heading second — two Reveals nested
                    inside the card's own (already-triggered) one, staggered
                    by a short internal delay rather than a separate
                    viewport trigger, so they read as one small sequence
                    inside an already-arriving card, not a second entrance. */}
                <Reveal>
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink text-sm font-black text-white">
                    {i + 1}
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="mt-4 text-3xl">{step.title}</h2>
                </Reveal>
                <p className="mt-3 text-lg text-ink-2">{step.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 max-w-xl text-base text-ink">
          {howItWorks.faqNote}
        </p>
      </Container>
    </Section>
  );
}
