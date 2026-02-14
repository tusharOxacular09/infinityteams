import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
  list?: string[];
}

interface FAQCategory {
  icon: string;
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    icon: "🔹",
    title: "About Infinity Teams",
    items: [
      {
        question: "What is Infinity Teams?",
        answer:
          "Infinity Teams is a global hiring platform that helps companies hire full-time international professionals at cost price plus one fixed monthly fee. We manage recruitment, HR, payroll, compliance, IT setup, and operations end-to-end.",
      },
      {
        question:
          "How is Infinity Teams different from outsourcing companies?",
        answer:
          "Traditional outsourcing firms hide margins and mark up salaries. Infinity Teams shows the real salary, charges a fixed monthly fee, and provides full-time dedicated employees, not shared resources.",
      },
      {
        question:
          "How is Infinity Teams different from Upwork or Fiverr?",
        answer:
          "Freelance platforms focus on short-term, gig-based work. Infinity Teams provides full-time professionals who work exclusively for your company, with complete employment and operational management handled for you.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Pricing & Costs",
    items: [
      {
        question: "How does pricing work?",
        answer: "You pay:",
        list: [
          "The employee's real salary (at cost)",
          "One fixed monthly Infinity Teams fee per employee",
        ],
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. There are no hidden charges, percentage markups, or surprise invoices.",
      },
      {
        question: "What does the monthly Infinity Teams fee include?",
        answer: "The monthly fee includes:",
        list: [
          "Recruitment & onboarding",
          "HR management",
          "Payroll, taxes & compliance",
          "Medical insurance & statutory benefits",
          "Laptop, monitor & IT setup",
          "Office workspace & infrastructure",
          "Ongoing HR & performance support",
        ],
      },
      {
        question: "Do I need to pay separately for laptops or equipment?",
        answer:
          "No. Every employee works from a fully equipped, professionally managed environment provided by Infinity Teams.",
      },
      {
        question: "Is the employee salary marked up?",
        answer:
          "No. The salary shown is the actual salary paid to the employee.",
      },
      {
        question: "Is pricing fixed or affected by exchange rates?",
        answer:
          "The Infinity Teams fee is fixed in your local billing currency and does not change due to exchange-rate fluctuations.",
      },
      {
        question: "Can pricing change in the future?",
        answer:
          "Your pricing remains fixed unless we explicitly notify you in advance of any changes.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Hiring & Talent",
    items: [
      {
        question: "Are these freelancers or full-time employees?",
        answer:
          "These are full-time employees, not freelancers. They work exclusively for your company and are hired and managed through Infinity Teams.",
      },
      {
        question: "Where are the employees located?",
        answer:
          "Currently, our talent is based in India's top professional and technology hubs, such as Mumbai, Bangalore, and Hyderabad.",
      },
      {
        question: "What roles can I hire through Infinity Teams?",
        answer:
          "You can hire professionals across many domains, including:",
        list: [
          "Software & IT",
          "AI & Data",
          "Digital Marketing",
          "Finance & Accounting",
          "Engineering & Architecture",
          "Legal & Medical Process Outsourcing",
          "Operations & Business Support",
        ],
      },
      {
        question: "How long does it take to hire?",
        answer:
          "Most clients receive shortlisted candidates within 7–14 days. Some roles can be filled faster depending on requirements.",
      },
      {
        question: "Can I interview candidates myself?",
        answer:
          "Yes. You interview and approve every candidate before hiring.",
      },
      {
        question: "Can I start with just one employee?",
        answer:
          "Yes. Many clients start with one hire and scale gradually.",
      },
      {
        question: "Can I scale my team up or down?",
        answer:
          "Yes. You can scale up or down with just 1 month's notice.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Employment, HR & Compliance",
    items: [
      {
        question: "Who is the legal employer of the employee?",
        answer:
          "Infinity Teams acts as the local employer, handling contracts, payroll, taxes, and compliance. You manage the employee's day-to-day work.",
      },
      {
        question: "Who handles payroll and taxes?",
        answer:
          "Infinity Teams manages payroll, statutory taxes, social contributions, and all local compliance.",
      },
      {
        question: "Do you provide employee benefits?",
        answer:
          "Yes. Employees receive benefits such as medical insurance and statutory benefits as required by local regulations.",
      },
      {
        question:
          "How do you ensure compliance and reduce legal risk?",
        answer:
          "We manage employment contracts, payroll, taxes, insurance, and HR processes in compliance with local labor laws, so you don't carry legal or administrative risk.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Work Setup & Infrastructure",
    items: [
      {
        question: "Where do employees work from?",
        answer:
          "Employees work from professionally managed Infinity Teams offices, not from home.",
      },
      {
        question: "What infrastructure is provided?",
        answer: "Each employee is provided with:",
        list: [
          "Laptop and monitor",
          "Secure IT setup",
          "High-speed internet",
          "Power backup",
          "Professional office workspace",
        ],
      },
      {
        question: "Can employees work in my time zone?",
        answer:
          "Yes. Many employees can align partially or fully with your time zone depending on role requirements.",
      },
      {
        question: "Can I choose specific hardware or tools?",
        answer:
          "Yes. Hardware and tools can be customized based on your requirements.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Performance & Management",
    items: [
      {
        question: "Who manages the employee day-to-day?",
        answer:
          "You manage the employee's daily tasks, priorities, and performance goals. Infinity Teams supports HR, administration, and operational needs.",
      },
      {
        question: "What happens if the employee is not a good fit?",
        answer:
          "We work with you to resolve performance issues and can help replace the employee if needed.",
      },
      {
        question: "How is performance tracked?",
        answer:
          "We support attendance tracking, leave management, and regular performance feedback through our HR processes.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Contracts, Risk & Exit",
    items: [
      {
        question: "Is there a long-term contract?",
        answer: "No. There are no long-term commitments.",
      },
      {
        question: "What is the notice period?",
        answer:
          "You can exit or scale down with 1 month's written notice.",
      },
      {
        question: "What happens to intellectual property (IP)?",
        answer:
          "All work and IP created by the employee belongs entirely to you.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. We follow strict data security protocols and GDPR-compliant processes where applicable.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Getting Started",
    items: [
      {
        question: "How do I get started?",
        answer: "",
        list: [
          "Calculate your cost",
          "View matching candidates",
          "Interview and select",
          "We handle onboarding and setup",
        ],
      },
      {
        question: "Do I need to pay anything upfront?",
        answer:
          "In most cases, no upfront commitment is required. Any special arrangements will be clearly communicated in advance.",
      },
      {
        question: "Can I talk to someone before hiring?",
        answer:
          "Absolutely. You can book a short call with our team to walk through pricing, candidates, and the hiring process.",
      },
    ],
  },
  {
    icon: "🔹",
    title: "Platform & Future Features",
    items: [
      {
        question: "Do you have an online platform?",
        answer:
          "Yes. Clients can log in to view candidates, pricing, invoices, and HR-related information.",
      },
      {
        question: "Will more features be added in the future?",
        answer:
          "Yes. We continuously enhance the platform with automation, reporting, and advanced workforce management features.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Everything you need to know about hiring with Infinity Teams.
          </p>

          <div className="space-y-10">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.title}
                </h2>

                <Accordion type="multiple" className="space-y-2">
                  {category.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${category.title}-${idx}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {item.answer && <p className="mb-2">{item.answer}</p>}
                        {item.list && (
                          <ul className="list-disc list-inside space-y-1">
                            {item.list.map((li) => (
                              <li key={li}>{li}</li>
                            ))}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
