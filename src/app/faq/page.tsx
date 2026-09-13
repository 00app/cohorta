import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal, SplitReveal, Parallax } from "@/components/motion";
import { IconRing } from "@/components/icons";
import { faq } from "@/content/member";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions people actually ask about Cohorta — cost, privacy, signup, and how it works.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <Section className="relative overflow-hidden pt-20 sm:pt-28">
      <Parallax speed={0.12} className="pointer-events-none absolute top-16 right-[8%] hidden lg:block">
        <IconRing className="floaty-a h-20 w-20 text-accent/25" />
      </Parallax>

      <Container className="relative">
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <SplitReveal as="h1" text={faq.h1} className="max-w-2xl text-7xl sm:text-8xl" />

        <dl className="mt-12 divide-y-2 divide-line border-t-2 border-b-2 border-line">
          {faq.items.map((item, i) => (
            <Reveal key={item.q} delay={150 + Math.min(i, 4) * 60}>
              <div className="py-7">
                <dt className="text-xl font-black">{item.q}</dt>
                <dd className="mt-2 text-lg text-ink-2">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
