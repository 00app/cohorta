import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button, Card } from "@/components/ui";
import { ownerHome } from "@/content/owner";

export const metadata: Metadata = { title: "For group owners" };

export default function ForCommunitiesPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Eyebrow>{ownerHome.eyebrow}</Eyebrow>
          <h1 className="max-w-2xl text-4xl sm:text-5xl">{ownerHome.h1}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{ownerHome.lede}</p>
          <div className="mt-8">
            <Button href={ownerHome.primaryCta.href}>
              {ownerHome.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-surface">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {ownerHome.points.map((point) => (
              <Card key={point.title}>
                <h2 className="text-lg">{point.title}</h2>
                <p className="mt-2 text-sm text-muted">{point.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl">{ownerHome.honest.heading}</h2>
          <p className="mt-3 max-w-2xl text-muted">{ownerHome.honest.body}</p>
          <div className="mt-8">
            <Button href={ownerHome.primaryCta.href}>
              {ownerHome.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
