import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Cohorta's privacy policy — what's collected, how it's stored, and your data rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-7xl sm:text-8xl">Privacy policy</h1>
        {/* TODO(gary): real privacy policy needed before launch. Missing,
            specifically:
            - what's collected at signup
            - how photos and profile data are stored
            - how reports are handled
            - data rights under UK GDPR
            Not writing placeholder legal text myself — this needs to come
            from Gary, not be invented. Leave the placeholder banner below
            in place (don't remove/soften it) until real copy replaces it,
            so it's obvious to anyone visiting that this isn't final. */}
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
