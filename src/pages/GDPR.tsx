import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const rights = [
  "Access your data",
  "Correct inaccuracies",
  "Request deletion",
  "Restrict or object to processing",
  "Request data portability",
];

export default function GDPR() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            GDPR Compliance
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              Your GDPR Rights
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed">
              You have the right to:
            </p>

            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
              {rights.map((right) => (
                <li key={right}>{right}</li>
              ))}
            </ul>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Requests are handled within legally required timelines.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
