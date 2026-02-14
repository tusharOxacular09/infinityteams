import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "1. Data We Collect",
    content:
      "We collect personal, professional, and usage data necessary to operate our services.",
  },
  {
    title: "2. Why We Process Data",
    content: "Data is processed to:",
    list: [
      "Provide recruitment and employment services",
      "Operate and improve the Platform",
      "Meet legal and compliance obligations",
    ],
  },
  {
    title: "3. Legal Basis",
    content: "We process data based on:",
    list: [
      "Contractual necessity",
      "Legal obligations",
      "Legitimate interests",
      "User consent (where required)",
    ],
  },
  {
    title: "4. Data Storage & Security",
    content:
      "We use encryption, access controls, and secure infrastructure to protect data.",
  },
  {
    title: "5. Data Sharing",
    content:
      "Data may be shared with trusted partners such as payroll providers and IT service providers, strictly as needed.",
  },
  {
    title: "6. User Rights",
    content:
      "Users may request access, correction, deletion, or portability of their data.",
  },
  {
    title: "7. Contact",
    content: "Privacy requests can be sent to:",
    footnote: "privacy@infinityteams.com",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  {section.title}
                </h2>

                {section.content && (
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line mb-3">
                    {section.content}
                  </div>
                )}

                {section.list && (
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-3">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footnote && (
                  <p className="text-sm text-foreground font-medium">
                    <a
                      href={`mailto:${section.footnote}`}
                      className="underline hover:text-primary transition-colors"
                    >
                      {section.footnote}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
