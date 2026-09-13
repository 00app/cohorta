import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button, Card } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { IconSparkle, IconRing, IconBubble, IconDots } from "@/components/icons";
import { ChatBubble } from "@/components/chat-bubble";
import { LinocutIllustration } from "@/components/linocut-illustration";
import { memberHome } from "@/content/member";

export const metadata: Metadata = {
  title: "No strangers. And nobody watching.",
};

// Per-card offset/rotation so grids read as scattered and hand-placed
// rather than a rigid row — the "breaking the grid" look. Cycles every 3
// items; every grid on this page happens to have 3, but it degrades fine.
const TILT = ["sm:-rotate-1", "sm:rotate-1 sm:mt-8", "sm:-rotate-2 sm:mt-3"];

export default function HomePage() {
  return (
    <>
      <Section className="relative overflow-hidden pt-20 sm:pt-28">
        <Parallax speed={0.22} className="pointer-events-none absolute top-24 right-[12%] hidden sm:block">
          <IconSparkle className="twinkle h-16 w-16 text-accent" />
        </Parallax>
        <Parallax speed={-0.15} className="pointer-events-none absolute top-[58%] right-[6%] hidden sm:block">
          <IconRing className="spin-slow h-24 w-24 text-ink/15" />
        </Parallax>
        {/* Hero illustration, replacing the old small IconHeart at this
            spot — lg+ only (not md, like the icon it replaces): it needs
            more clearance from the hero text column and the two chat
            bubbles than a h-12 icon ever did. Sized to the traced
            artwork's own viewBox ratio (824:1464 ≈ 0.563) rather than a
            round Tailwind size, so the SVG's default xMidYMid-meet
            scaling fills its box exactly instead of centring inside
            unused letterbox space on one axis. */}
        <Parallax speed={0.18} className="pointer-events-none absolute top-[22%] left-[1%] hidden lg:block">
          <LinocutIllustration className="h-64 w-36" />
        </Parallax>
        <Parallax speed={-0.1} className="pointer-events-none absolute top-4 left-[38%] hidden lg:block">
          <ChatBubble tone="soft" tilt="-6deg">
            no strangers here
          </ChatBubble>
        </Parallax>
        <Parallax speed={0.16} className="pointer-events-none absolute top-[70%] left-[10%] hidden sm:block">
          <ChatBubble tone="navy" tilt="4deg">
            it&apos;s a match
          </ChatBubble>
        </Parallax>

        <Container className="relative">
          <Eyebrow>{memberHome.eyebrow}</Eyebrow>
          <SplitReveal
            as="h1"
            text={memberHome.h1}
            className="max-w-3xl text-7xl sm:text-8xl md:text-9xl"
          />
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-xl font-medium text-ink-2 sm:text-2xl">
              {memberHome.lede}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={memberHome.primaryCta.href} external>
              {memberHome.primaryCta.label}
            </Button>
            <Button href={memberHome.secondaryCta.href} variant="secondary">
              {memberHome.secondaryCta.label}
            </Button>
            <IconDots className="floaty-c hidden h-10 w-10 text-accent sm:block" />
          </div>
        </Container>
      </Section>

      <Section tint>
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {memberHome.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 120} className={TILT[i % TILT.length]}>
                <Card>
                  <h3 className="text-2xl">{pillar.title}</h3>
                  <p className="mt-3 text-base text-ink-2">{pillar.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Parallax speed={0.1} className="pointer-events-none absolute -right-20 top-10 hidden lg:block">
          <IconBubble className="floaty-a h-28 w-28 text-accent/25" />
        </Parallax>
        <Parallax speed={-0.12} className="pointer-events-none absolute top-4 right-[8%] hidden sm:block">
          <ChatBubble tone="pink" tilt="5deg">
            same group as you
          </ChatBubble>
        </Parallax>
        <Container className="relative max-w-2xl">
          <SplitReveal as="h2" text={memberHome.honest.heading} className="text-5xl sm:text-6xl" />
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-ink-2">{memberHome.honest.body}</p>
          </Reveal>
        </Container>
      </Section>

      <Section className="overflow-hidden" tint>
        <Parallax speed={0.14} className="pointer-events-none absolute -top-6 right-[6%] hidden lg:block">
          <IconSparkle className="twinkle h-10 w-10 text-accent" />
        </Parallax>
        <Container>
          <SplitReveal
            as="h2"
            text={memberHome.howItWorksPreview.heading}
            className="max-w-2xl text-5xl sm:text-6xl"
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {memberHome.howItWorksPreview.steps.map((step, i) => (
              <Reveal key={step.title} delay={150 + i * 120} className={TILT[i % TILT.length]}>
                <li className="h-full">
                  <Card className="h-full">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-xl font-black text-accent-ink">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-xl">{step.title}</h3>
                    <p className="mt-2 text-base text-ink-2">{step.body}</p>
                  </Card>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12">
            <Button href="/how-it-works">See the full walkthrough</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
