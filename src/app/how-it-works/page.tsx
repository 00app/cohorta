import type { Metadata } from "next";
import { Container, Section, Eyebrow, Card } from "@/components/ui";
import { howItWorks } from "@/content/member";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container>
        <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{howItWorks.h1}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{howItWorks.lede}</p>

        <ol className="mt-10 space-y-4">
          {howItWorks.steps.map((step) => (
            <Card key={step.title}>
              <h2 className="text-lg">{step.title}</h2>
              <p className="mt-2 text-muted">{step.body}</p>
            </Card>
          ))}
        </ol>

        <p className="mt-8 max-w-xl text-sm text-faint">{howItWorks.faqNote}</p>
      </Container>
    </Section>
  );
}
