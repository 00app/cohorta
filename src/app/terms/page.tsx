import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-7xl sm:text-8xl">Terms of service</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-2">
          This page is a placeholder. Replace it with Cohorta&apos;s full
          terms before this site goes live — including the first-month-free
          billing terms already published for the app, membership/code
          eligibility, and acceptable use.
        </p>
      </Container>
    </Section>
  );
}
