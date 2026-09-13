import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button, Card } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { scatterTilt } from "@/lib/scatter-tilt";
import { IconSparkle, IconRing, IconBubble, IconDots } from "@/components/icons";
import { ChatBubble } from "@/components/chat-bubble";
import { LinocutIllustration } from "@/components/linocut-illustration";
import { InkWash } from "@/components/ink-wash";
import { ScribbleHeartCluster, ScribbleHeartLoose } from "@/components/scribble-heart";
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
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        {/* -z-10, not left at auto: an absolute element with z-index:auto
            still paints above a plain static sibling regardless of DOM
            order (see the identical note on Section's own `tint` layer
            in components/ui.tsx) — without this the wash would sit on
            top of the hero copy instead of behind it. */}
        <InkWash className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Parallax speed={0.22} className="pointer-events-none absolute top-24 right-[12%] hidden sm:block">
          <IconSparkle className="twinkle h-16 w-16 text-accent" />
        </Parallax>
        <Parallax speed={-0.15} className="pointer-events-none absolute top-[58%] right-[6%] hidden sm:block">
          <IconRing className="spin-slow h-24 w-24 text-ink/15" />
        </Parallax>
        <Parallax speed={-0.1} pop className="pointer-events-none absolute top-4 left-[38%] hidden lg:block">
          <ChatBubble tone="soft" tilt="-6deg">
            no strangers here
          </ChatBubble>
        </Parallax>
        {/* Placement is a judgment call, not a spec: this was meant to
            replace a single floating heart icon that used to sit at
            top-[38%] left-[3%], but that spot no longer exists — the hero
            was rebuilt into the two-column layout below since then, and a
            first attempt at a top-% position landed directly on top of
            the h1 (verified live, not assumed — checked at 1026px).
            Bottom-anchored instead, same reasoning as the "it's a match"
            bubble's own comment below: anchoring to the section's actual
            bottom, not a %-height guess, survives the text column's
            height changing across breakpoints. lg:hidden because the
            illustration owns the right side from lg up — this is only
            for the single-column range (md to just below lg) where that
            side is empty margin, confirmed live at 800px. */}
        <Parallax speed={0.12} className="pointer-events-none absolute bottom-16 right-[6%] hidden md:block lg:hidden">
          <ScribbleHeartCluster className="h-20 w-20" />
        </Parallax>
        {/* bottom-anchored, not a top-% position: this used to sit at
            top-[70%], which worked when the hero was taller (more top
            padding, a three-line lede). With the padding cut and the
            two-column layout freeing up vertical space, 70% down landed
            on top of the lede's last line at sm/md widths — verified,
            not assumed, by actually checking 820px. Anchoring to the
            section's own (untouched) bottom padding instead means it
            can't drift into content above it as that content reflows. */}
        <Parallax speed={0.16} pop className="pointer-events-none absolute bottom-10 left-[10%] hidden sm:block">
          <ChatBubble tone="navy" tilt="4deg">
            it&apos;s a match
          </ChatBubble>
        </Parallax>

        {/* wide (max-w-6xl, not the reading-width max-w-3xl default): a
            real two-column split needs the room — at the default reading
            width, half a column is too narrow for either the text or the
            illustration to work. Single column below lg (illustration
            hidden entirely there, same as before) — tested at 820px
            forcing the illustration visible in the earlier absolute-
            positioned version and it directly overlapped the h1; a grid
            column can't overlap by construction, but lg is still where
            there's actually enough width for both sides to breathe. */}
        <Container wide className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>{memberHome.eyebrow}</Eyebrow>
              <SplitReveal
                as="h1"
                text={memberHome.h1}
                className="text-7xl sm:text-8xl lg:text-7xl xl:text-8xl"
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
            </div>

            {/* Half the row on lg+ (the grid column itself is the "half
                the width" — sizing the SVG to a fixed width inside it
                rather than fighting the column for space), hidden below
                lg. h-auto keeps the traced artwork's own 824:1464 aspect
                ratio intact rather than stretching it. */}
            <Parallax speed={0.18} className="hidden justify-self-center lg:block">
              <LinocutIllustration className="h-auto w-full max-w-sm" />
            </Parallax>
          </div>
        </Container>
      </Section>

      <Section tint>
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {memberHome.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 120} className={scatterTilt(TILT, i)}>
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
        <Parallax speed={-0.12} pop className="pointer-events-none absolute top-4 right-[8%] hidden sm:block">
          <ChatBubble tone="pink" tilt="5deg">
            same group as you
          </ChatBubble>
        </Parallax>
        {/* Quiet watermark behind the heading, not a foreground mark —
            opacity-10 and sized big enough to read as texture rather than
            a shape competing with the text on top of it. Static (no
            Parallax/Reveal wrapper): ScribbleHeartLoose is already a
            still illustration, same reasoning InkWash uses for its own
            background texture. */}
        <ScribbleHeartLoose className="pointer-events-none absolute -right-10 top-1/2 hidden h-72 w-72 -translate-y-1/2 opacity-10 sm:block lg:h-80 lg:w-80" />
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
              <Reveal key={step.title} delay={150 + i * 120} className={scatterTilt(TILT, i)}>
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
