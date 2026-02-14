import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What is Infinity Teams?",
    a: "Infinity Teams is a global hiring platform that connects skilled professionals with international companies for full-time employment. Unlike freelance platforms, we focus on long-term, stable roles with international teams.",
  },
  {
    q: "Is this freelance or full-time work?",
    a: "All roles offered through Infinity Teams are full-time positions, not freelance or gig-based work. You work as a dedicated team member for an international company.",
  },
  {
    q: "Do I work remotely from home?",
    a: "No. Team members work from Infinity Teams' professional office locations. We provide a structured work environment with proper infrastructure, equipment, and support.",
  },
  {
    q: "Who is my employer?",
    a: "Infinity Teams is your legal employer, handling your employment contract, payroll, taxes, and benefits. You work day-to-day with the client company on their projects.",
  },
  {
    q: "Do I need to pay anything to register or apply?",
    a: "No. Registration is completely free for candidates. We never charge candidates any fees for applying, interviews, or job placement.",
  },
  {
    q: "How does the hiring process work?",
    a: null,
    list: [
      "You register and complete your profile",
      "Our team reviews and verifies your information",
      "Your profile is matched with international companies",
      "You attend interviews with interested clients",
      "Once selected, we handle onboarding and employment formalities",
    ],
  },
  {
    q: "Will my salary be shown to companies?",
    a: "Yes. Your expected salary is visible to companies in a transparent way. Clients see real salary figures—this helps ensure fair offers and faster hiring.",
  },
  {
    q: "How and when will I get paid?",
    a: "You will receive your salary monthly, directly from Infinity Teams, in compliance with local laws. We manage:",
    list: ["Payroll", "Salary slips", "Tax deductions", "Statutory contributions (PF, ESIC, etc.)"],
  },
  {
    q: "Are taxes and compliance handled for me?",
    a: "Yes. Infinity Teams takes care of:",
    list: ["Tax deductions and filings", "Statutory benefits", "Employment compliance"],
    footnote: "You don't need to worry about legal or payroll administration.",
  },
  {
    q: "What benefits do I receive?",
    a: "Benefits may include:",
    list: [
      "Medical insurance",
      "Paid leaves and holidays",
      "Stable monthly income",
      "Professional office setup",
      "Long-term career opportunities with global companies",
    ],
  },
  {
    q: "Can I work with multiple clients at the same time?",
    a: "No. Roles are exclusive full-time positions. This ensures focus, job stability, and strong collaboration with the client team.",
  },
  {
    q: "Can I update my profile after registration?",
    a: "Yes. You can log in anytime to:",
    list: [
      "Update skills and experience",
      "Upload a new CV",
      "Edit salary expectations",
      "Add certifications or projects",
    ],
    footnote: "Keeping your profile updated increases your chances of selection.",
  },
  {
    q: "Will my data and CV be secure?",
    a: "Absolutely. Your data is stored securely and used only for recruitment purposes. We follow strict data protection standards and do not sell or misuse candidate information.",
  },
  {
    q: "What happens if a project ends?",
    a: "Infinity Teams supports you through transitions. Depending on performance and availability, we:",
    list: ["Reassign you to another client", "Support redeployment", "Provide guidance on next steps"],
  },
  {
    q: "Can freshers or junior candidates apply?",
    a: "Yes. We work with candidates at all experience levels, from junior to senior professionals, depending on client requirements.",
  },
  {
    q: "How long does it take to get hired?",
    a: "Timelines vary, but many candidates are matched and interviewed within days or weeks once their profile is complete and verified.",
  },
  {
    q: "Do I need international work experience?",
    a: "International experience is helpful but not mandatory. Skills, communication, and attitude matter most.",
  },
  {
    q: "Who do I contact for support?",
    a: "Once registered, you'll have access to:",
    list: ["HR support", "Recruitment coordinators", "Ongoing assistance during your employment"],
  },
];

export default function CandidateFAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            FAQs for Candidates
          </h1>
          <p className="text-muted-foreground mb-12">
            Everything you need to know about working through Infinity Teams.
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                  {i + 1}. {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a && <p className="mb-2">{faq.a}</p>}
                  {faq.list && (
                    <ul className="list-disc list-inside space-y-1">
                      {faq.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {faq.footnote && <p className="mt-2">{faq.footnote}</p>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Ready to start your career with an international team?
            </p>
            <Link
              to="/candidate-registration"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Apply as Candidate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
