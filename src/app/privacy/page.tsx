import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-4xl">Privacy policy</h1>
        <p className="mt-5 max-w-xl text-muted">
          This page is a placeholder. Replace it with Cohorta&apos;s full
          privacy policy — covering what&apos;s collected at signup, how
          photos and profile data are stored, how reports are handled, and
          data rights under UK GDPR — before this site goes live.
        </p>
        <p className="mt-4 max-w-xl text-sm text-faint">
          See{" "}
          <a href="/trust" className="text-clay-ink underline">
            Trust &amp; privacy
          </a>{" "}
          for the plain-English version of what&apos;s already been decided.
        </p>
      </Container>
    </Section>
  );
}
