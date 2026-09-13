import type { Metadata } from "next";
import { Container, Section, Eyebrow, Card } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { IconHeart, IconDots } from "@/components/icons";
import { ChatBubble } from "@/components/chat-bubble";
import { trust } from "@/content/member";

export const metadata: Metadata = { title: "Trust & privacy" };

const OFFSET = [
  "sm:-rotate-1",
  "sm:rotate-1 sm:ml-8",
  "sm:-rotate-1 sm:ml-4",
  "sm:rotate-1 sm:ml-10",
];

export default function TrustPage() {
  return (
    <Section className="relative overflow-hidden pt-20 sm:pt-28">
      <Parallax speed={0.12} className="pointer-events-none absolute top-20 right-[10%] hidden lg:block">
        <IconHeart className="heart-pulse h-24 w-24 text-accent/25" />
      </Parallax>
      <Parallax speed={-0.14} className="pointer-events-none absolute top-[65%] right-[4%] hidden lg:block">
        <IconDots className="floaty-c h-12 w-12 text-accent" />
      </Parallax>
      <Parallax speed={0.1} pop className="pointer-events-none absolute top-4 left-[4%] hidden md:block">
        <ChatBubble tone="pink" tilt="-4deg">
          nobody&apos;s watching
        </ChatBubble>
      </Parallax>

      <Container className="relative">
        <Eyebrow>{trust.eyebrow}</Eyebrow>
        <SplitReveal as="h1" text={trust.h1} className="max-w-2xl text-7xl sm:text-8xl" />
        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-xl font-medium text-ink-2 sm:text-2xl">
            {trust.lede}
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {trust.points.map((point, i) => (
            <Reveal key={point.title} delay={200 + i * 90} className={OFFSET[i % OFFSET.length]}>
              <Card>
                <h2 className="text-2xl">{point.title}</h2>
                <p className="mt-3 text-lg text-ink-2">{point.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-xl font-bold">{trust.closing}</p>
      </Container>
    </Section>
  );
}
