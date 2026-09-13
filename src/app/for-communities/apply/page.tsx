import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal, SplitReveal } from "@/components/motion";
import { applyPage } from "@/content/owner";
import { ApplyForm } from "./apply-form";

export const metadata: Metadata = { title: "Talk to us" };

export default function ApplyPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container className="max-w-xl">
        <Eyebrow>{applyPage.eyebrow}</Eyebrow>
        <SplitReveal as="h1" text={applyPage.h1} className="text-7xl sm:text-8xl" />
        <Reveal delay={120}>
          <p className="mt-6 text-xl font-medium text-ink-2 sm:text-2xl">
            {applyPage.lede}
          </p>
        </Reveal>

        <div className="mt-12">
          <ApplyForm />
        </div>
      </Container>
    </Section>
  );
}
