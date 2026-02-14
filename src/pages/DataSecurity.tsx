import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "1. Subject Matter",
    content:
      "Infinity Teams processes personal data on behalf of the Client to provide recruitment, employment, payroll, and HR services.",
  },
  {
    title: "2. Categories of Data",
    list: [
      "Identification data",
      "Employment data",
      "Payroll & tax data",
      "Communication data",
    ],
  },
  {
    title: "3. Processing Instructions",
    content:
      "Infinity Teams processes data only on documented instructions from the Client.",
  },
  {
    title: "4. Security Measures",
    content: "Infinity Teams implements:",
    list: [
      "Encryption at rest and in transit",
      "Role-based access controls",
      "Audit logging",
      "Secure hosting",
    ],
  },
  {
    title: "5. Sub-Processors",
    content:
      "Infinity Teams may engage sub-processors for payroll, IT, or compliance services. A list will be provided upon request.",
  },
  {
    title: "6. Data Subject Rights",
    content:
      "Infinity Teams assists the Client in fulfilling GDPR data subject requests.",
  },
  {
    title: "7. Data Breach Notification",
    content:
      "Infinity Teams will notify the Client without undue delay upon becoming aware of a data breach.",
  },
  {
    title: "8. Data Deletion",
    content:
      "Upon termination, data will be deleted or returned unless legally required to retain it.",
  },
  {
    title: "9. Governing Law",
    content: "This DPA is governed by the laws of the Netherlands.",
  },
];

export default function DataSecurity() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Data Security
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-4 mb-12">
            <h2 className="font-display text-xl font-bold text-foreground">
              Data Processing Agreement
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This Data Processing Agreement ("DPA") forms part of the agreement between:
            </p>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <p><span className="font-medium text-foreground">Client</span> (Data Controller)</p>
              <p>and</p>
              <p><span className="font-medium text-foreground">Infinity Teams</span> (Data Processor)</p>
            </div>
          </div>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
