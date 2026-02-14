import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "1. Platform Intellectual Property Ownership",
    paragraphs: [
      "All intellectual property rights related to the Infinity Teams platform, including but not limited to the website, software application, source code, system architecture, databases, workflows, algorithms, UI/UX designs, trademarks, branding, documentation, and proprietary processes, are and shall remain the exclusive property of Infinity Teams.",
      "Clients, candidates, and third parties are granted a limited, non-exclusive, non-transferable, and revocable license to use the platform solely for its intended purpose in accordance with applicable agreements and terms of service. No ownership rights in the platform or its underlying technology are transferred under any circumstances.",
    ],
  },
  {
    title: "2. Ownership of Work Product & Client Deliverables",
    paragraphs: [
      'All work, deliverables, inventions, developments, software, documentation, designs, reports, content, data, or materials created by Infinity Teams\' assigned employees in the course of providing services to a client ("Work Product") shall be deemed work made for hire and shall belong exclusively to the client, unless explicitly agreed otherwise in writing.',
      "To the extent any Work Product does not qualify as a work made for hire, Infinity Teams hereby assigns all rights, title, and interest in such Work Product to the client, including all intellectual property rights therein.",
    ],
  },
  {
    title: "3. Employee IP Assignment & Confidentiality",
    paragraphs: [
      "All employees engaged through Infinity Teams:",
    ],
    list: [
      "Are contractually bound by IP assignment, confidentiality, and non-disclosure agreements",
      "Assign any IP, inventions, or proprietary work created during employment to the relevant client",
      "Are prohibited from reusing, disclosing, or repurposing client IP for any other engagement or entity",
    ],
    footnote: "Infinity Teams ensures that employment agreements comply with applicable labor and IP laws in the employee's jurisdiction.",
  },
  {
    title: "4. Client Data & Confidential Information",
    paragraphs: [
      "All client-provided data, documentation, credentials, systems access, business information, and confidential materials remain the sole property of the client.",
      "Infinity Teams:",
    ],
    list: [
      "Acts solely as a data processor where applicable",
      "Implements strict access controls, role-based permissions, and secure infrastructure",
      "Complies with GDPR and applicable data protection regulations",
      "Ensures that confidential information is used only for the purpose of delivering contracted services",
    ],
  },
  {
    title: "5. Candidate Data & Profile Information",
    paragraphs: [
      "Candidate profiles, CV data, assessments, and related metadata stored on the Infinity Teams platform remain the property of Infinity Teams as part of its proprietary recruitment database.",
      "However:",
    ],
    list: [
      "Candidates retain rights over their personal data",
      "Clients may use candidate information solely for evaluation and hiring decisions through the platform",
      "Unauthorized downloading, scraping, replication, or reuse of candidate data outside the platform is strictly prohibited",
    ],
  },
  {
    title: "6. Non-Solicitation & Hiring Protection",
    paragraphs: [
      "To protect Infinity Teams' business model, infrastructure, and investment:",
    ],
    list: [
      "Clients agree not to directly or indirectly solicit, hire, or engage Infinity Teams employees outside the platform",
      "This restriction applies during the engagement and for three (3) years following termination or separation, unless a separate written agreement is executed",
    ],
    footnote: "Violation of this clause may result in contractual penalties and legal action.",
  },
  {
    title: "7. Hardware, Tools & Infrastructure Ownership",
    paragraphs: ["Unless otherwise agreed:"],
    list: [
      "All hardware, equipment, office infrastructure, and IT assets provided to employees remain the property of Infinity Teams",
      "Clients receive usage rights for service delivery purposes only",
      "Upon termination, equipment must be returned or settled as per contract terms",
    ],
    footnote: "Client-owned software licenses, credentials, and tools remain the property of the client at all times.",
  },
  {
    title: "8. No Reverse Engineering or Platform Misuse",
    paragraphs: ["Clients and users may not:"],
    list: [
      "Reverse engineer, copy, modify, or replicate any part of the Infinity Teams platform",
      "Use platform data or processes to create competing services",
      "Circumvent platform controls, pricing mechanisms, or candidate protections",
    ],
    footnote: "All platform usage must strictly comply with Infinity Teams' terms, policies, and applicable laws.",
  },
  {
    title: "9. Survival of IP Provisions",
    paragraphs: [
      "All IP ownership, confidentiality, non-disclosure, and non-solicitation obligations shall survive termination of any agreement between the client and Infinity Teams.",
    ],
  },
  {
    title: "10. Governing Law & Enforcement",
    paragraphs: [
      "Intellectual property rights and ownership provisions shall be governed by the applicable laws defined in the master services agreement or client contract. Infinity Teams reserves the right to enforce its IP rights globally.",
    ],
  },
];

export default function IPPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            IP & Ownership Policy
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

                {section.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground text-sm leading-relaxed mb-3"
                  >
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-3">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footnote && (
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
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
