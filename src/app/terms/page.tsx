import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms",
  description: "Cohorta's terms of service — billing, eligibility, and acceptable use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-7xl sm:text-8xl">Terms of service</h1>
        {/* TODO(gary): real terms of service needed before launch. Missing,
            specifically:
            - the first-month-free billing terms already published for the app
            - membership/code eligibility
            - acceptable use
            Not writing placeholder legal text myself — this needs to come
            from Gary, not be invented. Leave the placeholder banner below
            in place (don't remove/soften it) until real copy replaces it,
            so it's obvious to anyone visiting that this isn't final. */}
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
