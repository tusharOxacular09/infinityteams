import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is included in the €500 monthly service fee?",
    answer: "The service fee covers all operational costs including HR management, payroll processing, legal compliance, dedicated workspace with equipment, IT support, and ongoing employee management. This is a fixed fee regardless of the employee's salary."
  },
  {
    question: "How does the one-time recruitment fee work?",
    answer: "We charge a one-time recruitment fee equal to 1 month's salary (minimum €1,500) when we successfully place an employee with you. This covers our rigorous vetting process, skills assessment, background checks, and onboarding support."
  },
  {
    question: "What happens if an employee doesn't work out?",
    answer: "We offer a 3-month guarantee. If an employee leaves or doesn't meet expectations within the first 3 months, we'll find a replacement at no additional recruitment cost. We're committed to your success."
  },
  {
    question: "Are there any hidden fees or markups?",
    answer: "Absolutely not. Our pricing is 100% transparent. You see exactly what the employee earns, and we add a fixed service fee. There are no hidden markups, no percentage-based fees on salary, and no surprise charges."
  },
  {
    question: "Can I hire employees for specific projects or short-term?",
    answer: "While we specialize in long-term, full-time placements for the best results, we can accommodate project-based needs. Contact us to discuss your specific requirements and we'll find the right solution."
  },
  {
    question: "What currencies do you accept for payment?",
    answer: "We accept payments in EUR, USD, GBP, and INR. Invoices can be issued in your preferred currency, and we handle all currency conversions transparently."
  },
  {
    question: "How quickly can I scale my team up or down?",
    answer: "Adding team members typically takes 2-4 weeks depending on the role. For scaling down, we require 30 days notice to ensure proper transition and compliance with local employment laws."
  },
  {
    question: "Do you offer volume discounts for larger teams?",
    answer: "Yes! For teams of 10+ employees, we offer customized enterprise pricing with reduced service fees. Contact our sales team to discuss volume discounts tailored to your needs."
  },
  {
    question: "What's included in the employee's workspace?",
    answer: "Each employee gets a dedicated desk in our modern office facilities, high-speed internet, a professional workstation (laptop/desktop as needed), and access to meeting rooms and common areas."
  },
  {
    question: "How do I get started?",
    answer: "Simply create a free account, tell us about your hiring needs, and we'll match you with pre-vetted candidates within 48 hours. You can interview candidates and make a decision at your own pace with no obligation."
  },
];

export const PricingFAQ = () => {
  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-hero">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our pricing, process, and guarantees.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="mailto:contact@infinityteams.com" 
            className="text-accent hover:underline font-medium"
          >
            Contact our sales team →
          </a>
        </div>
      </div>
    </section>
  );
};
