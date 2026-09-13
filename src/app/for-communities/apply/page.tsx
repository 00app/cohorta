import type { Metadata } from "next";
import { Container, Section, Eyebrow, Lede } from "@/components/ui";
import { SplitReveal } from "@/components/motion";
import { applyPage } from "@/content/owner";
import { ApplyForm } from "./apply-form";

export const metadata: Metadata = { title: "Talk to us" };

export default function ApplyPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container className="max-w-xl">
        <Eyebrow>{applyPage.eyebrow}</Eyebrow>
        <SplitReveal as="h1" text={applyPage.h1} className="text-7xl sm:text-8xl" />
        <Lede narrow={false}>{applyPage.lede}</Lede>

        <div className="mt-12">
          <ApplyForm />
        </div>
      </Container>
    </Section>
  );
}
