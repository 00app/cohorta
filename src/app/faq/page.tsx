import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { faq } from "@/content/member";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container>
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{faq.h1}</h1>

        <dl className="mt-10 divide-y divide-line border-t border-b border-line">
          {faq.items.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="text-lg font-bold">{item.q}</dt>
              <dd className="mt-2 text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
