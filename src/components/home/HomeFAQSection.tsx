import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are these freelancers or full-time employees?",
    answer:
      "These are full-time employees, not freelancers. They work exclusively for your company.",
  },
  {
    question: "How does pricing work?",
    answer:
      "You pay the employee's real salary plus one fixed monthly fee per employee. No markups. No hidden costs.",
  },
  {
    question: "What does the monthly fee include?",
    answer:
      "The fee covers recruitment, HR, payroll, compliance, workstation & IT setup, office infrastructure, and ongoing support.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No. There are no hidden charges or surprise invoices.",
  },
  {
    question: "How fast can I hire someone?",
    answer:
      "Most clients receive shortlisted candidates within 7–14 days.",
  },
  {
    question: "Where are the employees located?",
    answer:
      "Our talent is based in India's top professional hubs and works from professionally managed offices, not from home.",
  },
  {
    question: "Who handles payroll, taxes, and compliance?",
    answer:
      "Infinity Teams handles all payroll, taxes, contracts, and compliance. You manage the work — we manage the employment.",
  },
  {
    question: "What happens if it doesn't work out?",
    answer:
      "You can scale down or exit with just 1 month's notice.",
  },
  {
    question: "Who owns the work and intellectual property?",
    answer:
      "You do. All work and IP belong entirely to your company.",
  },
  {
    question: "Can I start with just one employee?",
    answer:
      "Yes. Many clients start with one hire and scale once they see results.",
  },
];

export const HomeFAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-hero max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Quick answers to the questions we hear most from companies exploring
            Infinity Teams.
          </p>
        </div>

        <Accordion type="multiple" className="space-y-2">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`home-faq-${idx}`}
              className="border rounded-lg px-4 bg-background"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
