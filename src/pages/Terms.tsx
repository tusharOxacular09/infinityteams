import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "1. About Infinity Teams",
    content: `Infinity Teams ("Infinity Teams", "we", "our", "us") operates a global hiring platform that enables companies to hire full-time international professionals through a transparent cost-plus employment model.\n\nBy accessing or using our website or platform ("Platform"), you agree to these Terms.`,
  },
  {
    title: "2. Platform Overview",
    content:
      "Infinity Teams is not a freelance marketplace. All professionals engaged through the Platform are full-time employees managed operationally by Infinity Teams.\n\nInfinity Teams provides recruitment, HR, payroll, compliance, office infrastructure, and operational support services.",
  },
  {
    title: "3. Transparent Cost-Plus Pricing",
    content: "Clients agree that:",
    list: [
      "Employees are hired at their actual salary cost",
      "A fixed monthly service fee applies per employee",
      "No hidden markups or commissions are charged",
    ],
    footnote: "All pricing is displayed transparently on the Platform.",
  },
  {
    title: "4. Scope of Services",
    content: "Services include:",
    list: [
      "Recruitment & candidate screening",
      "Employment contracts",
      "Payroll & statutory compliance",
      "HR administration",
      "Office infrastructure & IT support",
    ],
    footnote:
      "Infinity Teams does not guarantee specific business results or performance outcomes.",
  },
  {
    title: "5. Intellectual Property Ownership",
    content:
      "All work products, deliverables, and intellectual property created by assigned employees belong exclusively to the Client, unless otherwise agreed in writing.",
  },
  {
    title: "6. Non-Solicitation",
    content:
      "Clients may not directly or indirectly hire or solicit Infinity Teams employees outside the Platform for three (3) years after termination.",
  },
  {
    title: "7. Term & Termination",
    list: [
      "Engagements operate on a monthly basis",
      "Either party may terminate with one (1) month written notice",
      "Outstanding fees must be paid prior to termination",
    ],
  },
  {
    title: "8. Fees & Payment",
    list: [
      "Invoices are payable monthly in advance",
      "Late payments may incur penalties",
      "Recruitment and hardware fees may apply",
    ],
  },
  {
    title: "9. Confidentiality & Data Protection",
    content:
      "All parties must protect confidential information and comply with applicable data protection laws, including GDPR where applicable.",
  },
  {
    title: "10. Limitation of Liability",
    content:
      "Infinity Teams is not liable for indirect or consequential damages arising from use of the Platform.",
  },
  {
    title: "11. Governing Law",
    content: "These Terms are governed by the laws of the Netherlands.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Terms of Service
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
                  <p className="text-sm text-muted-foreground">
                    {section.footnote}
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
