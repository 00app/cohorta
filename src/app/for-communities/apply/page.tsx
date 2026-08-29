import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { applyPage } from "@/content/owner";
import { ApplyForm } from "./apply-form";

export const metadata: Metadata = { title: "Talk to us" };

export default function ApplyPage() {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container className="max-w-xl">
        <Eyebrow>{applyPage.eyebrow}</Eyebrow>
        <h1 className="text-4xl sm:text-5xl">{applyPage.h1}</h1>
        <p className="mt-5 text-lg text-muted">{applyPage.lede}</p>

        <div className="mt-10">
          <ApplyForm />
        </div>
      </Container>
    </Section>
  );
}
