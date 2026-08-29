import type { Metadata } from "next";
import { Container, Section, Eyebrow, Card } from "@/components/ui";
import { trust } from "@/content/member";

export const metadata: Metadata = { title: "Trust & privacy" };

export default function TrustPage() {
  return (
    <Section className="pt-16 sm:pt-24">
      <Container>
        <Eyebrow>{trust.eyebrow}</Eyebrow>
        <h1 className="max-w-2xl text-4xl sm:text-5xl">{trust.h1}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{trust.lede}</p>

        <div className="mt-10 space-y-4">
          {trust.points.map((point) => (
            <Card key={point.title}>
              <h2 className="text-lg">{point.title}</h2>
              <p className="mt-2 text-muted">{point.body}</p>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-xl font-semibold">{trust.closing}</p>
      </Container>
    </Section>
  );
}
