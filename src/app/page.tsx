import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button, Card } from "@/components/ui";
import { memberHome } from "@/content/member";

export const metadata: Metadata = {
  title: "No strangers. And nobody watching.",
};

export default function HomePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Eyebrow>{memberHome.eyebrow}</Eyebrow>
          <h1 className="max-w-2xl text-4xl sm:text-5xl">{memberHome.h1}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{memberHome.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={memberHome.primaryCta.href} external>
              {memberHome.primaryCta.label}
            </Button>
            <Button href={memberHome.secondaryCta.href} variant="secondary">
              {memberHome.secondaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-surface">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {memberHome.pillars.map((pillar) => (
              <Card key={pillar.title}>
                <h3 className="text-lg">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted">{pillar.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl">{memberHome.honest.heading}</h2>
          <p className="mt-3 max-w-2xl text-muted">{memberHome.honest.body}</p>
        </Container>
      </Section>

      <Section className="border-t border-line bg-surface">
        <Container>
          <h2 className="text-2xl">{memberHome.howItWorksPreview.heading}</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {memberHome.howItWorksPreview.steps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-line bg-ground p-6">
                <span className="text-sm font-bold text-clay">{i + 1}</span>
                <h3 className="mt-2 text-base">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href="/how-it-works">See the full walkthrough</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
