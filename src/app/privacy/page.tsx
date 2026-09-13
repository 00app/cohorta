import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-7xl sm:text-8xl">Privacy policy</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-2">
          This page is a placeholder. Replace it with Cohorta&apos;s full
          privacy policy — covering what&apos;s collected at signup, how
          photos and profile data are stored, how reports are handled, and
          data rights under UK GDPR — before this site goes live.
        </p>
        <p className="mt-4 max-w-xl text-base text-ink">
          See{" "}
          <a href="/trust" className="text-accent-ink underline">
            Trust &amp; privacy
          </a>{" "}
          for the plain-English version of what&apos;s already been decided.
        </p>
      </Container>
    </Section>
  );
}
