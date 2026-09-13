import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button, Card } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { scatterTilt } from "@/lib/scatter-tilt";
import { IconSparkle, IconBubble } from "@/components/icons";
import { ChatBubble } from "@/components/chat-bubble";
import { ownerHome } from "@/content/owner";

export const metadata: Metadata = { title: "For group owners" };

const TILT = [
  "sm:-rotate-1",
  "sm:rotate-1 sm:mt-8",
  "sm:rotate-1 sm:-mt-2",
  "sm:-rotate-2 sm:mt-6",
];

export default function ForCommunitiesPage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-20 sm:pt-28">
        <Parallax speed={0.14} className="pointer-events-none absolute top-16 right-[10%] hidden lg:block">
          <IconSparkle className="twinkle h-16 w-16 text-accent" />
        </Parallax>
        <Parallax speed={-0.1} className="pointer-events-none absolute top-[50%] left-[4%] hidden lg:block">
          <IconBubble className="floaty-b h-24 w-24 text-ink/10" />
        </Parallax>
        <Parallax speed={0.1} pop className="pointer-events-none absolute top-6 right-[6%] hidden md:block">
          <ChatBubble tone="navy" tilt="6deg">
            zero admin
          </ChatBubble>
        </Parallax>

        <Container className="relative">
          <Eyebrow>{ownerHome.eyebrow}</Eyebrow>
          <SplitReveal as="h1" text={ownerHome.h1} className="max-w-2xl text-7xl sm:text-8xl" />
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-xl font-medium text-ink-2 sm:text-2xl">
              {ownerHome.lede}
            </p>
          </Reveal>
          <div className="mt-10">
            <Button href={ownerHome.primaryCta.href}>
              {ownerHome.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section tint>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {ownerHome.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 110} className={scatterTilt(TILT, i)}>
                <Card>
                  <h2 className="text-2xl">{point.title}</h2>
                  <p className="mt-3 text-base text-ink-2">{point.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SplitReveal
            as="h2"
            text={ownerHome.honest.heading}
            className="max-w-2xl text-5xl sm:text-6xl"
          />
          <Reveal delay={120}>
            <p className="mt-4 max-w-2xl text-lg text-ink-2">
              {ownerHome.honest.body}
            </p>
          </Reveal>
          <div className="mt-10">
            <Button href={ownerHome.primaryCta.href}>
              {ownerHome.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
